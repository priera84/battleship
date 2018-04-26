import React, { Component } from 'react';

class StatusSnippet extends Component {
    render() {
        return (
            <div>
                <p>User Name: {this.props.UserName}</p>
                <p>Attempts: {this.props.Attempts} out of {this.props.MaximumAttempts}</p>
                <p>Mostrar barcos y su estado</p>
            </div>
        );
    }
}

export default StatusSnippet;