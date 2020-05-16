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

  async onMousedown(event) {
    try {
      if (shouldResize(event)) {
        const result = await this.resizeManager.startResize(this.$root, event)
        const { type, ...data } = result
        const actionType = type === 'col' ? 'COL_RESIZE' : 'ROW_RESIZE'

        this.$dispatch({ type: actionType, ...data })
      }
    } catch (error) {
      console.warn(error.message)
    }

    if (shouldSelect('click', event)) {
      this.selectionManager.handle('click', event)
    }
  }

  onCellSelect(event) {
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

    this.$subscribe((state) => console.log('table', state))
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
