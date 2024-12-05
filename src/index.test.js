const {
  capitalise,
  reverseString,
  calculator,
  caesarCipher,
  analyseArrayObject
} = require("./js/index");

test("Capitalise test", () => {
  expect(capitalise("jonathan")).toBe("Jonathan");
});

test("Reverse test", () => {
  expect(reverseString("Jonathan")).toBe("nahtanoJ");
});

test("Calculator add test", () => {
  expect(calculator.add(1, 2)).toBe(3);
});

test("Calculator subtract test", () => {
  expect(calculator.subtract(1, 2)).toBe(-1);
});
test("Calculator divide test", () => {
  expect(calculator.divide(12, 4)).toBe(3);
});
test("Calculator multiply test", () => {
  expect(calculator.multiply(12, 4)).toBe(48);
});

test("caesar Cipher test 1 (abc)", () => {
  expect(caesarCipher("abc", 3)).toBe("def");
});
test("caesar Cipher test 2 (wrapping)", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});
test("caesar Cipher test 3 (wrapping upperCase)", () => {
  expect(caesarCipher("XYZ", 3)).toBe("ABC");
});
test("caesar Cipher test 4 (non-alpha chars)", () => {
  expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});
test("analyseArray test)", () => {
  expect(analyseArrayObject.analyseArray([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});
