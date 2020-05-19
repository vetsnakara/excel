import {
  TABLE_RESIZE,
  CHANGE_ACTIVE_CELL,
  CHANGE_CELL_CONTENT,
  CHANGE_CELL_FORMAT,
  CHANGE_TABLE_NAME
} from './types'

export function changeTableName(value) {
  return {
    type: CHANGE_TABLE_NAME,
    value
  }
}

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

export function changeCellFormat(format, ids) {
  return {
    type: CHANGE_CELL_FORMAT,
    format,
    ids
  }
}
