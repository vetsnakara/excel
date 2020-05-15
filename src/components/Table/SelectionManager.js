import { $ } from '@core/dom'

const SELECTED_CLASS_NAME = 'table__cell--selected'
const CURRENT_CELL_CLASS_NAME = 'table__cell--current'

export const KEY_CODES = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_DOWN: 40
}

export class SelectionManager {
  selectMode = null

  currentCell = null
  selectedCells = []
  currentSelectionCoords = null

  constructor($root) {
    this.$root = $root

    // set default selection on app load
    const $cell = this.findCellByCoords(0, 0)
    this.setNewCurrentCell($cell)
  }

  setNewCurrentCell($cell) {
    if (this.currentCell) {
      this.currentCell.removeClass(CURRENT_CELL_CLASS_NAME)
    }

    this.resetSelectionGroup()

    this.currentCell = $cell
    this.currentCell.addClass(CURRENT_CELL_CLASS_NAME)
    this.selectCell($cell)
  }

  expandSelection($target) {
    let [basicRow, basicCol] = parseId(this.currentCell.data.id)
    let [endRow, endCol] = parseId($target.data.id)

    this.cleanSelectionGroup()

    if (basicRow > endRow) {
      ;[endRow, basicRow] = [basicRow, endRow]
    }

    if (basicCol > endCol) {
      ;[endCol, basicCol] = [basicCol, endCol]
    }

    for (let i = basicRow; i <= endRow; i++) {
      for (let j = basicCol; j <= endCol; j++) {
        const $cell = this.findCellByCoords(i, j)
        this.selectCell($cell)
      }
    }
  }

  handle(type, { target, keyCode, shiftKey, ctrlKey }) {
    let $target

    if (type === 'click') {
      $target = $(target)
      const [row, col] = parseId($target.data.id)
      this.currentSelectionCoords = { row, col }
    } else {
      let { row, col } = this.currentSelectionCoords

      switch (keyCode) {
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
      const shouldSelect = row >= 0 && col >= 0

      if (shouldSelect) {
        $target = this.findCellByCoords(row, col)
        this.currentSelectionCoords = { row, col }
      } else {
        return
      }
    }

    // ===========

    if (!ctrlKey) {
      this.cleanSelection()
    }

    // set new current selection
    if (!shiftKey) {
      this.setNewCurrentCell($target)
    } /* use shift key */ else {
      // expand current selection
      this.expandSelection($target)
    }
  }

  selectCell($cell) {
    $cell.addClass(SELECTED_CLASS_NAME)
    $cell.selectionGroup = true
    this.selectedCells.push($cell)
  }

  cleanSelectionGroup() {
    this.selectedCells
      .filter(($c) => $c.selectionGroup)
      .forEach(($c) => $c.removeClass(SELECTED_CLASS_NAME))

    this.selectedCells = this.selectedCells.filter(($c) => !$c.selectionGroup)
  }

  resetSelectionGroup() {
    this.selectedCells
      .filter(($c) => $c.selectionGroup)
      .forEach(($c) => ($c.selectionGroup = false))
  }

  cleanSelection() {
    this.selectedCells.forEach(($c) => $c.removeClass(SELECTED_CLASS_NAME))
    this.selectedCells = []
  }

  findCellByCoords(row, col) {
    const cellId = `${row}:${col}`
    const selector = `[data-id="${cellId}"]`
    const $cell = this.$root.find(selector)
    return $cell
  }
}

function parseId(id) {
  return id.split(':').map(Number)
}
