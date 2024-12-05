const {
  Ship,
} = require("./auxFunctions");

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

// test("analyseArray test)", () => {
//   expect(analyseArrayObject.analyseArray([1, 8, 3, 4, 2, 6])).toEqual({
//     average: 4,
//     min: 1,
//     max: 8,
//     length: 6,
//   });
// });
