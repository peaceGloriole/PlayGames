import * as request from './requester.js';

const BASE_URL = 'http://localhost:3030/jsonstore/games';

export const getAllGames = async () => {
    const result = await request.get(BASE_URL);

    return Object.values(result);
}

// export const getOneGame = async (id) => {
//     const result = await request.get(`${BASE_URL}/${id}`);

//     return result;
// }

export const getOneGame = (id) => request.get(`${BASE_URL}/${id}`);