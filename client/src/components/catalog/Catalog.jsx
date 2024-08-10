
import CatalogItem from './catalogItem/CatalogItem';
import { useGetAllGames } from '../../hooks/useGames';

export default function Catalog() {
    const [games, setGames] = useGetAllGames();

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