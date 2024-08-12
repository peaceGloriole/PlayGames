import * as request from './requester';

const BASE_URL = 'http://localhost:3030/data/comments';

export const create = (gameId, text) => request.post(BASE_URL, { gameId, text });

export const getAllComments = (gameId) => {
    const params = new URLSearchParams({
        where: `gameId="${gameId}"`,
        load: `author=_ownerId:users`
    });

    return request.get(`${BASE_URL}?${params.toString()}`);
} 