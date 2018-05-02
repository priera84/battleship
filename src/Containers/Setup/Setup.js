import React, { Component } from 'react';
import WelcomeScreen from '../../Components/WelcomeScreen';
import GameSetup from '../../Components/GameSetup';
import { Route } from 'react-router-dom';


class Setup extends Component {
    state = {
        splashScreenFinished: false
    }
    
   showGameSetup = () => {
       let finished = !this.state.splashScreenFinished;
       this.setState({splashScreenFinished: finished});
    } 

    render() {
        let DisplayComponent = null ;

        if (!this.state.splashScreenFinished)
        {
          setTimeout(this.showGameSetup, 3000);

          DisplayComponent = WelcomeScreen;
        }
        else DisplayComponent = GameSetup;

        return (
        <div>          
            <DisplayComponent />            
        </div>)
    }
}

export default Setup;