import { $ } from '@core/dom'
import { KEY_CODES } from '@config/keyCodes'
import { Cell } from './Cell'
import { SelectionList } from './SelectionList'

export class SelectionManager {
  constructor($root) {
    this.createCell = (cell) => new Cell(cell, $root)
    this.selectionList = new SelectionList(this.createCell)
  }

  init(initCellID) {
    const cell = this.createCell(initCellID)
    this.selectionList.addOne(cell)
  }

  handle(type, event) {
    event.preventDefault()

    const { keyCode, shiftKey, ctrlKey } = event

    const shouldClear = !ctrlKey
    const shouldExpand = keyCode === KEY_CODES.TAB ? false : shiftKey

    const nextCell = this.getNextCell(type, event)

    if (nextCell) {
      shouldExpand
        ? this.selectionList.addGroup(nextCell, { shouldClear })
        : this.selectionList.addOne(nextCell, { shouldClear })
    }
  }

  getNextCell(type, { target }) {
    if (type === 'click') {
      return this.createCell($(target))
    } else if (type === 'keys') {
      const { coords: prevCoords } = this.selectionList.getSelectionCell()
      const nextCoords = getNextCoords(prevCoords, event)

      if (nextCoords) {
        const { row, col } = nextCoords
        return this.createCell(`${row}:${col}`)
      }
    }

    return null
  }

  getCurrentCell() {
    return this.selectionList.getBaseCell()
  }
}

function getNextCoords(prevCoords, event) {
  let { row, col } = prevCoords
  const { keyCode, shiftKey } = event

  if (
    keyCode === KEY_CODES.ARROW_LEFT ||
    (keyCode === KEY_CODES.TAB && shiftKey)
  ) {
    col--
  } else if (keyCode === KEY_CODES.ARROW_RIGHT || keyCode === KEY_CODES.TAB) {
    col++
  } else if (keyCode === KEY_CODES.ARROW_UP) {
    row--
  } else if (keyCode === KEY_CODES.ARROW_DOWN) {
    row++
  }

  // check for borders intersection
  // todo: check max values
  if (row < 0 || col < 0) return null

  return { row, col }
}
