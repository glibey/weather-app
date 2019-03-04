import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import weather from './reducers/openWeatherMapReducer'
import thunk from 'redux-thunk'

const initialState = {};

const rootReducer = combineReducers({
  weather
});

const configureStore = () => {
  return createStore(rootReducer, initialState, compose(applyMiddleware(thunk)))
}

export default configureStore
