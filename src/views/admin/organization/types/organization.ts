import type { ITranslates } from "@/models"

export interface IOrganization {
  id: number
  organizationName: string
  description: string
  stateId: number
  state: string
  translations: ITranslates[]
}
