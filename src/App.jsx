import React, { useState, useEffect } from 'react'
import './App.css'
import { api } from './services/api'
import { FaLessThanEqual, FaTemperatureHigh, FaWind } from 'react-icons/fa'

function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState("")
  const [search, setSearch] = useState("")

  async function handleGetWeather(event){
    event.preventDefault()
    const response = await api.get(search)
    setCity(search)
    console.log(response.data)
    setWeather(response.data)
  }

  const setTempo = () => {
    let tempo = weather.description
    console.log(tempo)
    switch(tempo){
      case "Sunny":
        return 'Ensolarado'
      case "Partly cloudy":
        return 'Parcialmente nublado'
      case "Clear":
        return 'Limpo'
      case "Light snow":
        return 'Nevando'
      default:
        return tempo
    }
  }

  useEffect(() => {
    //handleGetWeather()
  }, [])

  return (
    <div className="App" scroll="no">
      <div className="bodyMain">
        <header>
          <form onSubmit={handleGetWeather}>
            <input type="text" value={search} 
                onChange={(event) => setSearch(event.target.value)}
            />
            <button>enviar</button>
          </form>
        </header>

        {weather && //Só vai mostrar se tiver o tempo
          <main>
            <h1>{city}</h1>
          
          <section className="current-weather">
            <section className="climaAtual">
              <h2>Clima atual</h2>                        
                <p className="tempo">{setTempo}</p>
                <p><FaTemperatureHigh /> {weather.temperature}</p>              
                <p><FaWind /> {weather.wind}</p>
            </section>
            <section className="forecast">
              <h2>Próximos dias</h2>
              <ol>
                {
                  weather.forecast.map(day =>
                    <li key={day.toString()}>
                      <div>
                        <FaTemperatureHigh />
                        <p>{day.temperature}</p>
                      </div>
                      <div>
                        <FaWind />
                        <p>{day.wind}</p>
                      </div>
                    </li>
                  )
                } 
              </ol>
            </section>
          </section>
          </main>
        }
      </div>
    </div>
  )
}

export default App
