
export class Ship {
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.isSunk = false;
        this.coordinates = [];
    }

    hit(){
        this.hits++;
        this.isSunk();
    }

    isSunk(){
        if(this.hits === this.length){
            this.isSunk = true;
        }
    }
}