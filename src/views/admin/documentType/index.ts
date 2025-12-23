// Экспорт типов
export type { IDocumentType } from "./types/documentType"

// Экспорт store
export { useDocumentTypeStore } from "./stores/documentTypeStore"

// Экспорт сервиса
export { DocumentTypeService } from "./services/documentTypeApi"

// Экспорт роутера
export { documntTypeRoutes } from "./routes/documentTypeRoutes"

// Экспорт компонентов
export { default as DocumentTypeList } from "./components/DocumentTypeList.vue"
export { default as DocumentTypeForm } from "./components/DocumentTypeForm.vue"
export { default as DocumentTypeModule } from "./index.vue"
