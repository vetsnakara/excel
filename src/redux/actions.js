import {
  TABLE_RESIZE,
  CHANGE_ACTIVE_CELL,
  CHANGE_CELL_CONTENT,
  CHANGE_CELL_FORMAT,
  CHANGE_TABLE_NAME,
  CHANGE_TABLE_DATE,
  REMOVE_CELL_CONTENT
} from './types'

export function removeCellContent(ids) {
  return {
    type: REMOVE_CELL_CONTENT,
    ids
  }
}

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

export function changeCellContent({ formula, content }) {
  return {
    type: CHANGE_CELL_CONTENT,
    content,
    formula
  }
}

export function changeCellFormat(format, ids) {
  return {
    type: CHANGE_CELL_FORMAT,
    format,
    ids
  }
}

export function changeTableDate(date) {
  return {
    type: CHANGE_TABLE_DATE,
    date
  }
}
