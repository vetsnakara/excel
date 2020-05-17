import { TABLE_RESIZE, CHANGE_ACTIVE_CELL, CHANGE_CELL_CONTENT } from './types'

export function tableResize(resizeType, data) {
  return {
    type: TABLE_RESIZE,
    resizeType,
    ...data
  }
}

export function changeActiveCell(cellId) {
  return {
    type: CHANGE_ACTIVE_CELL,
    cellId
  }
}

export function changeCellContent(content) {
  return {
    type: CHANGE_CELL_CONTENT,
    content
  }
}
