import { Pie } from "@ant-design/charts";

export const PieChart = ({ data }) => {
    const config = {
        data: [...data],
        angleField: "value",
        colorField: "type",
        scale: { color: { range: ["#6F65E8", "#E2E0FA", "#5EDD46"] } },
        paddingRight: 0,
        innerRadius: 0.6,
        width: 240,
        height: 240,
        label: {
            text: "value",
            style: {
                fontWeight: "bold",
            },
        },
        legend: {
            color: {
                title: false,
                position: "bottom",
                rowPadding: 5,
            },
        },
        annotations: [
            {
                type: "text",
                style: {
                    text: "KPI",
                    x: "50%",
                    y: "50%",
                    textAlign: "center",
                    fontSize: 20,
                    fontStyle: "bold",
                },
            },
        ],
    };

    return <Pie style={{ width: "100%" }} {...config} />;
};
