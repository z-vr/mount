
const supertest = require('supertest')
const serve = require('koa-static')
const path = require('path')
const Koa = require('koa')

const mount = require('..')

const root = path.resolve(__dirname, '..')

describe('Acceptance: Multiple Mounts', () => {
  let request

  before(() => {
    const app = new Koa()

    app.use(mount('/examples', serve(path.resolve(root, 'examples'))))
    app.use(mount('/test', serve(path.resolve(root, 'test'))))

    request = supertest.agent(app.listen())
  })

  it('should serve /examples', () => (
    request
    .get('/examples/cascade.js')
    .expect(200)
  ))

  it('should serve /test', () => (
    request
    .get('/test/errors.js')
    .expect(200)
  ))
})
