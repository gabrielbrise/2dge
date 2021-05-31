import Canvas, { ICanvas } from "../Canvas";
import { Coordinates } from "../constants/types";
import { targetAngle, moveStep, isOnScreen } from "./coordinates";

test("should give angle in radians betwen two coordinates", () => {
  const origin: Coordinates = [0, 0];
  const target: Coordinates = [-5, 3];
  const result = targetAngle(origin, target);
  const expected = 2.601173153319209;
  expect(result).toBe(expected);
});

test("should give the next step coordinates delta", () => {
  const origin: Coordinates = [0, 0];
  const target: Coordinates = [-5, 3];
  const velocity = 2;
  const result = moveStep(origin, target, velocity);
  const expected = [-1.7149858514250884, 1.0289915108550531];
  expect(result).toStrictEqual(expected);
});

describe("test if coordinates are inside canvas view", () => {
  let canvas = new Canvas(640, 480);
  test("should return false if outside canvas view", () => {
    const coordinates: Coordinates = [125, 900];
    const result = isOnScreen(coordinates, canvas);
    const expected = false;
    expect(result).toBe(expected);
  });

  test("should return true is inside canvas view", () => {
    const coordinates: Coordinates = [200, 350];
    const result = isOnScreen(coordinates, canvas);
    const expected = true;
    expect(result).toBe(expected);
  });
});
