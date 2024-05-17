import { Line } from "@ant-design/plots";

const data = [
    {
        date: "09/05",
        type: "Hiệu suất",
        value: 2,
    },
    {
        date: "10/05",
        type: "Hiệu suất",
        value: 4,
    },
    {
        date: "11/05",
        type: "Hiệu suất",
        value: 3,
    },
    {
        date: "12/05",
        type: "Hiệu suất",
        value: 5,
    },
    {
        date: "13/05",
        type: "Hiệu suất",
        value: 4,
    },
    {
        date: "14/05",
        type: "Hiệu suất",
        value: 3,
    },
    {
        date: "15/05",
        type: "Hiệu suất",
        value: 4,
    },
    {
        date: "16/05",
        type: "Hiệu suất",
        value: 1,
    },
];

export const DualChart = () => {
    const config = {
        data,
        xField: "date",
        yField: "value",
        colorField: "type",
        width: 540,
        height: 300,
        axis: {
            y: {
                labelFormatter: (v: string) =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        scale: { color: { range: ["#6F65E8", "#C0BFBF"] } },
        style: {
            lineWidth: 2,
        },
        // legend: {
        //     color: {
        //         title: false,
        //         position: "bottom",
        //         rowPadding: 5,
        //     },
        // },
    };

    return <Line {...config} />;
};
