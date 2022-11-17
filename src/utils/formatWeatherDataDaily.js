// Tableau qui contient un Objet par jour
export const formatWeatherDataDaily = (data) => {
  const dataDaily = []

  const dataEntries = Object.keys(data)

  dataEntries.forEach((key, keyindex) => {
    for (let i = 0; i < data[key].length; i++) {
      if (keyindex === 0) {
        dataDaily.push({})
      }

      // Récupérer la valeur de jour en question dans le champ en question
      const dayValue = data[key][i]
      // PLacer la donnée du jour danss l'objet qui correspon au jour ne question
      dataDaily[i][key] = dayValue
    }
  })

  // French day
  dataDaily.forEach((data) => {
    const date = new Date(data.time)
    const dayIndex = date.getDay() // 0 dimanche 1 lundi ...
    data.day = frenchDays[dayIndex]
  })

  return dataDaily
}

const frenchDays = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
]
