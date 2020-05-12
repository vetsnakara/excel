const ROWS = 100

const getColNames = () => {
  const codeA = 'A'.charCodeAt()
  const codeZ = 'Z'.charCodeAt()

  return Array.from({ length: codeZ - codeA + 1 }).map((_, index) =>
    String.fromCharCode(codeA + index)
  )
}

const getCol = (content, col) => `
  <div data-col="${col}" class="table__col-info">
    <span>${content}</span>
    <span data-resize="col" class="table__col-resize"></span>
  </div>
`

const getCell = (_, col) =>
  `<div data-col="${col}" class="table__cell" contenteditable></div>`

const getCols = () => getColNames().map(getCol)

const getCells = () => getColNames().map(getCell)

const getRowInfo = (info) => `
  <div class="table__row-info">
    <span>${info}</span>
    <span data-resize="row" class="table__row-resize"></span>
  </div>
`

const getRowData = (cells) => `
<div class="table__row-data">
  ${cells.join('')}
</div>
`

const getRow = (index, cells) => {
  const rowContent = [getRowInfo(index), getRowData(cells)]

  return `
    <div data-row="${index}" class="table__row">${rowContent.join('')}</div>
  `
}

const getFirstRow = () => {
  const cols = getCols()
  return getRow('', cols)
}

const getDataRows = () =>
  Array.from({ length: ROWS }).map((_, index) => {
    const cells = getCells()
    return getRow(index + 1, cells)
  })

export const getTable = () => {
  const firstRow = getFirstRow()
  const dataRows = getDataRows()

  return `
    ${firstRow}
    ${dataRows.join('')}
  `
}