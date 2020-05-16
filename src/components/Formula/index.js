import { KEY_CODES } from '@config/keyCodes'

import { Component } from '@/core/Component'

export class Formula extends Component {
  static className = 'formula'

  constructor(options) {
    super(options)

    this.setInputValue = this.setInputValue.bind(this)

    this.input = this.$root.find('input')
  }

  init() {
    super.init()
    this.subscribe()
  }

  toHTML() {
    return `
      <div class="formula__label">
        <span>fx</span>
      </div>
      <input class="formula__input" />
    `
  }

  onInput(event) {
    this.$emit('formula:input', event.target.value)
  }

  onKeydown(event) {
    if (event.keyCode === KEY_CODES.ENTER) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }

  setInputValue(value) {
    this.input.value(value)
  }

  subscribe() {
    this.$on('cell:input', this.setInputValue)
    this.$on('cell:select', this.setInputValue)
  }
}
