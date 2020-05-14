const ROWS = 100

const getColNames = () => {
  const codeA = 'A'.charCodeAt()
  const codeZ = 'Z'.charCodeAt()

  return Array.from({ length: codeZ - codeA + 1 }).map((_, index) =>
    String.fromCharCode(codeA + index)
  )
}

const getCol = (content, col) => `
  <div
    data-col="${col}"
    class="table__col-info"
  >
    <span>${content}</span>
    <span
      data-resize="col" 
      class="table__col-resize"
    ></span>
  </div>
`

const getCell = (row) => (_, col) => {
  const cellId = `${row}:${col}`

  return `
    <div
      data-type="cell"
      data-col="${col}"
      data-id="${cellId}"
      class="table__cell"
      contenteditable
    ></div>`
}

const getCols = () => getColNames().map(getCol)

const getCells = (row) => getColNames().map(getCell(row))

const getRowInfo = (info) => `
  <div class="table__row-info">
    <span>${info}</span>
    <span
      data-resize="row"
      class="table__row-resize"
    ></span>
  </div>
`

const getRowData = (cells) => `
<div class="table__row-data">
  ${cells.join('')}
</div>
`

const getRow = (rowIndex, cells) => {
  const rowInfoContent = rowIndex === null ? '' : rowIndex + 1
  const rowContent = [getRowInfo(rowInfoContent), getRowData(cells)]

  return `
    <div
      data-row="${rowIndex}"
      class="table__row">
        ${rowContent.join('')}
      </div>
  `
}

const getFirstRow = () => {
  const cols = getCols()
  return getRow(null, cols)
}

const getDataRows = () =>
  Array.from({ length: ROWS }).map((_, row) => {
    const cells = getCells(row)
    return getRow(row, cells)
  })

export const getTable = () => {
  const firstRow = getFirstRow()
  const dataRows = getDataRows()

  return `
    ${firstRow}
    ${dataRows.join('')}
  `
}
