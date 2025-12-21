import { ref } from "vue"

interface ITrustedHosts {
  host: string
  api: string
}

const trustedHosts: ITrustedHosts[] = [
  // test
  {
    host: `https://tlda.ihma-atm.uz`,
    api: `https://tlda.ihma-atm.uz/api`,
  },
]

export const useAppUrl = () => {
  const API_URL = ref<string>("https://tlda.ihma-atm.uz/api")

  trustedHosts.forEach((el) => {
    if (window.location.href.indexOf(el.host) > -1) {
      API_URL.value = `${el.api}`
    }
  })

  return {
    API_URL,
  }
}
