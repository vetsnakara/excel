import { $ } from '@core/dom'

import { createStore } from '@core/createStore'
import { rootReducer } from '@/redux/rootReducer'

import { Excel } from '@components/Excel'

import { Topbar } from '@components/Topbar'
import { Formula } from '@components/Formula'
import { Toolbar } from '@components/Toolbar'
import { Table } from '@components/Table'

import { LS_APP_NAME } from '@/config/constants'
import { storage } from '@utils/storage'

import './scss/index.scss'

const persistedState = storage(LS_APP_NAME)

const store = persistedState
  ? createStore(rootReducer, persistedState)
  : createStore(rootReducer)

store.subscribe((state) => storage(LS_APP_NAME, state))

const $app = $('#app')

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

const app = new Excel($app, components, store)

app.render()
