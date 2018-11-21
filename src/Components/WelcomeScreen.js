import React, { Component } from 'react';
import battleship from '../img/battleship.jpg';

class WelcomeScreen extends Component {
    render() {
        return (
            <div>
                <img className="imgWelcome" src={battleship} alt="Battleship" />
            </div>)
    }
}

export default WelcomeScreen;