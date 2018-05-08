import React, { Component } from 'react';
import Game from '../../Components/Game';



class GameBoard extends Component {    
    render() {
       return <Game Name={this.props.history.location.state.name}
                    NumberOfAttemps={this.props.history.location.state.numberOfAttemps}
                    Level={this.props.history.location.state.level}
                    MaximumAttemptsAllowed={this.props.history.location.state.maximumAttemptsAllowed}
                    Rows={10}
                    Columns={10} />
    }
}

export default GameBoard;
