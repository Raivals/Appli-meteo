import { useState, useEffect } from "react"

function App() {
  // Déclaration de Usestate
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [geoLoc, setGeoLoc] = useState({ latitude: 0, longitude: 0 })

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
      "https://api.open-meteo.com/v1/forecast?latitude=48.68&longitude=6.15&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,windspeed_10m_max&timezone=Europe%2FLondon",
    )
  }, [])

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

  // Récup les données depuis l'API
  const fetchWeather = async (url) => {
    setError(false)

    try {
      const res = await fetch(url)
      const data = await res.json()

      console.log(data)
    } catch (error) {}
  }

  //
  return <div className="App">Test</div>
}

export default App
