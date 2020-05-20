import { createStore } from './createStore'

const initState = {
  count: 0
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + 1
      }
    default:
      return state
  }
}

describe('createStore', () => {
  let store

  beforeEach(() => {
    store = createStore(reducer)
  })

  test('should return store object', () => {
    expect(store).toBeDefined()

    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).toBeDefined()
  })

  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('should return default state', () => {
    expect(store.getState()).toEqual(initState)
  })

  test('should change state if action exists', () => {
    store.dispatch({ type: 'ADD' })
    expect(store.getState().count).toBe(1)
  })

  test('should not change state if action not exists', () => {
    store.dispatch({ type: '***' })
    expect(store.getState().count).toBe(0)
  })

  test('should call subscriber function', () => {
    const handler = jest.fn()

    store.subscribe(handler)
    store.dispatch({ type: 'ADD' })

    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  test('should not call sub if unsubscribe', () => {
    const handler = jest.fn(() => console.log('call!!'))

    const unsub = store.subscribe(handler)
    unsub()

    store.dispatch({ type: 'ADD' })

    expect(handler).not.toHaveBeenCalled()
  })
})
