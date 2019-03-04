import { AsyncStorage } from 'react-native'
import { FETCH_WEATHER } from './types'

export function fetchWeather(coords) {
  return function action(dispatch) {
    AsyncStorage.getItem('weatherInfo', (err, weatherInfo) => {
      if (weatherInfo != null) {
        console.log('get AsyncStorage data ');
        dispatch(fetchWeatherSuccess(JSON.parse(weatherInfo)))
      } else {
        // console.log('get info from API');
        const location = `lat=${coords.latitude}&lon=${coords.longitude}`
        const request = fetch(`http://api.openweathermap.org/data/2.5/weather?${location}&units=metric&appid=a9cb00ce5618021ef6dcff9b827298cc`)
        return request.then(
          response => {
            let jsonResponse = response.json();
            jsonResponse.then(data => {
              const info = {
                temp: data.main.temp,
                humidity: data.main.humidity,
                updatedAtTimestamp: Date.now()
              }
              dispatch(fetchWeatherSuccess(info))
              AsyncStorage.setItem('weatherInfo', JSON.stringify(info))
            })
          },
          err => dispatch(fetchWeatherError(err))
        )
      }
    })
  }
}

export function fetchWeatherSuccess(weather) {
  return {type: 'FETCH_WEATHER', weather}
}

export function fetchWeatherError(error) {
  return console.log(error)
}
