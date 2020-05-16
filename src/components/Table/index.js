import { Component } from '@/core/Component'
import { $ } from '@core/dom'
import { KEY_CODES } from '@config/keyCodes'

import { getTable } from './template'
import { ResizeManager } from './ResizeManager'
import { SelectionManager } from './SelectionManager'

export class Table extends Component {
  static className = 'table'

  onKeydown(event) {
    if (shouldSelect('keys', event)) {
      this.selectionManager.handle('keys', event)
    }
  }

  onInput(event) {
    this.$emit('cell:input', event.target.textContent)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeManager.initResize(this.$root, event)
    }

    if (shouldSelect('click', event)) {
      this.selectionManager.handle('click', event)
    }
  }

  onCellSelect(event) {
    console.log('select')
    this.$emit('cell:select', $(event.target).text())
  }

  init() {
    super.init()

    this.selectionManager = new SelectionManager(this.$root)
    this.resizeManager = new ResizeManager(this.$root)

    this.subscribe()
  }

  subscribe() {
    this.$on('formula:input', (formulaText) => {
      const currentCell = this.selectionManager.getCurrentCell()
      currentCell.setContent(formulaText)
    })

    this.$on('formula:done', () => {
      const currentCell = this.selectionManager.getCurrentCell()
      currentCell.focus()
    })
  }

  toHTML() {
    return getTable()
  }
}

function shouldResize({ target }) {
  const $target = $(target)
  return $target.data.resize
}

function shouldSelect(type, { target, keyCode }) {
  switch (type) {
    case 'click':
      return $(target).data.type === 'cell'
    case 'keys':
      return Object.values(KEY_CODES).includes(keyCode)
    default:
      return false
  }
}
