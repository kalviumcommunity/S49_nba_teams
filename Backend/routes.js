const express = require('express');
const router = express.Router();

let players = [
    { id: 1, name: 'Steph Curry', rings: 3 },
    { id: 2, name: 'LeBron James', rings: 4 }
];


router.get('/players', (req, res) => {
    res.json(players);
});

router.get('/players/:id', (req, res) => {
    const playerId = parseInt(req.params.id);
    const player = players.find(player => player.id === playerId);
    if (!player) {
        return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
});

router.post('/players', (req, res) => {
    const { name, rings } = req.body;
    const newPlayer = {
        id: players.length + 1, 
        name: 'JA Morant',
        rings: 0
    };
    players.push(newPlayer);
    res.status(201).json(newPlayer);
});

router.put('/players/:id', (req, res) => {
    const playerId = parseInt(req.params.id);
    const playerIndex = players.findIndex(player => player.id === playerId);
    if (playerIndex === -1) {
        return res.status(404).json({ message: 'Player not found' });
    }
    const { name, rings } = req.body;
    players[playerIndex].name = name;
    players[playerIndex].rings = rings;
    res.json(players[playerIndex]);
});



router.delete('/players/:id', (req, res) => {
    const playerId = parseInt(req.params.id);
    players = players.filter(player => player.id !== playerId);
    res.json({ message: 'Player eliminated successfully' });
});

module.exports = router;
