import { defineStore } from "pinia"
import { useErrorToast } from "@/composables/helpers/useErrorToast"
import {
  type ICreateUserRequest,
  type IUpdateUserRequest,
  type IUser,
  UserService,
} from "@/views/admin/user"

import type { ISelectList } from "@/models"
import { RoleService } from "@/views/admin/role"

const { setError } = useErrorToast()

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [] as IUser[],
    editingUser: null as IUpdateUserRequest | ICreateUserRequest | null,
    loading: false,
    saveLoading: false,
    searchLoading: false,
    error: null as string | null,
    roleList: [] as ISelectList[],
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
        this.editingUser = response.data as IUpdateUserRequest
        return response.data
      } catch (error) {
        setError(error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.loading = false
      }
    },

    async updateUser(userData: IUpdateUserRequest | ICreateUserRequest) {
      this.saveLoading = true
      this.error = null

      try {
        await UserService.Update(userData)
      } catch (error) {
        setError(error)
        this.error = error instanceof Error ? error.message : String(error)
      } finally {
        this.saveLoading = false
      }
    },
    async fetchRoleList() {
      try {
        const response = await RoleService.GetSelectList()
        this.roleList = response.data
      } catch (error) {
        setError(error)
      }
    },
  },
})
