import './App.css';
import axios from "axios"
import React from 'react';

// const axios = require("axios").default();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {},

      //default lat lon refers to Toronto
      lat: undefined,
      lon: undefined
    };

    navigator.geolocation.getCurrentPosition(this.setLocation, () => {/* handle permission denied here */ });

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

    axios.request(options).then(function (response) {
      console.dir(response.data, {depth: null});
      this.setState({weather: response.data});
    }).catch(function (error) {
      console.error(error);
    });
  }

  render() {
    return (
      <div className="App">
        :D
      </div>
    );
  }
}

