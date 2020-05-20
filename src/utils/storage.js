export function storage(key, data = null) {
  if (!data) {
    const stringData = localStorage.getItem(key)
    return JSON.parse(stringData)
  }

  localStorage.setItem(key, JSON.stringify(data))
}

export function remove(name, key) {
  const data = storage(name)
  if (data) {
    const { [key]: removed, ...remain } = data
    localStorage.clear()
    localStorage.setItem(name, JSON.stringify(remain))
  }
}
