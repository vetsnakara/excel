import { $ } from '@core/dom'

export class Excel {
  constructor($app, element) {
    this.$app = $app
    this.element = element
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
        const component = new Component()
        $element = component.getRoot()
      }

      // append child component
      $root.append($element)
    })

    return $root
  }

  render() {
    const $root = this.getRoot(this.element)
    this.$app.append($root)
  }
}
