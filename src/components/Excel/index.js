import { $ } from '@core/dom'
import { Emitter } from '@core/Emitter'
import { Subscriber } from '@core/Subscriber'
import { changeTableDate } from '@/redux/actions'

export class Excel {
  constructor(element, store) {
    this.element = element

    this.componentOptions = {
      emitter: new Emitter(),
      store
    }

    this.components = []

    this.subscriber = new Subscriber(store)

    store.dispatch(changeTableDate(new Date()))
  }

  createRoot(element) {
    const {
      root: { elementName, className },
      components
    } = element

    // create root element
    const $root = $.create(elementName, className)

    // iterate through child components
    components.forEach((Component) => {
      let $element

      if (typeof Component === 'object') {
        $element = this.createRoot(Component)
      } else {
        const component = new Component(this.componentOptions)
        component.init()

        this.components.push(component)
        this.subscriber.add(component)

        $element = component.getRoot()
      }

      // append child component
      $root.append($element)
    })

    return $root
  }

  destroy() {
    this.components.forEach((component) => component.destroy())
    this.subscriber.unsubscribe()
  }

  getRoot() {
    this.subscriber.subscribe()
    return this.createRoot(this.element)
  }

  afterMount() {
    this.components.forEach((component) => component.afterMount())
  }
}
