import './App.css';
import axios from "axios"
import React from 'react';
import { Row, Col, Card, ListGroup, Spinner, OverlayTrigger, Popover } from 'react-bootstrap';

const BG = {
  "Rain": "linear-gradient(rgb(230, 230, 230), rgb(158, 224, 255))",
  "Clear": "linear-gradient(rgb(250, 217, 0),  rgb(255, 255, 255))",
  "Clouds": "linear-gradient(rgb(223, 223, 223), rgb(235, 235, 235))",
  "Snow": "linear-gradient(rgb(147, 221, 255), rgb(134, 209, 253))"
}


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {},
      lat: undefined,
      lon: undefined,
    };

    navigator.geolocation.getCurrentPosition(this.setLocation, () => {/* handle permission denied here */ });
    setInterval(this.updateHeaderClock, 1000);
  }

  setLocation = (position) => {
    this.setState({ lat: position.coords.latitude });
    this.setState({ lon: position.coords.longitude });
    if (this.state.lat !== undefined && this.state.lon !== undefined) {
      this.getWeather();
    }
  }

  // BACKEND DO NOT TOUCH
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
    let hours = new Date(unixTime * 1000).getHours();
    let ampm = hours > 11 ? "PM" : "AM";
    hours = hours > 12 ? hours - 12 : hours;
    return hours + ":00 " + ampm;
  }

  updateHeaderClock = () => {
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
    pop: 0 (0 -> 1 with 1 = 100%)
    pressure: 1013
    temp: 19.97 (celsius)
    uvi: 0
    visibility: 10000
    weather: Array(1)
      0:
      description: "clear sky"
      icon: "01n"
      id: 800
      main: "Clear"
    wind_deg: 315
    wind_gust: 1.52
    wind_speed: 1.4
  */

  generateHourlyReport = () => {
    let reports = [];
    let hourlyWeather = this.state.weather.hourly;
    for (let i = 0; i < 12; i++) {
      reports.push(
        <OverlayTrigger
          trigger="hover"
          placement="right"
          overlay={
            <Popover>
              <Popover.Body>Addition Info goes here :)</Popover.Body>
            </Popover>
          }>
          <Card className="hour-cards">
            {/* Ternary to automatically adjust any Atmosphere conditions to a cloudy background */}
            <Card.Header style={{ background: hourlyWeather[i].weather[0].main >= 700 && hourlyWeather[i].weather[0].main < 800 ? BG[hourlyWeather[i].weather[0].main] : BG["Clouds"] }}>
              <div id="hour-header">{this.parseTime(hourlyWeather[i].dt)}</div>
              <img id="weather-icons" src={"http://openweathermap.org/img/wn/" + hourlyWeather[i].weather[0].icon + "@2x.png"} alt="" />
              <p style={{ fontSize: "0.75em" }}>{Math.round(hourlyWeather[i].temp)}°C</p>
            </Card.Header>
            <ListGroup>
              <ListGroup.Item>
                P.O.P: {hourlyWeather[i].pop * 100}%
              </ListGroup.Item>
              {/* Fill with more group items, e.g. cloudiness, windiness, humidity, etc */}
              {/* Expand to show more if things get to cluttered? */}
            </ListGroup>
          </Card>
        </OverlayTrigger>

      );
    }
    return reports;
  }

  render() {
    if (Object.keys(this.state.weather).length > 0) {
      return (
        <div>
          {/* HEADER */}
          <Row>
            <Col id="greeting">
              Greetings! Today is {this.state.time}
            </Col>
            <Col id="approx-location">
              (TODO: Nearest City)
            </Col>
          </Row>

          {/* ANCHOR: HOURLY REPORT AND WEATHER TIPS */}
          <Row>
            {/* Hourly reports */}
            <Col>
              {this.generateHourlyReport()}
            </Col>

            {/* Weather tips in four hour intervals */}
            <Col>
              <div>4 Hour Recommendation: </div>
              <div>8 Hour Recommendation: </div>
              <div>12 Hour Recommendation: </div>
            </Col>

          </Row>
        </div>
      );
    } else {
      return (
        // Handle loading screen
        <div id="loadingPrompt"><Spinner animation="border" /><span style={{ fontSize: "3em" }}> Loading</span></div>
      )
    }

  }
}

