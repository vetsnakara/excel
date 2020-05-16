import { $ } from '@core/dom'

const RESIZE_TYPE_COL = 'col'
const RESIZE_TYPE_ROW = 'row'

export class ResizeManager {
  /**
   * Resizer element
   */
  resizer = null

  /**
   * Initial cursor coordinates when resizing is started
   */
  cursorInitCoords = { x0: 0, y0: 0 }

  /**
   * Delta of cursor coords through resizing process
   */
  cursorDeltaCoords = { dx: 0, dy: 0 }

  /**
   * Index of column to be resized
   */
  colToResize = null

  constructor($root) {
    this.$root = $root
  }

  initResize($root, { target, pageX, pageY }) {
    // resizer element
    this.resizer = $(target)

    // type of resize (col/row)
    this.resizeType = this.resizer.data.resize

    // init cursor coordinates
    this.cursorInitCoords = {
      x0: pageX,
      y0: pageY
    }

    // start listen to mouse move events
    $root.on('mousemove', this.mouseMoveHanldler)

    // finish listen to mouse move events and do resize
    $root.on('mouseup', () => {
      // unsubscribe
      $root.off('mousemove', this.mouseMoveHanldler)

      // do resize
      this.resize()

      // reset
      this.reset()
    })
  }

  mouseMoveHanldler = ({ pageX, pageY }) => {
    this.updateCursorDelta(pageX, pageY)
    this.moveResizer()
  }

  resizeCol() {
    const colToResize = this.resizer.closest('[data-col]')
    const colIndex = colToResize.data.col
    const startWidth = parseInt(colToResize.css('width'))
    const cellsToResize = this.$root.findAll(`[data-col="${colIndex}"]`)

    const { dx } = this.cursorDeltaCoords

    cellsToResize.forEach((cell) => {
      cell.css({ width: `${startWidth + dx}px` })
    })
  }

  resizeRow() {
    const rowToResize = this.resizer.closest('[data-row]')
    const startHeight = parseInt(rowToResize.css('height'))

    const { dy } = this.cursorDeltaCoords

    rowToResize.css({ height: `${startHeight + dy}px` })
  }

  updateCursorDelta(x, y) {
    const dx = x - this.cursorInitCoords.x0
    const dy = y - this.cursorInitCoords.y0

    this.cursorDeltaCoords.dx = dx
    this.cursorDeltaCoords.dy = dy
  }

  moveResizer() {
    const { dx, dy } = this.cursorDeltaCoords

    if (this.resizeType === RESIZE_TYPE_COL) {
      this.resizer.css({
        transform: `translateX(${dx}px)`
      })
    } else if (this.resizeType === RESIZE_TYPE_ROW) {
      this.resizer.css({
        transform: `translateY(${dy}px)`
      })
    }
  }

  resize() {
    if (this.resizeType === RESIZE_TYPE_COL) {
      this.resizeCol()
    } else if (this.resizeType === RESIZE_TYPE_ROW) {
      this.resizeRow()
    }
  }

  reset() {
    this.cursorDeltaCoords = { dx: 0, dy: 0 }

    if (this.resizeType === RESIZE_TYPE_COL) {
      this.resizer.css({
        transform: `translateX(0)`
      })
    } else if (this.resizeType === RESIZE_TYPE_ROW) {
      this.resizer.css({
        transform: `translateY(0)`
      })
    }
  }
}
