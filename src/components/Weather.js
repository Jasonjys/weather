import React from 'react'
import WeatherIcon from 'react-icons-weather';
import { Card } from 'antd';

const Weather = (props) => {
  const { source, description, temp, iconId, city } = props

  return (
    <Card title={source} style={{ width: 300, height: 300, margin: '20px' }}>
      <h3 style={{textTransform: 'capitalize'}}>{city}</h3>
      <div style={{ display: 'flex', alignItems: "center" }}>
        <WeatherIcon name="owm" iconId={iconId} flip="horizontal" />
        <div style={{marginLeft: 10}}>{description}</div>
      </div>
      <p>{temp}°C</p>
    </Card>
  )
}

export default Weather;