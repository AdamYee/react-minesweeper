import React from 'react';
import PropTypes from 'proptypes';
import colors from './colors';

Cell.propTypes = {
  cell: PropTypes.object,
  onCellClick: PropTypes.func
};

function cellDisplayValue(cell) {
  if (!cell.revealed) return;
  if (cell.mine) {
    return '💣';
  }
  else if (cell.risk) {
    return cell.risk;
  }
}

export default function Cell({
  cell,
  onCellClick
}) {
  const cellStyle = {
    backgroundColor: cell.revealed ?
      colors.cell.revealed :
      colors.cell.hidden
  };
  return (
    <div
      key={cell.id}
      id={cell.id}
      className="cell"
      style={cellStyle}
      onClick={onCellClick}
    >
      {cellDisplayValue(cell)}
    </div>
  )
}
