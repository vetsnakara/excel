import './scss/index.scss'
import './module'

async function start() {
  return await Promise.resolve()
}

start().then(() => console.log('async'))
