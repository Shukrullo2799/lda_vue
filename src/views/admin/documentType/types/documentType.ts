import type { ITranslates } from "@/models"

export interface IDocumentType {
  id: number
  shortName: string
  fullName: string
  description: string
  stateId: number
  state: string
  translations: ITranslates[]
}
