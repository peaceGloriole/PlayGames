import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useGetOneGame } from '../../hooks/useGames';
import { useForm } from '../../hooks/useForm';
import { useCreateComments, useGetComments } from '../../hooks/useComments';

import { useAuthContext } from '../../context/AuthContext';
import { removeGame } from '../../api/game-api';

export default function Details() {

    const initialValues = {
        comment: '',
    };

    const { gameId } = useParams();
    const [game] = useGetOneGame(gameId);
    const createComment = useCreateComments();
    const [error, setError] = useState(``);
    const [comments, dispatch] = useGetComments(gameId);
    const { email, userId } = useAuthContext();
    const { isAuthenticated } = useAuthContext();

    const { values, changeHandler, submitHandler } = useForm(initialValues, async ({ comment }) => {
        try {
            const newComment = await createComment(gameId, comment);

            // setComments(oldComments => [...oldComments, newComment]);
            dispatch({ type: `ADD_COMMENT`, payload: { ...newComment, author: { email } } });
        } catch (error) {
            setError(error.message);
        }
    });

    const gameDeleteHandler = async () => {
        try {
            await removeGame(gameId);

        } catch (error) {
            setError(error.message);
        }
    }

    const isOwner = game._ownerId === userId;

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

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                        <Link to="/games" onClick={gameDeleteHandler} className="button">Delete</Link>
                    </div>
                )}

            </div>

            {isAuthenticated && (
                <article className="create-comment">
                    <label>Add new comment:</label>

                    {error && <p className="error">{error}</p>}

                    <form className="form" onSubmit={submitHandler}>
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