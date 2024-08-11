import { create } from "../api/comments-api";

export function useCreateComments() {
    const createHandler = (gameId, comment) => create(gameId, comment);

    return createHandler;
};