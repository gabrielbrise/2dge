import { Coordinates } from "../constants/types";

export function targetAngle(origin: Coordinates, target: Coordinates) {
  const deltaX = target[0] - origin[0];
  const deltaY = target[1] - origin[1];
  const thetaRadians = Math.atan2(deltaY, deltaX);
  return thetaRadians;
}

export function moveStep(
  origin: Coordinates,
  target: Coordinates,
  velocity: number
) {
  const tAngle = targetAngle(origin, target);
  const stepX = Math.cos(tAngle) * velocity;
  const stepY = Math.sin(tAngle) * velocity;
  return [stepX, stepY];
}

export function isMoving(key: any) {
  return key.w | key.s | key.a | key.d;
}

export function calculateDirectionVector(key: any) {
  const wKey = key.w ? -1 : 0;
  const sKey = key.s ? 1 : 0;
  const dKey = key.d ? 1 : 0;
  const aKey = key.a ? -1 : 0;
  const xDelta = aKey + dKey;
  const yDelta = wKey + sKey;
  return {
    x: xDelta,
    y: yDelta,
  };
}
