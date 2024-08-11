import { createContext, useContext, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

const AuthContext = createContext();

export function AuthContextProvider(props) {
    // const [authState, setAuthState] = useState({});
    const [authState, setAuthState] = usePersistedState({});

    const changeAuthState = (state) => {
        localStorage.setItem(`accessToken`, state.accessToken);

        setAuthState(state);
    };

    const contextData = {
        userId: authState._id,
        email: authState.email,
        accessToken: authState.accessToken,
        isAuthenticated: !!authState.email,
        changeAuthState,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const authData = useContext(AuthContext);

    return authData;
}