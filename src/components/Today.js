import React, { useEffect, useState } from "react"
import { emojis } from "../utils/emojis"
import { formatDateToHM } from "../utils/fromatDateToHM"
import { getEmojis } from "../utils/getEmojis"

const Today = ({ data, weatherUnits }) => {
  const [weatherEmojis, setWeatherEmojis] = useState("")

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

    setWeatherEmojis(weatherEmojis)
  }, [data])

  if (!data || !weatherUnits) {
    return (
      <div className="text-2xl text-center text-red-500">
        Aucune donnée, affichage impossible ..
      </div>
    )
  }
  return (
    <div className="max-w-max mx-auto xl:ml-auto">
      <div className="flex mb-20 mt-12 flex-col xl:flex-row">
        <div className="flex flex-col">
          <div className="text-8xl mb-8 text-center xl:text-right">
            {weatherEmojis}
          </div>
          <div className="text-3xl font-bold text-center text-white mt-auto mb-8 xl:mt-auto xl:mb-0">
            Aujourd'hui, {data.day}
          </div>
        </div>
        <div className="text-xl ml-12 text-white xl:pl-4 xl:border-l-2 xl:border-l-orange-800">
          <p>
            {emojis.calendar} Jour : {data.day}
          </p>
          <p>
            {emojis.rain} Pluie : {data.precipitation_sum} {weatherUnits.rain}
          </p>
          <p>
            {emojis.sunrise} Levé du Soleil :{" "}
            {formatDateToHM(new Date(data.sunrise))}
          </p>
          <p>
            {emojis.sunset} Couché du Soleil :{" "}
            {formatDateToHM(new Date(data.sunset))}
          </p>
          <p>
            {emojis.hot} Température max : {data.temperature_2m_max}{" "}
            {weatherUnits.temperature}
          </p>
          <p>
            {emojis.hot} Température min : {data.temperature_2m_min}{" "}
            {weatherUnits.temperature}
          </p>
          <p>
            {emojis.wind} Vitesse du vent : {data.windspeed_10m_max}{" "}
            {weatherUnits.wind}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Today
