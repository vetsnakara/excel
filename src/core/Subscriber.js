import { areEqual } from '@/utils/equal'

export class Subscriber {
  constructor(store) {
    this.store = store
    this.components = {}
  }

  add(component) {
    const fields = component.stateSubscriptions

    fields.forEach((field) => {
      if (!(field in this.components)) {
        this.components[field] = []
      }
      this.components[field].push(component)
    })
  }

  subscribe() {
    let prevState = this.store.getState()

    this.unsub = this.store.subscribe((state) => {
      Object.keys(state).forEach((field) => {
        const areSubStatesEqual = areEqual(prevState[field], state[field])
        if (!areSubStatesEqual && field in this.components) {
          this.components[field].forEach((component) =>
            component.onStateChange(field, state)
          )
        }
      })

      // update previous state
      prevState = state
    })
  }

  unsubscribe() {
    this.unsub()
  }
}
