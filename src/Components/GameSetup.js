import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';



class GameSetup extends Component {
    state = {
        name: "",
        numberOfAttemps: 0,
        level: 'setup'
    }
   
    handleSubmit = (event) => {
      event.preventDefault();
      if (this.state.level === "setup" && this.state.numberOfAttemps === 0) {
          alert('You should either select a level or introduce the number of attempts you wanna try');
          return false;
      }

      this.props.history.push('/gameBoard', {name: this.state.name, numberOfAttemps: this.state.numberOfAttemps, level: this.state.level});
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
   
    onNumberOfAttempsChange = (event) => {
        this.setState({numberOfAttemps: event.target.value});
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