import React, { Component } from 'react';
import { withRouter } from 'react-router';

class BoardCell extends Component {
    state = {
        cellColor: 'aquamarine'
    }

    onClickCellHandler = (event) => {
        //let id =  event.target.id;
        let result = this.props.CheckPointClicked(this.props.Row, this.props.Column);
       // console.log(result);
        if (result === 'L') {
            this.setState({cellColor :"black"});
        } else if (result === 'W') {
            this.setState({cellColor :"red"});
        }
      }

      render() {
          const style = {
              backgroundColor: this.state.cellColor
          }
          return (<span className="cell" style={style} onClick={this.onClickCellHandler} ></span>);
      }
}


class Board extends Component {
    constructor(props) {
        super(props);       
        this.RowsCaption =  ['A','B','C','D','E','F','G','H','I','J'];
    }    

    render() {   
    
        const xItemsArray =  Array.apply(null, {length: this.props.Columns}).map(Number.call, Number);
        const yItemsArray =  Array.apply(null, {length: this.props.Rows}).map(Number.call, Number);
        


        return (
            <div className="board">
            <span className="cellHeader" ></span>
            {
                xItemsArray.map((x) => {
                    return (<span key={x.toString()} className="cellHeader" >{x+1}</span>)
                })}
                {
                yItemsArray.map((y) => {
                return (<div key={y.toString()}>
                            <span  className="cellHeader">{this.RowsCaption[y]}</span>
                            {xItemsArray.map((x) => {
                                return (<BoardCell Row={y+1} Column={x+1} key={(x+y).toString()} CheckPointClicked={this.props.CheckPointClicked} />)
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