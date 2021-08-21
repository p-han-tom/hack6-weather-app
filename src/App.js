import './App.css';
import axios from "axios"
import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {},

      lat: undefined,
      lon: undefined,
    };

    navigator.geolocation.getCurrentPosition(this.setLocation, () => {/* handle permission denied here */ });
    setInterval(this.updateTime, 1000);
  }

  setLocation = (position) => {
    this.setState({ lat: position.coords.latitude });
    this.setState({ lon: position.coords.longitude });
    if (this.state.lat !== undefined && this.state.lon !== undefined) {
      this.getWeather();
    }
  }

  getWeather = () => {
    let options = {
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/onecall?',
      params: {
        lat: this.state.lat,
        lon: this.state.lon,
        exclude: "current,minutely,daily",
        units: "metric",
        appid: process.env.REACT_APP_API_KEY
      },
    };

    const self = this;
    axios.request(options).then(function (response) {
      self.setState({ weather: response.data });
      console.dir(response.data, { depth: null });
    }).catch(function (error) {
      console.error(error);
    });

  }

  parseTime = (unixTime) => {
    return new Date(unixTime * 1000);
  }

  updateTime = () => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let ampm = hours > 11 ? "PM" : "AM";
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let timeString = currentTime.toDateString() + ", " + hours + ":" + minutes + ":" + seconds + " " + ampm;
    this.setState({ time: timeString });
  }

  /*
  Each hourly weather index looks like this
  0:
    clouds: 3
    dew_point: 17.37
    dt: 1629518400
    feels_like: 20.24
    humidity: 85
    pop: 0
    pressure: 1013
    temp: 19.97
    uvi: 0
    visibility: 10000
    weather: [{…}]
    wind_deg: 315
    wind_gust: 1.52
    wind_speed: 1.4
  */

  generateHourlyReport = () => {
    let reports = [];
    let weather = this.state.weather.hourly;
    for (let i = 0; i < 12; i++) {
      reports.push(
        <div>
          <div>TIME: {this.parseTime(weather[i].dt).getHours()}</div>
          <div>TEMPERATURE: {weather[i].temp}°C</div>
          <div>POP: {weather[i].pop*100}%</div>
          <br></br>
        </div>

      );
    }
    return reports;
  }

  render() {

    if (Object.keys(this.state.weather).length > 0) {
      return (
        <div>
          <Row>
            <Col>
              Greetings! Today is {this.state.time}
            </Col>
            <Col>
              {this.generateHourlyReport()}
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        //Handle loading screen
        <div>loading</div>
      )
    }

  }
}

