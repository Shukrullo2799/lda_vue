// Экспорт типов
export type { IRole, IPermissionGroup, IPermissionGroupItem } from "./types/role"

// Экспорт store
export { useRoleStore } from "./stores/userStore"

// Экспорт сервиса
export { RoleService } from "./services/roleApi"

// Экспорт роутера
export { RoleRoutes } from "./routes/roleRoutes"

// Экспорт компонентов
export { default as RoleList } from "./components/RoleList.vue"
export { default as RoleForm } from "./components/RoleForm.vue"
export { default as RoleModule } from "./index.vue"
