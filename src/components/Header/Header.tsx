import {
    Avatar,
    Badge,
    Button,
    Divider,
    Flex,
    Image,
    Popover,
    Space,
} from "antd";
import {
    BellOutlined,
    UserOutlined,
    ClockCircleOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.png";
import { getProfile } from "../../services/auth";
import { TourGuidContext } from "../../providers/TourGuide";

export const Header = () => {
    const { setOpen } = useContext(TourGuidContext);
    const [profile, setProfile] = useState({
        userId: "",
        email: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        career: "",
        password: "",
    });

    const handleGetProfile = () => {
        const account = getProfile();

        setProfile(account);
    };

    useEffect(() => {
        handleGetProfile();
    }, []);

    const content = (
        <Flex vertical>
            <Link to="/plan">
                <p style={{ color: "black", fontSize: 16, maxWidth: 300 }}>
                    Bạn có 1 công việc trong mục tiêu{" "}
                    <span style={{ fontWeight: "bold" }}>Giảng dạy</span> cần
                    thực hiện
                </p>
            </Link>
            <Flex gap={4}>
                <span>
                    <ClockCircleOutlined />
                </span>
                <span>2024-17-05</span>
            </Flex>
        </Flex>
    );

    return (
        <div className="header__container">
            <div className="header__left">
                <Image src={logo} preview={false} />
            </div>

            <div className="header__right">
                <div className="header__right-notification">
                    <Space>
                        <Popover
                            placement="topRight"
                            title={"Nhấn vào đây để xem hướng dẫn sử dụng"}
                        >
                            <Avatar
                                icon={<QuestionCircleOutlined />}
                                onClick={() => setOpen(true)}
                            />
                        </Popover>

                        <Badge count={1}>
                            <Popover
                                placement="topRight"
                                title={"Thông báo"}
                                content={content}
                            >
                                <Avatar
                                    style={{
                                        backgroundColor: "#fde3cf",
                                        color: "#f56a00",
                                    }}
                                    icon={<BellOutlined />}
                                />
                            </Popover>
                        </Badge>

                        <Divider
                            type="vertical"
                            style={{
                                borderWidth: 1,
                                height: 50,
                                borderColor: "#C0BFBF",
                            }}
                        />
                    </Space>
                </div>

                <div className="header__right__account">
                    <div className="header__right__account__infor">
                        <Avatar icon={<UserOutlined />} />

                        <p style={{ fontWeight: "700", marginLeft: "10px" }}>
                            {profile?.lastname}
                        </p>
                    </div>

                    <div>
                        <p style={{ fontWeight: "600", color: "#C0BFBF" }}>
                            {profile?.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
