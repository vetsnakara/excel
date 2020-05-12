class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(htmlContent) {
    if (htmlContent) {
      this.$el.innerHTML = htmlContent
      return this
    }

    return this.$el.innerHTML
  }

  clear() {
    return this.html('')
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    this.$el.appendChild(node)

    return this
  }

  on(event, listener) {
    this.$el.addEventListener(event, listener)
  }

  off(event, listener) {
    this.$el.removeEventListener(event, listener)
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    const domElement = this.$el.closest(selector)
    return $(domElement)
  }

  findAll(selector) {
    return Array.from(this.$el.querySelectorAll(selector)).map($)
  }

  css(property) {
    if (typeof property === 'object') {
      Object.entries(property).forEach(
        ([name, value]) => (this.$el.style[name] = value)
      )
    }

    return getComputedStyle(this.$el)[property]
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)

  if (classes) {
    el.classList.add(classes)
  }

  return $(el)
}