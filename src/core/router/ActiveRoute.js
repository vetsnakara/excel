export class ActiveRoute {
  static get url() {
    const [path, param] = window.location.hash.slice(1).split('/')
    return { path, param }
  }
}
