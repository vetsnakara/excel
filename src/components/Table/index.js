import { Component } from '@/core/Component'
import { $ } from '@core/dom'
import { KEY_CODES } from '@config/keyCodes'

import { getTable } from './Table.template'
import { ResizeManager } from './ResizeManager'
import { SelectionManager } from './SelectionManager'

import { getStyles } from '@utils/styles'

import {
  tableResize,
  changeActiveCell,
  changeCellContent,
  changeCellFormat,
  removeCellContent
} from '@/redux/actions'

import { Cell } from './Cell'

export class Table extends Component {
  static className = 'table'

  constructor(options) {
    super(options)

    this.stateSubscriptions = ['tableData']
  }

  get currentCell() {
    return this.selectionManager.getCurrentCell()
  }

  onKeydown(event) {
    const { currentCell } = this

    if (event.keyCode === KEY_CODES.DELETE) {
      if (this.currentCell.isEditable) return

      const selectedCells = this.selectionManager.selectionList.getSelectedCells()
      const selectedIds = Object.keys(selectedCells)
      this.$dispatch(removeCellContent(selectedIds))
      this.$emit('content:change', '')
    } else if (event.keyCode === KEY_CODES.ESQ) {
      currentCell.clearEditable()
      this.restoreCellContent(currentCell.id)
      this.$emit('content:change', currentCell.getContent())
    } else if (event.keyCode === KEY_CODES.ENTER) {
      event.preventDefault()
      if (!currentCell.isEditable) {
        currentCell.editStart()
      } else {
        currentCell.editSuccess()
      }
    } else if (event.key.length === 1) {
      if (!currentCell.isEditable) {
        currentCell.editStart()
        currentCell.setContent('')
      }
    } else if (shouldSelect('keys', event) && !currentCell.isEditable) {
      this.selectionManager.handle('keys', event)
    }
  }

  onEditSuccess(event) {
    this.handleEditSuccess(event)
  }

  onEditStart() {
    this.handleEditStart(event)
  }

  onInput(event) {
    const cellText = event.target.textContent
    this.$emit('content:change', cellText)
  }

  onDblclick(event) {
    const currentCell = this.selectionManager.getCurrentCell()
    if (!currentCell.isEditable) {
      currentCell.editStart()
    }
  }

  async onMousedown(event) {
    try {
      if (shouldResize(event)) {
        const result = await this.resizeManager.startResize(this.$root, event)
        const { type, ...data } = result
        this.$dispatch(tableResize(type, data))
      }

      if (shouldSelect('click', event)) {
        this.selectionManager.handle('click', event)
      }
    } catch (error) {
      console.warn(error.message)
    }
  }

  onCellSelect(event) {
    const { currentCell } = this
    this.$dispatch(changeActiveCell(currentCell.id))
    this.restoreCellContent(currentCell.id)
    this.$emit('cell:change')
  }

  onStateChange(field, { tableData }) {
    const selectedCells = this.selectionManager.selectionList.list

    Object.entries(selectedCells).map(([id, cell]) => {
      const data = tableData[id]
      const content = data ? data.content : ''
      const format = data ? data.format : null

      const styles = getStyles(format)
      cell.setStyles(styles)

      cell.setContent(content)
    })
  }

  handleEditStart() {
    this.currentCell.setEditable()
    this.setFormula()
  }

  handleEditSuccess() {
    const formula = this.currentCell.getContent()

    let content
    try {
      if (!formula.startsWith('=')) {
        throw new Error()
      }
      // eslint-disable-next-line no-eval
      content = String(eval(formula.slice(1)))
    } catch (error) {
      content = formula
    }

    this.$dispatch(changeCellContent({ formula, content }))

    this.currentCell.trigger(
      new KeyboardEvent('keydown', {
        keyCode: KEY_CODES.ARROW_DOWN,
        bubbles: true
      })
    )
  }

  restoreCellContent(id) {
    const { tableData } = this.store.getState()
    const cellData = tableData[id] || {}
    const content = cellData.content || ''

    const cell = new Cell(id, this.$root)
    cell.setContent(content)
  }

  setFormula() {
    const { tableData } = this.store.getState()
    const cellData = tableData[this.currentCell.id]
    const formula = (cellData && cellData.formula) || ''
    this.currentCell.setContent(formula)
  }

  getCurrentCell() {
    return this.selectionManager.getCurrentCell()
  }

  init() {
    super.init()

    const { activeCell } = this.store.getState()

    this.selectionManager = new SelectionManager(this.$root)
    this.selectionManager.init(activeCell)

    this.resizeManager = new ResizeManager(this.$root)

    this.subscribe()
  }

  afterMount() {
    this.selectionManager.getCurrentCell().$element.focus()
  }

  subscribe() {
    this.$on('formula:focus', () => {
      this.setFormula()
    })

    this.$on('formula:done', () => {
      this.currentCell.focus()
      this.handleEditSuccess()
    })

    this.$on('formula:cancel', () => {
      const { currentCell } = this
      currentCell.focus()
      this.restoreCellContent(currentCell.id)
    })

    this.$on('formula:change', (value) => {
      this.currentCell.setContent(value)
    })

    this.$on('format:change', (format) => {
      const selectedIds = Object.keys(this.selectionManager.selectionList.list)
      this.$dispatch(changeCellFormat(format, selectedIds))
    })
  }

  toHTML() {
    return getTable(this.store.getState())
  }
}

function shouldResize({ target }) {
  const $target = $(target)
  return $target.data.resize
}

function shouldSelect(type, { target, keyCode }) {
  if (type === 'click') {
    return $(target).data.type === 'cell'
  }

  if (type === 'keys') {
    return Object.values(KEY_CODES).includes(keyCode)
  }

  return false
}
