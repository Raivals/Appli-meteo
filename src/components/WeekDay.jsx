import React, { useEffect, useState } from "react"

const WeekDay = ({ data, weatherUnits }) => {
  const [weatherEmojis, setWeatherEmojis] = useState("")
  const [averageTemperature, setAverageTemperature] = useState(0)

  useEffect(() => {
    if (!data) return
    // Température moyenne (toFixed(1) = 1 chiffre après la virgule)
    const avTemp = (
      (data.temperature_2m_max + data.temperature_2m_min) /
      2
    ).toFixed(1)

    // Gestion weatherEmojis
    const weatherEmojis = getEmojis()
  }, [])
  return <div>WeekDay</div>
}

export default WeekDay
