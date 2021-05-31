import Canvas, { ICanvas } from "../Canvas";
import { Coordinates } from "../constants/types";
import Keyboard from "../Keyboard";
import {
  targetAngle,
  moveStep,
  isOnScreen,
  isMoving,
  calculateDirectionVector,
} from "./coordinates";

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

describe("test if any keys related to moving the character are being pressed", () => {
  test("should return true if pressing one of the keys", () => {
    let key = new Keyboard();
    key.s = true;
    const result = isMoving(key);
    const expected = true;
    expect(result).toBe(expected);
  });
  test("should return false if none of the keys are being pressed", () => {
    let key = new Keyboard();
    const result = isMoving(key);
    const expected = false;
    expect(result).toBe(expected);
  });
});

describe("calculate the direction vector based on pressed keys", () => {
  test("should return values that correspond to the direction if moving keys are being pressed", () => {
    let key = new Keyboard();
    key.s = true;
    key.d = true;
    const result = calculateDirectionVector(key);
    const expected = { x: 1, y: 1 };
    expect(result).toStrictEqual(expected);
  });

  test("should return 0 for both x and y if no moving keys are being pressed", () => {
    let key = new Keyboard();
    const result = calculateDirectionVector(key);
    const expected = { x: 0, y: 0 };
    expect(result).toStrictEqual(expected);
  });
});
