import { getCode, getName } from 'country-list'

const OPEN_WEATHER_MAP_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=e32facacb4f9e1ab10610126e4ebf902&units=metric'

export const getWeatherFromOpenWeatherMap = async (city, country) => {
  const requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${city.toLowerCase()},${getCode(country.toLowerCase()) || getName(country.toUpperCase())}`
  const res = await fetch(requestUrl)
  return await res.json()
}

export const parseData = (data) => {
  const { main, weather } = data
  const weatherInfo = weather.length > 0 ? weather[0] : null

  return {
    city: data.name,
    iconId: weatherInfo.id.toString(),
    description: weatherInfo.description,
    temp: main.temp
  }
}