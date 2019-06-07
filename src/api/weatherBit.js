import { getCode } from 'country-list'

const WEATHERBIT_URL = 'https://api.weatherbit.io/v2.0/current?key=2e2c98279957405cba9fe5819c5c0b5d'

export const getWeatherFromWeatherBit = async (city, country) => {
  const requestUrl = `${WEATHERBIT_URL}&city=${city.toLowerCase()},${getCode(country.toLowerCase()) || country.toUpperCase()}`
  const res = await fetch(requestUrl)
  return await res.json()
}

export const parseData = (json) => {
  const { data } = json
  const weatherInfo = data.length > 0 ? data[0] : null

  return {
    iconId: weatherInfo ? weatherInfo.weather.code.toString() : null,
    description: weatherInfo ? weatherInfo.weather.description : null, 
    temp: weatherInfo ? weatherInfo.temp : null
  }
}