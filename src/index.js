import { $ } from '@core/dom'

import { Excel } from '@components/excel'

import { Topbar } from '@components/topbar'
import { Formula } from '@components/Formula'
import { Toolbar } from '@components/Toolbar'
import { Table } from '@components/Table'

import './scss/index.scss'

const $app = $('#app')

const app = new Excel($app, {
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
      components: [Topbar, Formula, Toolbar]
    },
    Table
  ]
})

app.render()
