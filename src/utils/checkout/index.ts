export function checkCpfIsInvalid(cpf: string) {
  const invalidCpf = /^0{3}\.0{3}\.0{3}-0{2}$/

  return invalidCpf.test(cpf)
}
