export function debounce(fn, delay) {
  let timer = null

  const clear = () => {
    clearTimeout(timer)
    timer = null
  }

  return function (...args) {
    if (timer) clear()

    const later = () => {
      clear()
      fn.apply(this, args)
    }

    timer = setTimeout(later, delay)
  }
}
