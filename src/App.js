import React, { Component } from 'react';
import './App.css';

import Cell from './Cell';
import generateGrid from './generate-grid';

function cloneGrid(grid) {
  const clone = [];
  grid.forEach(row => {
    clone[row] = [...grid[row]];
  });
  return clone;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.rows = 5;
    this.columns = 5;
    this.mines = 1;
    this.state = {
      grid: generateGrid(this.rows, this.columns, this.mines)
    };
    this.cellClickHandler = this.cellClickHandler.bind(this);
  }

  cellClickHandler(e) {
    console.log(e);
    const [ row, column ] = e.target.id.split('');
    this.setState(prevState => {
      const cell = { ...prevState.grid[row][column] };
      cell.revealed = true;
      prevState.grid[row][column] = cell;
      return {
        grid: prevState.grid
      };
    });
  }

  render() {
    const containerStyle = {
      gridTemplateColumns: `repeat(${this.columns}, 51px)`,
      gridTemplateRows: `repeat(${this.rows}, 51px)`
    };
    return (
      <div
        className="App"
        style={containerStyle}
      >
        {this.state.grid.map(row =>
          row.map(cell =>
            <Cell
              cell={cell}
              onCellClick={this.cellClickHandler}
            />
          )
        )}
      </div>
    );
  }
}


export default App;
