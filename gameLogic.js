import { generatePlayerGrid, generateEnemyGrid, clearPlayerGrid,clearEnemyGrid, hideBtns } from './renderGame.js';
import { Player } from './player.js';

let playerGrid = document.querySelector('#playerGrid');
let enemyGrid = document.querySelector('#enemyGrid');
let main = document.querySelector('main');

export function startGame(player, enemy){

    enemyGrid.addEventListener('click', (e) => {
        if(e.target.classList.contains('enemy-cell')){
            let x = e.target.dataset.x;
            let y = e.target.dataset.y;

            if(e.target.classList.contains('played')){
                return;
            }
            enemy.receiveAttack(x, y);
            clearEnemyGrid();
            generateEnemyGrid(enemy.gameboard);
            
            if(enemy.gameboard.allShipsSunk()){
                renderWin();
                renderPlayAgain();
            }
            
        
            player.receiveAttackRandomly();
            clearPlayerGrid();
            generatePlayerGrid(player.gameboard);

            if(player.gameboard.allShipsSunk()){
                renderLose();
                renderPlayAgain();
            }
        }
    });
}

function renderWin(){
    let winDiv = document.createElement('div');
    winDiv.classList.add('win');
    winDiv.textContent = 'You win!';
    main.appendChild(winDiv);
    
}

function renderLose(){
    let loseDiv = document.createElement('div');
    loseDiv.classList.add('lose');
    loseDiv.textContent = 'You lose!';
    main.appendChild(loseDiv);
    
}

function renderPlayAgain(){
    let playAgainBtn = document.createElement('button');
    playAgainBtn.classList.add('play-again');
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.addEventListener('click', () => {
        location.reload();
    });
    main.appendChild(playAgainBtn);
}