export const dateToISODateFormat = (date: Date) => {
  return date.toISOString().split("T")[0]
}

export const getDateDuration = (date: Date) => {
  const startOfDate = new Date(dateToISODateFormat(date))
  const endOfDate = new Date(startOfDate.getTime())

  endOfDate.setHours(23, 59, 59, 999)

  return { startOfDate, endOfDate }
}
