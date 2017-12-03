import React, { Component } from 'react';
import PropTypes from 'prop-types';
import colors from './colors';

export default class Cell extends Component {

  static propTypes = {
    cell: PropTypes.object,
    onCellClick: PropTypes.func
  }

  state = {
    isRevealed: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.isRevealed !== nextState.isRevealed
    );
  }

  reveal = () => {
    this.setState(() => ({
      isRevealed: true
    }));
  }

  cellDisplayValue = () => {
    const { cell } = this.props;
    if (!this.state.isRevealed) return;
    if (cell.mine) {
      return '💣';
    }
    else if (cell.risk) {
      return cell.risk;
    }
  }

  animationClass = () => {
    const { cell } = this.props;
    if (!this.state.isRevealed) {
      return '';
    }
    else if (cell.mine) {
      return 'explode';
    }
    return 'revealed';
  }

  render() {
    const { cell, onCellClick } = this.props;
    const cellStyle = {
      backgroundColor: this.state.isRevealed ?
        colors.cell.revealed :
        colors.cell.hidden
    };
    return (
      <div
        ref={div => (this.node = div)}
        key={cell.id}
        id={cell.id}
        className={`cell ${this.animationClass()}`}
        style={cellStyle}
        onClick={onCellClick}
      >
        {this.cellDisplayValue()}
      </div>
    );
  }
};
