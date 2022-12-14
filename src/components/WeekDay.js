import React, { useEffect, useState } from "react"
import { getEmojis } from "../utils/getEmojis"

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
    const weatherEmojis = getEmojis(
      avTemp,
      data.precipitation_sum,
      data.windspeed_10m_max,
    )

    setAverageTemperature(avTemp)
    setWeatherEmojis(weatherEmojis)
  }, [data])

  if (!data || !weatherUnits) {
    return <div className="text-2xl text-center text-red-500">Erreur ...</div>
  }
  return (
    <div className="text-center p-6 rounded-md bg-white/30 shadow-md flex justify-center items-center md:flex-col">
      <p className="text-lg text-white font-bold md:mb-1">{data.day}</p>
      <p className="ml-6 md:mb-4 text-white md:ml-0">
        {averageTemperature}{" "}
        <span className="text-xs text-white font-semibold">
          {weatherUnits.temperature}
        </span>
      </p>
      <div className="ml-6 text-4xl md:ml-0">
        {weatherEmojis && <div>{weatherEmojis}</div>}
      </div>
    </div>
  )
}

export default WeekDay
