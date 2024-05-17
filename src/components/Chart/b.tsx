import { DualAxes } from "@ant-design/charts";

export const DualChart = () => {
    const data = [
        { year: "1991", value: 3, count: 10 },
        { year: "1992", value: 4, count: 4 },
        { year: "1993", value: 3.5, count: 5 },
        { year: "1994", value: 5, count: 5 },
        { year: "1995", value: 4.9, count: 4.9 },
        { year: "1996", value: 6, count: 35 },
    ];

    const config = {
        data,
        xField: "year",
        width: 540,
        height: 300,
        children: [
            {
                type: "line",
                yField: "value",
                style: {
                    stroke: "#5B8FF9",
                    lineWidth: 2,
                },
                axis: {
                    y: {
                        title: "Hôm qua",
                        style: { titleFill: "#5B8FF9" },
                    },
                },
            },
            {
                type: "line",
                yField: "count",
                style: {
                    stroke: "#5AD8A6",
                    lineWidth: 2,
                },
                axis: {
                    y: {
                        position: "right",
                        title: "Hôm nay",
                        style: { titleFill: "#5AD8A6" },
                    },
                },
            },
        ],
        legend: {
            color: {
                title: false,
                position: "bottom",
                rowPadding: 5,
            },
        },
    };
    return <DualAxes {...config} />;
};
