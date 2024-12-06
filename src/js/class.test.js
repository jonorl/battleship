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
  const gameboardObj = new Gameboard();
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
  expect(playerBoard[x-1].length).toBe(y);
});

test("Board places ship in coordinates", () => {

  const gameboardObj = new Gameboard(10, 10);
  const ship = new Ship(5, "horizontal")
  const player = new Player("Jon", "human")
  player.human === true
  expect(gameboardObj.placeShips(ship, 3, 4, player, gameboardObj)).toBeDefined();
});

test("Check if ships are in the right places (horizontal 5)", () => {

  const gameboardObj = new Gameboard(10, 10);
  const ship = new Ship(5, "horizontal");
  const player = new Player("Jon", "human");
  player.human === true;
  gameboardObj.placeShips(ship, 3, 4, player, gameboardObj)
  expect(gameboardObj.board[4][7]).toBeInstanceOf(Object);
});

test("Check if ships are in the right places (vertical 5)", () => {

  const gameboardObj = new Gameboard(10, 10);
  const ship = new Ship(5, "vertical");
  const player = new Player("Jon", "human");
  player.human === true;
  gameboardObj.placeShips(ship, 3, 4, player, gameboardObj)
  expect(gameboardObj.board[8][3]).toBeInstanceOf(Object)
});

test("Ship recieves attack", () => {

  const gameboardObj = new Gameboard(10, 10);
  const ship = new Ship(5, "vertical");
  const player = new Player("Jon", "human");
  player.human === true;
  gameboardObj.placeShips(ship, 3, 4, player, gameboardObj)
  gameboardObj.receiveAttack(3, 4)
  expect(gameboardObj.receiveAttack(4, 3)).toBe(true);
});


test("Ship sinks after being hit shipLen times", () => {

  const gameboardObj = new Gameboard(10, 10);
  const ship = new Ship(5, "vertical");
  const player = new Player("Jon", "human");
  player.human === true;
  gameboardObj.placeShips(ship, 3, 4, player, gameboardObj)
  gameboardObj.receiveAttack(3, 4)
  gameboardObj.receiveAttack(3, 5)
  gameboardObj.receiveAttack(3, 6)
  gameboardObj.receiveAttack(3, 7)
  gameboardObj.receiveAttack(3, 8)
  expect(ship.isSunk()).toBe(true);
});

test("Trigger Game Over", () => {

  const gameboardObj = new Gameboard(10, 10);
  const ship = new Ship(5, "vertical");
  const player = new Player("Jon", "human");
  player.human === true;
  gameboardObj.placeShips(ship, 3, 4, player, gameboardObj)
  gameboardObj.receiveAttack(3, 4)
  gameboardObj.receiveAttack(3, 5)
  gameboardObj.receiveAttack(3, 6)
  gameboardObj.receiveAttack(3, 7)
  gameboardObj.receiveAttack(3, 8)
  expect(gameboardObj.receiveAttack(3, 8)).toBe("Game Over");
});

test("More than one ship", () => {

  const gameboardObj = new Gameboard(10, 10);
  const ship1 = new Ship(5, "vertical");
  const ship2 = new Ship (2, "horizontal");
  const player = new Player("Jon", "human");
  player.human === true;
  gameboardObj.placeShips(ship1, 3, 4, player, gameboardObj)
  gameboardObj.placeShips(ship2, 5, 7, player, gameboardObj)
  gameboardObj.receiveAttack(3, 4)
  gameboardObj.receiveAttack(3, 5)
  gameboardObj.receiveAttack(3, 6)
  gameboardObj.receiveAttack(3, 7)
  gameboardObj.receiveAttack(3, 8)
  gameboardObj.receiveAttack(5, 7)
  gameboardObj.receiveAttack(6, 7)
  expect(gameboardObj.receiveAttack(3, 8)).toBe("Game Over");
});

// Player Class related testing:

test("Player class should exist", () => {
  const playerObj = new Player();
  expect(playerObj).toBeInstanceOf(Player);
});