import { login } from "../api/auth-api"

export const useLogin = () => {
    const loginHandler = async (username, password) => {
        try {
            const authData = await login(username, password);

            console.log(authData);
        } catch (error) {
            console.log(error.message);
        }

        return
    }

    return loginHandler;
};