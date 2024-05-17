import { Outlet } from "react-router-dom";

import "./AuthLayout.css";

export const AuthLayout = () => {
    return (
        <div className="auth">
            <div className="auth__container">
                <Outlet />
            </div>
        </div>
    );
};
