import React, { Component } from 'react';
import './App.css';

import Cell from './Cell';
import generateGrid from './generate-grid';

// function cloneGrid(grid) {
//   const clone = [];
//   grid.forEach(row => {
//     clone[row] = [...grid[row]];
//   });
//   return clone;
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.rows = 15;
    this.columns = 15;
    this.mines = 0;
    this.state = {
      grid: generateGrid(this.rows, this.columns, this.mines)
    };
    this.cellClickHandler = this.cellClickHandler.bind(this);
    this.revealNeighbors = this.revealNeighbors.bind(this);
    this.propagate = this.propagate.bind(this);
    this.updateCell = this.updateCell.bind(this);
    this.areNeighborsRevealed = this.areNeighborsRevealed.bind(this);
  }

  componentDidMount() {
    // this.node.addEventListener('webkitAnimationEnd', propagate);
    this.node.addEventListener('animationend', this.propagate);
  }

  updateCell(id, props) {
    const [ row, column ] = id.split(',');
    this.setState(prevState => {
      prevState.grid[row][column] = {
        ...prevState.grid[row][column],
        ...props
      };
      return {
        grid: prevState.grid
      };
    });
  }

  areNeighborsRevealed(row, column) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const r = row + i;
        const c = column + j;
        // const id = `${r},${c}`;
        const isInsideGrid = (r >= 0 && c >= 0 && r < this.rows && c < this.columns);
        if (isInsideGrid && !this.state.grid[r][c].revealed) {
          return false;
        }
      }
    }
    return true;
  }

  propagate(e) {
    const { animationName, target } = e;
    if (animationName === 'ripple') {
      const [ r, c ] = target.id.split(',').map(i => parseInt(i, 10));
      const cell = this.state.grid[r][c];
      if (!cell.mine) {
        if (cell.risk === 0 && !this.areNeighborsRevealed(r, c)) {
          this.revealNeighbors(r, c);
        } else {
          console.log('check-win');
        }
      }
    }
  }

  cellClickHandler(e) {
    const { id } = e.target;
    this.updateCell(id, { revealed: true});
    const [ r, c ] = id.split(',').map(i => parseInt(i, 10));
    this.revealNeighbors(r, c);
  }

  /**
   * @param {number} row
   * @param {number} column
   */
  revealNeighbors(row, column) {
    // console.log('reveal-neighbors', row, column);
    this.setState(prevState => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const r = row + i;
          const c = column + j;
          // const id = `${r},${c}`;
          const isInsideGrid = (r >= 0 && c >= 0 && r < this.rows && c < this.columns);
          if (isInsideGrid) {
            prevState.grid[r][c] = {
              ...prevState.grid[r][c],
              revealed: true
            };
          }
        }
      }
      return {
        grid: prevState.grid
      }
    });
  }

  render() {
    const containerStyle = {
      gridTemplateColumns: `repeat(${this.columns}, 30px)`,
      gridTemplateRows: `repeat(${this.rows}, 30px)`
    };
    return (
      <div
        ref={div => (this.node = div)}
        className="App"
        style={containerStyle}
      >
        {this.state.grid.map(row =>
          row.map(cell =>
            <Cell
              cell={cell}
              onCellClick={this.cellClickHandler}
              onReveal={this.revealNeighbors}
            />
          )
        )}
      </div>
    );
  }
}


export default App;
