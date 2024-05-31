import { getDataFromDb, storeDataInDb } from "./localStorage";

interface ILogin {
    email: string;
    password: string;
}

const initAccount = {
    userId: "95f0f2d5-a400-4bb2-b614-a206ef70fe41",
    email: "chi.pm214998@sis.hust.edu.vn",
    firstname: "Pham",
    lastname: "Mai Chi",
    username: "Pham Mai Chi",
    phonenumber: "0912345678",
    career: "Sinh vien",
    password: "admin",
};

export const login = (payload: ILogin) => {
    const { email, password } = payload;

    if (email !== initAccount.email || password !== initAccount.password) {
        return {
            statusCode: 400,
            message: "Thông tin tài khoản hoặc mật khẩu không chính xác",
        };
    }

    storeDataInDb("profile", initAccount);

    return {
        statusCode: 200,
        message: "Đăng nhập thành công",
        profile: initAccount,
    };
};

export const getProfile = () => {
    const profile = getDataFromDb("profile") ? getDataFromDb("profile") : [];

    return profile;
};

export const updateProfile = (profile) => {
    storeDataInDb("profile", profile);
};
