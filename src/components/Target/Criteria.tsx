import {
    Button,
    Collapse,
    ConfigProvider,
    Flex,
    Input,
    Modal,
    Popover,
    Slider,
    Tag,
    Typography,
    DatePicker,
} from "antd";
import {
    MoreOutlined,
    TagOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import { Task } from "./Task";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { addTask } from "../../services/kpi";
import { getDataFromDb } from "../../services/localStorage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Criteria = ({ targetId, criteria, updateListKpi }) => {
    console.log("Criteria...");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [taskModal, setTaskModal] = useState({
        taskName: "",
        taskDes: "",
        taskStatus: "On going",
        unit: "",
        taskProgress: 0,
        objective: 0,
        startDate: "",
        endDate: "",
    });
    // edit criteria
    const [criteriaModal, setCriteriaModal] = useState({
        criteriaName: "",
        criteriaDes: "",
        criteriaStatus: "On going",
        weight: 0,
        unit: "",
        objective: "",
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleAddTask();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // modal chinh sua Criteria
    const showModal2 = () => {
        setCriteriaModal(criteria);
        setIsModalOpen2(true);
    };

    const handleOk2 = () => {
        setIsModalOpen2(false);
    };

    const handleCancel2 = () => {
        setIsModalOpen2(false);
        setCriteriaModal({
            criteriaName: "",
            criteriaDes: "",
            criteriaStatus: "On going",
            weight: 0,
            unit: "",
            objective: "",
        });
    };

    const handleAddTask = () => {
        taskModal.unit = criteria.unit;

        const task = addTask(targetId, criteria.criteriaId, taskModal);

        setTaskModal({
            taskName: "",
            taskDes: "",
            taskStatus: "On going",
            unit: "",
            taskProgress: 0,
            objective: 0,
            startDate: "",
            endDate: "",
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const listKpi = getDataFromDb("listKpi")
            ? getDataFromDb("listKpi")
            : [];
        updateListKpi(listKpi);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const genExtra2 = (criteria: any) => (
        <Flex
            onClick={(event) => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
            style={{ color: "#FFFF" }}
            gap={6}
            align="center"
        >
            <Flex
                align="center"
                gap={10}
                style={{ height: "100%", color: "black" }}
            >
                <Slider
                    disabled
                    style={{ width: 180, height: "100%" }}
                    defaultValue={Math.ceil(
                        (criteria?.criteriaProgress / criteria?.objective) * 100
                    )}
                    value={Math.ceil(
                        (criteria?.criteriaProgress / criteria?.objective) * 100
                    )}
                    styles={{
                        track: {
                            background: "transparent",
                        },
                        tracks: {
                            background: "#6F65E8",
                        },
                    }}
                />

                <p>
                    {Math.ceil(
                        (criteria?.criteriaProgress / criteria?.objective) * 100
                    )}
                    %
                </p>
            </Flex>

            <Tag style={{ borderRadius: 10 }} color="#87d068">
                {criteria?.criteriaStatus}
            </Tag>

            <Popover content={content} trigger="click">
                <MoreOutlined style={{ color: "black" }} />
            </Popover>
        </Flex>
    );

    const content = (
        <Flex vertical gap={4}>
            <Button onClick={showModal2}>
                <EditOutlined />
            </Button>

            <Button>
                <DeleteOutlined />
            </Button>
        </Flex>
    );

    return (
        <ConfigProvider
            theme={{
                components: {
                    Collapse: {
                        headerBg: "#F4F6F8",
                    },
                },
                token: {
                    colorTextHeading: "black",
                },
            }}
        >
            <Collapse
                collapsible="header"
                defaultActiveKey={["1"]}
                items={[
                    {
                        key: `${criteria?.criteriaId}`,
                        label: `${criteria?.criteriaName}`,
                        children: (
                            <Flex vertical gap={10}>
                                <Button
                                    size="small"
                                    style={{
                                        width: 120,
                                        background: "#F1F0FD",
                                    }}
                                    onClick={showModal}
                                >
                                    + Thêm công việc
                                </Button>

                                {criteria?.tasks &&
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    criteria?.tasks.map((task: any) => (
                                        <Task
                                            task={task}
                                            targetId={targetId}
                                            criteriaId={criteria.criteriaId}
                                            updateListKpi={updateListKpi}
                                        />
                                    ))}
                            </Flex>
                        ),
                        extra: genExtra2(criteria),
                    },
                ]}
                expandIconPosition={"start"}
                style={{ color: "#FFFF" }}
                expandIcon={({ isActive }) => (
                    <TagOutlined rotate={isActive ? 90 : 0} />
                )}
            />

            <Modal
                title="Thêm công việc"
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
                            Tên công việc
                        </Typography.Title>
                        <Input
                            value={taskModal.taskName}
                            onChange={(e) =>
                                setTaskModal((prev) => ({
                                    ...prev,
                                    taskName: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Typography.Title level={5}>Mô tả</Typography.Title>
                        <TextArea
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            value={taskModal.taskDes}
                            onChange={(e) =>
                                setTaskModal((prev) => ({
                                    ...prev,
                                    taskDes: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div style={{ flex: 1 }}>
                        <Typography.Title level={5}>Chỉ tiêu</Typography.Title>
                        <Input
                            value={taskModal.objective}
                            onChange={(e) =>
                                setTaskModal((prev) => ({
                                    ...prev,
                                    objective: Number(e.target.value),
                                }))
                            }
                        />
                    </div>

                    <Flex gap={6}>
                        <div>
                            <Typography.Title level={5}>
                                Ngày bắt đầu
                            </Typography.Title>
                            <DatePicker
                                value={taskModal?.startDate}
                                onChange={(dateString) => {
                                    setTaskModal((prev) => ({
                                        ...prev,
                                        startDate: dateString,
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <Typography.Title level={5}>
                                Ngày kết thúc
                            </Typography.Title>
                            <DatePicker
                                value={taskModal?.endDate}
                                onChange={(dateString) => {
                                    setTaskModal((prev) => ({
                                        ...prev,
                                        endDate: dateString,
                                    }));
                                }}
                            />
                        </div>
                    </Flex>
                </Flex>
            </Modal>

            <Modal
                title="Chỉnh sửa tiêu chí"
                open={isModalOpen2}
                onOk={handleOk2}
                onCancel={handleCancel2}
                footer={[
                    <Button onClick={handleCancel2}>Hủy</Button>,

                    <Button type="primary" onClick={handleOk2}>
                        Lưu
                    </Button>,
                ]}
            >
                <Flex vertical gap={8}>
                    <div>
                        <Typography.Title level={5}>
                            Tên tiêu chí
                        </Typography.Title>
                        <Input
                            value={criteriaModal.criteriaName}
                            onChange={(e) =>
                                setCriteriaModal((prev) => ({
                                    ...prev,
                                    criteriaName: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Typography.Title level={5}>Mô tả</Typography.Title>
                        <TextArea
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            value={criteriaModal.criteriaDes}
                            onChange={(e) =>
                                setCriteriaModal((prev) => ({
                                    ...prev,
                                    criteriaDes: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <Flex gap={6}>
                        <div style={{ flex: 1 }}>
                            <Typography.Title level={5}>
                                Chỉ tiêu
                            </Typography.Title>
                            <Input
                                value={criteriaModal.objective}
                                onChange={(e) =>
                                    setCriteriaModal((prev) => ({
                                        ...prev,
                                        objective: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div>
                            <Typography.Title level={5}>
                                Đơn vị
                            </Typography.Title>
                            <Input
                                value={criteriaModal.unit}
                                onChange={(e) =>
                                    setCriteriaModal((prev) => ({
                                        ...prev,
                                        unit: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </Flex>

                    <div>
                        <Typography.Title level={5}>
                            Trọng số (%)
                        </Typography.Title>
                        <Input
                            value={criteriaModal.weight}
                            onChange={(e) =>
                                setCriteriaModal((prev) => ({
                                    ...prev,
                                    weight: Number(e.target.value),
                                }))
                            }
                        />
                    </div>
                </Flex>
            </Modal>
        </ConfigProvider>
    );
};
