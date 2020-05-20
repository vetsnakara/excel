import {
  TABLE_RESIZE,
  CHANGE_ACTIVE_CELL,
  CHANGE_CELL_CONTENT,
  CHANGE_CELL_FORMAT,
  CHANGE_TABLE_NAME,
  CHANGE_TABLE_DATE
} from './types'

import { DEFAULT_ACTIVE_CELL_ID, DEFAULT_TABLE_NAME } from '@config/constants'

const initState = {
  tableName: DEFAULT_TABLE_NAME,
  tableDate: null,
  activeCell: DEFAULT_ACTIVE_CELL_ID,
  tableData: {},
  colState: {},
  rowState: {}
}

export function rootReducer(state = initState, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      return handleResize(state, action)
    case CHANGE_ACTIVE_CELL:
      return handleChangeActiveCell(state, action)
    case CHANGE_CELL_CONTENT:
      return handleChangeCellContent(state, action)
    case CHANGE_CELL_FORMAT:
      return handleChangeCellFormat(state, action)
    case CHANGE_TABLE_NAME:
      return handleChangeTableName(state, action)
    case CHANGE_TABLE_DATE:
      return handleChangeTableDate(state, action)
    default:
      return state
  }
}

function handleChangeTableDate(state, action) {
  return {
    ...state,
    tableDate: action.date
  }
}

function handleChangeTableName(state, action) {
  return {
    ...state,
    tableName: action.value
  }
}

function handleChangeCellFormat(state, { ids, format }) {
  const { tableData } = state

  const updatedCells = ids.reduce((cells, id) => {
    cells = {
      ...cells,
      [id]: {
        ...tableData[id],
        format
      }
    }
    return cells
  }, {})

  return {
    ...state,
    tableData: {
      ...state.tableData,
      ...updatedCells
    }
  }
}

function handleChangeCellContent(state, action) {
  const id = state.activeCell
  const cell = state.tableData[id]
  return {
    ...state,
    tableData: {
      ...state.tableData,
      [id]: {
        ...cell,
        content: action.content
      }
    }
  }
}

function handleChangeActiveCell(state, action) {
  return {
    ...state,
    activeCell: action.cellId
  }
}

function handleResize(state, action) {
  const stateType = `${action.resizeType}State`
  return {
    ...state,
    [stateType]: {
      ...state[stateType],
      [action.id]: action.value
    }
  }
}
