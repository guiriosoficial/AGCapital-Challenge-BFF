import BadRequestError from '../../../src/domain/errors/BadRequestError'
import GatewayError from '../../../src/domain/errors/GatewayError'
import ExpressAdapter from '../../../src/infra/http/ExpressAdapter'

describe('Testa ExpressAdapter', () => {
  const expressAdapter = new ExpressAdapter()
  let httpServer: any
  let logBkp: any

  beforeAll(() => {
    logBkp = console.error
    console.error = () => ({})

    expressAdapter.on('get', '/healthcheck', async () => ({ status: 200, body: { message: 'OK' } }))
    expressAdapter.on('get', '/request', async () => ({ status: 200, body: { message: 'OK' } }))
    expressAdapter.on('get', '/error', async () => { throw new Error('Internal Server Error') })
    expressAdapter.on('get', '/gateway-error', async () => { throw new GatewayError({ message: 'Gateway Error', status: 500 }) })
    expressAdapter.on('get', '/bad-request-error', async () => { throw new BadRequestError('BadRequest Erro') })

    httpServer = expressAdapter.listen(3331)
  })

  afterAll(done => {
    console.error = logBkp
    httpServer.close(() => done())
  })

  it('Deve criar uma instância de ExpressAdapter', () => {
    expect(expressAdapter).toBeInstanceOf(ExpressAdapter)
  })

  it('Deve retornar 200 OK para GET em /healthcheck', async () => {
    const response = await fetch('http://localhost:3331/healthcheck')

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ message: 'OK' })
  })

  it('Deve retornar 401 Unauthorized para requests sem o header authorization', async () => {
    const response = await fetch('http://localhost:3331/request')

    expect(response.status).toBe(401)
    expect(await response.json()).toEqual({ message: 'Não autorizado!' })
  })

  it('Deve retornar 401 Unauthorized para requests sem o header workspace', async () => {
    const headers = new Headers()
    headers.set('authorization', 'Bearer token')

    const response = await fetch('http://localhost:3331/request', { headers })

    expect(response.status).toBe(401)
    expect(await response.json()).toEqual({ message: 'Workspace não informada.' })
  })

  it('Deve retornar erro Gateway Error', async () => {
    const headers = new Headers()
    headers.set('authorization', 'Bearer token')
    headers.set('workspace', 'lucasisrael')

    const response = await fetch('http://localhost:3331/gateway-error', { headers })
    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ message: 'Gateway Error' })
  })

  it('Deve retornar erro BadRequest Error', async () => {
    const headers = new Headers()
    headers.set('authorization', 'Bearer token')
    headers.set('workspace', 'lucasisrael')

    const response = await fetch('http://localhost:3331/bad-request-error', { headers })
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ message: 'BadRequest Erro' })
  })

  it('Deve retornar Error', async () => {
    const headers = new Headers()
    headers.set('authorization', 'Bearer token')
    headers.set('workspace', 'lucasisrael')

    const response = await fetch('http://localhost:3331/error', { headers })
    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ message: 'Internal Server Error' })
  })
})
