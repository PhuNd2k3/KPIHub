import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getDataFromDb } from "../../services/localStorage";

export default function Export() {
    const handleExportFile = () => {
        fetch("kpi-07-06-2024.xlsx").then((response) => {
            response.blob().then((blob) => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);

                // Setting various property values
                const alink = document.createElement("a");
                alink.href = fileURL;
                const d = new Date();
                alink.download = `kpi-${d.getDay()}-${d.getMonth() + 1}-${d.getFullYear()}.xlsx`;
                alink.click();
            });
        });
    };

    const exportData = () => {
        const listKpi = getDataFromDb("listKpi")
            ? getDataFromDb("listKpi")
            : [];

        if (listKpi.length <= 0) {
            return alert("Chưa có dữ liệu để xuất file");
        }

        handleExportFile();
    };

    return (
        <Button
            icon={<VerticalAlignBottomOutlined />}
            style={{
                height: 40,
            }}
            onClick={() => exportData()}
        >
            Xuất dữ liệu
        </Button>
    );
}
