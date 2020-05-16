export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners.forEach((listener) => listener(...args))
    }
  }

  subscribe(eventName, listener) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(listener)

    const unsubscibe = () =>
      this.listeners[eventName].filter((l) => l !== listener)

    return unsubscibe
  }
}
