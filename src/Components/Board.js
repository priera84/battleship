import React, { Component } from 'react';
import { withRouter } from 'react-router';
import GameEngine from './GameEngine';

class Board extends Component {
    gameEngine = null;

    state = {
        name: '',
        numberOfAttemps: 0,
        level: 'easy'
    }

    setup = {
        rows: 10,
        columns: 10
    }

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.history.location.state.name,
            numberOfAttemps: this.props.history.location.state.numberOfAttemps,
            level: this.props.history.location.state.level
        };
        this.gameEngine = new GameEngine(this.setup);
    }

    onClickCellHandler = (event) => {
      let id =  event.target.id;
      let result = this.gameEngine.checkPointClicked(id.charAt(0), id.substr(1));
      console.log(result);
      if (result === 'L') {
          document.getElementById(id).style.backgroundColor = "black";
      }else if (result === 'W'){
        document.getElementById(id).style.backgroundColor =  "red";
      }
    }

    render() {   
    
        const xItemsArray =  Array.apply(null, {length: this.setup.columns}).map(Number.call, Number);
        const yItemsArray =  Array.apply(null, {length: this.setup.rows}).map(Number.call, Number);
        const RowsCaption =  ['A','B','C','D','E','F','G','H','I','J'];


        return (
            <div className="board">
            <span className="cellHeader" ></span>
            {
                xItemsArray.map((x) => {
                    return (<span className="cellHeader" >{x+1}</span>)
                })}
                {
                yItemsArray.map((y) => {
                return (<div>
                            <span className="cellHeader">{RowsCaption[y]}</span>
                            {xItemsArray.map((x) => {
                                return (<span className="cell" onClick ={this.onClickCellHandler} id={RowsCaption[y]+(x+1)} ></span>)
                            })
                            }
                        </div>) 
                })
            }                
            </div>
            
        )          
    }
}

export default withRouter(Board);