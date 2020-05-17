import { TABLE_RESIZE } from './types'

const initState = {
  colState: {},
  rowState: {}
}

export function rootReducer(state = initState, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      return handleResize(state, action)
    default:
      return state
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
