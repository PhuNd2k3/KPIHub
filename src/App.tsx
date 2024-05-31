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
import { Profile } from "./components/Profile";

const App: React.FC = () => {
    const { open, setOpen, steps } = useContext(TourGuidContext);

    return (
        <>
            <Routes>
                <Route path="/" element={<CommonLayout />}>
                    <Route path="/kpi_present" element={<Home />} />
                    <Route path="/" element={<PresentKPI />}>
                        <Route
                            path="/"
                            element={<TargetPresentKPI />}
                        />
                        <Route
                            path="/:targetId"
                            element={<TargetPresentKPIDetail />}
                        />
                    </Route>
                    <Route path="/about" element={<About />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/profile" element={<Profile />} />
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
