import type { Component } from "vue"

export interface IPermissionChild {
  title: string
  to: string
  visible: string[]
  icon?: Component
}

export interface IPermission {
  title: string
  to: string
  visible: string[]
  isCollapse?: boolean
  isActive?: boolean
  icon?: Component
  items?: IPermissionChild[]
}
export interface IFields {
  key: string
  label: string
  sort?: boolean
  isAmount?: boolean

  tdRowSpan?: number | string
  tdColSpan?: number | string
  thRowSpan?: number | string
  thColSpan?: number | string

  thClass?: number | string
  tdClass?: number | string

  children?: IFields[]
  isRow?: boolean
  visible?: boolean
  removeChildParent?: boolean
}
export interface ITableActions {
  isView?: boolean
  isEdit?: boolean
  isClone?: boolean
  isDelete?: boolean
  canAccept?: boolean
  canCancel?: boolean
  canDelete?: boolean
  canApprove?: boolean
  canSent?: boolean
  canReject?: boolean
  canRevoke?: boolean
}
export interface IModalProps {
  title: string
  id: number | null
  cb: string
  item?: any
}
export interface IFilter {
  search: string
  sortBy?: string
  orderType: "asc" | "desc"
  page: number
  pageSize: number
  totalRows?: number
}
export interface IPerson {
  id: number
  version: number
  pinfl: string
  fullName: string
  shortName: string
  passportSeria: string
  birthDate: string
  passportNumber: string
  passportDate: string
  passportExpiration: string
  genderId: number
  gender: string
  nationalityId: number
  nationality: string
  citizenshipId: number
  citizenship: string
  livingRegionId: number
  livingRegion: string
  livingDistrictId: number
  livingDistrict: string
  livingMfyId: number
  livingMfy: string
  isDeath: true
  isTemporary: true
  temporaryRegionId: number
  temporaryRegion: string
  temporaryDistrictId: number
  temporaryDistrict: string
  temporaryMfyId: number
  temporaryMfy: string
}
export interface ISelectList {
  orderCode?: string
  text: string
  value: number
}
