import { generatePlayerGrid, generateEnemyGrid, clearPlayerGrid,clearEnemyGrid, hideBtns } from './renderGame.js';
import { Player } from './player.js';

let playerGrid = document.querySelector('#playerGrid');
let enemyGrid = document.querySelector('#enemyGrid');

export function startGame(player, enemy){

    enemyGrid.addEventListener('click', (e) => {
        if(e.target.classList.contains('enemy-cell')){
            let x = e.target.dataset.x;
            let y = e.target.dataset.y;
            enemy.receiveAttack(x, y);
            clearEnemyGrid();
            generateEnemyGrid(enemy.gameboard);
            if(enemy.gameboard.allShipsSunk()){
                alert('You win!');
            }
            player.receiveAttackRandomly();
            clearPlayerGrid();
            generatePlayerGrid(player.gameboard);
        }
    });
}