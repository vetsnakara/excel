export function rootReducer(state = {}, action) {
  switch (action.type) {
    case 'COL_RESIZE':
      return {
        ...state,
        colState: {
          ...state.colState,
          [action.id]: action.value
        }
      }
    case 'ROW_RESIZE':
      return {
        ...state,
        rowState: {
          ...state.rowState,
          [action.id]: action.value
        }
      }
    default:
      return state
  }
}
