import { Component } from '@/core/Component'
import { $ } from '@core/dom'

import { getTable } from './template'

const RESIZE_TYPE_COL = 'col'
const RESIZE_TYPE_ROW = 'row'

export class Table extends Component {
  static className = 'table'

  resizing = false

  screenX = null
  screenY = null

  startWidth = null

  colIndex = null
  cellsToResize = null
  rowToResize = null
  delta = null

  onMousedown({ target, screenX, screenY }) {
    this.resizer = $(target)
    this.resizeType = this.resizer.data.resize

    if (this.resizeType) {
      this.resizing = true

      this.screenX = screenX
      this.screenY = screenY

      if (this.resizeType === RESIZE_TYPE_COL) {
        const column = this.resizer.closest('[data-col]')
        const colIndex = column.data.col

        this.cellsToResize = this.$root.findAll(`[data-col="${colIndex}"]`)
        this.startWidth = parseInt(column.css('width'))
      } else if (this.resizeType === RESIZE_TYPE_ROW) {
        this.rowToResize = this.resizer.closest('[data-row]')
        this.startHeight = parseInt(this.rowToResize.css('height'))
      }
    }
  }

  onMouseup() {
    if (this.resizing) {
      this.resize()
      this.resetResizer()
      this.resizing = false
    }
  }

  onMousemove({ screenX, screenY }) {
    if (this.resizing) {
      this.updateCursorDelta(screenX, screenY)
      this.moveResizer()
    }
  }

  resizeColCells() {
    this.cellsToResize.forEach((cell) => {
      cell.css({ width: `${this.startWidth + this.delta.x}px` })
    })
  }

  resizeRow() {
    this.rowToResize.css({ height: `${this.startHeight + this.delta.y}px` })
  }

  updateCursorDelta(x, y) {
    this.delta = {
      x: x - this.screenX,
      y: y - this.screenY
    }
  }

  moveResizer() {
    if (this.resizeType === RESIZE_TYPE_COL) {
      this.resizer.css({
        transform: `translateX(${this.delta.x}px)`
      })
    } else if (this.resizeType === RESIZE_TYPE_ROW) {
      this.resizer.css({
        transform: `translateY(${this.delta.y}px)`
      })
    }
  }

  resize() {
    if (this.resizeType === RESIZE_TYPE_COL) {
      this.resizeColCells()
    } else if (this.resizeType === RESIZE_TYPE_ROW) {
      this.resizeRow()
    }
  }

  resetResizer() {
    if (this.resizeType === RESIZE_TYPE_COL) {
      this.resizer.css({
        transform: `translateX(0)`
      })
    } else if (this.resizeType === RESIZE_TYPE_ROW) {
      this.resizer.css({
        transform: `translateY(0)`
      })
    }
  }

  toHTML() {
    return getTable()
  }
}
