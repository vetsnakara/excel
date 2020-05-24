import { KEY_CODES } from '@config/keyCodes'

import { Component } from '@/core/Component'

export class Formula extends Component {
  static className = 'formula'

  constructor(options) {
    super(options)

    this.focusCellId = null

    this.setInputValue = this.setInputValue.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  onInput({ target: { value } }) {
    this.$emit('formula:change', value)
  }

  onKeydown({ keyCode }) {
    if (keyCode === KEY_CODES.ESQ) {
      this.restoreInputValue()
      this.$emit('formula:cancel')
    }

    if (keyCode === KEY_CODES.ENTER) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }

  setInputValue(value) {
    this.input.value(value)
  }

  init() {
    super.init()

    this.input = this.$root.find('input')
    this.addInputListeners()

    this.subscribe()
  }

  handleFocus() {
    this.$emit('formula:focus')
  }

  addInputListeners() {
    this.input.on('focus', this.handleFocus)
  }

  removeInputListeners() {
    this.input.off('focus', this.handleFocus)
  }

  restoreInputValue() {
    const { activeCell, tableData } = this.store.getState()
    const cellData = tableData[activeCell]
    const formula = (cellData && cellData.formula) || ''
    this.setInputValue(formula)
  }

  subscribe() {
    this.$on('content:change', (content) => {
      this.input.value(content)
    })

    this.$on('cell:change', () => {
      this.restoreInputValue()
    })
  }

  toHTML() {
    return `
      <div class="formula__label">
        <span>fx</span>
      </div>
      <input class="formula__input" />
    `
  }

  destroy() {
    super.destroy()
    this.removeInputListeners()
  }
}
