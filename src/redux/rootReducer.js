import { TABLE_RESIZE, CHANGE_ACTIVE_CELL, CHANGE_CELL_CONTENT } from './types'

const initState = {
  activeCell: '1:1',
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
    default:
      return state
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
