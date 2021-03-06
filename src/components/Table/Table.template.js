import { DEFAULT_ROWS_NUM } from '@/config/constants'
import { createContext } from '@utils/context'
import { getStyles } from '@utils/styles'

const storeContext = createContext()

function getWidthStyle(col, state) {
  return col in state ? `width: ${state[col]}px;` : ''
}

function getHeightStyle(row, state) {
  return row in state ? `style="height: ${state[row]}px"` : ''
}

const getColNames = () => {
  const codeA = 'A'.charCodeAt()
  const codeZ = 'Z'.charCodeAt()

  return Array.from({ length: codeZ - codeA + 1 }).map((_, index) =>
    String.fromCharCode(codeA + index)
  )
}

const getCol = (content, col) => {
  const { colState } = storeContext.getValue()
  const inlineStyle = getWidthStyle(col, colState)

  return `
    <div
      data-col="${col}"
      class="table__col-info"
      ${inlineStyle ? `style="${inlineStyle}"` : ''}

    >
      <span>${content}</span>
      <span
        data-resize="col" 
        class="table__col-resize"
      ></span>
    </div>
  `
}

const getCell = (row) => (_, col) => {
  const { colState, tableData } = storeContext.getValue()

  const cellId = `${row}:${col}`
  const cellData = tableData[cellId] || {}
  const { format } = cellData

  let inlineStyle = getWidthStyle(col, colState)

  if (format) {
    const styles = getStyles(format)
    // DRY !!!
    Object.entries(styles).forEach(
      ([name, value]) => (inlineStyle += `${name}:${value};`)
    )
  }

  const cell = tableData[cellId]
  const content = cell && cell.content ? cell.content : ''

  return `
    <div
      data-type="cell"
      data-col="${col}"
      data-id="${cellId}"
      class="table__cell"
      ${inlineStyle ? `style="${inlineStyle}"` : ''}
      tabindex="0"
    >${content}</div>`
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
  const { rowState } = storeContext.getValue()
  const rowInfoContent = rowIndex === null ? '' : rowIndex + 1
  const rowContent = [getRowInfo(rowInfoContent), getRowData(cells)]
  const heightStyle = getHeightStyle(rowIndex, rowState)

  return `
    <div
      data-row="${rowIndex}"
      class="table__row"
      ${heightStyle}
    >
        ${rowContent.join('')}
      </div>
  `
}

const getFirstRow = () => {
  const cols = getCols()
  return getRow(null, cols)
}

const getDataRows = () =>
  Array.from({ length: DEFAULT_ROWS_NUM }).map((_, row) => {
    const cells = getCells(row)
    return getRow(row, cells)
  })

export const getTable = (store) => {
  storeContext.setValue(store)

  const firstRow = getFirstRow()
  const dataRows = getDataRows()

  return `
    ${firstRow}
    ${dataRows.join('')}
  `
}
