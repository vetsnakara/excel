import { Component } from '@/core/Component'
import { $ } from '@core/dom'

import { getTable } from './template'
import { ResizeManager } from './ResizeManager'

export class Table extends Component {
  static className = 'table'

  resizeManager = new ResizeManager(this.$root)

  onMousedown({ target }) {
    const $target = $(target)

    if ($target.data.resize) {
      this.resizeManager.initResize(this.$root, event)
    }
  }

  toHTML() {
    return getTable()
  }
}
