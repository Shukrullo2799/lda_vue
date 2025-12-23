// Экспорт типов
export type { IOrganization } from "./types/organization"

// Экспорт store
export { useOrganizationStore } from "./stores/organizationStore"

// Экспорт сервиса
export { OrganizationService } from "./services/organizationApi"

// Экспорт роутера
export { orgnizationRoutes } from "./routes/orgnizationRoutes"

// Экспорт компонентов
export { default as OrganizationList } from "./components/OrganizationList.vue"
export { default as OrganizationForm } from "./components/OrganizationForm.vue"
export { default as OrganizationModule } from "./index.vue"
