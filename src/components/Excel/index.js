import { $ } from '@core/dom'
import { Emitter } from '@core/Emitter'
import { Subscriber } from '@core/Subscriber'

export class Excel {
  constructor($app, element, store) {
    this.$app = $app
    this.element = element

    this.componentOptions = {
      emitter: new Emitter(),
      store
    }

    this.components = []

    this.subscriber = new Subscriber(store)
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

  render() {
    this.subscriber.subscribe()
    const $root = this.createRoot(this.element)
    this.$app.append($root)
  }
}
