export interface IDocument {
  id: string
  number: string
  title: string
  type: string
  adoptionDate: string
  issuingAuthority: string
  status: "active" | "repealed" | "draft"
  isNew?: boolean
  isUpdated?: boolean
}
