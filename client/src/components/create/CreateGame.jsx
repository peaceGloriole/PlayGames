import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useCreateGame } from "../../hooks/useGames";
import { useState } from "react";

const initialValues = {
    title: ``,
    category: ``,
    maxLevel: ``,
    imageUrl: ``,
    summary: ``,
};

export default function CreateGame() {
    const [error, setError] = useState(``);

    const createGame = useCreateGame();
    const navigate = useNavigate();

    const createGameHandler = async (data) => {
        try {
            const { _id: gameId } = await createGame(data);

            navigate(`/games/${gameId}/details`);
        } catch (error) {
            setError(error.message);
        }
    };

    const {
        values,
        changeHandler,
        submitHandler } = useForm(initialValues, createGameHandler);

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={submitHandler}>
                <div className="container">

                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>

                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={changeHandler}
                        placeholder="Enter game title..." />

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={values.category}
                        onChange={changeHandler}
                        placeholder="Enter game category..." />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        value={values.maxLevel}
                        onChange={changeHandler}
                        min="1"
                        placeholder="1" />

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={changeHandler}
                        placeholder="Upload a photo..." />

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={values.summary}
                        onChange={changeHandler}
                    ></textarea>
                    <input
                        className="btn submit"
                        type="submit"
                        value="Create Game"
                        onSubmit={createGameHandler} />

                    {error &&
                        <h1 style={{ background: `red` }}>{error}</h1>
                    }

                </div>
            </form>
        </section>
    );
}