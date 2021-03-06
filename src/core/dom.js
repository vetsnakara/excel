class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(htmlContent) {
    if (htmlContent !== undefined) {
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
    return domElement ? $(domElement) : null
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return Array.from(this.$el.querySelectorAll(selector)).map($)
  }

  focus() {
    this.$el.focus()
    return this
  }

  blur() {
    this.$el.blur()
    return this
  }

  hasFocus() {
    return this.$el === document.activeElement
  }

  hasAttribute(name) {
    return this.$el.hasAttribute(name)
  }

  setAttribute(name, value) {
    this.$el.setAttribute(name, value)
  }

  removeAttribute(name) {
    this.$el.removeAttribute(name)
  }

  editable(value) {
    if (!value) {
      return this.$el.contentEditable
    }
    this.$el.contentEditable = value
    return this
  }

  addClass(...classNames) {
    classNames.forEach((name) => this.$el.classList.add(name))
    return this
  }

  removeClass(...classNames) {
    classNames.forEach((name) => this.$el.classList.remove(name))
    return this
  }

  css(property) {
    if (typeof property === 'object') {
      Object.entries(property).forEach(
        ([name, value]) => (this.$el.style[name] = value)
      )
    }

    return getComputedStyle(this.$el)[property]
  }

  setInlineCSS(newStyles = {}) {
    const { cssText } = this.$el.style

    const prevstyles = cssText
      .slice(0, cssText.length - 1)
      .split(';')
      .reduce((acc, style) => {
        const [name, value] = style.split(':').map((part) => part.trim())
        acc[name] = value
        return acc
      }, {})

    const updatedStyles = {
      ...prevstyles,
      ...newStyles
    }

    Object.entries(updatedStyles).forEach(
      ([name, value]) => (this.$el.style[name] = value)
    )
  }

  value(content) {
    if (content === undefined) return this.$el.value

    this.$el.value = content
    return this
  }

  text(content) {
    if (content === undefined) return this.$el.textContent

    this.$el.textContent = content
    return this
  }

  trigger(event) {
    this.$el.dispatchEvent(event)
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
