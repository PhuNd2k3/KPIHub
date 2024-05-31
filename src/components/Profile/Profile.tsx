import {
    Breadcrumb,
    Button,
    Flex,
    Input,
    Typography,
    notification,
} from "antd";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/auth";

import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];

export const Profile = () => {
    const [profile, setProfile] = useState({
        userId: "",
        email: "",
        firstname: "",
        lastname: "",
        username: "",
        phonenumber: "",
        career: "",
        password: "",
    });

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (placement: NotificationPlacement) => {
        api.success({
            message: "Thành công",
            description: "Bạn đã chỉnh sửa thông tin cá nhân thành công",
            placement,
        });
    };

    const handleSave = () => {
        updateProfile(profile);
        openNotificationWithIcon("topRight");
    };

    useEffect(() => {
        const p = getProfile();

        setProfile(p);
    }, []);

    return (
        <>
            {contextHolder}
            <h2>Thông tin cá nhân</h2>
            <Breadcrumb style={{ margin: "16px 0" }} separator=">">
                <Breadcrumb.Item>KPIHub</Breadcrumb.Item>
                <Breadcrumb.Item>Thông tin cá nhân</Breadcrumb.Item>
            </Breadcrumb>

            <Flex
                style={{
                    background: "#FFFF",
                    borderRadius: 8,
                    padding: 20,
                }}
                vertical
                gap={8}
            >
                <div>
                    <Typography.Title level={5}>Họ và tên</Typography.Title>
                    <Input
                        value={profile.username}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev,
                                username: e.target.value,
                            }))
                        }
                    />
                </div>

                <div>
                    <Typography.Title level={5}>Email</Typography.Title>
                    <Input
                        value={profile.email}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                    />
                </div>

                <div>
                    <Typography.Title level={5}>Số điện thoại</Typography.Title>
                    <Input
                        value={profile.phonenumber}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev,
                                phonenumber: e.target.value,
                            }))
                        }
                    />
                </div>

                <div>
                    <Typography.Title level={5}>Mật khẩu</Typography.Title>
                    <Input
                        type="password"
                        value={profile.password}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev,
                                taskName: e.target.value,
                            }))
                        }
                    />
                </div>

                <div>
                    <Typography.Title level={5}>Nghề nghiệp</Typography.Title>
                    <Input
                        value={profile.career}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev,
                                career: e.target.value,
                            }))
                        }
                    />
                </div>

                <Flex justify="end">
                    <Button type="primary" onClick={() => handleSave()}>
                        Lưu
                    </Button>
                </Flex>
            </Flex>
        </>
    );
};
