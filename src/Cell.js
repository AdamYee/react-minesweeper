import React, { Component } from 'react';
import PropTypes from 'proptypes';
import colors from './colors';

export default class Cell extends Component {

  static propTypes = {
    cell: PropTypes.object,
    onCellClick: PropTypes.func,
    onReveal: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.cellDisplayValue = this.cellDisplayValue.bind(this);
    this.animationClass = this.animationClass.bind(this);
  }

  // componentDidUpdate() {
  //   console.log(this.props.cell.id);
  // }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.cell.revealed !== nextProps.cell.revealed
    );
  }

  cellDisplayValue() {
    const { cell } = this.props;
    if (!cell.revealed) return;
    if (cell.mine) {
      return '💣';
    }
    else if (cell.risk) {
      return cell.risk;
    }
  }

  animationClass() {
    const { cell } = this.props;
    if (!cell.revealed) {
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
      backgroundColor: cell.revealed ?
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
