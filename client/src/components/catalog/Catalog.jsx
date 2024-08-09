import { useEffect, useState } from 'react';
import { getAllGames } from '../../api/game-api';
import CatalogItem from './catalogItem/CatalogItem';

export default function Catalog() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getAllGames()
            .then(result => setGames(result));
    }, []);

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {
                games.length > 0
                    ? games.map(game => <CatalogItem key={game._id} {...game} />)
                    : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    );
}