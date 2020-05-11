import { Component } from '@/core/Component'

export class Toolbar extends Component {
  static className = 'toolbar'

  toHTML() {
    return `
      <button class="button">
        <span class="material-icons">format_align_left</span>
      </button>

      <button class="button">
        <span class="material-icons">format_align_center</span>
      </button>

      <button class="button">
        <span class="material-icons">format_align_right</span>
      </button>

      <button class="button">
        <span class="material-icons">format_bold</span>
      </button>

      <button class="button">
        <span class="material-icons">format_italic</span>
      </button>

      <button class="button">
        <span class="material-icons">format_underline</span>
      </button>
    `
  }
}
