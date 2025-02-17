import { Gameboard } from "./gameboard.js";

export class Player {
    constructor(){
        this.gameboard = new Gameboard();
    }

    placeShip(x, y, length, direction){
        this.gameboard.placeShip(x, y, length, direction);
    }

    placeShipRandomly(length){
        let validPlacement = false;
        let x, y, direction;

        while (!validPlacement) {
            direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

            if (direction === 'horizontal') {
                x = Math.floor(Math.random() * (10 - length));
                y = Math.floor(Math.random() * 10);
            } else {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * (10 - length));
            }

            // Check if placement is valid
            if (this.isValidPlacement(x, y, length, direction)) {
                validPlacement = true;
            }
        }

        this.gameboard.placeShip(x, y, length, direction);
    }

    placeAllShipsRandomly(){
        this.placeShipRandomly(4);
        this.placeShipRandomly(4);
        this.placeShipRandomly(3);
        this.placeShipRandomly(3);
        this.placeShipRandomly(2);
        this.placeShipRandomly(2);
        this.placeShipRandomly(2);
        this.placeShipRandomly(1);
        this.placeShipRandomly(1);
    }

    receiveAttack(x, y){
        this.gameboard.receiveAttack(x, y);
    }

    isValidPlacement(x, y, length, direction){
        return this.gameboard.isValidPlacement(x, y, length, direction);
    }

    receiveAttackRandomly(){
        let x , y;

        do{
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while(this.gameboard.board[x][y] !== null && this.gameboard.board[x][y] !== 'ship');

        this.gameboard.receiveAttack(x, y);
    }

    clearBoard(){
        this.gameboard.clearBoard();
    }


}