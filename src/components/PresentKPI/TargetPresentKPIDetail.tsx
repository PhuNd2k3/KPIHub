import { Breadcrumb, Table, TableProps, Tag, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import { getTargetById } from "../../services/kpi";
import { useEffect, useState } from "react";

interface DataType {
    key: string;
    criteriaName: string;
    objective: string;
    criteriaStatus: string;
    unit: string;
}

const columns: TableProps<DataType>["columns"] = [
    {
        title: "Tên mục tiêu",
        dataIndex: "criteriaName",
        key: "criteriaName",
        render: (text) => (
            <span
                style={{
                    color: "#130D59",
                    fontWeight: 400,
                }}
            >
                {text.slice(0, 14)}...
            </span>
        ),
    },
    {
        title: "KPI cần đạt",
        dataIndex: "objective",
        key: "objective",
        render: (text, { unit }) => (
            <p style={{ color: "#130D59", fontWeight: 500 }}>
                {text} {unit}
            </p>
        ),
    },
    {
        title: "Tình trạng",
        key: "criteriaStatus",
        dataIndex: "criteriaStatus",
        render: (_, criteria) => (
            <>
                {
                    <Tag
                        color={
                            Math.ceil(
                                (criteria?.criteriaProgress /
                                    criteria?.objective) *
                                    100
                            ) < 100
                                ? "#FFD800"
                                : "#5EDD46"
                        }
                        key={criteria.criteriaName}
                        style={{
                            width: 50,
                            textAlign: "center",
                            borderRadius: 10,
                        }}
                    >
                        {Math.ceil(
                            (criteria?.criteriaProgress / criteria?.objective) *
                                100
                        )}
                        %
                    </Tag>
                }
            </>
        ),
    },
];

export const TargetPresentKPIDetail = () => {
    const [target, setTarget] = useState({});
    const { targetId } = useParams();

    const handleGetTargetById = () => {
        const target = getTargetById(targetId as string);

        console.log(target);

        setTarget(target);
    };

    useEffect(() => handleGetTargetById(), []);

    return (
        <>
            <Breadcrumb style={{ margin: "16px 0" }} separator=">">
                <Breadcrumb.Item>
                    <Link to="/kpi_present">
                        <span
                            style={{
                                fontWeight: 500,
                            }}
                        >
                            Mục tiêu
                        </span>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span style={{ color: "#6F65E8", fontWeight: 500 }}>
                        {target?.targetName}
                    </span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Table
                style={{ marginTop: "20px", width: "100%" }}
                columns={columns}
                dataSource={target?.criterias}
                pagination={false}
            />
        </>
    );
};
