import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const { Footer, Content } = Layout;

import "./CommonLayout.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { Header } from "../../components/Header/Header";

export const CommonLayout = () => {
    return (
        <div className="common">
            <div className="header">
                <Header />
            </div>
            <div className="body">
                <div className="navbar">
                    <Navbar />
                </div>
                <div className="content">
                    <Layout style={{ minHeight: "100vh", padding: "10px" }}>
                        <Layout>
                            <Content style={{ margin: "0 16px" }}>
                                <Outlet />
                            </Content>
                            {/* <Footer style={{ textAlign: "center" }}>
                                Ant Design ©{new Date().getFullYear()} Created
                                by Ant UED
                            </Footer> */}
                        </Layout>
                    </Layout>
                </div>
            </div>
        </div>
    );
};
