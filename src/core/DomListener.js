export class DomListener {
  constructor() {
    // get event event handlers names of child component
    const prototype = Object.getPrototypeOf(this)
    this.eventHandlers = Object.getOwnPropertyNames(prototype).filter(
      isEventHandler
    )
  }

  initDomListeners() {
    this.eventHandlers.forEach((handler) => {
      const event = getEventName(handler)
      this[handler] = this[handler].bind(this)
      this.$root.on(event, this[handler])
    })
  }

  removeDomListeners() {
    this.eventHandlers.forEach((handler) => {
      const event = getEventName(handler)
      this.$root.off(event, this[handler])
    })
  }
}

function getEventName(handlerName) {
  return handlerName.slice(2).toLowerCase()
}

function isEventHandler(name) {
  return name.startsWith('on')
}
