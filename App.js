import React, {Component} from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import { connect } from 'react-redux'
import { fetchWeather } from './src/actions/openWeatherMap'
import Icon from 'react-native-vector-icons/FontAwesome';

class App extends Component {

  state = {
    label: 'Weather at your location'
  }

  fetchWeather = (e) => {
    AsyncStorage.removeItem('weatherInfo')
    if (Platform.OS === 'ios') {
      navigator.geolocation.getCurrentPosition(position => {
        this.props.fetchWeather(position.coords)
      })
    } else {
      this.requestPermission();
    }
  }

  // componentWillMount() {
  //   AsyncStorage.removeItem('weatherInfo')
  // }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      navigator.geolocation.getCurrentPosition(position => {
        this.props.fetchWeather(position.coords)
      })
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          'title': 'Location Access Required',
          'message': 'Wether App needs to Access your location'
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigator.geolocation.getCurrentPosition(position => {
          this.props.fetchWeather(position.coords)
        })
      } else {
        alert("Location Permission Denied");
      }
    } catch (err) {
      alert("err", err);
      console.warn(err)
    }
  }

  render() {
    // console.log(this.state)
    // console.log(this.props)

    let {label} = this.state
    let {weather} = this.props
    const {safeAreaStyle, container, title, tempStyle, humidityStyle, updatedAtStyle} = styles
    const updatedAt = (weather.updatedAtTimestamp) ? new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(weather.updatedAtTimestamp) : ''
    return (
      <SafeAreaView style={safeAreaStyle}>
        <View style={container}>
          <Text style={title}>{label}</Text>
          <Text style={tempStyle}>{weather.temp} &#8451;</Text>
          <Text style={humidityStyle}>{weather.humidity} &#37;</Text>
          <Text style={updatedAtStyle}>Last update: {updatedAt}</Text>

            <TouchableOpacity onPress={this.fetchWeather.bind(this)}
              style={{ borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:100,
                height:100,
                backgroundColor:'#fff',
                borderRadius:100,
              }}
              >
              <Icon name={"refresh"}
                size={50}
                color="#1565c0" />
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    backgroundColor: "#1565C0"
  },
  container: {
    backgroundColor: "#1565C0",
    height: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: "#e0e0e0",
    fontSize: 22,
  },
  tempStyle: {
    color: "#FFF",
    fontSize: 62,
  },
  humidityStyle: {
    color: "#FFF",
    fontSize: 62,
  },
  updatedAtStyle: {
    color: "#B0BEC5",
    fontSize: 12,
  }
});

const mapStateToProps = state => {
  return {
    weather: state.weather
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchWeather: (coords) => {
      dispatch(fetchWeather(coords))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
