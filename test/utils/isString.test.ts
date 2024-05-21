import isString from '../../src/utils/isString'

describe('Testa isString', () => {
  it('deve retornar true para uma string', () => {
      expect(isString('Olá, mundo!')).toBe(true)
      expect(isString('123')).toBe(true)
      expect(isString('')).toBe(true)
  })

  it('deve retornar true para uma instância de String', () => {
      expect(isString(new String('Instância de String'))).toBe(true)
  })

  it('deve retornar false para outros tipos de dados', () => {
      expect(isString(123)).toBe(false)
      expect(isString(true)).toBe(false)
      expect(isString(['array'])).toBe(false)
      expect(isString({ key: 'value' })).toBe(false)
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
  })
})