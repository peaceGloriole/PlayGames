import * as request from './requester.js';

const BASE_URL = 'http://localhost:3030/jsonstore/games';

export const getAllGames = () => request.get(BASE_URL);
export const getOneGame = (id) => request.get(`${BASE_URL}/${id}`);