import { $ } from '@core/dom'
import { Emitter } from '@core/Emitter'

export class Excel {
  constructor($app, element) {
    this.$app = $app
    this.element = element
    this.componentOptions = {
      emitter: new Emitter()
    }
  }

  getRoot(element) {
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
        $element = this.getRoot(Component)
      } else {
        const component = new Component(this.componentOptions)
        component.init()

        $element = component.getRoot()
      }

      // append child component
      $root.append($element)
    })

    return $root
  }

  destroy() {}

  render() {
    const $root = this.getRoot(this.element)
    this.$app.append($root)
  }
}
