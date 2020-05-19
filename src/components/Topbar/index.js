import { Component } from '@/core/Component'
import { getTopbar } from './Topbar.template'
import { KEY_CODES } from '@config/keyCodes'
import { changeTableName } from '@/redux/actions'
import { debounce } from '@utils/debounce'

export class Topbar extends Component {
  static className = 'topbar'

  stateSubscriptions = ['tableName']

  constructor(options) {
    super(options)
    this.onInput = debounce(this.onInput, 500)
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
