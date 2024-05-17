import React, { useState, useEffect, useContext } from "react";
import {
    Breadcrumb,
    Button,
    Card,
    ConfigProvider,
    Flex,
    Input,
    Modal,
    Select,
    Typography,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import { Target } from "../Target";
import { getListKpi, addTarget } from "../../services/kpi";
import { TourGuidContext } from "../../providers/TourGuide";

const { TextArea } = Input;

export const Home: React.FC = () => {
    const [listKpi, setListKpi] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetModal, setTargetModal] = useState({
        targetName: "",
        targetDes: "",
        targetStatus: "On going",
        weight: 0,
    });
    const [optionTarget, setOptionTarget] = useState([
        {
            value: "",
            label: "",
        },
    ]);
    const [filterTarget, setFilterTarget] = useState("all");

    const { listRef } = useContext(TourGuidContext);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleAddTarget();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (key: string) => {
        setFilterTarget(key);
    };

    const handleGetListKpi = () => {
        const listKpi = getListKpi();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const listOptionTarget = listKpi.map((item: any) => ({
            value: item.targetId,
            label: item.targetName,
        }));

        listOptionTarget.unshift({ value: "all", label: "Tất cả" });

        setOptionTarget(listOptionTarget);

        if (filterTarget == "all") {
            setListKpi(listKpi);
        } else {
            const listTarget = listKpi.filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (kpi: any) => kpi.targetId === filterTarget
            );

            setListKpi(listTarget);
        }
    };

    const handleAddTarget = () => {
        const kpi = addTarget(targetModal);

        setTargetModal({
            targetName: "",
            targetDes: "",
            targetStatus: "On going",
            weight: 0,
        });

        setListKpi((prev: unknown) => [...prev, kpi]);
    };

    useEffect(() => {
        handleGetListKpi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterTarget]);

    return (
        <>
            <h2>Trang chủ</h2>
            <Breadcrumb style={{ margin: "16px 0" }} separator=">">
                <Breadcrumb.Item>KPIHub</Breadcrumb.Item>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            </Breadcrumb>

            <h3>Vừa xem</h3>

            <Flex
                style={{ margin: "20px 0", width: "100%" }}
                gap={20}
                align="flex-end"
                justify="space-between"
            >
                {listKpi.length > 0 ? (
                    listKpi.slice(0, 3).map((target) => (
                        <Card
                            key={target.targetId}
                            title={target.targetName}
                            bordered={false}
                            style={{ width: 400 }}
                        >
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            defaultBg: "#F1F0FD",
                                            lineWidth: 0,
                                        },
                                    },
                                }}
                            >
                                <Button
                                    type="default"
                                    icon={<PlusOutlined />}
                                    size="middle"
                                >
                                    Chỉnh sửa
                                </Button>
                            </ConfigProvider>
                        </Card>
                    ))
                ) : (
                    <p>Không có dữ liệu</p>
                )}
            </Flex>

            <h3>Danh sách KPI</h3>

            <Flex
                style={{ marginTop: 20 }}
                align="flex-end"
                justify="space-between"
            >
                <Flex gap={8}>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm công việc"
                        size="large"
                        height={40}
                    />

                    <Select
                        defaultValue="Loại KPI"
                        style={{ width: 190 }}
                        style={{ height: "40px" }}
                        onChange={handleChange}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        options={optionTarget}
                    />
                </Flex>

                <Button
                    type="primary"
                    style={{ height: 40, backgroundColor: "#6F65E8" }}
                    onClick={showModal}
                    ref={listRef[0]}
                >
                    Thêm mục tiêu
                </Button>
            </Flex>

            {listKpi.length > 0 &&
                listKpi.map((target) => (
                    <Target target={target} updateListKpi={setListKpi} />
                ))}

            <Modal
                title="Thêm mục tiêu"
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
                <Flex vertical gap={8}>
                    <div>
                        <Typography.Title level={5}>
                            Tên mục tiêu
                        </Typography.Title>
                        <Input
                            value={targetModal.targetName}
                            onChange={(e) =>
                                setTargetModal((prev) => ({
                                    ...prev,
                                    targetName: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Typography.Title level={5}>Mô tả</Typography.Title>
                        <TextArea
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            value={targetModal.targetDes}
                            onChange={(e) =>
                                setTargetModal((prev) => ({
                                    ...prev,
                                    targetDes: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Typography.Title level={5}>
                            Trọng số (%)
                        </Typography.Title>
                        <Input
                            value={targetModal.weight}
                            onChange={(e) =>
                                setTargetModal((prev) => ({
                                    ...prev,
                                    weight: Number(e.target.value),
                                }))
                            }
                        />
                    </div>
                </Flex>
            </Modal>
        </>
    );
};
