import React, { Component } from 'react';
import { withRouter } from 'react-router';

class GameSetup extends Component {
    state = {
        level: "setup"
    }
    constructor(props) {
        super(props);

        this.name = "";
        this.numberOfAttemps = 0;
        this.maximumAttemptsAllowed = 0;
    }

    SetMaximumAttempsAllowed = () => {
        
        switch(this.state.level) {
            case "easy": 
                this.maximumAttemptsAllowed = -1;
                break;
            case "medium": 
                this.maximumAttemptsAllowed = 100;
                break;
            case "hard": 
                this.maximumAttemptsAllowed = 50;
                break;
            case "setup": 
                this.maximumAttemptsAllowed = this.numberOfAttemps;
                break;
            default:
                break;
        }     

    }
    
    handleSubmit = (event) => {
      event.preventDefault();
      if (this.state.level === "setup" && this.numberOfAttemps === 0) {
          alert('You should either select a level or introduce the number of attempts you wanna try');
          return false;
      }

      this.SetMaximumAttempsAllowed();

      this.props.history.push('/gameBoard', {name: this.name, numberOfAttemps: this.numberOfAttemps, level: this.state.level, maximumAttemptsAllowed: this.maximumAttemptsAllowed});
    }
    onNameChange = (event) => {
        this.name = event.target.value;
    }
   
    onNumberOfAttempsChange = (event) => {
        this.numberOfAttemps = event.target.value;
    }

    onChangeLevel = (event) => {
        this.setState({level: event.target.value});
    }


    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Personal Information</legend>
                        <label>Introduce your Name: <input type="text" placeholder="Enter your Name" required onChange={this.onNameChange}/>   </label>
                    </fieldset>
                    <fieldset>
                        <legend>Game Setup</legend>
                    <label>Introduce the number of attemps you want to try:</label>
                    <input type="number" max="100" min="0" placeholder="Enter number of attemps" onChange={this.onNumberOfAttempsChange} /><p/>
                    <label>or select a Level </label><select value={this.state.level} onChange={this.onChangeLevel}>
                        <option value="setup"></option>
                        <option value="easy">Easy (Infinite attemps)</option>
                        <option value="medium">Medium (100 attemps)</option>
                        <option value="hard">Hard (50 attemps)</option>
                    </select>                    
                    </fieldset>
                    <input className="submitButton" type="submit" value="Start game"/>
                </form>
            </div>
        );
    }
}

export default withRouter(GameSetup);