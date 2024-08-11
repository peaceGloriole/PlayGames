import * as request from './requester';

const BASE_URL = 'http://localhost:3030/data/comments';

export const create = (gameId, text) => request.post(BASE_URL, { gameId, text });

export const getAllComments = async (gameId) => {
    const result = await request.get(BASE_URL);

    return Object.values(result);
};