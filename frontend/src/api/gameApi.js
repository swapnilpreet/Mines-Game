import axios from "axios";
const API_URL = "http://localhost:5000/api/game";

export const startGame = (userId, level, investedMoney) => 
    axios.post(`${API_URL}/start`, { userId, level, investedMoney });

export const clickBox = (gameId, boxIndex) => 
    axios.post(`${API_URL}/click`, { gameId, boxIndex });

export const cashOut = (gameId) => 
    axios.post(`${API_URL}/cashout`, { gameId });
