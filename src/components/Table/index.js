import { Component } from '@/core/Component'
import { getTable } from './template'

export class Table extends Component {
  static className = 'table'

  resizing = false
  screenX = null
  startWidth = null
  colIndex = null

  onMousedown({ target, screenX, screenY }) {
    const { resize } = target.dataset

    // todo: use closest
    // todo: use data-attributes

    if (resize === 'col') {
      this.resizing = true
      this.screenX = screenX

      const col = target.parentElement
      const cols = Array.from(col.parentElement.children)
      this.colIndex = cols.indexOf(col)

      this.startWidth = parseInt(getComputedStyle(col).flexBasis)
    }
  }

  onMouseup() {
    if (this.resizing) {
      this.resizing = false
    }
  }

  onMousemove({ screenX, screenY }) {
    if (this.resizing) {
      const deltaX = screenX - this.screenX
      this.resizeCol(deltaX)
    }
  }

  resizeCol(deltaX) {
    const rows = Array.from(
      this.$root.$el.querySelectorAll('[data-element="row"]')
    )

    rows.forEach((row) => {
      const cell = Array.from(row.children)[this.colIndex]
      cell.style.flexBasis = this.startWidth + deltaX + 'px'
    })
  }

  toHTML() {
    return getTable()
  }
}
