import { Breadcrumb, Table, TableProps, Tag } from "antd";
import { Link } from "react-router-dom";
import { getListKpi } from "../../services/kpi";
import { useContext, useEffect, useState } from "react";
import { TourGuidContext } from "../../providers/TourGuide";

interface DataType {
    criterias: any;
    key: string;
    targetName: string;
    weight: number;
    targetStatus: string;
    targetId: string;
}

const columns: TableProps<DataType>["columns"] = [
    {
        title: "Tên mục tiêu",
        dataIndex: "targetName",
        key: "targetName",
        render: (text, record) => (
            <Link
                style={{ color: "#130D59", fontWeight: 400 }}
                to={"/kpi_present/" + record?.targetId}
            >
                {text}
            </Link>
        ),
    },
    {
        title: "Trọng số (%)",
        dataIndex: "weight",
        key: "weight",
        render: (text) => (
            <p style={{ color: "#130D59", fontWeight: 500 }}>{text}%</p>
        ),
    },
    {
        title: "Tiến độ",
        key: "targetStatus",
        dataIndex: "targetStatus",
        render: (_, record) => {
            let progress = 0;
            record?.criterias?.map((item) => {
                progress +=
                    (item.criteriaProgress / item.objective) * item.weight;
            });
            return (
                <>
                    {
                        <Tag
                            key={record?.targetStatus}
                            style={{
                                width: 50,
                                textAlign: "center",
                                borderRadius: 10,
                            }}
                            color={progress < 100 ? "#FFD800" : "#5EDD46"}
                        >
                            {progress}%
                        </Tag>
                    }
                </>
            );
        },
    },
];

export const TargetPresentKPI = () => {
    const [listKpi, setListKpi] = useState([]);

    const handleGetListKpi = () => {
        const listKpi = getListKpi();

        setListKpi(listKpi);
    };

    useEffect(() => {
        handleGetListKpi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Breadcrumb style={{ margin: "16px 0" }} separator=">">
                <Breadcrumb.Item>
                    <span
                        style={{
                            fontWeight: 500,
                        }}
                    >
                        Mục tiêu
                    </span>
                </Breadcrumb.Item>
                {/* <Breadcrumb.Item>
                    <span style={{ color: "#6F65E8" }}>KPI hiện tại</span>
                </Breadcrumb.Item> */}
            </Breadcrumb>
            <Table
                style={{ marginTop: "20px" }}
                columns={columns}
                dataSource={listKpi}
                pagination={false}
            />
        </>
    );
};
