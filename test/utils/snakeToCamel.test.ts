import snakeToCamel from '../../src/utils/snakeToCamel'

describe('Testa isJusttoAdmin', () => {
  test('Deve retornar string vazia para string vazia', () => {
    const input = ''
    const output = snakeToCamel(input)
    expect(output).toBe('')
  })

  test('Deve converter hífen para camelCase', () => {
    const input = 'snake-case'
    const output = snakeToCamel(input)
    expect(output).toBe('snakeCase')
  })

  test('Deve converter underline e hífen para camelCase', () => {
    const input = 'snake_case-with-hyphen'
    const output = snakeToCamel(input)
    expect(output).toBe('snakeCaseWithHyphen')
  })

  test('Deve remover caracteres especiais', () => {
    const input = 'snake_case-with-hyphen_and_special_characters!'
    const output = snakeToCamel(input)
    expect(output).toBe('snakeCaseWithHyphenAndSpecialCharacters!')
  })

  test('Deve converter números para string', () => {
    const input = 'snake_case123'
    const output = snakeToCamel(input)
    expect(output).toBe('snakeCase123')
  })

  test('Deve converter acentos para letras sem acento', () => {
    const input = 'snake_case_com_acentos'
    const output = snakeToCamel(input)
    expect(output).toBe('snakeCaseComAcentos')
  })
})
