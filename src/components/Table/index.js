import { Component } from '@/core/Component'
import { $ } from '@core/dom'

import { getTable } from './template'
import { ResizeManager } from './ResizeManager'
import { SelectionManager, KEY_CODES } from './SelectionManager'

export class Table extends Component {
  static className = 'table'

  onKeydown(event) {
    if (shouldSelect(event)) {
      this.selectionManager.selectNext(event)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeManager.initResize(this.$root, event)
    }

    if (shouldSelect(event)) {
      this.selectionManager.selectOther(event)
    }
  }

  prepare() {
    this.initResize()
    this.initSelection()
  }

  initSelection() {
    this.selectionManager = new SelectionManager(this.$root)
    this.selectionManager.select({ row: 0, col: 0 })
  }

  initResize() {
    this.resizeManager = new ResizeManager(this.$root)
  }

  toHTML() {
    return getTable()
  }
}

function shouldResize(event) {
  const $target = $(event.target)
  return $target.data.resize
}

function shouldSelect(event) {
  const mouseSelect = $(event.target).data.type === 'cell'
  const keySelect = Object.values(KEY_CODES).includes(event.keyCode)
  return mouseSelect || keySelect
}
