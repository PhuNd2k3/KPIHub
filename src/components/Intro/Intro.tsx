import { Button, Flex, Image } from "antd";

import logo from "../../assets/logo_intro.png";
import { Link } from "react-router-dom";

export const Intro = () => {
    return (
        <>
            <Flex
                style={{
                    width: "50%",
                    color: "#FFFF",
                    paddingLeft: 80,
                    paddingTop: 40,
                }}
            >
                <Image src={logo} preview={false} />
            </Flex>
            <Flex
                style={{
                    width: "50%",
                    color: "#FFFF",
                    paddingLeft: 80,
                    position: "absolute",
                    bottom: 60,
                }}
                vertical
            >
                <Flex
                    vertical
                    style={{
                        marginBottom: 40,
                        fontSize: 70,
                        fontWeight: "bold",
                    }}
                >
                    <p style={{ marginBottom: 10 }}>MAKE YOUR</p>
                    <p>LIFE EASIER</p>
                </Flex>

                <Flex
                    vertical
                    style={{ marginBottom: 40, fontStyle: "italic" }}
                >
                    <p style={{ marginBottom: 10 }}>
                        Chào mừng bạn đến với KPIHub
                    </p>
                    <p>Nơi tuyệt vời để bắt đầu một hành trình mới.</p>
                </Flex>

                <Flex gap={5} style={{ color: "#FFFF" }}>
                    <Button
                        style={{
                            background: "#6F65E8",
                            border: "none",
                            fontWeight: 500,
                            borderRadius: 10,
                        }}
                    >
                        <Link to="/signup">Đăng ký ngay</Link>
                    </Button>
                    <Button
                        style={{
                            background: "#6F65E8",
                            border: "none",
                            fontWeight: 500,
                            borderRadius: 10,
                        }}
                    >
                        <Link to="/login">Đăng nhập</Link>
                    </Button>
                    <Button
                        style={{
                            background: "none",
                            color: "#FFFF",
                            fontWeight: 500,
                            borderRadius: 10,
                        }}
                    >
                        Tìm hiểu thêm
                    </Button>
                </Flex>
            </Flex>
        </>
    );
};
