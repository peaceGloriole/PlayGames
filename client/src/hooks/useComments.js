import { useEffect, useReducer } from "react";
import { create, getAllComments } from "../api/comments-api";

export function useCreateComments() {
    const createHandler = (gameId, comment) => create(gameId, comment);

    return createHandler;
};

function commentsReducer(state, action) {
    switch (action.type) {
        case `SET_COMMENTS`:
            return action.payload.slice();
        case `ADD_COMMENT`:
            return [...state, action.payload];
        default: return state;
    }
}

export function useGetComments(gameId) {
    const [comments, dispatch] = useReducer(commentsReducer, []);

    useEffect(() => {
        (async () => {
            const result = await getAllComments(gameId);

            dispatch({ type: `SET_COMMENTS`, payload: result });
        })();
    }, [gameId]);

    return [comments, dispatch];
}