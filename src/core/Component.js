import { $ } from '@core/dom'
import { DomListener } from '@core/DomListener'

export class Component extends DomListener {
  constructor({ emitter = null } = {}) {
    super()

    this.createRoot()

    this.unsubscribers = []
    this.emitter = emitter
  }

  $on(eventName, listener) {
    const unsubscribe = this.emitter.subscribe(eventName, listener)
    this.unsubscribers.push(unsubscribe)
  }

  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args)
  }

  unsubscribe() {
    this.unsubscribers.forEach((unsub) => unsub())
    this.unsubscribers = []
  }

  createRoot() {
    const {
      elementName = 'div', // root element type
      className = '' // root element class
    } = this.constructor // child component class

    // create root DOM node
    this.$root = $.create(elementName, className)
    this.$root.html(this.toHTML())
  }

  getRoot() {
    return this.$root
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    console.log('component:destroy')
    this.removeDomListeners()
    this.unsubscribe()
  }
}
