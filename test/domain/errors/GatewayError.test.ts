import GatewayError from '../../../src/domain/errors/GatewayError'

describe('Testa GatewayError', () => {
  describe('Sem mensagem de erro fornecida', () => {
    const expectedErrorMessage = 'Internal Server Error'
    const status = 400

    const error = new GatewayError({ status })
  
    it('deve criar uma instância de GatewayError', () => {
      expect(error).toBeInstanceOf(GatewayError)
    })
  
    it('GatewayError deve ter a mensagem fornecida', () => {
      expect(error.message).toBe(expectedErrorMessage)
    })
  
    it('GatewayError deve ter status fornecidp', () => {
      expect(error.code).toBe(status)
    })
  })

  describe('Sem status de erro fornecida', () => {
    const message = 'Internal Server Error'
    const expectedStatus = 500

    const error = new GatewayError({ message })
  
    it('deve criar uma instância de GatewayError', () => {
      expect(error).toBeInstanceOf(GatewayError)
    })
  
    it('GatewayError deve ter a mensagem fornecida', () => {
      expect(error.message).toBe(message)
    })
  
    it('GatewayError deve ter status fornecidp', () => {
      expect(error.code).toBe(expectedStatus)
    })
  })

  describe('Sem dados fornecidos', () => {
    const expectedErrorMessage = 'Internal Server Error'
    const expectedStatus = 500

    const error = new GatewayError({})
  
    it('deve criar uma instância de GatewayError', () => {
      expect(error).toBeInstanceOf(GatewayError)
    })
  
    it('GatewayError deve ter a mensagem fornecida', () => {
      expect(error.message).toBe(expectedErrorMessage)
    })
  
    it('GatewayError deve ter status fornecidp', () => {
      expect(error.code).toBe(expectedStatus)
    })
  })
})