import type { ISelectList } from "@/models"

export interface IRole {
  id: number
  name: string
  permissions: string[]
}
export interface IPermissionGroup {
  name: string
  code: string
  items: IPermissionGroupItem[]
}
export interface IPermissionGroupItem {
  text: string
  value: string
}
