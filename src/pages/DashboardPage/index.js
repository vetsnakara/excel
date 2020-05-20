import { Page } from '@core/Page'
import { $ } from '@core/dom'
import { storage } from '@utils/storage'
import { getHTML } from './DashboardPage.template'

import { LS_APP_NAME } from '@config/constants'

export class DashboardPage extends Page {
  getRoot() {
    const info = this.getInfo()
    const html = getHTML(info)
    return $.create('div', 'dashboard').html(html)
  }

  getInfo() {
    const appState = storage(LS_APP_NAME) || {}
    const info = Object.keys(appState).reduce((acc, tableId) => {
      const { tableName, tableDate } = appState[tableId]
      acc = [...acc, { tableId, tableName, tableDate }]
      return acc
    }, [])
    return info
  }
}
