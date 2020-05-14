import { $ } from '@core/dom'

const SELECTED_CLASS_NAME = 'table__cell--selected'

export const KEY_CODES = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_DOWN: 40
}

export class SelectionManager {
  selectedCell = null

  constructor($root) {
    this.$root = $root
  }

  select({ row, col }) {
    const cellId = `${row}:${col}`
    const selector = `[data-id="${cellId}"]`
    const $cell = this.$root.find(selector)
    $cell.addClass(SELECTED_CLASS_NAME)
    $cell.focus()
    this.selectedCell = $cell
  }

  selectOther(event) {
    const currId = $(event.target).data.id
    const [row, col] = currId.split(':').map(Number)

    this.cleanSelection()
    this.select({ row, col })
  }

  selectNext(event) {
    const currId = this.selectedCell.data.id
    let [row, col] = currId.split(':').map(Number)

    switch (event.keyCode) {
      case KEY_CODES.ARROW_LEFT:
        col--
        break
      case KEY_CODES.ARROW_RIGHT:
        col++
        break
      case KEY_CODES.ARROW_UP:
        row--
        break
      case KEY_CODES.ARROW_DOWN:
        row++
        break
    }

    if (row >= 0 && col >= 0) {
      this.cleanSelection()
      this.select({ row, col })
    }
  }

  cleanSelection() {
    this.selectedCell.removeClass(SELECTED_CLASS_NAME)
    this.selectedCell = null
  }
}
