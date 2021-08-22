import './App.css';
import axios from "axios"
import React from 'react';

import WeatherTips from './WeatherTips';

import day from "./images/day_sky.jpg"
import night from "./images/night_sky.jpg"
import sunrise from "./images/sunrise.jpg"

import { Row, Col, Card, ListGroup, Spinner, OverlayTrigger, Popover, Accordion } from 'react-bootstrap';

const BG = {
  "Rain": ["linear-gradient(rgb(230, 230, 230), rgb(158, 224, 255))", "linear-gradient(rgb(132, 185, 255), rgb(16, 86, 101))"],
  "Clear": ["linear-gradient(rgb(250, 217, 0),  rgb(255, 255, 255))", "linear-gradient(rgb(0, 21, 141), rgb(49, 49, 49))"],
  "Clouds": ["linear-gradient(rgb(194, 194, 194), rgb(235, 235, 235))", "linear-gradient(rgb(141, 141, 141), rgb(0, 43, 136))"],
  "Snow": ["linear-gradient(rgb(147, 221, 255), rgb(134, 209, 253))", "linear-gradient(rgba(7,0,115,1), rgba(0,173,210,1))"]
}

const date = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      background: "",
      weather: {
        hourly: [
          {
            "dt": 1629572400,
            "temp": -18.63,
            "feels_like": -19.07,
            "pressure": 1012,
            "humidity": 0.1,
            "dew_point": 18.71,
            "uvi": 4.16,
            "clouds": 64,
            "visibility": 10000,
            "wind_speed": 15.51,
            "wind_deg": 172,
            "wind_gust": 1.99,
            "weather": [
              {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
              }
            ],
            "pop": 0
          },
          {
            "dt": 1629576000,
            "temp": -18.16,
            "feels_like": -19.17,
            "pressure": 1012,
            "humidity": 0.2,
            "dew_point": 19.39,
            "uvi": 5.28,
            "clouds": 75,
            "visibility": 10000,
            "wind_speed": 30.59,
            "wind_deg": 172,
            "wind_gust": 2.38,
            "weather": [
              {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
              }
            ],
            "pop": 0
          },
          {
            "dt": 1629579600,
            "temp": -22,
            "feels_like": -23,
            "pressure": 1012,
            "humidity": 0.15,
            "dew_point": 18.66,
            "uvi": 6.34,
            "clouds": 66,
            "visibility": 10000,
            "wind_speed": 2.96,
            "wind_deg": 184,
            "wind_gust": 2.61,
            "weather": [
              {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
              }
            ],
            "pop": 0
          },
          /////////////////////////////////////////////
          {
            "dt": 1629583200,
            "temp": 28.48,
            "feels_like": 29.45,
            "pressure": 1011,
            "humidity": 54,
            "dew_point": 18.27,
            "uvi": 0.56,
            "clouds": 60,
            "visibility": 10000,
            "wind_speed": 1.87,
            "wind_deg": 230,
            "wind_gust": 2.41,
            "weather": [
              {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
              }
            ],
            "pop": 0
          },
          {
            "dt": 1629586800,
            "temp": 32.4,
            "feels_like": 34.27,
            "pressure": 1011,
            "humidity": 70,
            "dew_point": 17.85,
            "uvi": 7.17,
            "clouds": 56,
            "visibility": 10000,
            "wind_speed": 4.53,
            "wind_deg": 245,
            "wind_gust": 2.34,
            "weather": [
              {
                "id": 803,
                "main": "Clouds",
                "description": "broken clouds",
                "icon": "04d"
              }
            ],
            "pop": 0.60
          },
          {
            "dt": 1629590400,
            "temp": 32.26,
            "feels_like": 35.49,
            "pressure": 1011,
            "humidity": 80,
            "dew_point": 17.72,
            "uvi": 8.12,
            "clouds": 50,
            "visibility": 10000,
            "wind_speed": 3.96,
            "wind_deg": 200,
            "wind_gust": 1.15,
            "weather": [
              {
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03d"
              }
            ],
            "pop": 0.64
          },
          /////////////////////////////////////////////////////////
          {
            "dt": 1629594000,
            "temp": 12.13,
            "feels_like": 10.25,
            "pressure": 1012,
            "humidity": 71,
            "dew_point": 16.54,
            "uvi": 0,
            "clouds": 4,
            "visibility": 10000,
            "wind_speed": 1.09,
            "wind_deg": 215,
            "wind_gust": 1.28,
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
              }
            ],
            "pop": 0.78
          },
          {
            "dt": 1629597600,
            "temp": 11.12,
            "feels_like": 11.25,
            "pressure": 1012,
            "humidity": 75,
            "dew_point": 16.36,
            "uvi": 0,
            "clouds": 3,
            "visibility": 10000,
            "wind_speed": 1.02,
            "wind_deg": 219,
            "wind_gust": 1.26,
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
              }
            ],
            "pop": 0
          },
          {
            "dt": 1629601200,
            "temp": 6.78,
            "feels_like": 5.92,
            "pressure": 1012,
            "humidity": 25,
            "dew_point": 16.32,
            "uvi": 0,
            "clouds": 2,
            "visibility": 10000,
            "wind_speed": 41.83,
            "wind_deg": 228,
            "wind_gust": 1.96,
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
              }
            ],
            "pop": 0
          },
          /////////////////////////////////////////////////////////

          {
            "dt": 1629604800,
            "temp": 20.18,
            "feels_like": 20.34,
            "pressure": 1012,
            "humidity": 80,
            "dew_point": 16.63,
            "uvi": 0,
            "clouds": 4,
            "visibility": 10000,
            "wind_speed": 41.83,
            "wind_deg": 248,
            "wind_gust": 1.96,
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
              }
            ],
            "pop": 0
          },
          {
            "dt": 1629608400,
            "temp": 19.91,
            "feels_like": 20.15,
            "pressure": 1012,
            "humidity": 84,
            "dew_point": 17.14,
            "uvi": 0,
            "clouds": 4,
            "visibility": 10000,
            "wind_speed": 1.6,
            "wind_deg": 253,
            "wind_gust": 1.75,
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
              }
            ],
            "pop": 0
          },
          {
            "dt": 1629612000,
            "temp": 19.78,
            "feels_like": 20.03,
            "pressure": 1012,
            "humidity": 85,
            "dew_point": 17.25,
            "uvi": 0,
            "clouds": 8,
            "visibility": 10000,
            "wind_speed": 1.91,
            "wind_deg": 281,
            "wind_gust": 2.02,
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
              }
            ],
            "pop": 0
          },
          /////////////////////////////////////////////////////////
          {
            "dt": 1629615600,
            "temp": 13.6,
            "feels_like": 13.89,
            "pressure": 1012,
            "humidity": 87,
            "dew_point": 17.34,
            "uvi": 0,
            "clouds": 14,
            "visibility": 10000,
            "wind_speed": 1.12,
            "wind_deg": 296,
            "wind_gust": 1.31,
            "weather": [
              {
                "id": 801,
                "main": "Clouds",
                "description": "few clouds",
                "icon": "02n"
              }
            ],
            "pop": 0
          },
          {
            "dt": 1629619200,
            "temp": 13.4,
            "feels_like": 13.72,
            "pressure": 1012,
            "humidity": 89,
            "dew_point": 17.38,
            "uvi": 0,
            "clouds": 8,
            "visibility": 10000,
            "wind_speed": 1.42,
            "wind_deg": 292,
            "wind_gust": 1.55,
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
              }
            ],
            "pop": 0
          },
          {
            "dt": 1629622800,
            "temp": 19.22,
            "feels_like": 19.52,
            "pressure": 1013,
            "humidity": 89,
            "dew_point": 17.34,
            "uvi": 0,
            "clouds": 5,
            "visibility": 10000,
            "wind_speed": 0.96,
            "wind_deg": 318,
            "wind_gust": 1.06,
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
              }
            ],
            "pop": 0.01
          },
          {
            "dt": 1629626400,
            "temp": 8.29,
            "feels_like": 8.6,
            "pressure": 1013,
            "humidity": 89,
            "dew_point": 17.42,
            "uvi": 0,
            "clouds": 4,
            "visibility": 10000,
            "wind_speed": 0.74,
            "wind_deg": 28,
            "wind_gust": 0.9,
            "weather": [
              {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
              }
            ],
            "pop": 0
          },
        ]
      },
      lat: undefined,
      lon: undefined,
    };

    // navigator.geolocation.getCurrentPosition(this.setLocation, () => {/* handle permission denied here */ });
  }

  componentDidMount = () => {
    const hour = new Date().getHours();
    if (hour < 6 || hour > 20) {
      this.setState({ background: night })
    } else if ((hour >= 6 && hour < 9) || (hour >= 18 && hour < 20)) {
      this.setState({ background: sunrise })
    } else {
      this.setState({ background: day })
    }
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
    hours = hours < 10 ? "0" + hours : hours;

    return hours + ":00 " + ampm;
  }

  getLastUpdate = () => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let ampm = hours > 11 ? "PM" : "AM";
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let timeString = currentTime.toDateString() + " " + hours + ":" + minutes + ":" + seconds + " " + ampm;
    return timeString;
  }

  /*
  Each hourly weather index looks like this
  0:
    clouds: 3 (percentage /100)
    dew_point: 17.37
    dt: 1629518400
    feels_like: 20.24
    humidity: 85 percentage
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
      let currHour = (new Date().getHours() + i > 24 ? new Date().getHours() + i - 24 : new Date().getHours() + i > 24);
      reports.push(
        <div id="weather-cards">
          <OverlayTrigger
            placement="right"
            overlay={
              <Popover>
                <Popover.Body>
                  <div><strong>{hourlyWeather[i].weather[0].description[0].toUpperCase()}{hourlyWeather[i].weather[0].description.substr(1)}</strong></div>
                  <div>Temperature: {hourlyWeather[i].temp}°C</div>
                  <div>Feels Like: {hourlyWeather[i].feels_like}°C</div>
                </Popover.Body>
              </Popover>
            }>
            <Card className="hour-cards">
              {/* Ternary to automatically adjust any Atmosphere conditions to a cloudy background */}
              <Card.Header style={{
                background: hourlyWeather[i].weather[0].id >= 700 && hourlyWeather[i].weather[0].id < 800 ? BG["Clouds"][0] : BG[hourlyWeather[i].weather[0].main][currHour < 8 || currHour > 20 ? 1 : 0],
                color: `${currHour < 8 || currHour > 20 ? "#fff" : "#000"}`
              }}>
                <div id="hour-header">{this.parseTime(hourlyWeather[i].dt)}</div>
                <img id="weather-icons" src={"http://openweathermap.org/img/wn/" + hourlyWeather[i].weather[0].icon + "@2x.png"} alt="" />
                <p style={{ fontSize: "0.75em" }}>{Math.round(hourlyWeather[i].temp)}°C</p>
              </Card.Header>
            </Card>
          </OverlayTrigger>
          <Accordion defaultActiveKey='0'>
            <Accordion.Item>
              <Accordion.Header background>P.O.P: {hourlyWeather[i].pop * 100}%</Accordion.Header>
              <Accordion.Body>
                <div>Humidity: {hourlyWeather[i].humidity}%</div>
                <div>UV Index: {hourlyWeather[i].uvi}</div>
                <div>Visibility: {hourlyWeather[i].visibility / 1000}km</div>
                <div>Wind: {hourlyWeather[i].wind_speed}km/h</div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      );
    }
    return reports;
  }

  generateWeatherTips = () => {
    let tips = [];
    let summaries = [];
    for (let i = 0; i < 4; i++) {
      summaries.push(
        {
          feels_like_high: -1000,
          feels_like_low: 1000,
          humidity: -1000,
          pop: -1000,
          uvi: 0,
          visibility: 0,
          wind_speed: 0
        }
      );
    }
    let hourlyWeather = this.state.weather.hourly;

    for (let i = 0; i < 10; i += 3) {
      for (let j = 0; j < 3; j++) {

        summaries[i / 3].feels_like_high = Math.max(hourlyWeather[i + j].feels_like, summaries[i / 3].feels_like_high);
        summaries[i / 3].feels_like_low = Math.min(hourlyWeather[i + j].feels_like, summaries[i / 3].feels_like_low);
        summaries[i / 3].humidity = Math.max(hourlyWeather[i + j].humidity, summaries[i / 3].humidity);
        summaries[i / 3].pop = Math.max(hourlyWeather[i + j].pop, summaries[i / 3].pop);
        summaries[i / 3].uvi = Math.max(hourlyWeather[i + j].uvi, summaries[i / 3].uvi);
        summaries[i / 3].visibility = Math.max(hourlyWeather[i + j].visibility, summaries[i / 3].visibility);
        summaries[i / 3].wind_speed = Math.max(hourlyWeather[i + j].wind_speed, summaries[i / 3].wind_speed);
      }
      tips.push(
        <WeatherTips
          summary={summaries[i / 3]}
          startTime={this.parseTime(hourlyWeather[i].dt)}
          endTime={this.parseTime(hourlyWeather[i].dt + 60 * 60 * 3)} />
      )
    }

    return tips;
  }

  render() {
    if (Object.keys(this.state.weather).length > 0) {

      return (
        <div id="parallax" style={{
          background: `url(${this.state.background})`,
          backgroundAttachment: "fixed !important"
        }}>
          {/* HEADER */}
          <Row id="header">
            <Col>
              <div id="greeting">Smart Day</div>
              <div id="last-update">Last updated: {this.getLastUpdate()}</div>
            </Col>
            <Col id="greeting" style={{ textAlign: "right", fontSize: "2em" }}>
              Your local weather update!
            </Col>
          </Row>

          {/* ANCHOR: HOURLY REPORT AND WEATHER TIPS */}
          <Row>
            {/* Hourly reports for next 12 hours*/}
            <Col>
              {this.generateHourlyReport()}
            </Col>

            {/* Weather tips in four hour intervals */}
            <Col>

              {this.generateWeatherTips()}
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