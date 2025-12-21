export const useGlobal = () => {
  const forceFileDownload = (response: any, name: string, type?: string) => {
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url

    if (type) {
      link.setAttribute("download", name + type)
    } else {
      link.setAttribute("download", name)
    }

    document.body.appendChild(link)
    link.click()
  }

  const disabledBeforeDays = (date: any) => {
    const today = new Date()
    return date < today
  }

  const disableAfterTodayDays = (date: any) => {
    const today = new Date()
    return date > today
  }

  const parseNumber = (value: number, fractionDigit: number = 0) => {
    return Intl.NumberFormat(
      undefined,
      fractionDigit
        ? {
            maximumFractionDigits: fractionDigit,
            minimumFractionDigits: fractionDigit,
          }
        : {},
    ).format(value)
  }

  function disabledAfterToday(date: any) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date > today
  }

  return {
    forceFileDownload,
    disabledBeforeDays,
    disableAfterTodayDays,
    parseNumber,
    disabledAfterToday,
  }
}
