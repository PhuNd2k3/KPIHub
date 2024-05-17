import { Button, Flex, Image, Input, Typography } from "antd";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
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
                    <h2 style={{ color: "#6F65E8" }}>LẤY LẠI MẬT KHẨU</h2>
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

                    <Button
                        type="primary"
                        style={{ backgroundColor: "#6F65E8" }}
                    >
                        Gửi yêu cầu
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
