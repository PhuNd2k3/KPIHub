import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Flex, Form, message, Modal, Upload } from "antd";
import * as XLSX from "xlsx";
import {
    addCriteria,
    addTarget,
    addTask,
    updateProgressTask,
} from "../../services/kpi";
import { getDataFromDb } from "../../services/localStorage";

export const Import = ({ updateListKpi }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState();
    const [countRow, setCountRow] = useState(0);
    // onchange states
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);

    // submit state
    const [excelData, setExcelData] = useState(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);

        handleFileSubmit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDownloadTemplate = () => {
        fetch("template.xlsx").then((response) => {
            console.log(response);

            response.blob().then((blob) => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);

                // Setting various property values
                const alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = "template.xlsx";
                alink.click();
            });
        });
    };

    // onchange event
    const handleFile = (e) => {
        // eslint-disable-next-line prefer-const
        let fileTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
        ];
        // eslint-disable-next-line prefer-const
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                // eslint-disable-next-line prefer-const
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                };
            } else {
                setTypeError("Hãy chọn file có kiểu excel");
                setExcelFile(null);
            }
        } else {
            console.log("Please select your file");
        }
    };

    const ExcelDateToJSDate = (date) => {
        let converted_date = new Date(Math.round((date - 25569) * 864e5));
        converted_date = String(converted_date).slice(4, 15);
        date = converted_date.split(" ");
        const day = date[1];
        let month = date[0];
        month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1;
        if (month.toString().length <= 1) month = "0" + month;
        // eslint-disable-next-line prefer-const
        let year = date[2];
        return String(year + "-" + month + "-" + day);
    };

    // submit event
    const handleFileSubmit = () => {
        // e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: "buffer" });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);

            setCountRow(data.length);

            let lastTargetId = "";
            let lastCriteriaId = "";

            data.map((row, index) => {
                if (row["Mục tiêu"]) {
                    const target = {
                        targetName: row["Mục tiêu"],
                        targetDes: row["Mô tả"],
                        targetStatus: "On Going",
                        weight: row["Trọng số"],
                    };
                    const newTarget = addTarget(target);
                    lastTargetId = newTarget.targetId;

                    const criteria = {
                        criteriaName: row["Tiêu chí"],
                        criteriaDesc: row["Mô tả_1"],
                        criteriaStatus: "On Going",
                        criteriaProgress: 0,
                        objective: Number(row["Chỉ tiêu"]),
                        unit: row["Đơn vị"],
                        weight: row["Trọng số_1"],
                    };

                    const newCriteria = addCriteria(
                        newTarget.targetId,
                        criteria
                    );

                    lastCriteriaId = newCriteria.criteriaId;

                    const task = {
                        taskName: row["Công việc"],
                        taskDes: row["Mô tả_2"],
                        taskStatus: "On Going",
                        taskProgress: row["Tiến độ"],
                        objective: row["Chỉ tiêu công việc"],
                        startDate: ExcelDateToJSDate(row["Thời gian bắt đầu"]),
                        endDate: ExcelDateToJSDate(row["Thời gian kết thúc"]),
                    };

                    const newTask = addTask(
                        newTarget.targetId,
                        newCriteria.criteriaId,
                        task
                    );

                    updateProgressTask(
                        lastTargetId,
                        lastCriteriaId,
                        newTask.taskId,
                        newTask.taskProgress
                    );

                    if (index == data.length - 1) {
                        console.log("updated");
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const listKpi = getDataFromDb("listKpi")
                            ? getDataFromDb("listKpi")
                            : [];
                        updateListKpi(listKpi);
                    }
                } else {
                    if (row["Tiêu chí"]) {
                        const criteria = {
                            criteriaName: row["Tiêu chí"],
                            criteriaDesc: row["Mô tả_1"],
                            criteriaStatus: "On Going",
                            objective: Number(row["Chỉ tiêu"]),
                            // criteriaProgress: 0,
                            unit: row["Đơn vị"],
                            weight: row["Trọng số_1"],
                        };

                        const newCriteria = addCriteria(lastTargetId, criteria);
                        lastCriteriaId = newCriteria.criteriaId;

                        const task = {
                            taskName: row["Công việc"],
                            taskDes: row["Mô tả_2"],
                            taskStatus: "On Going",
                            taskProgress: row["Tiến độ"],
                            objective: row["Chỉ tiêu công việc"],
                            startDate: ExcelDateToJSDate(
                                row["Thời gian bắt đầu"]
                            ),
                            endDate: ExcelDateToJSDate(
                                row["Thời gian kết thúc"]
                            ),
                        };

                        const newTask = addTask(
                            lastTargetId,
                            newCriteria.criteriaId,
                            task
                        );

                        updateProgressTask(
                            lastTargetId,
                            lastCriteriaId,
                            newTask.taskId,
                            newTask.taskProgress
                        );

                        if (index == data.length - 1) {
                            console.log("updated");
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const listKpi = getDataFromDb("listKpi")
                                ? getDataFromDb("listKpi")
                                : [];
                            updateListKpi(listKpi);
                        }
                    } else {
                        const task = {
                            taskName: row["Công việc"],
                            taskDes: row["Mô tả_2"],
                            taskStatus: "On Going",
                            taskProgress: row["Tiến độ"],
                            objective: row["Chỉ tiêu công việc"],
                            startDate: ExcelDateToJSDate(
                                row["Thời gian bắt đầu"]
                            ),
                            endDate: ExcelDateToJSDate(
                                row["Thời gian kết thúc"]
                            ),
                        };

                        const newTask = addTask(
                            lastTargetId,
                            lastCriteriaId,
                            task
                        );

                        updateProgressTask(
                            lastTargetId,
                            lastCriteriaId,
                            newTask.taskId,
                            newTask.taskProgress
                        );

                        if (index == data.length - 1) {
                            console.log("updated");
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const listKpi = getDataFromDb("listKpi")
                                ? getDataFromDb("listKpi")
                                : [];
                            updateListKpi(listKpi);
                        }
                    }
                }
            });
        }
    };

    return (
        <>
            <Button
                icon={<UploadOutlined />}
                style={{
                    height: 40,
                }}
                onClick={() => showModal()}
            >
                Nhập tệp
            </Button>

            <Modal
                title="Nhập tệp"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>Hủy</Button>,

                    <Button type="primary" onClick={handleOk}>
                        Lưu
                    </Button>,
                ]}
            >
                <Flex vertical justify="center" gap={2}>
                    <Flex justify="end">
                        <p
                            style={{
                                cursor: "pointer",
                                fontWeight: 500,
                            }}
                            onClick={() => handleDownloadTemplate()}
                        >
                            template.xlsx
                        </p>
                    </Flex>
                    <Flex justify="center">
                        {/* <Form labelCol={{ span: 4 }}>
                            <Form.Item label="File" name="file">
                                <AliyunOSSUpload
                                    handleChangeFile={handleFile}
                                />
                            </Form.Item>
                            {typeError && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {typeError}
                                </div>
                            )}
                        </Form> */}

                        {/* <input type="file" onChange={changeFile} /> */}

                        {/* form */}
                        <form
                            className="form-group custom-form"
                            // onSubmit={handleFileSubmit}
                        >
                            <input
                                type="file"
                                className="form-control"
                                required
                                onChange={handleFile}
                            />
                            {/* <button
                                type="submit"
                                className="btn btn-success btn-md"
                            >
                                UPLOAD
                            </button> */}
                            {typeError && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {typeError}
                                </div>
                            )}
                        </form>
                    </Flex>
                </Flex>
            </Modal>
        </>
    );
};

interface OSSDataType {
    dir: string;
    expire: string;
    host: string;
    accessId: string;
    policy: string;
    signature: string;
}

interface AliyunOSSUploadProps {
    value?: UploadFile[];
    onChange?: (fileList: UploadFile[]) => void;
    handleChangeFile: () => void;
}

const AliyunOSSUpload = ({
    value,
    onChange,
    handleChangeFile,
}: AliyunOSSUploadProps) => {
    const [OSSData, setOSSData] = useState<OSSDataType>();

    // Mock get OSS api
    // https://help.aliyun.com/document_detail/31988.html
    const mockGetOSSData = () => ({
        dir: "user-dir/",
        expire: "1577811661",
        host: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        accessId: "c2hhb2RhaG9uZw==",
        policy: "eGl4aWhhaGFrdWt1ZGFkYQ==",
        signature: "ZGFob25nc2hhbw==",
    });

    const init = async () => {
        try {
            const result = await mockGetOSSData();
            setOSSData(result);
        } catch (error) {
            message.error(error as string);
        }
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange: UploadProps["onChange"] = ({ fileList }) => {
        console.log("Aliyun OSS:", fileList);
        onChange?.([...fileList]);
        handleChangeFile(fileList[0]);
    };

    const onRemove = (file: UploadFile) => {
        const files = (value || []).filter((v) => v.url !== file.url);

        if (onChange) {
            onChange(files);
        }
    };

    const getExtraData: UploadProps["data"] = (file) => ({
        key: file.url,
        OSSAccessKeyId: OSSData?.accessId,
        policy: OSSData?.policy,
        Signature: OSSData?.signature,
    });

    const beforeUpload: UploadProps["beforeUpload"] = async (file) => {
        if (!OSSData) return false;

        const expire = Number(OSSData.expire) * 1000;

        if (expire < Date.now()) {
            await init();
        }

        const suffix = file.name.slice(file.name.lastIndexOf("."));
        const filename = Date.now() + suffix;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        file.url = OSSData.dir + filename;

        return file;
    };

    const uploadProps: UploadProps = {
        name: "file",
        fileList: value,
        action: OSSData?.host,
        onChange: handleChange,
        onRemove,
        data: getExtraData,
        beforeUpload,
    };

    return (
        <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Nhấn vào đây để chọn file</Button>
        </Upload>
    );
};
