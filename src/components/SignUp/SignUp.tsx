import { Button, Flex, Image, Input, Typography } from "antd";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export const SignUp = () => {
    return (
        <Flex
            style={{
                width: "40%",
                height: "100%",
                backgroundColor: "#F4F6F8",
            }}
            vertical
        >
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
                    <h2 style={{ color: "#6F65E8" }}>ĐĂNG KÝ</h2>
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
                        // value={taskModal.taskName}
                        // onChange={(e) =>
                        //     setTaskModal((prev) => ({
                        //         ...prev,
                        //         taskName: e.target.value,
                        //     }))
                        // }
                        />
                    </div>

                    <div>
                        <Typography.Title level={5}>Mật khẩu</Typography.Title>
                        <Input
                        // value={taskModal.taskName}
                        // onChange={(e) =>
                        //     setTaskModal((prev) => ({
                        //         ...prev,
                        //         taskName: e.target.value,
                        //     }))
                        // }
                        />
                    </div>

                    <div>
                        <Typography.Title level={5}>Họ tên</Typography.Title>
                        <Input
                        // value={taskModal.taskName}
                        // onChange={(e) =>
                        //     setTaskModal((prev) => ({
                        //         ...prev,
                        //         taskName: e.target.value,
                        //     }))
                        // }
                        />
                    </div>

                    <div>
                        <Typography.Title level={5}>
                            Nghề nghiệp
                        </Typography.Title>
                        <Input
                        // value={taskModal.taskName}
                        // onChange={(e) =>
                        //     setTaskModal((prev) => ({
                        //         ...prev,
                        //         taskName: e.target.value,
                        //     }))
                        // }
                        />
                    </div>

                    <Flex
                        justify="space-between"
                        align="center"
                        style={{ marginTop: 10 }}
                    >
                        <Flex align="center" gap={4}>
                            <p style={{ fontSize: 12, color: "#C0BFBF" }}>
                                Đã có tài khoản?
                            </p>
                            <Link
                                to="/login"
                                style={{ color: "#130D59", fontWeight: 500 }}
                            >
                                Đăng nhập
                            </Link>
                        </Flex>
                    </Flex>

                    <Button
                        type="primary"
                        style={{ backgroundColor: "#6F65E8" }}
                    >
                        Đăng ký
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
