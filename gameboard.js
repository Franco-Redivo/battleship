import { Ship } from './ship.js';

export class Gameboard {
    constructor(){
        this.board = {
            1: Array(10).fill(null),
            2: Array(10).fill(null),
            3: Array(10).fill(null),
            4: Array(10).fill(null),
            5: Array(10).fill(null),
            6: Array(10).fill(null),
            7: Array(10).fill(null),
            8: Array(10).fill(null),
            9: Array(10).fill(null),
            10: Array(10).fill(null)}
        this.ships = [];
    }

    placeShip(x, y, length, direction){
        const ship = new Ship(length);
        const coordinates = [];
        for(let i = 0; i < length; i++){
            if(this.shipAlreadyPlaced(x,y,i,direction)){
                return;
            }
            if(direction === 'horizontal'){
                coordinates.push([x, y + i]);
                this.board[x + 1][y + i] = 'ship';
            } else {
                coordinates.push([x + i, y]);
                this.board[x + i + 1][y] = 'ship';
            }
        }
        ship.coordinates = coordinates;
        this.ships.push(ship);
    }

    shipAlreadyPlaced(x,y,i,direction){
        if(direction === 'horizontal'){
            if(this.board[x + 1][y + i] === 'ship'){
                return true;
            }
        } else {
            if(this.board[x + i + 1][y] === 'ship'){
                return true;
            }
        }
        return false;
    }
}