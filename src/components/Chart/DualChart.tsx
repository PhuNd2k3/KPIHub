import { Line } from "@ant-design/plots";

const data = [
    {
        date: "31/05",
        value: 2,
    },
    {
        date: "01/06",
        value: 7,
    },
    {
        date: "02/06",
        value: 3,
    },
    {
        date: "03/06",
        value: 5,
    },
    {
        date: "04/06",
        value: 4,
    },
    {
        date: "05/06",
        value: 3,
    },
    {
        date: "06/06",
        value: 4,
    },
    {
        date: "07/06",
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
