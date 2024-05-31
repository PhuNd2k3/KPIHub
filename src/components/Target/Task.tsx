import {
    Button,
    DatePicker,
    Flex,
    Input,
    Modal,
    Popover,
    Slider,
    Tag,
    Typography,
    notification,
} from "antd";
import {
    MoreOutlined,
    SnippetsOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];

import { updateProgressTask } from "../../services/kpi";

const dateFormat = "YYYY/MM/DD";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Task = ({ targetId, criteriaId, task, updateListKpi }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [newCriteriaProgress, setNewCriteriaProgress] = useState("");

    const [api, contextHolder] = notification.useNotification();

    const showModal = () => {
        setTaskModal(task);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
    };

    const showModal3 = () => {
        setIsModalOpen3(true);
    };

    const handleOk3 = () => {
        handleChangeProgress();
        setIsModalOpen3(false);
    };

    const handleCancel3 = () => {
        setIsModalOpen3(false);
    };

    const handleChangeProgress = () => {
        const listKpi = updateProgressTask(
            targetId,
            criteriaId,
            task.taskId,
            newCriteriaProgress
        );

        if (newCriteriaProgress >= task?.objective) handleSendNoti("topRight");

        updateListKpi([...listKpi]);
    };

    const handleSendNoti = (placement: NotificationPlacement) => {
        // send noti when done task (100%);
        //  if (newCriteriaProgress / )
        api.success({
            message: `Chúc mừng`,
            description:
                "Chúc mừng bạn đã hoàn thành nhiệm vụ " + task?.taskName,
            placement,
        });
    };

    const content = (
        <Flex vertical gap={4}>
            <Button onClick={showModal}>
                <EditOutlined />
            </Button>

            <Button>
                <DeleteOutlined />
            </Button>
        </Flex>
    );

    const handleCalDeadline = () => {
        const endDate = new Date(task?.endDate);

        const today = new Date();

        const timeDiff = endDate.getTime() - today.getTime();
        const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysUntil > 1) {
            return "Còn " + daysUntil + " ngày";
        } else if (daysUntil < 1) {
            return "Đã quá hạn " + Math.abs(daysUntil) + " ngày";
        } else {
            return "Cần hoàn thành trong hôm nay";
        }
    };

    const content2 = (
        <Flex vertical gap={4}>
            <p>{handleCalDeadline()}</p>
        </Flex>
    );

    return (
        <>
            {" "}
            {contextHolder}
            <Popover content={content2}>
                <Flex
                    justify="space-between"
                    align="center"
                    style={{
                        background: "#F4F6F8",
                        height: 40,
                        borderRadius: 8,
                        padding: "0 10px",
                    }}
                    key={task?.taskId}
                >
                    <Flex gap={10}>
                        <SnippetsOutlined />
                        <p>{task?.taskName}</p>
                    </Flex>

                    <Flex
                        onClick={(event) => {
                            // If you don't want click extra trigger collapse, you can prevent this:
                            event.stopPropagation();
                        }}
                        style={{
                            color: "#FFFF",
                        }}
                        gap={6}
                        align="center"
                    >
                        <Flex
                            align="center"
                            gap={10}
                            style={{
                                height: "100%",
                                color: "black",
                            }}
                        >
                            <Slider
                                style={{
                                    width: 180,
                                    height: "100%",
                                }}
                                defaultValue={task?.taskProgress}
                                value={Math.ceil(
                                    (task?.taskProgress / task.objective) * 100
                                )}
                                styles={{
                                    track: {
                                        background: "transparent",
                                    },
                                    tracks: {
                                        background: "#FFD800",
                                    },
                                }}
                                onChangeComplete={showModal3}
                            />

                            <p>
                                {Math.ceil(
                                    (task?.taskProgress / task.objective) * 100
                                )}
                                %
                            </p>
                        </Flex>

                        <Tag
                            style={{
                                borderRadius: 10,
                            }}
                            color="#87d068"
                        >
                            {task?.taskStatus}
                        </Tag>

                        <Popover content={content} trigger="click">
                            <MoreOutlined
                                style={{
                                    color: "black",
                                }}
                            />
                        </Popover>
                    </Flex>

                    <Modal
                        title="Chỉnh sửa công việc"
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
                                <Typography.Title level={5}>
                                    Mô tả
                                </Typography.Title>
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

                            <Flex gap={6}>
                                <div style={{ flex: 1 }}>
                                    <Typography.Title level={5}>
                                        Tên tiêu chí
                                    </Typography.Title>
                                    <Input
                                        value={taskModal.objective}
                                        onChange={(e) =>
                                            setTaskModal((prev) => ({
                                                ...prev,
                                                objective: Number(
                                                    e.target.value
                                                ),
                                            }))
                                        }
                                    />
                                </div>

                                <div>
                                    <Typography.Title level={5}>
                                        Đơn vị
                                    </Typography.Title>
                                    <Input
                                        value={taskModal.unit}
                                        onChange={(e) =>
                                            setTaskModal((prev) => ({
                                                ...prev,
                                                unit: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </Flex>

                            <Flex gap={6}>
                                <div>
                                    <Typography.Title level={5}>
                                        Ngày bắt đầu
                                    </Typography.Title>
                                    <DatePicker
                                        // value={taskModal?.startDate}
                                        defaultValue={dayjs(
                                            taskModal?.startDate,
                                            dateFormat
                                        )}
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
                                        // value={taskModal?.endDate}
                                        defaultValue={dayjs(
                                            taskModal?.endDate,
                                            dateFormat
                                        )}
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
                        title="Cập nhật tiến độ"
                        open={isModalOpen3}
                        onOk={handleOk3}
                        onCancel={handleCancel3}
                        footer={[
                            <Button onClick={handleCancel3}>Hủy</Button>,

                            <Button type="primary" onClick={handleOk3}>
                                Lưu
                            </Button>,
                        ]}
                    >
                        <Flex gap={10}>
                            <div>
                                <Typography.Title level={5}>
                                    Tiến độ hiện tại
                                </Typography.Title>
                                <Input
                                    value={newCriteriaProgress}
                                    onChange={(e) =>
                                        setNewCriteriaProgress(e.target.value)
                                    }
                                />
                            </div>

                            <Flex vertical justify="center">
                                <Typography.Title level={5}>
                                    Chỉ tiêu
                                </Typography.Title>
                                <span style={{ fontWeight: "bold" }}>
                                    / {task?.objective} {task.unit}
                                </span>
                            </Flex>
                        </Flex>
                    </Modal>
                </Flex>
            </Popover>
        </>
    );
};
