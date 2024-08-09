import * as request from './requester';

const BASE_URL = 'http://localhost:3030/jsonstore';

export const create = async (gameId, username, text) => {
    const result = await request.post(`${BASE_URL}/${gameId}/comments`, { username, text });
    
    return result;
}