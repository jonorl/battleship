const { Ship, Player, Gameboard } = require("./class");

// Ship Class related testing:

test("ship class should exist", () => {
  const shipObj = new Ship();
  expect(shipObj).toBeInstanceOf(Ship);
});

test("shipLen attribute should exist", () => {
  const ship = new Ship(5);
  expect(ship.shipLen).toBeDefined();
});

test("shipSunk defaults to false", () => {
  const ship = new Ship(5);
  expect(ship.sunk).toBe(false);
});

test("Ship hit method exists", () => {
  const ship = new Ship(5);
  expect(ship.hit).toBeDefined();
});

test("Ship hit works", () => {
  const ship = new Ship(5);
  ship.hit(1);
  expect(ship.numberOfHits).toBe(1);
});

test("Ship(5) is sunk after being hit 5 times test", () => {
  const ship = new Ship(5);
  ship.hit(1);
  ship.isSunk();
  ship.hit(1);
  ship.isSunk();
  ship.hit(1);
  ship.isSunk();
  ship.hit(1);
  ship.isSunk();
  ship.hit(1);
  ship.isSunk();
  expect(ship.isSunk()).toBe(true);
});

test("Ship(5) is not sunk after being hit 4 times test", () => {
  const ship = new Ship(5);
  ship.hit(1);
  ship.isSunk();
  ship.hit(1);
  ship.isSunk();
  ship.hit(1);
  ship.isSunk();
  ship.hit(1);
  ship.isSunk();
  expect(ship.isSunk()).toBe(false);
});

// Gameboard Class related testing:

test("Gameboard class should exist", () => {
  const gameboardObj = new Gameboard(10, 10);
  expect(gameboardObj).toBeInstanceOf(Gameboard);
});

test("Y axis attribute should exist in Gameboard", () => {
  const gameboardObj = new Gameboard(10, 10);
  expect(gameboardObj.axisY).toBeDefined();
});

test("board creates a 10x10 grid", () => {
  const gameboardObj = new Gameboard(10, 10);
  expect(gameboardObj.axisX).toBe(10);
  expect(gameboardObj.axisY).toBe(10);
});

test("board takes 10x10 values", () => {
  let x = 10;
  let y = 10;
  const gameboardObj = new Gameboard(x, y);
  const playerBoard = gameboardObj.createBoard();
  expect(playerBoard[x - 1].length).toBe(y);
});

test("Board places ship in coordinates", () => {
  const ship = new Ship(5, "horizontal");
  const player = new Player("Jon", "human");
  expect(player.playerGameboard.placeShips(ship, 3, 4, player)).toBeDefined();
});

test("Check if ship created returns out of bounds", () => {
  const ship = new Ship(5, "vertical");
  const player = new Player("Jon", "human");
  expect(player.playerGameboard.placeShips(ship, 8, 6, player)).toBe(
    "Error placement out of bounds"
  );
});

test("Check if ships are in the right places (horizontal 5)", () => {
  const ship = new Ship(5, "horizontal");
  const player = new Player("Jon", "human");
  player.playerGameboard.placeShips(ship, 3, 4, player);
  expect(player.playerGameboard.board[4][3]).toBeInstanceOf(Object);
});

test("Check if ships are in the right places (vertical 5)", () => {
  const ship = new Ship(5, "vertical");
  const player = new Player("Jon", "human");
  player.playerGameboard.placeShips(ship, 3, 4, player);
  expect(player.playerGameboard.board[8][3]).toBeInstanceOf(Object);
});

test("Check if ship overlapping is allowed", () => {
  const ship1 = new Ship(5, "vertical");
  const ship2 = new Ship(5, "horizontal");
  const player = new Player("Jon", "human");
  player.playerGameboard.placeShips(ship1, 3, 4, player);
  expect(player.playerGameboard.placeShips(ship2, 3, 4, player)).toBe(
    "overlapping ships are not allowed"
  );
});

test("Ship recieves attack", () => {
  const ship = new Ship(5, "vertical");
  const player = new Player("Jon", "human");
  player.playerGameboard.placeShips(ship, 3, 4, player);
  expect(player.playerGameboard.receiveAttack(3, 4)).toBe(true);
});

test("Ship sinks after being hit shipLen times", () => {
  const ship = new Ship(5, "vertical");
  const player = new Player("Jon", "human");
  player.playerGameboard.placeShips(ship, 3, 4, player);
  player.playerGameboard.receiveAttack(3, 4);
  player.playerGameboard.receiveAttack(3, 5);
  player.playerGameboard.receiveAttack(3, 6);
  player.playerGameboard.receiveAttack(3, 7);
  player.playerGameboard.receiveAttack(3, 8);
  expect(ship.isSunk()).toBe(true);
});

test("Trigger Game Over", () => {
  const ship = new Ship(5, "vertical");
  const player = new Player("Jon", "human");
  player.human === true;
  player.playerGameboard.placeShips(ship, 3, 4, player);
  player.playerGameboard.receiveAttack(3, 4);
  player.playerGameboard.receiveAttack(3, 5);
  player.playerGameboard.receiveAttack(3, 6);
  player.playerGameboard.receiveAttack(3, 7);
  expect(player.playerGameboard.receiveAttack(3, 8)).toBe("Game Over");
});

test("More than one ship", () => {
  const ship1 = new Ship(5, "vertical");
  const ship2 = new Ship(2, "horizontal");
  const player = new Player("Jon", "human");
  player.playerGameboard.placeShips(ship1, 3, 4, player);
  player.playerGameboard.placeShips(ship2, 5, 7, player);
  player.playerGameboard.receiveAttack(3, 4);
  player.playerGameboard.receiveAttack(3, 5);
  player.playerGameboard.receiveAttack(3, 6);
  player.playerGameboard.receiveAttack(3, 7);
  player.playerGameboard.receiveAttack(3, 8);
  player.playerGameboard.receiveAttack(5, 7);
  expect(player.playerGameboard.receiveAttack(6, 7)).toBe("Game Over");
});

// Player Class related testing:

test("Player class should exist", () => {
  const playerObj = new Player();
  expect(playerObj).toBeInstanceOf(Player);
});

test("Game Over for player 2", () => {
  const player1 = new Player("Jon", "human");
  const player2 = new Player("Asus", "cpu");
  const ship1 = new Ship(5, "vertical");
  const ship2 = new Ship(2, "horizontal");
  player1.playerGameboard.placeShips(ship1, 3, 4, player1);
  player2.playerGameboard.placeShips(ship2, 5, 7, player2);
  player2.playerGameboard.receiveAttack(5, 7);
  expect(player2.playerGameboard.receiveAttack(6, 7)).toBe("Game Over");
});
