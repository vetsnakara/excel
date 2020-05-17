export function createContext() {
  const context = {
    value: null
  }

  return {
    setValue: (value) => (context.value = value),
    getValue: () => context.value
  }
}
