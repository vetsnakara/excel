import { Component } from '@/core/Component'

export class Topbar extends Component {
  static className = 'topbar'

  toHTML() {
    return `
      <input type="text" class="input" value="Новая таблица" />
      <div class="topbar__buttons">
        <button class="button">
          <span class="material-icons">delete</span>
        </button>
        <button class="button">
          <span class="material-icons">exit_to_app</span>
        </button>
      </div>
    `
  }
}
