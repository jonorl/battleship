const {
  Ship,
} = require("./auxFunctions");

// Ship Class related testing:

test("ship class should exist", () => {
    const shipObj = new Ship();
  expect(shipObj).toBeInstanceOf(Ship);
});

test('shipLen attribute should exist', () => {
  const ship = new Ship(5);
  expect(ship.shipLen).toBeDefined();
});

test('shipSunk defaults to false', () => {
  const ship = new Ship(5);
  expect(ship.sunk).toBe(false);
});

test('Ship hit method exists', () => {
  const ship = new Ship(5);
  expect(ship.hit).toBeDefined();
});

test('Ship hit works', () => {
  const ship = new Ship(5);
  ship.hit(1)
  expect(ship.numberOfHits).toBe(1);
});

test('Ship(5) is sunk after being hit 5 times test', () => {
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

test('Ship(5) is not sunk after being hit 4 times test', () => {
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


