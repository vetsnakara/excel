import { Component } from '@/core/Component'

export class Formula extends Component {
  static className = 'formula'

  toHTML() {
    return `
      <div class="formula__label">
        <span>fx</span>
      </div>
      <input class="formula__input" />
    `
  }

  onChange(event) {
    console.log('change', event.target)
  }

  onClick(event) {
    console.log('click: ', event.target)
  }

  onInput(event) {
    console.log('inopt:', event.target)
  }
}
