export interface IFieldData {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}
export interface IState {
  id: number
  sigla: string
  nome: string
  regiao: unknown
}
