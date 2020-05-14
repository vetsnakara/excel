import { $ } from '@core/dom'
import { DomListener } from '@core/DomListener'

// 1. create root element
// 2. init method for component initialization
//    -  initialization of dom listeners

export class Component extends DomListener {
  constructor() {
    super()
    this.createRoot()
    this.prepare()
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

  prepare() {}

  init() {
    this.initDomListeners()
  }
}
