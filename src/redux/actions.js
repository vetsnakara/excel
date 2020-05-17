import { TABLE_RESIZE } from './types'

export function tableResize(resizeType, data) {
  return {
    type: TABLE_RESIZE,
    resizeType,
    ...data
  }
}
