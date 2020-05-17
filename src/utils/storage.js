export function storage(key, data = null) {
  if (!data) {
    const stringData = localStorage.getItem(key)
    return JSON.parse(stringData)
  }

  localStorage.setItem(key, JSON.stringify(data))
}
