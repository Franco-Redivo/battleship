import { Gameboard } from "./gameboard.js";

export class Player {
    constructor(){
        this.gameboard = new Gameboard();
    }

    placeShip(x, y, length, direction){
        this.gameboard.placeShip(x, y, length, direction);
    }

    placeShipRandomly(length){
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        let direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        this.gameboard.placeShip(x, y, length, direction);
    }

    receiveAttack(x, y){
        this.gameboard.receiveAttack(x, y);
    }

    receiveAttackRandomly(){
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        this.gameboard.receiveAttack(x, y);
    }


}