const ROWS = 100

const getColNames = () => {
  const codeA = 'A'.charCodeAt()
  const codeZ = 'Z'.charCodeAt()

  return Array.from({ length: codeZ - codeA + 1 }).map((_, index) =>
    String.fromCharCode(codeA + index)
  )
}

const getCol = (content) => `<div class="table__col-info">${content}</div>`

const getCell = () => `<div class="table__cell" contenteditable></div>`

const getCols = () => getColNames().map(getCol)

const getCells = () => getColNames().map((_, index) => getCell())

const getRowInfo = (info) => `<div class="table__row-info">${info}</div>`

const getRowData = (cells) => `
<div class="table__row-data">
  ${cells.join('')}
</div>
`

const getRow = (info, cells) => {
  const rowContent = [getRowInfo(info), getRowData(cells)]

  return `
    <div class="table__row">${rowContent.join('')}</div>
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
    <div class="table">
      ${firstRow}
      ${dataRows.join('')}
    </div>
  `
}
