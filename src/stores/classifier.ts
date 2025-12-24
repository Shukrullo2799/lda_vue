import { useErrorToast } from "@/composables/helpers/useErrorToast"
import type { ISelectList } from "@/models"
import { ClassifierService } from "@/services/others/classifier.service"
import { defineStore } from "pinia"
const { setError } = useErrorToast()

interface IState {
  stateList: ISelectList[]
}

export const useClassifierStore = defineStore("classifier", {
  state: (): IState => ({
    stateList: [],
  }),
  actions: {
    async fetchState() {
      if (this.stateList.length) return
      try {
        const response = await ClassifierService.GetStateSelectList()
        this.stateList = response.data
      } catch (error) {
        setError(error)
      }
    },
  },
})
