import {
    Button,
    Collapse,
    ConfigProvider,
    Flex,
    Input,
    Modal,
    Popover,
    Slider,
    Space,
    Tag,
    Typography,
} from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Criteria } from "./Criteria";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { addCriteria, deleteTargetById } from "../../services/kpi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Target = ({ target, updateListKpi }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const [criteriaModal, setCriteriaModal] = useState({
        criteriaName: "",
        criteriaDes: "",
        criteriaStatus: "On going",
        weight: 0,
        unit: "",
        objective: "",
        criteriaProgress: 0,
    });
    // dùng để edit target
    const [targetModal, setTargetModal] = useState({
        targetName: "",
        targetDes: "",
        targetStatus: "On going",
        weight: 0,
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleAddCriteria();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // edit target
    const showModal2 = () => {
        setTargetModal(target);
        setIsModalOpen2(true);
    };

    const handleOk2 = () => {
        setIsModalOpen2(false);
    };

    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const handleAddCriteria = () => {
        const criteria = addCriteria(target?.targetId, criteriaModal);

        setCriteriaModal({
            criteriaName: "",
            criteriaDes: "",
            criteriaStatus: "On going",
            weight: 0,
            unit: "",
            objective: "",
            criteriaProgress: 0,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateListKpi((prev: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return prev.map((kpi: any) => {
                if (kpi.targetId == target.targetId) {
                    if (kpi.criterias) {
                        return {
                            ...kpi,
                            criterias: [...kpi.criterias, criteria],
                        };
                    }

                    return {
                        ...kpi,
                        criterias: [criteria],
                    };
                }

                return kpi;
            });
        });
    };

    // const handleEditTarget = () => {};

    const handleDeleteTargetById = () => {
        console.log(target?.targetId);
        const newListKpi = deleteTargetById(target?.targetId);

        updateListKpi(newListKpi);
    };

    const content = (
        <Flex vertical gap={4}>
            <Button onClick={showModal2}>
                <EditOutlined />
            </Button>

            <Button>
                <DeleteOutlined onClick={() => handleDeleteTargetById()} />
            </Button>
        </Flex>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const genExtra = (target: any) => (
        <Flex
            key={target?.targetId}
            onClick={(event) => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
            style={{ color: "#FFFF", paddingRight: 13 }}
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
                    style={{
                        width:
                            target?.criterias?.reduce((accu, item) => {
                                return (accu +=
                                    (item.criteriaProgress / item.objective) *
                                    item?.weight);
                            }, 0) < 100
                                ? 180
                                : 173,
                        height: "100%",
                    }}
                    defaultValue={target?.criterias?.reduce((accu, item) => {
                        return (accu +=
                            (item.criteriaProgress / item.objective) *
                            item?.weight);
                    }, 0)}
                    value={target?.criterias?.reduce((accu, item) => {
                        return (accu +=
                            (item.criteriaProgress / item.objective) *
                            item?.weight);
                    }, 0)}
                    styles={{
                        track: {
                            background: "transparent",
                        },
                        tracks: {
                            background:
                                target?.criterias?.reduce((accu, item) => {
                                    console.log(accu);
                                    return (accu +=
                                        (item.criteriaProgress /
                                            item.objective) *
                                        item?.weight);
                                }, 0) < 100
                                    ? "#FFD800"
                                    : "#5EDD46",
                        },
                    }}
                />

                <p style={{ color: "#FFFF" }}>
                    {target?.criterias?.reduce((accu, item) => {
                        console.log(accu);
                        return (accu +=
                            (item.criteriaProgress / item.objective) *
                            item?.weight);
                    }, 0)}
                    %
                </p>
            </Flex>

            <Tag
                style={{
                    width: 74,
                    textAlign: "center",
                    borderRadius: 10,
                    marginRight: 14,
                }}
                color={
                    target?.criterias?.reduce((accu, item) => {
                        console.log(accu);
                        return (accu +=
                            (item.criteriaProgress / item.objective) *
                            item?.weight);
                    }, 0) < 100
                        ? "#FFD800"
                        : "#5EDD46"
                }
            >
                {target?.criterias?.reduce((accu, item) => {
                    return (accu +=
                        (item.criteriaProgress / item.objective) *
                        item?.weight);
                }, 0) < 100
                    ? "On Going"
                    : "Done"}
            </Tag>

            <Popover content={content} trigger="click">
                <MoreOutlined />
            </Popover>
        </Flex>
    );

    return (
        <Flex
            id={`target-${target?.targetId}`}
            vertical
            style={{ marginTop: 20 }}
        >
            <ConfigProvider
                theme={{
                    components: {
                        Collapse: {
                            headerBg: "#6F65E8",
                        },
                    },
                    token: {
                        colorTextHeading: "#FFFF",
                    },
                }}
            >
                <Space direction="vertical">
                    <Collapse
                        collapsible="header"
                        defaultActiveKey={["1"]}
                        items={[
                            {
                                key: `${target?.targetId}`,
                                label: `${target?.targetName}`,
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
                                            + Thêm tiêu chí
                                        </Button>

                                        {target?.criterias &&
                                            target?.criterias.map(
                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                (criteria: any) => (
                                                    <Criteria
                                                        targetId={
                                                            target.targetId
                                                        }
                                                        criteria={criteria}
                                                        updateListKpi={
                                                            updateListKpi
                                                        }
                                                    />
                                                )
                                            )}
                                    </Flex>
                                ),
                                extra: genExtra(target),
                            },
                        ]}
                        style={{ color: "#FFFF" }}
                    />
                </Space>
            </ConfigProvider>

            <Modal
                title="Thêm tiêu chí"
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
        </Flex>
    );
};
