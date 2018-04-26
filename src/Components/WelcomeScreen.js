import React, { Component } from 'react';
import battleship from '../img/battleship.jpg';

class WelcomeScreen extends Component {
    render() {
        return (
            <div className="header"  >
                <h1>Welcome to Battelship</h1>
                <img src={battleship} alt="Battleship" />
            </div>)
    }
}

export default WelcomeScreen;