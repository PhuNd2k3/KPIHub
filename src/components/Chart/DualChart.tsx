import { Line } from "@ant-design/plots";

const data = [
    {
        date: "26/05",
        type: "Hiệu suất",
        value: 2,
    },
    {
        date: "27/05",
        type: "Hiệu suất",
        value: 4,
    },
    {
        date: "28/05",
        type: "Hiệu suất",
        value: 3,
    },
    {
        date: "27/05",
        type: "Hiệu suất",
        value: 5,
    },
    {
        date: "28/05",
        type: "Hiệu suất",
        value: 4,
    },
    {
        date: "29/05",
        type: "Hiệu suất",
        value: 3,
    },
    {
        date: "30/05",
        type: "Hiệu suất",
        value: 4,
    },
    {
        date: "31/05",
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
