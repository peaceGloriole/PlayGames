import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useGetOneGame } from '../../../hooks/useGames';
import { useForm } from '../../../hooks/useForm';
import { useCreateComments, useGetComments } from '../../../hooks/useComments';

import { useAuthContext } from '../../../context/AuthContext';

export default function Details() {
    const { gameId } = useParams();

    const initialValues = {
        comment: '',
    };

    const [error, setError] = useState(``);
    const [game] = useGetOneGame(gameId);
    const createComment = useCreateComments();
    const [comments, setComments] = useGetComments(gameId);
    const { isAuthenticated } = useAuthContext();

    const { values, changeHandler, submitHandler } = useForm(initialValues, async ({ comment }) => {
        try {
            const newComment = await createComment(gameId, comment);

            setComments(oldComments => [...oldComments, newComment]);
        } catch (error) {
            setError(error.message);
        }
    });

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
                        {comments.map(item => (
                            <li key={item._id} className="comment">
                                <p>{item.author.email}: {item.text}</p>
                            </li>
                        ))
                        }
                    </ul>

                    {comments.length === 0 && <p className="no-comment">No comments.</p>}
                </div>

                <div className="buttons">
                    <Link to="/edit" className="button">Edit</Link>
                    <Link to="/delete" className="button">Delete</Link>
                </div>
            </div>

            {isAuthenticated && (
                <article className="create-comment">
                    <label>Add new comment:</label>

                    {error && <p className="error">{error}</p>}

                    <form className="form" onSubmit={submitHandler}>
                        {/* onSubmit={commentSubmitHandler} */}
                        <textarea
                            name="comment"
                            placeholder="Comment......"
                            value={values.comment}
                            onChange={changeHandler}
                        ></textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            )}

        </section>
    );
}