import { Component } from '@/core/Component'
import { getTable } from './template'

export class Table extends Component {
  static className = 'table'

  toHTML() {
    return getTable()
  }
}
