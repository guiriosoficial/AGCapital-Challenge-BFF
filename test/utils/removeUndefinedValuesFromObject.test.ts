import removeUndefinedValuesFromObject from '../../src/utils/removeUndefinedValuesFromObject'

describe('removeUndefinedValuesFromObject', () => {
  it('should return an object with undefined values removed', () => {
    const expected = { a: 1, b: 'hello' }
    const actual = removeUndefinedValuesFromObject({ a: 1, b: 'hello', c: undefined })

    expect(actual).toEqual(expected)
  })

  it('should return an empty object if the input object is empty', () => {
    const actual = removeUndefinedValuesFromObject({})

    expect(actual).toEqual({})
  })

  it('should return the input object if the input object does not have any undefined values', () => {
    const actual = removeUndefinedValuesFromObject({ a: 1, b: 'hello' })

    expect(actual).toEqual({ a: 1, b: 'hello' })
  })
})