import React, { Component } from 'react';

class StatusSnippet extends Component {
    render() {
        console.log(this.props.Level);
        let MaximumAttempts = null;
        
        switch(this.props.Level) {
            case "easy": 
                MaximumAttempts = "infinite";
                break;
            case "medium": 
                MaximumAttempts = "100";
                break;
            case "hard": 
                MaximumAttempts = "50";
                break;
            case "setup": 
                MaximumAttempts = this.props.MaximumAttempts.toString();
                break;
            default:
                break;
        }
        return (
           
            <div className="snippet">
                <p>User Name: {this.props.UserName}</p>
                <p>Attempts: {this.props.Attempts} out of {MaximumAttempts}</p>
                { this.props.Level !== "setup" && (<p>Level: {this.props.Level}</p>)}
            </div>
        );
    }
}

export default StatusSnippet;