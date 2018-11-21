import React, { Component } from 'react';

const getNumberOfAttemptsAsString = (level, numberOfAttemps) => {
    switch(level) {
        case "easy": 
            return "infinite";               
        case "medium": 
            return "100";
        case "hard":
            return "50";
        case "setup": 
            return numberOfAttemps.toString();           
        default:
          return null;
    }
}

const StatusSnippet = (props) => {        
    return (           
        <div className="statusSnippet">
            <p>User Name: {props.UserName}</p>
            { props.Level !== "setup" && (<p>Level: {props.Level}</p>)}
            <p>Attempts: {props.Attempts} out of {getNumberOfAttemptsAsString(props.Level, props.NumberOfAttempts)}</p>                  
        </div>
    );
}

export default StatusSnippet;