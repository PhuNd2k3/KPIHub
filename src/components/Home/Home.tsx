import React, { useState, useEffect, useContext } from "react";
import {
    Breadcrumb,
    Button,
    Card,
    ConfigProvider,
    Flex,
    Input,
    Modal,
    Popover,
    Select,
    Typography,
} from "antd";
import {
    PlusOutlined,
    SearchOutlined,
    FileExcelOutlined,
} from "@ant-design/icons";

import { Target } from "../Target";
import { getListKpi, addTarget } from "../../services/kpi";
import { TourGuidContext } from "../../providers/TourGuide";
import { Import } from "../Import";
import Export from "../Export/Export";
import { storeDataInDb } from "../../services/localStorage";

const { TextArea } = Input;

export const Home: React.FC = () => {
    const [listKpi, setListKpi] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);

    const [targetModal, setTargetModal] = useState({
        targetName: "",
        targetDes: "",
        targetStatus: "On going",
        weight: 0,
    });
    // dùng để edit target
    const [targetEdit, setTargetEdit] = useState({
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

    // edit target
    const showModal2 = (target) => {
        setTargetEdit(target);
        setIsModalOpen2(true);
    };

    const handleOk2 = () => {
        setIsModalOpen2(false);
    };

    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    // reset target
    const showModal3 = () => {
        setIsModalOpen3(true);
    };

    const handleOk3 = () => {
        handleResetKpi();
        setIsModalOpen3(false);
    };

    const handleCancel3 = () => {
        setIsModalOpen3(false);
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

    const handleClickScroll = (id: string) => {
        const element = document.getElementById(`target-${id}`);
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    };

    const content = (
        <Flex vertical gap={4}>
            <Export />

            <Import updateListKpi={setListKpi} />
        </Flex>
    );

    const handleResetKpi = () => {
        storeDataInDb("listKpi", []);

        setListKpi([]);
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
                // justify="space-between"
            >
                {listKpi.length > 0 ? (
                    listKpi.slice(0, 3).map((target) => (
                        <Card
                            key={target.targetId}
                            title={target.targetName}
                            bordered={false}
                            style={{ width: 400 }}
                            onClick={() => handleClickScroll(target?.targetId)}
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
                                    onClick={() => showModal2(target)}
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
                        style={{ width: 190, height: "40px" }}
                        onChange={handleChange}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        options={optionTarget}
                    />
                </Flex>

                <Flex gap={8}>
                    {listKpi.length > 0 ? (
                        <Button
                            danger
                            style={{ height: 40 }}
                            onClick={() => showModal3()}
                        >
                            Xoá toàn bộ
                        </Button>
                    ) : (
                        ""
                    )}
                    <Popover content={content} trigger="click">
                        <Button
                            icon={
                                <FileExcelOutlined
                                    ref={listRef[1]}
                                    style={{ color: "#6F65E8" }}
                                />
                            }
                            style={{
                                height: 40,
                            }}
                        ></Button>
                    </Popover>

                    <Button
                        type="primary"
                        style={{ height: 40, backgroundColor: "#6F65E8" }}
                        onClick={showModal}
                        ref={listRef[0]}
                    >
                        Thêm mục tiêu
                    </Button>
                </Flex>
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

                    <Button
                        style={{ backgroundColor: "#6F65E8", color: "#FFFF" }}
                        onClick={handleOk}
                    >
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

            <Modal
                title="Chỉnh sửa mục tiêu"
                open={isModalOpen2}
                onOk={handleOk2}
                onCancel={handleCancel2}
                footer={[
                    <Button onClick={handleCancel2}>Hủy</Button>,

                    <Button
                        style={{ backgroundColor: "#6F65E8", color: "#FFFF" }}
                        onClick={handleOk2}
                    >
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
                            value={targetEdit.targetName}
                            onChange={(e) =>
                                setTargetEdit((prev) => ({
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
                            value={targetEdit.targetDes}
                            onChange={(e) =>
                                setTargetEdit((prev) => ({
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
                            value={targetEdit.weight}
                            onChange={(e) =>
                                setTargetEdit((prev) => ({
                                    ...prev,
                                    weight: Number(e.target.value),
                                }))
                            }
                        />
                    </div>
                </Flex>
            </Modal>

            <Modal
                title="Xóa danh sách mục tiêu"
                open={isModalOpen3}
                onOk={handleOk3}
                onCancel={handleCancel3}
                footer={[
                    <Button onClick={handleCancel3}>Hủy</Button>,

                    <Button
                        style={{ backgroundColor: "#6F65E8", color: "#FFFF" }}
                        onClick={handleOk3}
                    >
                        Có
                    </Button>,
                ]}
            >
                <p>Hành động này sẽ xóa danh sách mục tiêu của bạn</p>
            </Modal>
        </>
    );
};
