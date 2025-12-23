import { defineStore } from "pinia"

interface IState {}

export const useClassifierStore = defineStore("classifier", {
  state: (): IState => ({}),
  actions: {},
})
