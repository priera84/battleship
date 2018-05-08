import React, { Component } from 'react';

class StatusSnippet extends Component {
    render() {
        console.log(this.props.Level);
        let NumberOfAttemps = null;
        
        switch(this.props.Level) {
            case "easy": 
                NumberOfAttemps = "infinite";
                break;
            case "medium": 
                NumberOfAttemps = "100";
                break;
            case "hard": 
                NumberOfAttemps = "50";
                break;
            case "setup": 
                NumberOfAttemps = this.props.NumberOfAttemps.toString();
                break;
            default:
                break;
        }
        return (
           
            <div className="snippet">
                <p>User Name: {this.props.UserName}</p>
                { this.props.Level !== "setup" && (<p>Level: {this.props.Level}</p>)}
                <p>Attempts: {this.props.Attempts} out of {NumberOfAttemps}</p>
               
            </div>
        );
    }
}

export default StatusSnippet;