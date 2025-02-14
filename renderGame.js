import { Player } from "./player.js";

let playerDiv = document.querySelector('#player');
let enemyDiv = document.querySelector('#enemy');

let playerGrid = document.querySelector('#playerGrid');
let enemyGrid = document.querySelector('#enemyGrid');

export function generatePlayerGrid(gameboard){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            let cell = document.createElement('div');
            cell.classList.add('player-cell');

            if(gameboard.board[j][i] === 'ship'){
                cell.classList.add('ship');
            } else if(gameboard.board[j][i] === 'miss'){
                cell.classList.add('miss');
            } else if(gameboard.board[j][i] === 'hit'){
                cell.classList.add('hit');
                console.log('hit');
                console.log(gameboard.shipSunk(j,i));
                if(gameboard.shipSunk(j,i)){
                    console.log('sunk');
                    cell.classList.add('sunk');
                }
            }
            cell.dataset.x = j;
            cell.dataset.y = i;
            playerGrid.appendChild(cell);
        }
    }
}

export function generateEnemyGrid(gameboard){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            let cell = document.createElement('div');
            cell.classList.add('enemy-cell');

            if(gameboard.board[j][i] === 'miss'){
                cell.classList.add('miss');
            } else if(gameboard.board[j][i] === 'hit'){
                cell.classList.add('hit');
            } else if(gameboard.shipSunk(j,i)){
                cell.classList.add('sunk');
            }
            cell.dataset.x = j;
            cell.dataset.y = i;
            enemyGrid.appendChild(cell);
        }
    }
}