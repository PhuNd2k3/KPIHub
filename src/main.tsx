import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import App from "./App.tsx";
import "./index.css";
import { TourGuide } from "./providers/TourGuide.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            titleColor: "#6F65E8",
                            titleFontSize: 24,
                        },
                        // Select: {
                        //     selectorBg: "#6F65E8",
                        // },
                    },
                }}
            >
                <TourGuide>
                    <App />
                </TourGuide>
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>
);
