import { Page } from '@core/Page'
import { $ } from '@core/dom'

export class NotFoundPage extends Page {
  getRoot() {
    return $.create('div').html(`<h1>Page not found</h1>`)
  }
}
