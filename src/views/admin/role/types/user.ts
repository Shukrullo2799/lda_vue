import type { IPerson } from "@/models"

export interface IUser {
  id: number
  version: number
  person: IPerson
  userName: string
  email: string
  phoneNumber: string
}

export interface ICreateUserRequest {
  userName: string
  password: string
  email: string
  phoneNumber: string
  personId: 0
  roles: string[]
}

export interface IUpdateUserRequest extends ICreateUserRequest {
  id: string
}
