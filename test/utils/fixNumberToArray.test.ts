import fixNumberToArray from '../../src/utils/fixNumberToArray'

describe('Testa fixNumberToArray', () => {
  it('should return an array of numbers if the value is an array', () => {
    const expected = [1, 2, 3]
    const actual = fixNumberToArray([1, 2, 3])
    expect(actual).toEqual(expected)
  })

  it('should return an array of one number if the value is a number or a string', () => {
    const expected = [1]
    const actual = fixNumberToArray(1)
    expect(actual).toEqual(expected)

    const actual2 = fixNumberToArray('1')
    expect(actual2).toEqual(expected)
  })

  it('should return undefined if the value is not a number or a string', () => {
    const actual = fixNumberToArray({})
    expect(actual).toBeUndefined()
  })
})
