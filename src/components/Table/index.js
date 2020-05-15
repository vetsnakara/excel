import { Component } from '@/core/Component'
import { $ } from '@core/dom'

import { getTable } from './template'
import { ResizeManager } from './ResizeManager'
import { SelectionManager, KEY_CODES } from './SelectionManager'

export class Table extends Component {
  static className = 'table'

  onKeydown(event) {
    if (shouldSelect('keys', event)) {
      this.selectionManager.handle('keys', event)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeManager.initResize(this.$root, event)
    }

    if (shouldSelect('click', event)) {
      this.selectionManager.handle('click', event)
    }
  }

  init() {
    this.initResize()
    this.initSelection()
    this.$root.focus()
  }

  initSelection() {
    this.selectionManager = new SelectionManager(this.$root)
    // this.selectionManager.setCurrentCell({ row: 0, col: 0 })
  }

  initResize() {
    this.resizeManager = new ResizeManager(this.$root)
  }

  toHTML() {
    return getTable()
  }
}

function shouldResize({ target }) {
  const $target = $(target)
  return $target.data.resize
}

function shouldSelect(type, { target, keyCode }) {
  switch (type) {
    case 'click':
      return $(target).data.type === 'cell'
    case 'keys':
      return Object.values(KEY_CODES).includes(keyCode)
    default:
      return false
  }
}
