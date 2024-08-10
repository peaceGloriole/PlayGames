import { useContext } from "react";
import { login } from "../api/auth-api"
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext);

    const loginHandler = async (email, password) => {
        const authData = await login(email, password);

        changeAuthState(authData);
    };

    return loginHandler;
};