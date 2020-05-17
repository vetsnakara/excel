import { $ } from '@core/dom'
import { DomListener } from '@core/DomListener'

export class Component extends DomListener {
  constructor({ emitter = null, store } = {}) {
    super()

    // emitter
    this.unsubscribers = []
    this.emitter = emitter

    // store
    this.store = store
    this.stateSubscriptions = []

    this.createRoot()
  }

  $on(eventName, listener) {
    const unsubscribe = this.emitter.subscribe(eventName, listener)
    this.unsubscribers.push(unsubscribe)
  }

  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  onStateChange() {}

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
    this.removeDomListeners()
  }
}
