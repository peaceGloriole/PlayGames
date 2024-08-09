export default function Comment({
    username,
    text,
}) {
    return (
        <li className="comment">
            <p>{username}</p>
            <p>Content: {text}</p>
        </li>
    );
}