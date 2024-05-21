import BadRequestError from '../../../src/domain/errors/BadRequestError'

describe('Testa BadRequestError', () => {
  const errorMessage = 'Erro na solicitação inválida'
  const badRequestError = new BadRequestError(errorMessage)

  it('deve criar uma instância de BadRequestError', () => {
    expect(badRequestError).toBeInstanceOf(BadRequestError)
  })

  it('BadRequestError deve ter a mensagem fornecida e o código 400', () => {
    expect(badRequestError.message).toBe(errorMessage)
  })

  it('BadRequestError deve ter código 400', () => {
    expect(badRequestError.code).toBe(400)
  })
})