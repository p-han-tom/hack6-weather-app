import './App.css';
import axios from "axios"
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    console.log(process.env);
  }

  render() {
    return (
      <div className="App">
        :D
      </div>
    );
  }
}

