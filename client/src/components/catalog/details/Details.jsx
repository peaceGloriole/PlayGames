import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOneGame } from '../../../api/game-api';
import { create } from '../../../api/comments-api';
import Comment from './commentsDetails/CommentsDetails';

export default function Details() {
    const [game, setGame] = useState({});
    const [user, setUser] = useState(``);
    const [comment, setComment] = useState(``);

    const { gameId } = useParams();

    useEffect(() => {
        (async () => {
            const result = await getOneGame(gameId);

            setGame(result);
        })();
    });

    const commentSubmitHandler = async (e) => {
        e.preventDefault();

        const data = await create(gameId, user, comment);

        setGame(oldState => ({
            ...oldState,
            comments: {
                ...oldState.comments,
                [data._id]: data,
            },
        }));

        setUser(``);
        setComment(``);
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">{game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {
                            game.comments && Object.values(game.comments).map(item => (
                                <li key={item._id} className="comment">
                                    <p>{item.username} comment: {item.text}</p>
                                </li>
                            ))}
                        <p className="no-comment">No comments.</p>
                    </ul>

                </div>

                <div className="buttons">
                    <Link to="/edit" className="button">Edit</Link>
                    <Link to="/delete" className="button">Delete</Link>
                </div>
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={commentSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
}