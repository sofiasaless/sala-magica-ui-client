export type User = {
  uid?: string,
  email: string,
  phoneNumber?: string,
  password: string,
  displayName: string,
  photoURL: string,
}

export type UserFirestore = {
  data_criacao: string
  email: string
  foto_perfil: string
  nome: string
  telefone: string 
}