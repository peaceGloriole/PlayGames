import { useState } from "react";

export function usePersistedState(initialState) {
    const [state, setState] = useState(initialState);

    return [state, setState];
}