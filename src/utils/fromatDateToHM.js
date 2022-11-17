export const formatDateToHM = (date) => {
  const hoursMinSec = date.toTimeString().split(" ")[0]
  const hoursMinArray = hoursMinSec.split(":")
  const hoursMin = hoursMinArray[0] + ":" + hoursMinArray[1]
  return hoursMin
}
