export interface IDocument {
  id: number
  docOn: string
  docNumber: string
  receiverOrgId: number
  characterId: number
  stateId: number
  receiverOrgan: string
  character: string
  state: string
  documentName: string
  languageId: number
  language: string
  version: string
  tags: string
  content: any[]
}
