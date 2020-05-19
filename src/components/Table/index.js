import { Component } from '@/core/Component'
import { $ } from '@core/dom'
import { KEY_CODES } from '@config/keyCodes'

import { getTable } from './Table.template'
import { ResizeManager } from './ResizeManager'
import { SelectionManager } from './SelectionManager'

import { getStyles } from '@utils/styles'

import {
  tableResize,
  changeActiveCell,
  changeCellContent,
  changeCellFormat
} from '@/redux/actions'

export class Table extends Component {
  static className = 'table'

  constructor(options) {
    super(options)

    this.stateSubscriptions = ['tableData']
  }

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
    this.$on('formula:done', () => {
      const currentCell = this.selectionManager.getCurrentCell()
      currentCell.focus()
    })

    this.$on('format:change', (format) => {
      const selectedIds = Object.keys(this.selectionManager.selectionList.list)
      this.$dispatch(changeCellFormat(format, selectedIds))
    })
  }

  onStateChange(field, { activeCell, tableData }) {
    const currentCell = this.selectionManager.getCurrentCell()
    const selectedCells = this.selectionManager.selectionList.list

    const data = tableData[activeCell]
    const content = data ? data.content : ''
    const format = data ? data.format : {}

    // set styles
    currentCell.setContent(content)

    // set content
    Object.values(selectedCells).map((cell) => {
      if (format) {
        const styles = getStyles(format)
        cell.setStyles(styles)
      }
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
