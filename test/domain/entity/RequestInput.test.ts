import RequestInput from '../../../src/domain/entity/RequestInput'
import buildHeaders from '../../../src/utils/buildHeaders'

describe('RequestInput', () => {
  describe('Com valores válidos', () => {
    const body = { key: 'value' }
    const query = { param: '123' }
    const headers = { 'Content-Type': 'application/json' }

    const requestInput = new RequestInput(body, query, headers)

    it('Instância deve ter body com valores fornecidos', () => {
      expect(requestInput.body).toBe(body)
    })

    it('Instância deve ter query com valores fornecidos', () => {
      expect(requestInput.query).toBe(query)
    })

    it('Instância deve ter headers com valores fornecidos', () => {
      expect(requestInput.headers).toBe(headers)
    })

    it('deve construir e retornar os headers corretamente com getHeaders', () => {
      const expectedHeaders = buildHeaders(headers)

      expect(requestInput.getHeaders).toEqual(expectedHeaders)
    })
  })

  describe('Com valores inválidos', () => {
    it('deve retornar um objeto vazio para getBody quando body não está definido', () => {
      const requestInput = new RequestInput(undefined, {}, {})

      expect(requestInput.getBody).toEqual({})
    })

    it('deve retornar uma string vazia para getQuery quando query não está definido', () => {
      const requestInput = new RequestInput({}, undefined, {})

      expect(requestInput.getQuery).toBe('')
    })

    it('deve retornar um objeto padão para getHeaders quando headers não está definido', () => {
      const requestInput = new RequestInput({}, {}, undefined)

      expect(requestInput.getHeaders).toEqual({
        accept: 'application/json;charset=UTF-8',
        'content-Type': 'application/json;charset=UTF-8'
      })
    })
  })
})
