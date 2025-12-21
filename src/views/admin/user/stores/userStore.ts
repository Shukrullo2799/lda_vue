import { defineStore } from "pinia"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import {
  type ICreateUserRequest,
  type IUpdateUserRequest,
  type IUser,
  UserService,
} from "@/views/admin/user"

const { setError } = useErrorToast()

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [] as IUser[],
    loading: false,
    saveLoading: false,
    error: null as string | null,
  }),

  getters: {},

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null

      try {
        const response = await UserService.GetList({})
        this.users = response.data
      } catch (error) {
        setError(error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.loading = false
      }
    },
    async getUserById(id: string | number) {
      this.loading = true
      this.error = null
      try {
        const response = await UserService.Get(+id)
        return response.data
      } catch (error) {
        setError(error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.loading = false
      }
    },

    async updateUser(userData: IUpdateUserRequest) {
      this.saveLoading = true
      this.error = null

      try {
        const response = await UserService.Update(userData)
      } catch (error) {
        setError(error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.saveLoading = false
      }
    },
  },
})
