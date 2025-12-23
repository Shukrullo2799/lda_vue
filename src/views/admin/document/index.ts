// Экспорт типов
export type { IDocument } from "./types/document"

// Экспорт store
export { useDocumentStore } from "./store/documentStore"

// Экспорт сервиса
export { DocumentService } from "./services/documentApi"

// Экспорт роутера
export { documentRoutes } from "./router/documentRouter"

// Экспорт компонентов
export { default as DocumentList } from "./components/DocumentList.vue"
export { default as DocumentForm } from "./components/DocumentForm.vue"
export { default as DocumentContentEditor } from "./components/DocumentContentEditor.vue"
