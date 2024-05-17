import { Button, TourProps } from "antd";
import { createContext, useRef, useState } from "react";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";

export const TourGuidContext = createContext(null);

export const TourGuide = ({ children }: { children: React.ReactElement }) => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const [open, setOpen] = useState<boolean>(false);

    const listRef = [ref1, ref2, ref3];

    const steps: TourProps["steps"] = [
        {
            title: "Thêm mục tiêu",
            description:
                "Nhấn vào đây để thêm mục tiêu -> tạo các tiêu chí -> tạo công việc",
            target: () => ref1.current,
            nextButtonProps: {
                children: <DoubleRightOutlined />,
                style: {
                    backgroundColor: "#6F65E8",
                    borderRadius: "50%",
                    width: 30,
                    height: 32,
                },
            },
        },
        {
            title: "KPI hiện tại",
            description: "Nhấn vào đây để xem phân tích KPI của bạn",
            target: () => ref2.current,
            prevButtonProps: {
                children: <DoubleLeftOutlined />,
                style: {
                    backgroundColor: "#6F65E8",
                    color: "#ffff",
                    borderRadius: "50%",
                    width: 30,
                    height: 32,
                },
            },
            nextButtonProps: {
                children: <DoubleRightOutlined />,
                style: {
                    backgroundColor: "#6F65E8",
                    borderRadius: "50%",
                    width: 30,
                    height: 32,
                },
            },
        },
        {
            title: "Lịch trình",
            description:
                "Nhấn vào đây để xem chi tiết lịch trình công việc của bạn",
            target: () => ref3.current,
            prevButtonProps: {
                children: <DoubleLeftOutlined />,
                style: {
                    backgroundColor: "#6F65E8",
                    borderRadius: "50%",
                    color: "#ffff",
                    width: 30,
                    height: 32,
                },
            },
            nextButtonProps: {
                children: <DoubleRightOutlined />,
                style: {
                    backgroundColor: "#6F65E8",
                    borderRadius: "50%",
                    width: 30,
                    height: 32,
                },
            },
        },
    ];

    return (
        <TourGuidContext.Provider value={{ open, setOpen, steps, listRef }}>
            {children}
        </TourGuidContext.Provider>
    );
};
