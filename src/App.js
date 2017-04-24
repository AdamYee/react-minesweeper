import React, { Component } from 'react';
import './App.css';

import Cell from './Cell';
import generateGrid from './generate-grid';

class App extends Component {
  constructor(props) {
    super(props);
    this.rows = 10;
    this.columns = 10;
    this.mines = 10;
    this.state = generateGrid(this.rows, this.columns, this.mines);
    this.clickCellHandler = this.clickCellHandler.bind(this);
    this.flagCellHandler = this.flagCellHandler.bind(this);
    this.reveal = this.reveal.bind(this);
    this.explode = this.explode.bind(this);
  }

  componentDidMount() {
    this.node.addEventListener('animationend', this.propagate);
  }

  clickCellHandler(e) {
    const [ r, c ] = e.currentTarget.id.split(',').map(i => parseInt(i, 10));
    const cell = this.state.grid[r][c];
    if (cell.flagged) return;
    if (cell.mine) {
      this.explode();
    } else {
      this.setState(prevState => ({
        grid: this.reveal(prevState.grid, r, c)
      }));
    }
  }

  flagCellHandler(e) {
    e.preventDefault();
    const [ r, c ] = e.currentTarget.id.split(',').map(i => parseInt(i, 10));
    const cell = this.state.grid[r][c];
    const flagged = !cell.flagged;
    if (!cell.revealed) {
      this.setState(prevState => {
        prevState.grid[r][c] = {
          ...prevState.grid[r][c],
          flagged
        };
        return {
          grid: prevState.grid
        }
      });
    }
  }

  explode() {
    const { grid } = this.state;
    this.state.mineArr.forEach(mineId => {
      const [ r, c ] = mineId.split(',').map(i => parseInt(i, 10));
      const cell = grid[r][c];
      if (!cell.flagged) {
        grid[r][c] = { ...cell, revealed: true };
      }
    });
    this.setState(() => ({ grid }));
  }

  reveal(grid, row, column) {
    // single cell
    if (grid[row][column].risk > 0) {
      grid[row][column] = {
        ...grid[row][column],
        revealed: true
      };
      return grid;
    }
    // multiple cells
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const r = row + i;
        const c = column + j;
        const isInsideGrid = (r >= 0 && c >= 0 && r < this.rows && c < this.columns);
        if (isInsideGrid) {
          const cell = grid[r][c];
          if (!cell.revealed && !cell.mine) {
            grid[r][c] = {
              ...cell,
              revealed: !cell.flagged
            };
            if (cell.risk === 0 && !cell.flagged) {
              grid = this.reveal(grid, r, c);
            }
          }
        }
      }
    }
    return grid;
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
              onCellClick={this.clickCellHandler}
              onReveal={this.reveal}
              onFlag={this.flagCellHandler}
            />
          )
        )}
      </div>
    );
  }
}


export default App;
