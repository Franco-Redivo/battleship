import { Player } from './player.js';
import { generatePlayerGrid, generateEnemyGrid, clearPlayerGrid,clearEnemyGrid, hideBtns } from './renderGame.js';
import { startGame } from './gameLogic.js';

let randomBtn = document.querySelector('#randomBtn');
let startBtn = document.querySelector('#startBtn');

const player = new Player();
const enemy = new Player();


player.placeAllShipsRandomly();

enemy.placeAllShipsRandomly();


generatePlayerGrid(player.gameboard);
generateEnemyGrid(enemy.gameboard);

randomBtn.addEventListener('click', () => {
    player.clearBoard();
    player.placeAllShipsRandomly();
    clearPlayerGrid();
    generatePlayerGrid(player.gameboard);

});

startBtn.addEventListener('click', () => {
    hideBtns();
    startGame(player, enemy);
});

