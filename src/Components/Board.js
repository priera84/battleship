import React, { Component } from 'react';
import { withRouter } from 'react-router';


class Board extends Component {
    constructor(props) {
        super(props);       
        this.RowsCaption =  ['A','B','C','D','E','F','G','H','I','J'];
    }

    onClickCellHandler = (event) => {
      let id =  event.target.id;
      let result = this.props.GameEngine.checkPointClicked(Number(id.substr(1)), this.RowsCaption.findIndex(item => item === id.charAt(0)) + 1);
      console.log(result);
      if (result === 'L') {
          document.getElementById(id).style.backgroundColor = "black";
      }else if (result === 'W'){
        document.getElementById(id).style.backgroundColor =  "red";
      }
    }

    render() {   
    
        const xItemsArray =  Array.apply(null, {length: this.props.Columns}).map(Number.call, Number);
        const yItemsArray =  Array.apply(null, {length: this.props.Rows}).map(Number.call, Number);
        


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
                            <span className="cellHeader">{this.RowsCaption[y]}</span>
                            {xItemsArray.map((x) => {
                                return (<span className="cell" onClick ={this.onClickCellHandler} id={this.RowsCaption[y]+(x+1)} ></span>)
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