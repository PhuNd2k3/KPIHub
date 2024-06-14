import { Breadcrumb, Card, Flex, Select, Statistic, theme } from "antd";
import { Outlet } from "react-router-dom";
import {
    // ArrowDownOutlined,
    ArrowUpOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";

import { PieChart, DualChart } from "../Chart";
import { getListKpi } from "../../services/kpi";
import { TourGuidContext } from "../../providers/TourGuide";

export const PresentKPI = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [listKpi, setListKpi] = useState([]);

    const handleGetListKpi = () => {
        const listKpi = getListKpi();

        setListKpi(listKpi);
    };

    useEffect(() => {
        handleGetListKpi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const { listRefPresent } = useContext(TourGuidContext);

    return (
        <>
            <Flex align="flex-end" justify="space-between">
                <Flex vertical>
                    <h2>KPI hiện tại</h2>
                    <Breadcrumb style={{ margin: "16px 0" }} separator=">">
                        <Breadcrumb.Item>KPIHub</Breadcrumb.Item>
                        <Breadcrumb.Item>KPI hiện tại</Breadcrumb.Item>
                    </Breadcrumb>
                </Flex>

                {/* <Select
                    defaultValue="Chọn chế độ xem"
                    style={{ width: 200 }}
                    onChange={handleChange}
                    options={[
                        {
                            options: [
                                { label: <span>Ngày</span>, value: "day" },
                                { label: <span>Tuần</span>, value: "week" },
                            ],
                        },
                    ]}
                /> */}
            </Flex>

            <Flex wrap gap="small" style={{ width: "100%", marginTop: 20 }}>
                <Flex
                    style={{ width: "50%%" }}
                    vertical
                    align="flex-end"
                    gap="small"
                >
                    <Card
                        style={{
                            width: "100%",
                            background: "#6F65E8",
                            color: "#FFFFFF",
                            height: 200,
                        }}
                    >
                        <h1>Xin chào, Mai Chi! </h1>
                        <h1>Chúc ngày mới tốt lành!</h1>
                        <span>Cùng xem qua số liệu của ngày hôm nay nhé</span>
                    </Card>

                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            width: "100%",
                        }}
                        ref={listRefPresent[0]}
                    >
                        <Outlet />
                    </div>
                </Flex>

                <Flex
                    vertical
                    style={{ flex: 1 }}
                    gap={8}
                    ref={listRefPresent[1]}
                >
                    <Flex style={{ width: "100%" }} gap={10}>
                        <Card
                            style={{
                                width: "50%",
                                height: 150,
                                borderRadius: 15,
                            }}
                        >
                            <h3>Tổng số công việc hôm nay</h3>
                            <Flex vertical style={{ marginTop: 10 }}>
                                <h2 style={{ color: "#130D59" }}>1</h2>
                                <p style={{ color: "#C0BFBF" }}>
                                    công việc của hôm nay
                                </p>
                            </Flex>
                        </Card>

                        <Card
                            style={{
                                width: "50%",
                                height: 150,
                                borderRadius: 15,
                            }}
                        >
                            <h3>Tiến độ KPI hôm nay</h3>
                            <Flex vertical style={{ marginTop: 10 }}>
                                <Flex align="center" gap={10}>
                                    <h2 style={{ color: "#130D59" }}>3.6%</h2>

                                    <Statistic
                                        value={10}
                                        // precision={1}
                                        valueStyle={{
                                            color: "#5EDD46",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                        }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix="%"
                                    />
                                </Flex>
                                <p style={{ color: "#C0BFBF" }}>
                                    so với hôm qua
                                </p>
                            </Flex>
                        </Card>
                    </Flex>

                    <Flex style={{ width: "100%" }} gap={10}>
                        <Card
                            style={{
                                width: "50%",
                                borderRadius: 15,
                            }}
                        >
                            <h3>KPI </h3>
                            <PieChart
                                data={[
                                    { type: "Đã hoàn thành", value: 80 },
                                    { type: "Chưa hoàn thành", value: 20 },
                                ]}
                            />
                        </Card>

                        <Card
                            style={{
                                width: "50%",
                                borderRadius: 15,
                            }}
                        >
                            <h3>Tỷ trọng các mục tiêu</h3>
                            <PieChart
                                data={[
                                    {
                                        type: "Nghiên cứu",
                                        value: 30,
                                    },
                                    {
                                        type: "Giảng dạy",
                                        value: 40,
                                    },
                                    {
                                        type: "Phục vụ",
                                        value: 30,
                                    },
                                ]}
                            />
                        </Card>
                    </Flex>

                    <Card
                        style={{
                            width: "100%",
                            borderRadius: 15,
                        }}
                    >
                        <h3 style={{ marginBottom: 20 }}>% KPI đạt được</h3>

                        <DualChart />
                    </Card>
                </Flex>
            </Flex>
        </>
    );
};
