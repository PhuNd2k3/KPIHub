import {
    AreaChartOutlined,
    FileOutlined,
    HomeOutlined,
    // TeamOutlined,
    ScheduleOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { TourGuidContext } from "../../providers/TourGuide";

const { Sider } = Layout;

const items = [
    {
        key: "home",
        icon: <HomeOutlined />,
        label: "Trang chủ ",
        link: "/",
    },
    {
        key: "dashboard",
        icon: <AreaChartOutlined />,
        label: "KPI hiện tại ",
        link: "/kpi_present",
    },
    {
        key: "schedule",
        icon: <ScheduleOutlined />,
        label: "Lịch trình",
        link: "/schedule",
    },
    {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Đăng xuất",
        link: "/login",
    },
];

export const Navbar = () => {
    const { listRef } = useContext(TourGuidContext);

    return (
        <Sider width="100%">
            <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
                {items.map((item) => (
                    <Menu.Item
                        style={{ color: "#B0B0B0", fontWeight: 600 }}
                        key={item.key}
                        icon={item.icon}
                    >
                        <Link
                            to={item.link}
                            ref={
                                item.key === "dashboard"
                                    ? listRef[2]
                                    : item.key === "schedule"
                                      ? listRef[3]
                                      : null
                            }
                        >
                            {item.label}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};
