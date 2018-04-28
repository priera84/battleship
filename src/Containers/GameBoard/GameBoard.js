import React, { Component } from 'react';
import Board from '../../Components/Board';
import GameEngine from '../../Components/GameEngine';
import StatusSnippet from '../../Components/StatusSnippet';


class GameBoard extends Component {
    
    constructor(props) {
        super(props);
        this.setup = {
            name: this.props.history.location.state.name,
            numberOfAttemps: this.props.history.location.state.numberOfAttemps,
            level: this.props.history.location.state.level,
            rows: 10,
            columns: 10
        }
        this.gameEngine = new GameEngine(this.setup);
    }
    render() {
        return (
        <div>
            <Board Rows={this.setup.rows} Columns={this.setup.columns} GameEngine={this.gameEngine} />
            <StatusSnippet UserName={this.setup.name} MaximumAttempts={this.setup.numberOfAttemps} GameEngine={this.gameEngine}/>
        </div>);
    }
}

export default GameBoard;
