import { FETCH_WEATHER } from '../actions/types'

const initialState = {}

const openWeatherMapReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_WEATHER:
      return  action.weather
    default:
      return state
  }
}

export default openWeatherMapReducer
