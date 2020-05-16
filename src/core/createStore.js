export function createStore(reducer, initState) {
  let state = reducer(initState, { type: '@@Redux/INIT' })

  const listeners = []

  function getState() {
    return state
  }

  function subscribe(listener) {
    listeners.push(listener)
    return () => listeners.filter((l) => l !== listener)
  }

  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach((listener) => listener(state))
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}
