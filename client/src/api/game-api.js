import * as request from './requester.js';

const BASE_URL = 'http://localhost:3030/data/games';

export const getAllGames = async () => {
    const result = await request.get(BASE_URL);

    return Object.values(result);
}

export const getOneGame = async (id) => {
    const result = await request.get(`${BASE_URL}/${id}`);

    return result;
}

// export const getOneGame = (id) => request.get(`${BASE_URL}/${id}`);

export const createGame = (data) => request.post(`${BASE_URL}`, data);

export const removeGame = (id) => request.del(`${BASE_URL}/${id}`);

export const updateGame = (id, data) => request.put(`${BASE_URL}/${id}`, data);