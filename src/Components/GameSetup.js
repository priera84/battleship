import React, { Component } from 'react';
import { withRouter } from 'react-router';



class GameSetup extends Component {
    state = {
        name: "",
        numberOfAttemps: 0,
        level: 'easy'
    }
   
    handleSubmit = (event) => {
      event.preventDefault(); 
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
                    <label>Introduce your Name <input type="text" placeholder="Enter your Name" required onChange={this.onNameChange}/>
                    </label>
                    <p/>
                    <label>Introduce the number of attemps you want to try:</label>
                    <input type="number" placeholder="Enter number of attemps" onChange={this.onNumberOfAttempsChange} /><p/>
                    <select value={this.state.level} onChange={this.onChangeLevel}>
                        <option value="easy">Easy (Infinite attemps)</option>
                        <option value="medium">Medium (100 attemps)</option>
                        <option value="hard">Hard (50 attemps)</option>
                    </select>
                    <input className="submitButton" type="submit" value="Start game"/>
                </form>
            </div>
        );
    }
}

export default withRouter(GameSetup);