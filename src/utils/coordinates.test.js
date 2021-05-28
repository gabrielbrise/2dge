const { targetAngle, doubleNumber, makeJuice } = require("./coordinates");

test("should give angle in radians betwen two coordinates", () => {
  const origin = [0, 0];
  const target = [-5, 3];
  const result = targetAngle(origin, target);
  const expected = 2.601173153319209;
  expect(result).toBe(expected);
});

test("should give the next step coordinates", () => {
  function moveStep(origin, target, velocity) {
    const tAngle = targetAngle(origin, target);
    const stepX = Math.cos(tAngle) * velocity;
    const stepY = Math.sin(tAngle) * velocity;
    return [stepX, stepY];
  }
  const origin = [0, 0];
  const target = [-5, 3];
  const velocity = 2;
  const result = moveStep(origin, target, velocity);
  const expected = 0;
  expect(result).toBe(expected);
});

test("should double the input number", () => {
  const result = doubleNumber(5);
  const expected = 10;
  expect(result).toBe(expected);
});

test("should return string with juice of said fruit", () => {
  const result = makeJuice("apple");
  const expected = "apple juice";
  expect(result).toBe(expected);
});

describe("tests related to doubleNumber", () => {
  test("should double positive numbers", () => {
    const result = doubleNumber(5);
    const expected = 10;
    expect(result).toBe(expected);
  });

  test("negative numbers should remain negative", () => {
    expect(doubleNumber(-15)).toBeLessThan(0);
  });
});
