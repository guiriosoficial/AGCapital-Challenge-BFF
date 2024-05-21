import RequestInput from '../../../src/domain/entity/RequestInput'
import ExpressAdapter from '../../../src/infra/http/ExpressAdapter'
import FetchAdapter from '../../../src/infra/http/FetchAdapter'

describe('FetchAdapter', () => {
  const server = new ExpressAdapter()
  const client = new FetchAdapter('http://localhost:3332/')
  const headers = { authorization: 'Bearer token', workspace: 'lucasisrael' }
  let httpServer: any
  let logBkp: any

  beforeAll(() => {
    logBkp = console.error
    console.error = () => ({})

    server.on('get', '/', async () => ({ status: 200, body: { message: 'OK' } }))
    server.on('get', '/void', async () => ({ status: 200, body: {} }))
    server.on('post', '/', async () => ({ status: 200, body: { message: 'OK' } }))
    server.on('post', '/void', async () => ({ status: 200, body: {} }))
    server.on('patch', '/', async () => ({ status: 200, body: { message: 'OK' } }))
    server.on('put', '/', async () => ({ status: 200, body: { message: 'OK' } }))
    server.on('put', '/void', async () => ({ status: 200, body: {} }))

    httpServer = server.listen(3332)
  })

  afterAll(done => {
    console.error = logBkp
    httpServer.close(() => done())
  })

  it('Deve criar uma instância de FetchAdapter', () => {
    expect(client).toBeInstanceOf(FetchAdapter)
  })

  it('Deve retornar 200 OK para GET', async () => {
    const response = await client.get('', new RequestInput({}, {}, headers))

    expect(response).toEqual({ message: 'OK' })
  })

  it('Deve retornar body padrão para GET', async () => {
    const response = await client.get('void', new RequestInput({}, {}, headers))

    expect(response).toEqual({})
  })

  it('Deve retornar 200 OK para POST', async () => {
    const response = await client.post('', new RequestInput({}, {}, headers))

    expect(response).toEqual({ message: 'OK' })
  })

  it('Deve retornar body padrão POST', async () => {
    const response = await client.post('void', new RequestInput({}, {}, headers))

    expect(response).toEqual({})
  })

  it('Deve retornar 200 OK para PATCH', async () => {
    const response = await client.patch('', new RequestInput({}, {}, headers))

    expect(response).toEqual({ message: 'OK' })
  })

  it('Deve retornar 200 OK para PUT', async () => {
    const response = await client.put('', new RequestInput({}, {}, headers))

    expect(response).toEqual({ message: 'OK' })
  })

  it('Deve retornar body padrão para PUT', async () => {
    const response = await client.put('void', new RequestInput({}, {}, headers))

    expect(response).toEqual({})
  })
})
