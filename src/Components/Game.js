import React, { Component } from 'react';
import Board from './Board';
import StatusSnippet from './StatusSnippet';
import ShipSnippet from './ShipSnippet';

import { Link } from 'react-router-dom';

class Coordinate {
    constructor(x, y, touched) {
        this.x = x;
        this.y = y;
        this.touched = touched;
    }

    equals = (testCoordinate) => {
        return  (testCoordinate.x === this.x && testCoordinate.y === this.y);
    }
    
    setTouched = (touched) => {
        this.touched = touched;
    }

    get Touched() {
        return this.touched;
    }
    
}

class Ship {
    constructor(length) {
        this.length = length;
        this.coordinates = [];
    }

    get Coordinates() {
        return this.coordinates;
    }

    get Length() {
        return this.length;
    }

    get Sunk() {
        return !this.coordinates.some((coordinate) => {
              return coordinate.touched === false;
        });
    }

    generateRandomNumber = (n) => {
        return Math.floor((Math.random() * n) + 1);
    }

    cancelCandidateCoordinates = () => {
        this.coordinates = [];
    }

    generateCandidateCoordinates = (rows, columns) => {
        let orientation = this.generateRandomNumber(2) === 1? 'H' : 'V';
        let row = 0;
        let column = 0;

        this.coordinates = [];

        if(this.length === 1) {
            row = this.generateRandomNumber(rows);

            column = this.generateRandomNumber(columns + 1 -this.length);

            let coordinate = new Coordinate(row, column, false);
            this.coordinates.push(coordinate);                
        } else {      

            if(orientation ==='H') {
                row = this.generateRandomNumber(rows);

                column = this.generateRandomNumber(columns + 1 -this.length);

                for (let index = 0; index < this.length; index++) {
                    let coordinate = new Coordinate(row, column + index, false);
                    this.coordinates.push(coordinate);                
                }
            }
            else {
                row = this.generateRandomNumber(rows + 1 - this.length);

                column = this.generateRandomNumber(columns);


                for (let index = 0; index < this.length; index++) {            
                    let coordinate = new Coordinate(row + index, column, false);
                    this.coordinates.push(coordinate);                
                }
            }
        }        
    }
}


class Ships {
    constructor(Rows, Columns){
        this.rows = Rows;
        this.columns = Columns;
        this.ships = [new Ship(4), 
                      new Ship(3), new Ship(3), 
                      new Ship(2), new Ship(2), new Ship(2),
                      new Ship(1), new Ship(1), new Ship(1), new Ship(1)];
    }

    allShipsSunk = () => {
        return !this.ships.some(ship => {
           return !ship.Sunk;             
        });
    }

    checkOverlaps = (testCoordinates, testIndex) => {
        //console.log("start");
       
        for (let shipsIndex = 0; shipsIndex < this.ships.length; shipsIndex++) {
            if(shipsIndex !== testIndex) {
                for (let coordinatesIndex = 0; coordinatesIndex < this.ships[shipsIndex].Coordinates.length; coordinatesIndex++) {
                    for(let testIndex = 0; testIndex < testCoordinates.length; testIndex++){
                        if(this.ships[shipsIndex].Coordinates[coordinatesIndex].equals(testCoordinates[testIndex])) {
                            //console.log('true');
                            return true;               
                        }
                    }
                }   
            }         
        }    
        
       // console.log('false and finish');
      return false;
    }



    setShipTouched = (testCoordinates) => {
        //console.log("start");
       
        for (let shipsIndex = 0; shipsIndex < this.ships.length; shipsIndex++) {
            for (let coordinatesIndex = 0; coordinatesIndex < this.ships[shipsIndex].Coordinates.length; coordinatesIndex++) {
                for(let testIndex = 0; testIndex < testCoordinates.length; testIndex++){
                    if(this.ships[shipsIndex].Coordinates[coordinatesIndex].equals(testCoordinates[testIndex])) {
                        this.ships[shipsIndex].Coordinates[coordinatesIndex].setTouched(true);
                        return {
                            shipIndex: shipsIndex,
                            coordinatesIndex: coordinatesIndex 
                        }              
                    }
                }
            }   
                     
        }    
        
       // console.log('false and finish');
      return null;
    }

    setupShips = () => {
        this.ships.forEach((ship, index) => {
            let overlaps = false;
            do{              
                ship.generateCandidateCoordinates(this.rows, this.columns);
                
                overlaps = this.checkOverlaps(ship.Coordinates, index);

                if(overlaps)
                  ship.cancelCandidateCoordinates();

            } while(overlaps);
        });

        console.log(this.ships);
    }
}

class Game extends React.PureComponent { 
    state = {
        attempts: 0,
        touches: 0,
        playing: true,
        gameOver: false,
        gameWon: false
    }  
    
    constructor(props){
        super(props);
        this.gameShips = new Ships(this.props.Rows, this.props.Columns);
        this.gameShips.setupShips();
        this.attempts = [];
    }

    get Attempts(){
        return this.attempts.length;
    }

    increaseAttempts(){
      this.setState((prevState) => {
           return {attempts: prevState.attempts + 1}
       });
    }

    increaseTouches(){
        this.setState((prevState) => {
            return {touches: prevState.touches + 1}
        })
    }

    checkPointClicked = (row, column) => {
        let exists = this.attempts.some(attempt => {
            return (row === attempt.Row && column === attempt.Column);
        });
       
        if (!exists) {            
            let pointClicked = [];
            pointClicked.push(new Coordinate(row, column, true));
           
            let touchedShip = this.gameShips.setShipTouched(pointClicked);
            
            if(touchedShip != null) {
                this.increaseTouches();
                
                if(this.gameShips.ships[touchedShip.shipIndex].Sunk) {
                    //Check if all ship are sunk
                    let gameWon = this.gameShips.allShipsSunk();

                    if(gameWon) {
                        this.setState({playing: false, gameWon: true});
                    }

                }

                return 'L'; //Land
            } else {
                //only increase attempts when water is clicked
                //if maximum attemps reached then game over
                this.attempts.push({Row: row, Column: column});
                this.increaseAttempts();
                

                if(this.props.MaximumAttemptsAllowed !== -1 && this.props.MaximumAttemptsAllowed <= this.Attempts) {
                    this.setState({playing: false, gameOver: true});
                }


                return 'W'; //Water
            }
        }else {
            console.log('repited attempt');
        }        
    }    
    
    tryAgain = () => {
        this.gameShips.setupShips();
        this.attempts = [];
        this.setState({touches: 0, attempts: 0, playing: true, gameOver: false, gameWon: false});
    }

    render() {
        return (
            
            <div>
                {(this.state.playing) && ( <div className="container">
                        <StatusSnippet UserName={this.props.Name} NumberOfAttempts={this.props.NumberOfAttemps} Level={this.props.Level} Attempts={this.state.attempts} />
                        <Board Rows={this.props.Rows} Columns={this.props.Columns} CheckPointClicked={this.checkPointClicked} />
                        <ShipSnippet  Touches={this.state.touches} GameShips={this.gameShips.ships} /> 
                    </div>)}   
                {(this.state.gameWon) && ( <div className="center"><h1>You Won the Game!! Congrats!</h1><Link className="button" to="/">Play New Game</Link><p></p><button className="button" onClick={this.tryAgain}>Play Again</button></div>)}
                {(this.state.gameOver) && ( <div className="center"><h1>Game Over!</h1><button  className="button" onClick={this.tryAgain}>Try Again</button></div>)}

            </div>);
    }
}

export default Game;