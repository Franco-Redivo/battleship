import { Ship } from './ship.js';

export class Gameboard {
    constructor(){
        this.board = {
            0: Array(10).fill(null),
            1: Array(10).fill(null),
            2: Array(10).fill(null),
            3: Array(10).fill(null),
            4: Array(10).fill(null),
            5: Array(10).fill(null),
            6: Array(10).fill(null),
            7: Array(10).fill(null),
            8: Array(10).fill(null),
            9: Array(10).fill(null)}
        this.ships = [];
    }

    placeShip(x, y, length, direction){
        const ship = new Ship(length);
        const coordinates = [];
        for(let i = 0; i < length; i++){
            if(this.shipOverFlowsBoard(x,y,i,direction) || this.shipAlreadyPlaced(x,y,i,direction)){
                return;
            }
            if(direction === 'horizontal'){
                coordinates.push([x + i, y]);
                this.board[x + i][y] = 'ship';
            } else {
                coordinates.push([x, y + i]);
                this.board[x][y + i] = 'ship';
            }
        }
        ship.coordinates = coordinates;
        this.ships.push(ship);
    }

    shipAlreadyPlaced(x,y,i,direction){
        if(direction === 'horizontal'){
            if(this.board[x + i][y] === 'ship'){
                return true;
            }
        } else {
            if(this.board[x][y + i] === 'ship'){
                return true;
            }
        }
        return false;
    }

    shipOverFlowsBoard(x,y,i,direction){
        if(direction === 'horizontal'){
            if(x + i > 9){
                return true;
            }
        } else {
            if(y + i > 9){
                return true;
            }
        }
        return false;
    }

    receiveAttack(x,y){
        if(this.board[x][y] === 'ship'){
            this.board[x][y] = 'hit';
            this.ships.forEach(ship => {
                ship.coordinates.forEach(coord => {
                    if(coord[0] === x && coord[1] === y){
                        ship.hit();
                    }
                });
            });
            if(this.allShipsSunk()){
                return 'all ships sunk';
            }

            return 'hit';
        } else {
            this.board[x][y] = 'miss';
            return 'miss';
        }
    }

    allShipsSunk(){
        return this.ships.every(ship => ship.isSunk);
    }
}