import { useState, useEffect, useCallback } from "react"
import Today from "./components/Today"
import WeekDay from "./components/WeekDay"
import { formatWeatherDataDaily } from "./utils/formatWeatherDataDaily"

function App() {
  // Déclaration de Usestate
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [geoLoc, setGeoLoc] = useState({ latitude: 0, longitude: 0 })
  const [weatherUnits, setWeatherUnits] = useState({})
  const [weatherData, setWeatherData] = useState([])

  // Récup les données depuis l'API
  const fetchWeather = useCallback(async (url) => {
    setError(false)

    try {
      const res = await fetch(url)
      const data = await res.json()

      if (Object.keys(data).length === 0) {
        setError(true)
      } else {
        // Récup les données jour / jour
        // formated daily data
        const formatedDailyData = formatWeatherDataDaily(data.daily)
        setWeatherData(formatedDailyData)
        // unités
        setWeatherUnits({
          rain: data.daily_units.precipitation_sum,
          temperature: data.daily_units.temperature_2m_max,
          wind: data.daily_units.windspeed_10m_max,
        })
      }
    } catch (error) {}
  }, [])

  useEffect(() => {
    setIsLoading(true)

    if (!navigator.geolocation) {
      window.alert(
        "Votre navigateur ne permet pas la géolocalisation pour utiliser cette application !",
      )
    }
    // Récup les données GPS
    getGeolocalisation()

    // Récup les données depuis l'API
    fetchWeather(
      `https://api.open-meteo.com/v1/forecast?latitude=${geoLoc.latitude}&longitude=${geoLoc.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,windspeed_10m_max&timezone=Europe%2FLondon`,
    ).then(() => setIsLoading(false))
  }, [fetchWeather, geoLoc.latitude, geoLoc.longitude])

  // Données de Géoloc
  const getGeolocalisation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLoc({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      () => {
        setError(true)
      },
    )
  }

  // Si chargement
  if (isLoading) {
    return (
      <div>
        <p>chargement...</p>
      </div>
    )
  }
  // Si Erreur
  if (error) {
    return (
      <div>
        <p>
          Une erreur est survenue lors de la récupération des prévisions météo
          ...
        </p>
      </div>
    )
  }
  return (
    <div className="">
      <div>
        <Today data={weatherData[0]} weatherUnits={weatherUnits} />
        <div>
          {weatherData &&
            weatherData
              .slice(1, weatherData.length)
              .map((data, index) => (
                <WeekDay key={index} data={data} weatherUnits={weatherUnits} />
              ))}
        </div>
      </div>
    </div>
  )
}

export default App
