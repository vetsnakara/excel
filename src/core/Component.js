import { $ } from '@core/dom'
import { DomListener } from '@core/DomListener'

export class Component extends DomListener {
  constructor() {
    super()

    const {
      elementName = 'div', // root element type
      className = '' // root element class
    } = this.constructor // child component class

    // create root DOM node
    this.$root = $.create(elementName, className)
  }

  getRoot() {
    this.$root.html(this.toHTML())
    return this.$root
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
