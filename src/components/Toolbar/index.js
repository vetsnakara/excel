import { Component } from '@/core/Component'
import { $ } from '@core/dom'

import { ALIGN_LEFT } from '@config/constants'

import { createToolbar } from './Toolbar.template'

const initState = {
  font: [],
  align: ALIGN_LEFT
}

export class Toolbar extends Component {
  static className = 'toolbar'

  stateSubscriptions = ['activeCell']

  state = initState

  prevState = null

  setState(state) {
    // save prev state
    this.prevState = this.state

    // merge new state into current state
    this.state = { ...this.state, ...state }

    // render component
    this.render()

    // cdu lifecycle hook
    this.componentDidUpdate(this.prevState, this.state)
  }

  componentDidUpdate() {}

  onClick(event) {
    const $target = $(event.target)
    const $button = $target.closest(`[data-type="button"]`)
    if ($button) {
      const { role, group } = $button.data

      if (group === 'align') {
        this.handleAlignChange(role)
      } else if (group === 'font') {
        this.handleFontChange(role)
      }

      this.$emit('format:change', this.state)
    }
  }

  onStateChange(field, state) {
    const { activeCell, tableData } = state
    const cellData = tableData[activeCell] || {}
    const cellFormat = cellData.format || initState

    if (cellFormat) {
      this.setState(cellFormat)
    }
  }

  handleFontChange(role) {
    let { font } = this.state

    if (!this.state.font.includes(role)) {
      font = [...font, role]
    } else {
      font = font.filter((f) => f !== role)
    }

    this.setState({ font })
  }

  handleAlignChange(role) {
    if (this.state.align === role) return

    this.setState({
      align: role
    })
  }

  render() {
    const html = this.toHTML()
    this.$root.html(html)
  }

  toHTML() {
    return createToolbar(this.state)
  }
}
