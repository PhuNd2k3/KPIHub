import { Button, Flex, Image, Input, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { login } from "../../services/auth";
import { useState } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

export const Login = () => {
    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });

    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const openNotificationWithIcon = (
        type: NotificationType,
        message: string
    ) => {
        api[type]({
            message: message,
        });
    };

    const handleLogin = () => {
        if (!payload.email || !payload.password) {
            return openNotificationWithIcon(
                "warning",
                "Hãy điền đầy đủ thông tin"
            );
        }

        const data = login(payload);

        const type: NotificationType =
            data.statusCode === 200 ? "success" : "error";

        openNotificationWithIcon(type, data.message);

        if (data.statusCode == 200) return navigate("/");
    };

    return (
        <Flex
            style={{
                width: "40%",
                height: "100%",
                backgroundColor: "#F4F6F8",
            }}
            vertical
        >
            {contextHolder}
            <Flex
                style={{
                    width: "100%",
                    color: "#FFFF",
                    paddingLeft: 80,
                    paddingTop: 40,
                }}
            >
                <Link to="/intro">
                    <Image src={logo} preview={false} />
                </Link>
            </Flex>
            <Flex
                style={{
                    width: "100%",
                    paddingLeft: 80,
                    marginTop: 40,
                    color: "#130D59",
                }}
                vertical
            >
                <Flex vertical>
                    <h2 style={{ color: "#6F65E8" }}>ĐĂNG NHẬP</h2>
                    <p>Hello! Welcome back!</p>
                </Flex>

                <Flex
                    vertical
                    gap={8}
                    style={{ paddingRight: 40, marginTop: 40 }}
                >
                    <div>
                        <Typography.Title level={5}>
                            Email / Số điện thoại
                        </Typography.Title>
                        <Input
                            value={payload.email}
                            onChange={(e) =>
                                setPayload((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Typography.Title level={5}>Mật khẩu</Typography.Title>
                        <Input
                            type="password"
                            value={payload.password}
                            onChange={(e) =>
                                setPayload((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <Flex
                        justify="space-between"
                        align="center"
                        style={{ marginTop: 10 }}
                    >
                        <Flex align="center" gap={4}>
                            <p style={{ fontSize: 12, color: "#C0BFBF" }}>
                                Đã có tài khoản chưa?
                            </p>
                            <Link
                                to="/signup"
                                style={{ color: "#130D59", fontWeight: 500 }}
                            >
                                Đăng ký
                            </Link>
                        </Flex>

                        <Link to="/forgot_password">
                            <p style={{ fontSize: 12, color: "#C0BFBF" }}>
                                Quên mật khẩu?
                            </p>
                        </Link>
                    </Flex>

                    <Button
                        type="primary"
                        style={{ backgroundColor: "#6F65E8" }}
                        onClick={() => handleLogin()}
                    >
                        Đăng nhập
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
