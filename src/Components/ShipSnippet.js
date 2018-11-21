import React, { Component } from 'react';
import Ship from '../img/ship.png'; 
import ShipTouched from '../img/shipTouched.png';


class ShipSnippet extends React.PureComponent {
    render() {
        return (<div className="shipSnippet" >
                    <h2>SCORE</h2>
                    { this.props.GameShips.map((ship, index) => {
                        return (<div style={{display: "block"}}>{ship.Coordinates.map((coordinate, ci) => {
                            return (<div style={{display: "inline"}} key={index.toString()+ci.toString()}>{(!coordinate.Touched && <img className="imgShip" src={Ship} alt="ship" />) || <img className="imgShip" src={ShipTouched} alt="ship" />} </div>);
                    })}{ship.Sunk && "Sunk!"} </div>);
                    })}
                
                <p></p> </div>)
    }
}

export default ShipSnippet;