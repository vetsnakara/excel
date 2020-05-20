import { $ } from '../dom'
import { ActiveRoute } from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in router')
    }

    this.root = $(selector)
    this.routes = routes

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    this.changePageHandler()
    window.addEventListener('hashchange', this.changePageHandler)
  }

  changePageHandler() {
    const { path, param } = ActiveRoute.url

    if (path in this.routes) {
      if (this.page) {
        this.page.destroy()
      }

      const Page = this.routes[path]
      this.page = new Page(param)

      this.root.html('')
      this.root.append(this.page.getRoot())
    }
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
