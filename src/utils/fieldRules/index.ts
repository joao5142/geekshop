import {
  isEmailValid,
  isPhoneNumber as isPhoneNumberRegex,
  isCepValid,
  isANumber as isAValidNumber,
} from '@/utils/regex'

export const emptyValue = (value: string) => {
  if (value) {
    return true
  }

  return 'Preencha o campo'
}

export const isANumber = (value: string) => {
  if (value.match(isAValidNumber)) {
    return true
  }

  return 'Informe um número válido'
}

export const isEmail = (value: string) => {
  if (value.match(isEmailValid)) {
    return true
  }

  return 'O campo não é um email válido'
}

export const isPhoneNumber = (value: string) => {
  if (value.match(isPhoneNumberRegex)) {
    return true
  }

  return 'O campo não é um número válido'
}

export const isCep = (value: string) => {
  if (value.match(isCepValid)) {
    return true
  }

  return 'O cep não é válido'
}
