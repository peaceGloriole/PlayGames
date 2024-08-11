import { useEffect, useState } from "react";
import { create, getAllComments } from "../api/comments-api";

export function useCreateComments() {
    const createHandler = (gameId, comment) => create(gameId, comment);

    return createHandler;
};

export function useGetComments(gameId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await getAllComments(gameId);

            setComments(result);
        })();
    }, [gameId]);

    return [comments, setComments];
}