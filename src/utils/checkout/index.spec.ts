import { describe, it, expect } from 'vitest'
import { checkCpfIsInvalid } from '.'

describe('Checkout Functions', () => {
  it('should a false value on cpf invalid testing', () => {
    const cpfTestValue = checkCpfIsInvalid('128.714.304.03')
    expect(cpfTestValue).toBe(false)
  })
})
