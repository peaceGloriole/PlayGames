import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOneGame } from '../../../api/game-api';
import { create } from '../../../api/comments-api';

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
    }, [gameId]);

    const commentSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const result = await create(gameId, user, comment);
            console.log(result);
        } catch (error) {
            console.error('Error creating comment:', error);
        }

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
                        <li className="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                    </ul>
                    <p className="no-comment">No comments.</p>
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