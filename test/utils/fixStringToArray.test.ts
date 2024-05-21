import fixStringToArray from '../../src/utils/fixStringToArray'

describe('Testa fixStringToArray', () => {
  it('should return an array of strings if the value is an array of strings', () => {
    const expected = ['a', 'b', 'c']
    const actual = fixStringToArray(['a', 'b', 'c'])
    expect(actual).toEqual(expected)
  })

  it('should return an array of one string if the value is a string', () => {
    const expected = ['hello']
    const actual = fixStringToArray('hello')
    expect(actual).toEqual(expected)
  })

  it('should return undefined if the value is not an array of strings or a string', () => {
    const actual = fixStringToArray({})
    expect(actual).toBeUndefined()
  })
})