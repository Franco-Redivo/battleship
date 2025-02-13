import { Gameboard } from './gameboard.js';

test('Gameboard has a board and ships', () => {
    const gameboard = new Gameboard();
    expect(gameboard.board).toEqual({
        0: Array(10).fill(null),
        1: Array(10).fill(null),
        2: Array(10).fill(null),
        3: Array(10).fill(null),
        4: Array(10).fill(null),
        5: Array(10).fill(null),
        6: Array(10).fill(null),
        7: Array(10).fill(null),
        8: Array(10).fill(null),
        9: Array(10).fill(null)
    });
    expect(gameboard.ships).toEqual([]);
});

//placeShip tests

test('Gameboard can place a ship', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(0, 0, 3, 'horizontal');
    expect(gameboard.ships[0].coordinates).toEqual([
        [0, 0],
        [1, 0],
        [2, 0]
    ]);
    gameboard.placeShip(1, 1, 3, 'vertical');
    expect(gameboard.ships[1].coordinates).toEqual([
        [1, 1],
        [1, 2],
        [1, 3]
    ]);
});

test('Gameboard cant place a ship on top of another ship', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(0, 0, 3, 'horizontal');
    gameboard.placeShip(0, 0, 3, 'horizontal');
    expect(gameboard.ships.length).toBe(1);
});

test('Gameboard cant place a ship outside the board', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(9, 0, 3, 'horizontal');
    expect(gameboard.ships.length).toBe(0);
    gameboard.placeShip(0, 9, 3, 'vertical');
    expect(gameboard.ships.length).toBe(0);
});

//receiveAttack tests

test('Gameboard can receive an attack', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(0, 0, 3, 'horizontal');
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0]).toBe('hit');
    gameboard.receiveAttack(0, 1);
    expect(gameboard.board[0][1]).toBe('miss');
});

test('Gameboard can receive an attack and sink a ship', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(0, 0, 3, 'horizontal');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);
    expect(gameboard.ships[0].isSunk).toBe(true);
});

test('Gameboard can recieve an attack and determine if all ships are sunk', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(0, 0, 3, 'horizontal');
    gameboard.placeShip(0, 1, 3, 'horizontal');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(2, 1);
    expect(gameboard.allShipsSunk()).toBe(true);
});