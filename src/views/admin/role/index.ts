// Экспорт типов
export type { IUser, ICreateUserRequest, IUpdateUserRequest } from "./types/user"

// Экспорт store
export { useUserStore } from "./stores/userStore"

// Экспорт сервиса
export { RoleService } from "./services/roleApi"

// Экспорт роутера
export { userRoutes } from "./routes/userRoutes"

// Экспорт компонентов
export { default as UserList } from "./components/UserList.vue"
export { default as UserForm } from "./components/UserForm.vue"
export { default as UserDetail } from "./components/UserDetail.vue"
export { default as UserModule } from "./index.vue"
