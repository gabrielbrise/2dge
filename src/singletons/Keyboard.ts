export default class Keyboard {
  [key: string]: any;
  constructor() {
    this.actions = [];
    window.addEventListener("keydown", (key) => {
      this[key.key] = true;
    });
    window.addEventListener("keyup", (key) => {
      this[key.key] = false;
    });
  }
  addAction(key: any, action: any) {
    window.addEventListener(key, (e) => action(e));
  }
}
