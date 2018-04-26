class Coordinate {
    constructor(x, y, touched) {
        this.x = x;
        this.y = y;
        this.touched = touched;
    }

    equals(testCoordinate) {
         console.log('enter equals');
        console.log(testCoordinate.x +','+ testCoordinate.y);
        console.log(this.x +','+ this.y);
        
        let Result = (testCoordinate.x === this.x && testCoordinate.y === this.y) ;
         console.log(Result);
        console.log('end equals'); 
        return Result;
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
    constructor(setup){
        this.setup = setup;
        this.ships = [new Ship(4), 
                      new Ship(3), new Ship(3), 
                      new Ship(2), new Ship(2), new Ship(2),
                      new Ship(1), new Ship(1), new Ship(1), new Ship(1)];
    }

    checkOverlaps = (testCoordinates, testIndex) => {
        console.log("start");
       
        for (let shipsIndex = 0; shipsIndex < this.ships.length; shipsIndex++) {
            if(shipsIndex != testIndex) {
                for (let coordinatesIndex = 0; coordinatesIndex < this.ships[shipsIndex].Coordinates.length; coordinatesIndex++) {
                    for(let testIndex = 0; testIndex < testCoordinates.length; testIndex++){
                        if(this.ships[shipsIndex].Coordinates[coordinatesIndex].equals(testCoordinates[testIndex])) {
                            console.log('true');
                            return true;               
                        }
                    }
                }   
            }         
        }    
        
        console.log('false and finish');
      return false;
    }

    setupShips = () => {
        this.ships.forEach((ship, index) => {
            let overlaps = false;
            do{              
                ship.generateCandidateCoordinates(this.setup.rows, this.setup.columns);
                
                overlaps = this.checkOverlaps(ship.Coordinates, index);

                if(overlaps)
                  ship.cancelCandidateCoordinates();

            } while(overlaps);
        });

        console.log(this.ships);
    }
}

class GameEngine {    
    constructor(setup){
        this.setup = setup;
        this.setupShips = new Ships(setup);
        this.setupShips.setupShips();
        this.attempts = [];
    }

    checkPointClicked = (row, column) => {
        let exists = this.attempts.some(attempt => {
            return (row === attempt.Row && column === attempt.Column);
        });
       
        if (!exists) {
            this.attempts.push({Row: row, Column: column});
            let pointClicked = [];
            pointClicked.push(new Coordinate(row, column, true));
           // console.log(pointClicked);
            let overlaps = this.setupShips.checkOverlaps( pointClicked);
            
            if(overlaps) {
                return 'L'; //Land
            } else {
                return 'W'; //Water
            }
        }else {
            console.log('repited attempt');
        }        
    }      
}

export default GameEngine;