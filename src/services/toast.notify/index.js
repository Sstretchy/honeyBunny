export default class ToastService {
  static handler = {};

  static notify(message) {
    this.handler({ message });
  }

  static addEventListener(handler) {
    this.handler = handler;
  }

  static removeEventListener() {
    this.handler = {};
  }
}
