import React, { Component } from 'react';

class StatusSnippet extends Component {
    constructor(props) {
        super(props);
        this.gameEngine = this.props.GameEngine;
        this.state = {
            Attempts: this.gameEngine.Attempts
        }

        this.gameEngine
    }

    render() {
        return (
            <div>
                <p>User Name: {this.props.UserName}</p>
                <p>Attempts: {this.state.Attempts} out of {this.props.MaximumAttempts}</p>
                <p>Mostrar barcos y su estado</p>
            </div>
        );
    }
}

export default StatusSnippet;