export const dateToISODateFormat = (date: Date) => {
  return date.toISOString().split("T")[0]
}
