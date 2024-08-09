import * as request from './requester';

const BASE_URL = 'http://localhost:3030/jsonstore/games';

const buildUrl = (gameId) => `${BASE_URL}/${gameId}/comments`;

export const create = async (gameId, username, text) => {
    await request.post(buildUrl(gameId), { username, text });
}

export const getOneComment = async (gameId) => {
    const result = await request.get(buildUrl(gameId));

    return Object.values(result);
};