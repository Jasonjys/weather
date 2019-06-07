import React, { Component } from 'react'
import { Form, Button, Input, Icon } from 'antd'
import { getWeatherFromOpenWeatherMap, parseData as parseOpenWeather } from './api/openWeatherMap'
import { getWeatherFromWeatherBit, parseData as parseWeatherBit } from './api/weatherBit'
import Weather from './components/Weather'
import './App.css';

class App extends Component {
  state = {
    openWeatherMap: null,
    weatherBit: null,
    err: null,
    loading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { city, country } = values;
        console.log('Received values of form: ', values);
        this.setState({
          openWeatherMap: null,
          weatherBit: null,
          loading: true,
          err: null
        })
        try {
          const openWeatherMapJson = await getWeatherFromOpenWeatherMap(city, country)
          const weatherBitJson = await getWeatherFromWeatherBit(city, country)

          this.setState({
            openWeatherMap: parseOpenWeather(openWeatherMapJson),
            weatherBit: parseWeatherBit(weatherBitJson),
            loading: false
          })
        } catch (err) {
          this.setState({
            err,
            loading: false
          })
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { openWeatherMap, weatherBit, loading, err } = this.state;
    return (
      <div style={{ height: '100%', paddingTop: '15%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <Form layout='inline' onSubmit={this.handleSubmit}>
            <Form.Item label="City">
              {getFieldDecorator('city', {
                rules: [{ required: true, message: 'Please input city!' }],
              })(
                <Input placeholder="Ottawa" />
              )}
            </Form.Item>  
            <Form.Item label="Country" >
              {getFieldDecorator('country', {
                rules: [{ required: true, message: 'Please input country!' }],
              })(
                <Input placeholder="Canada" />
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Get weather
            </Button>
          </Form>          
        </div>
        <div style={{display: 'flex', width: '100%', height: '45%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
          {loading && <Icon type="loading" style={{ fontSize: 24 }} spin />}
          {err && <div style={{display: 'flex', height: 100, alignItems: 'center'}}>City not found</div>}
          {openWeatherMap && (
            <Weather
              city={openWeatherMap.city}
              iconId={openWeatherMap.iconId}
              source="Open Weather Map"
              temp={openWeatherMap.temp}
              description={openWeatherMap.description}
            />
          )}
          {weatherBit && (
            <Weather
              city={weatherBit.city}
              iconId={weatherBit.iconId}
              source="Weather Bit"
              temp={weatherBit.temp}
              description={weatherBit.description}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Form.create({ name: 'customized_form_controls' })(App);
