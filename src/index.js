import './scss/index.scss'

import { Router } from '@core/router/Router'
import { DashboardPage } from './pages/DashboardPage/index'
import { ExcelPage } from './pages/ExcelPage'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
})

window.location.hash = 'dashboard'
