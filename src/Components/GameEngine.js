function checkOverlaps (setupShips, newShipConfig) {
    let Result = -1;
    setupShips.some((ship, index)=>{
        if(newShipConfig.orientation = 'P') {
            if(ship.PointA.Row === newShipConfig.PointA.Row 
                && newShipConfig.PointA.Column >= ship.PointA.Column 
                && newShipConfig.PointA.Column <= ship.PointB.Column) {
                    Result = index;
                    return Result;
                } else {
                    if(ship.PointA.Column === newShipConfig.PointA.Column 
                        && newShipConfig.PointA.Row >= ship.PointA.Row 
                        && newShipConfig.PointA.Row <= ship.PointB.Row) {
                            Result = index;
                            return Result;
                        }
                }
        } else {

            if(ship.orientation === newShipConfig.orientation) {
                if(ship.orientation === 'H') {
                    if ((ship.PointA.Row === newShipConfig.PointA.Row) && (newShipConfig.PointA.Column >= ship.PointA.Column) 
                    && (newShipConfig.PointA.Column <= ship.PointB.Column)) {
                        Result = index;
                        return Result;
                    }
                } else {
                    if ((ship.PointA.Column === newShipConfig.PointA.Column) && (newShipConfig.PointA.Row >= ship.PointA.Row) 
                    && (newShipConfig.PointA.Row <= ship.PointB.Row)) {
                        Result = index;
                        return Result;
                    }
                }
            } else {
                /*if((ship.pointA.Column <= newShipConfig.PointA.Row && ship.PointB.Column <= newShipConfig.PointB.Row) 
                    && (ship.PointB.Column)*/

            }
        }
    })

    return Result;
}
class SetupShips {
    ships = 
      [{Quantity: 1, Length: 4},
        {Quantity: 2, Length: 3},
        {Quantity: 3, Length: 2},
        {Quantity: 4, Length: 1}];
    
    constructor(setup){
        this.setup = setup;
    }
    generateRandomNumber = (n) => {
        return Math.floor((Math.random() * n) + 1);
    }

    generateNewShipConfig = (length) => {
        let orientation = this.generateRandomNumber(2) === 1? 'H' : 'V';
        let rows = this.setup.rows;
        let columns = this.setup.columns;
        let rowA, rowB = 0;
        let columnA, columnB = 0;

        if(orientation ==='H') {
            rowA = this.generateRandomNumber(rows);

            columnA = this.generateRandomNumber(columns + 1 -length);

            rowB = rowA;
            columnB = columnA + length -1;
        }
        else {
            rowA = this.generateRandomNumber(rows + 1 - length);

            columnA = this.generateRandomNumber(columns);

            rowB = rowA + length -1;
            columnB = columnA;
        }

        return {
            Orientation: orientation,
            PointA: {
                Row: rowA,
                Column: columnA
            },
            PointB: {
                Row: rowB,
                Column: columnB
            }
        };
    }

    


    setupShips = () => {
        const setupShips = [];

        console.log("entra");
        this.ships.forEach(ship => {
            let newShipConfig = null;
            let overlaps = null;
            
            do{
                newShipConfig = this.generateNewShipConfig(ship.Length);
                
                overlaps = checkOverlaps(setupShips, newShipConfig);

                if(overlaps > -1)
                  newShipConfig = null;

            } while(overlaps > -1);

            setupShips.push(newShipConfig);
            console.log(newShipConfig);
        });

        console.log(setupShips);
        return setupShips;
    }
}

class GameEngine {
    setupShips = null;
    userShips = null;
    attemps = [];
    constructor(setup){
        this.setup = setup;
        this.setupShips = new SetupShips(setup);
        this.userShips = this.setupShips.setupShips();
    }

    checkPointClicked = (row, column) => {
        let exists = false;

        this.attemps.some(attemp => {
            if (row === attemp.Row && column === attemp.Column) {
              exists = true;
              return exists;            
            }
        });
       
        if (!exists) {
            this.attemps.push({Row: row, Column: column});

            let overlaps = checkOverlaps(this.userShips, 
                { orientation: 'P', 
                  PointA: {Row: row, Column: column}, 
                  PointB: {Row: row, Column: column}});
            
            if(overlaps > -1) {
                return 'L'; //Land
            } else {
                return 'W'; //Water
            }

        }
        
        
    }   
   
}

export default GameEngine;