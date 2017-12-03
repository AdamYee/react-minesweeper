import React, { Component } from 'react';
import './App.css';

import Cell from './Cell';
import generateGrid from './generate-grid';

class App extends Component {
  rows = 25;
  columns = 40;
  mines = 85;
  grid = generateGrid(this.rows, this.columns, this.mines);

  componentDidMount() {
    this.node.addEventListener('animationend', this.propagate);
  }

  areNeighborsRevealed = (row, column) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const r = row + i;
        const c = column + j;
        // const id = `${r},${c}`;
        const isInsideGrid = (r >= 0 && c >= 0 && r < this.rows && c < this.columns);
        if (isInsideGrid && !this.grid[r][c].revealed) {
          return false;
        }
      }
    }
    return true;
  }

  propagate = (e) => {
    const { animationName, target } = e;
    if (animationName === 'ripple') {
      const [ r, c ] = target.id.split(',').map(i => parseInt(i, 10));
      const cell = this.grid[r][c];
      if (!cell.mine) {
        if (cell.risk === 0) {// && !this.areNeighborsRevealed(r, c)) {
          this.revealNeighbors(r, c);
        // } else {
        //   console.log('check-win');
        }
      }
    }
  }

  cellClickHandler = (e) => {
    const { id } = e.target;
    const [ r, c ] = id.split(',').map(i => parseInt(i, 10));
    const cell = this[`cell${r},${c}`];
    cell.reveal();
    if (cell.risk === 0) this.revealNeighbors(r, c);
  }

  /**
   * @param {number} row
   * @param {number} column
   */
  revealNeighbors = (row, column) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const r = row + i;
        const c = column + j;
        const id = `${r},${c}`;
        const isInsideGrid = (r >= 0 && c >= 0 && r < this.rows && c < this.columns);
        if (isInsideGrid && !this.grid[r][c].mine) {
          this[`cell${id}`].reveal();
        }
      }
    }
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
        {this.grid.map(row =>
          row.map(cell =>
            <Cell
              key={cell.id}
              ref={c => { this[`cell${cell.id}`] = c; }}
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
