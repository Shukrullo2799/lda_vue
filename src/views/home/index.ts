// Экспорт типов
export { type IDocument } from "./types/home"

// Экспорт store
export { useHomeStore } from "./stores/useStore"

// Экспорт сервиса
export { HomeService } from "./services/apiHome"

// Экспорт роутера
export { homeRoutes } from "./router/homeRouter"

// Экспорт компонентов
export { default as BranchCard } from "./components/BranchCard.vue"
export { default as CardSkeleton } from "./components/CardSkeleton.vue"
export { default as DocumentListItem } from "./components/DocumentListItem.vue"
export { default as DocumentListSkeleton } from "./components/DocumentListSkeleton.vue"
