import { Component } from '@/core/Component'
import { getTopbar } from './Topbar.template'
import { KEY_CODES } from '@config/keyCodes'
import { changeTableName } from '@/redux/actions'
import { debounce } from '@utils/debounce'
import { $ } from '@core/dom'
import * as LS from '@/utils/storage'
import { LS_APP_NAME } from '@config/constants'
import { ActiveRoute } from '@core/router/ActiveRoute'

export class Topbar extends Component {
  static className = 'topbar'

  stateSubscriptions = ['tableName']

  constructor(options) {
    super(options)
    this.onInput = debounce(this.onInput, 500)
  }

  onClick(event) {
    const $target = $(event.target)
    const $button = $target.closest(`[data-type="button"]`)

    if ($button.data.role === 'remove') {
      const decision = confirm('Are you sure?')
      if (decision) {
        const { param } = ActiveRoute.url
        LS.remove(LS_APP_NAME, param)
        window.location.hash = 'dashboard'
      }
    } else if ($button.data.role === 'exit') {
      window.location.hash = 'dashboard'
    }
  }

  onInput({ target: { value } }) {
    this.$dispatch(changeTableName(value))
  }

  onStateChange(field, { tableName }) {
    this.$root.find('input').value(tableName)
  }

  onKeydown(event) {
    if (event.keyCode === KEY_CODES.ENTER) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }

  toHTML() {
    const { tableName } = this.store.getState()
    return getTopbar(tableName)
  }
}
