import isJusttoAdmin from '../../src/utils/isJusttoAdmin'

describe('Testa isJusttoAdmin', () => {
  it('Deve ser Admin.', () => {
    expect(isJusttoAdmin('josewilliam@justto.com.br')).toBeTruthy()
  })

  it('Não deve ser admin.', () => {
    expect(isJusttoAdmin('josewilliam@gmail.com')).toBeFalsy()
  })
})
