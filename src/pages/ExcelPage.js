import { createStore } from '@core/store/createStore'
import { rootReducer } from '@/redux/rootReducer'

import { Excel } from '@components/Excel'

import { Topbar } from '@components/Topbar'
import { Formula } from '@components/Formula'
import { Toolbar } from '@components/Toolbar'
import { Table } from '@components/Table'

import { LS_APP_NAME } from '@/config/constants'
import { storage } from '@utils/storage'
import { debounce } from '@utils/debounce'

import { Page } from '@core/Page'

export class ExcelPage extends Page {
  getRoot() {
    const appState = storage(LS_APP_NAME) || {}

    const store = appState[this.param]
      ? createStore(rootReducer, appState[this.param])
      : createStore(rootReducer)

    this.unsubscribeFromStore = store.subscribe(
      debounce(
        (state) => storage(LS_APP_NAME, { ...appState, [this.param]: state }),
        500
      )
    )

    const components = {
      root: {
        elementName: 'div',
        className: 'excel'
      },
      components: [
        {
          root: {
            elementName: 'header',
            className: 'excel__header'
          },
          components: [Topbar, Toolbar, Formula]
        },
        Table
      ]
    }

    this.excel = new Excel(components, store)

    return this.excel.getRoot()
  }

  afterMount() {
    this.excel.afterMount()
  }

  destroy() {
    this.unsubscribeFromStore()
    this.excel.destroy()
  }
}
