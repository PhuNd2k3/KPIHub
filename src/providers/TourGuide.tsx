import { Button, TourProps } from "antd";
import { createContext, useRef, useState } from "react";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";

export const TourGuidContext = createContext(null);

const genRef = (countRef: number) => {
    const arr = new Array(countRef).fill(2);

    const arrRef = arr.map(() => useRef(null));

    return arrRef;
};

export const TourGuide = ({ children }: { children: React.ReactElement }) => {
    const [open, setOpen] = useState<boolean>(false);

    const listRef = genRef(4);

    const steps: TourProps["steps"] = [
        {
            title: "Thêm mục tiêu",
            description:
                "Nhấn vào đây để thêm mục tiêu -> tạo các tiêu chí -> tạo công việc",
            target: () => listRef[0].current,
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
            title: "Nhập/Xuất dữ liệu",
            description: "Nhấn vào đây để nhập/xuất kpi từ/ra file excel",
            target: () => listRef[1].current,
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
        {
            title: "KPI hiện tại",
            description: "Nhấn vào đây để xem phân tích KPI của bạn",
            target: () => listRef[2].current,
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
            target: () => listRef[3].current,
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

    const listRefPresent = genRef(2);
    const stepsPresent: TourProps["steps"] = [
        {
            title: "Mục tiêu",
            description:
                "Xem tiến độ và trọng số của mục tiêu tại đây. Nhấn vào tên mục tiêu để xem chi tiết các tiêu chí",
            target: () => listRefPresent[0].current,
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
            title: "Thống kê",
            description:
                "Ở đây cho biết Số công việc và các thông số KPI của bạn",
            target: () => listRefPresent[1].current,
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

    const listRefSchedule = genRef(2);
    const stepsSchedule: TourProps["steps"] = [
        {
            title: "Lịch trình",
            description: "Công việc của bạn hôm nay",
            target: () => listRefSchedule[0].current,
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
            title: "Danh sách công việc",
            description:
                "Nhấn vào đây để xem danh sách công việc. Bạn có thể cập nhật tiến độ nhanh bằng cách bấm vào công việc.",
            target: () => listRefSchedule[1].current,
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
        <TourGuidContext.Provider
            value={{
                open,
                setOpen,
                steps,
                listRef,
                stepsPresent,
                listRefPresent,
                listRefSchedule,
                stepsSchedule,
            }}
        >
            {children}
        </TourGuidContext.Provider>
    );
};
