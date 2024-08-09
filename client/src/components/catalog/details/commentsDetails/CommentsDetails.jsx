import { useEffect, useState } from "react";
import { getOneComment } from "../../../../api/comments-api";
import { useParams } from "react-router-dom";

export default function Comment({
    username,
    text,
}) {
    const [newComment, setNewComment] = useState(``);
    const { gameId } = useParams();

    useEffect(() => {
        (async () => {
            const result = await getOneComment(gameId);

            setNewComment(result);
        })();
    }, []);

    return (
        <li className="comment">
            <p>{username}</p>
            <p>Content: {text}</p>
        </li>
    );
}