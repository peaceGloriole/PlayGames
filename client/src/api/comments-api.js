import * as request from './requester';

const BASE_URL = 'http://localhost:3030/jsonstore/games';

const buildUrl = (gameId) => `${BASE_URL}/${gameId}/comments`;

export const create = (gameId, username, text) => request.post(buildUrl(gameId), { username, text });

export const getAllComments = async (gameId) => {
    const result = await request.get(buildUrl(gameId));

    return Object.values(result);
};