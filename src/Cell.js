import React, { Component } from 'react';
import PropTypes from 'proptypes';
import colors from './colors';

export default class Cell extends Component {

  static propTypes = {
    cell: PropTypes.object,
    onCellClick: PropTypes.func,
    onReveal: PropTypes.func,
    onFlag: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.cellDisplayValue = this.cellDisplayValue.bind(this);
    this.animationClass = this.animationClass.bind(this);
    this.textColor = this.textColor.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.cell.revealed !== nextProps.cell.revealed ||
      this.props.cell.flagged !== nextProps.cell.flagged
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

  textColor() {
    const { cell } = this.props;
    if(cell.mine) {
      return '#000';
    }
    switch(cell.risk) {
      case 1: return 'blue';
      case 2: return 'green';
      case 3: return 'red';
      case 4: return 'purple';
      case 5: return 'maroon';
      case 6: return 'turquoise';
      case 7: return 'black';
      case 8: return 'grey';
      default: return '';
    }
  }

  render() {
    const { cell } = this.props;
    const cellStyle = {
      backgroundColor: cell.revealed ?
        colors.cell.revealed :
        colors.cell.hidden,
      color: this.textColor()
    };
    return (
      <div
        ref={div => (this.node = div)}
        key={cell.id}
        id={cell.id}
        className={`cell ${this.animationClass()}`}
        style={cellStyle}
        onClick={this.props.onCellClick}
        onContextMenu={this.props.onFlag}
      >
        {this.cellDisplayValue()}
        {
          cell.flagged &&
          <span className={cell.flagged ? 'flagged drop-flag' : 'pickup-flag'}>F</span>
        }
      </div>
    );
  }
};
