import { useEffect, useState } from 'react';
import { createGame, getAllGames, getOneGame } from '../api/game-api';

export function useGetAllGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // IIFE
        (async () => {
            const result = await getAllGames();

            setGames(result);
        })();
        // getAllGames()
        //     .then(result => setGames(result));
    }, []);

    return [games, setGames];
}

export function useGetOneGame(gameId) {
    const [game, setGame] = useState({});

    useEffect(() => {
        (async () => {
            const result = await getOneGame(gameId);

            setGame(result);
        })();
    }, [gameId]);

    return [game, setGame];
}

export function useCreateGame() {
    const gameCreateHandler = (data) => createGame(data);

    return gameCreateHandler;
}