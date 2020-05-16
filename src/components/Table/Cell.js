const CLASSNAMES = {
  BASE: 'table__cell--base',
  SELECTED: 'table__cell--selected'
}

export class Cell {
  constructor(cell, $root) {
    if (typeof cell === 'string') {
      this.id = cell
      this.$element = $root.find(`[data-id="${this.id}"]`)
    } else {
      this.id = cell.data.id
      this.$element = cell
    }
    this.coords = this.parseId(this.id)
  }

  focus() {
    this.$element.focus()
    this.$element.dispatch(new Event('cellselect', { bubbles: true }))
  }

  setSelectClass() {
    this.$element.addClass(CLASSNAMES.SELECTED)
  }

  removeSelectClass() {
    this.$element.removeClass(CLASSNAMES.SELECTED)
  }

  setBaseClass() {
    this.$element.addClass(CLASSNAMES.BASE)
  }

  removeBaseClass() {
    this.$element.removeClass(CLASSNAMES.BASE)
  }

  reset() {
    this.$element.removeClass(CLASSNAMES.SELECTED)
    this.$element.removeClass(CLASSNAMES.BASE)
  }

  parseId(id) {
    const [row, col] = id.split(':').map(Number)
    return { row, col }
  }

  setContent(text) {
    this.$element.text(text)
  }

  getContent() {
    return this.$element.text()
  }
}
