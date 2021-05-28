function targetAngle(origin, target) {
  deltaX = target[0] - origin[0];
  deltaY = target[1] - origin[1];
  thetaRadians = Math.atan2(deltaY, deltaX);
  return thetaRadians;
}

function doubleNumber(number) {
  return number * 2;
}

function makeJuice(fruit) {
  return `${fruit} juice`;
}

module.exports = {
  targetAngle,
  doubleNumber,
  makeJuice,
};
