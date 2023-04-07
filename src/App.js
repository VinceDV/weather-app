import './App.css';
import React, { useState } from "react";
import axios from 'axios';

export default function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  
    const API_CALL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=61c207cc1a3eb85ada6873dd4f84ef96`

  const searchLocation = () => {

    axios.get(API_CALL).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    setLocation('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchLocation()
      console.log('do validate')
    }
  }


  return (
    <div className='app'>
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Enter Location'
          type='text'
        ></input>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className=''>
            {data.main ? <h1>{(Math.floor(data.main.temp -273.15))} C°</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && 
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{Math.floor((data.main.feels_like -273.15))} C°</p> : null}
            <p>Feels like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
            <p>Wind Speed</p>

          </div>
        </div>
        }
      </div>
    </div>
  );
}
