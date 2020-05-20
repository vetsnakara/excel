import { Router } from './Router'
import { Page } from '../Page'

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}

class ExcelPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'excel'
    return root
  }
}

describe('Router', () => {
  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')

    router = new Router($root, {
      excel: ExcelPage,
      dashboard: DashboardPage
    })
  })

  afterEach(() => {
    $root.innerHTML = ''
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render dashboard page', () => {
    window.location.hash = 'dashboard'
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })

  test('should render excel page', () => {
    window.location.hash = 'excel'
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>excel</div>')
  })
})
