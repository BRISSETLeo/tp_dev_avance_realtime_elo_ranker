const axios = require('axios');
const API = 'http://localhost:3000/api';

const players = [];

const getPlayers = async () => {
    try {
        const response = await axios.get(`${API}/player`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};



const simulateMatch = async (player1, player2, draw) => {
    try {
        console.log('Simulating match...');
        const winner = draw ? null : (Math.random() < 0.5 ? player1 : player2);
        const loser = draw ? null : (winner === player1 ? player2 : player1);
        const response = await axios.post(`${API}/match`, {winner: winner, loser: loser, draw: draw});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

getPlayers().then((data) => {
    players.push(...data);
    if(players.length < 2) {
        console.error('Not enough players to simulate a match');
        return;
    }
    const randomPlayerIndex = () => Math.floor(Math.random() * players.length);
    
    const simulateRandomMatch = () => {
        const player1 = players[randomPlayerIndex()].id;
        let player2;
        do {
            player2 = players[randomPlayerIndex()].id;
        } while (player1 === player2);

        simulateMatch(player1, player2).then((data) => {
            console.log(data);
        });
    };

    simulateRandomMatch();
    setInterval(simulateRandomMatch, 1000);
});