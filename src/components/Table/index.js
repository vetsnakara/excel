import { Component } from '@/core/Component'
import { $ } from '@core/dom'
import { KEY_CODES } from '@config/keyCodes'

import { getTable } from './template'
import { ResizeManager } from './ResizeManager'
import { SelectionManager } from './SelectionManager'

import {
  tableResize,
  changeActiveCell,
  changeCellContent
} from '@/redux/actions'

export class Table extends Component {
  static className = 'table'

  onKeydown(event) {
    if (shouldSelect('keys', event)) {
      this.selectionManager.handle('keys', event)
    }
  }

  onInput(event) {
    const cellText = event.target.textContent
    this.$dispatch(changeCellContent(cellText))
  }

  async onMousedown(event) {
    try {
      if (shouldResize(event)) {
        const result = await this.resizeManager.startResize(this.$root, event)
        const { type, ...data } = result
        this.$dispatch(tableResize(type, data))
      }

      if (shouldSelect('click', event)) {
        this.selectionManager.handle('click', event)
      }
    } catch (error) {
      console.warn(error.message)
    }
  }

  onCellSelect(event) {
    const { id } = this.selectionManager.getCurrentCell()
    this.$dispatch(changeActiveCell(id))
  }

  init() {
    super.init()

    const { activeCell } = this.store.getState()

    this.selectionManager = new SelectionManager(this.$root)
    this.selectionManager.init(activeCell)

    this.resizeManager = new ResizeManager(this.$root)

    this.subscribe()
  }

  subscribe() {
    // store subscriptions
    this.$subscribe(({ activeCell, tableData }) => {
      const data = tableData[activeCell]
      const content = data ? data.content : ''
      const currentCell = this.selectionManager.getCurrentCell()
      currentCell.setContent(content)
    })

    // other subscriptions
    this.$on('formula:done', () => {
      const currentCell = this.selectionManager.getCurrentCell()
      currentCell.focus()
    })
  }

  toHTML() {
    return getTable(this.store.getState())
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
