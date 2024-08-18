import { useEffect, useState } from "react";
import { getAllGames } from "../../api/game-api";
import LatestGame from "./latestGame/LatestGame";

export default function HomePage() {
    const [latestGame, setLatestGame] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await getAllGames();

            setLatestGame(result);
        })();
    }, []);

    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>

                {
                    latestGame.length > 0
                        ? latestGame.map(item => <LatestGame key={item._id} {...item} />)
                        : <p className="no-articles">No games yet</p>
                }


            </div>
        </section>
    );
}