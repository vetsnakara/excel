export class SelectionList {
  list = {}

  constructor(createCell) {
    this.createCell = createCell
  }

  getSelectionCell() {
    return this.list[this.selectionId]
  }

  getBaseCell() {
    return this.list[this.baseId]
  }

  getSelectedCells() {
    return this.list
  }

  addOne(cell, { shouldClear = false } = {}) {
    const baseCell = this.getBaseCell()

    if (baseCell) {
      if (baseCell.isEditable && cell.id !== baseCell.id) {
        baseCell.editSuccess()
      }

      baseCell.removeSelectClass()
      baseCell.removeBaseClass()
    }

    if (shouldClear) {
      this.clear()
    }

    this.list[cell.id] = cell

    this.baseId = cell.id
    this.selectionId = cell.id

    cell.setBaseClass()
    cell.setSelectClass()

    cell.select()
  }

  addGroup(selectedCell, { shouldClear = false } = {}) {
    const baseCoords = this.list[this.baseId].coords
    const prevSelectionCoords = this.list[this.selectionId].coords
    const nextSelectionCoords = selectedCell.coords

    this.selectionId = selectedCell.id

    const prevIds = getRangeIds(baseCoords, prevSelectionCoords)
    const nextIds = getRangeIds(baseCoords, nextSelectionCoords)

    const idsToRemove = prevIds.filter((id) => !nextIds.includes(id))
    const idsToAdd = nextIds.filter((id) => !prevIds.includes(id))

    if (shouldClear) {
      this.clear({ except: nextIds })
    } else {
      idsToRemove.forEach(this.remove.bind(this))
    }

    // add new cells
    idsToAdd.forEach((id) => {
      const cell = this.createCell(id)

      cell.setSelectClass()
      this.list[cell.id] = cell
    })
  }

  remove(id) {
    this.list[id].removeSelectClass()
    delete this.list[id]
  }

  clear({ except = [] } = {}) {
    Object.values(this.list).forEach(($cell) => {
      if (!except.includes($cell.id)) {
        $cell.reset()
        delete this.list[$cell.id]
      }
    })
  }
}

function getRangeIds(from, to) {
  let rowStart = from.row
  let rowEnd = to.row

  let colStart = from.col
  let colEnd = to.col

  if (rowStart > rowEnd) {
    ;[rowEnd, rowStart] = [rowStart, rowEnd]
  }

  if (colStart > colEnd) {
    ;[colEnd, colStart] = [colStart, colEnd]
  }

  const ids = []
  for (let row = rowStart; row <= rowEnd; row++) {
    for (let col = colStart; col <= colEnd; col++) {
      ids.push(`${row}:${col}`)
    }
  }
  return ids
}
