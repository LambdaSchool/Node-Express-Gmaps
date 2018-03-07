import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = { place:{}, places: [] };

  getPlace = () => {

  }

  getPlaces = () => {

  }

  componentDidMount(){
    this.getPlace();
    this.getPlace();
  }

  render() {
    return (
      <div className="App">
        <div className="place">
          <div>First place</div>
        </div>
        <div className="places">
         {this.state.places.map((place) => {
            return (
            <div className"place">
              <div className="price">All Places</div>
              <div>{place.name}</div>
            </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;


