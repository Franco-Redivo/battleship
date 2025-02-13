import { Gameboard } from "./gameboard.js";

export class Player {
    constructor(){
        this.gameboard = new Gameboard();
    }

    placeShip(x, y, length, direction){
        this.gameboard.placeShip(x, y, length, direction);
    }



}