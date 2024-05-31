import {
    Breadcrumb,
    Calendar,
    Flex,
    Badge,
    Popover,
    Select,
    Row,
    Col,
    Button,
} from "antd";
import type { BadgeProps, CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import { EyeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";

const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
        case 30:
            listData = [
                { type: "success", content: "1 công việc" },
                { type: "warning", content: "0 công việc đến hạn" },
            ];
            break;

        case 31:
            listData = [{ type: "success", content: "" }];
            break;
        default:
    }
    return listData || [];
};

const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
        return 1394;
    }
};

const content = (
    <div>
        <p>Mục tiêu: Giảng dạy - 50%</p>
        <p>Tiêu chí: Lên lớp giảng dạy - 6/12 giờ</p>
        <p>Mô tả: Dạy UI/UX</p>
    </div>
);

export const Schedule = () => {
    const [displayTask, setDisplayTask] = useState(false);

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge
                            status={item.type as BadgeProps["status"]}
                            text={item.content}
                        />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
        if (info.type === "date") return dateCellRender(current);
        if (info.type === "month") return monthCellRender(current);
        return info.originNode;
    };

    return (
        <div>
            <h2>Lịch trình</h2>
            <Flex justify="space-between">
                <Breadcrumb style={{ margin: "16px 0" }} separator=">">
                    <Breadcrumb.Item>KPIHub</Breadcrumb.Item>
                    <Breadcrumb.Item>Lịch trình</Breadcrumb.Item>
                </Breadcrumb>

                <Button onClick={() => setDisplayTask(!displayTask)}>
                    {!displayTask ? <LeftOutlined /> : <RightOutlined />}
                </Button>
            </Flex>

            <Flex gap={10}>
                <Flex
                    style={{ background: "#FFFF", borderRadius: 10, flex: 1 }}
                >
                    <Calendar
                        style={{ background: "#FFFF", borderRadius: 10 }}
                        cellRender={cellRender}
                        headerRender={({
                            value,
                            type,
                            onChange,
                            onTypeChange,
                        }) => {
                            const start = 0;
                            const end = 12;
                            const monthOptions = [];

                            let current = value.clone();
                            const localeData = value.localeData();
                            const months = [];
                            for (let i = 0; i < 12; i++) {
                                current = current.month(i);
                                months.push(localeData.monthsShort(current));
                            }

                            for (let i = start; i < end; i++) {
                                monthOptions.push(
                                    <Select.Option
                                        key={i}
                                        value={i}
                                        className="month-item"
                                    >
                                        {months[i]}
                                    </Select.Option>
                                );
                            }

                            const year = value.year();
                            const month = value.month();
                            const options = [];
                            for (let i = year - 10; i < year + 10; i += 1) {
                                options.push(
                                    <Select.Option
                                        key={i}
                                        value={i}
                                        className="year-item"
                                    >
                                        {i}
                                    </Select.Option>
                                );
                            }
                            return (
                                <Flex style={{ padding: 8 }} justify="flex-end">
                                    <Row gutter={8}>
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                className="my-year-select"
                                                value={year}
                                                onChange={(newYear) => {
                                                    const now = value
                                                        .clone()
                                                        .year(newYear);
                                                    onChange(now);
                                                }}
                                            >
                                                {options}
                                            </Select>
                                        </Col>
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                value={month}
                                                onChange={(newMonth) => {
                                                    const now = value
                                                        .clone()
                                                        .month(newMonth);
                                                    onChange(now);
                                                }}
                                            >
                                                {monthOptions}
                                            </Select>
                                        </Col>
                                    </Row>
                                </Flex>
                            );
                        }}
                    />
                </Flex>

                <Flex
                    style={{
                        background: "#FFFF",
                        borderRadius: 10,
                        padding: 10,
                        width: "30%",
                        display: displayTask ? "flex" : "none",
                    }}
                    vertical
                >
                    <h3 style={{ paddingLeft: 10 }}>
                        Danh sách công việc hôm nay
                    </h3>
                    <Flex
                        vertical
                        style={{
                            background: "#E2E0FA",
                            padding: "5px 10px 10px 10px",
                            borderRadius: 5,
                            fontWeight: 500,
                            marginTop: 20,
                        }}
                    >
                        <Flex style={{ width: "100%" }} gap={4} align="start">
                            <p style={{ flex: 1 }}>Lên lớp 1234</p>
                            <Popover
                                placement="leftTop"
                                title={"Chi tiết công việc"}
                                content={content}
                                style={{
                                    justifySelf: "flex-end",
                                }}
                            >
                                <EyeOutlined />
                            </Popover>
                        </Flex>

                        <p>Tiến độ: 6/10 giờ</p>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
};
