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

    isValidPlacement(x, y, length, direction){
        for (let i = -1; i <= length; i++) {
            for (let j = -1; j <= 1; j++) {
                let checkX = x + (direction === 'horizontal' ? i : j);
                let checkY = y + (direction === 'horizontal' ? j : i);
    
                // Ignore out-of-bounds checks
                if (checkX >= 0 && checkX < 10 && checkY >= 0 && checkY < 10) {
                    if (this.board[checkX][checkY] === 'ship') {
                        return false; // Found a nearby ship, placement is invalid
                    }
                }
            }
        }
        return true; // Placement is valid
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

    receiveAttack(x, y){
        x = Number(x);  // Convert to number
        y = Number(y);  // Convert to number
    
        if(this.board[x][y] === 'ship'){
            this.board[x][y] = 'hit';
            
            this.ships.forEach(ship => {
                ship.coordinates.forEach(coord => {
                    if(coord[0] === x && coord[1] === y){  
                        console.log(`Ship hit at (${x}, ${y})`);
                        ship.hit();  // ✅ Increase the hit counter
                        ship.checkIfSunk();
                        
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

    shipSunk(x,y){
        this.ships.forEach(ship => {
            ship.coordinates.forEach(coord => {
                if(coord[0] === x && coord[1] === y){
                    if(ship.isSunk){
                        return true;
                    }
                }
            });
        });
        return false;

    }



    allShipsSunk(){
        return this.ships.length > 0 && this.ships.every(ship => ship.isSunk);
    }

    clearBoard(){
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                this.board[i][j] = null;
            }
        }
        this.ships = [];
    }
}