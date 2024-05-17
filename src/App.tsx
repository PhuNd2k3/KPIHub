import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { CommonLayout } from "./layouts/common/CommonLayout";
import { Home } from "./components/Home";
import {
    PresentKPI,
    TargetPresentKPI,
    TargetPresentKPIDetail,
} from "./components/PresentKPI";
import { AuthLayout } from "./layouts/auth/AuthLayout";
import { Intro } from "./components/Intro/Intro";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/SignUp/SignUp";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";
import { About } from "./components/About/About";
import { Schedule } from "./components/Schedule/Schedule";
import { Tour } from "antd";
import { TourGuidContext } from "./providers/TourGuide";

const App: React.FC = () => {
    const { open, setOpen, steps } = useContext(TourGuidContext);

    return (
        <>
            <Routes>
                <Route path="/" element={<CommonLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/kpi_present" element={<PresentKPI />}>
                        <Route
                            path="/kpi_present"
                            element={<TargetPresentKPI />}
                        />
                        <Route
                            path="/kpi_present/:targetId"
                            element={<TargetPresentKPIDetail />}
                        />
                    </Route>
                    <Route path="/about" element={<About />} />
                    <Route path="/schedule" element={<Schedule />} />
                </Route>
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/intro" element={<Intro />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/forgot_password"
                        element={<ForgotPassword />}
                    />
                </Route>
            </Routes>

            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </>
    );
};

export default App;
