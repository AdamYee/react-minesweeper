/**
 *
 * @param rows
 * @param columns
 * @param mines
 * @return {Array}
 */
export default function generateGrid(rows, columns, mines) {
  const grid = [];

  // Generate grid of empty Cell Objects
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < columns; c++) {
      grid[r][c] = {
        id: `${r}${c}`,
        risk: 0,
        revealed: false
      };
    }
  }

  // Seed mines randomly in grid and calculate each cell's risk
  for (let m = 0; m < mines; m++) {
    const r = Math.floor(rows * Math.random());
    const c = Math.floor(columns * Math.random());
    if (grid[r][c].mine === true) {
      m--;
      continue;
    }
    grid[r][c].mine = true;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const isInsideGrid = (r + i >= 0 && c + j >= 0 && r + i < rows && c + j < columns);
        if (isInsideGrid) {
          grid[r + i][c + j].risk += 1
        }
      }
    }
  }

  return grid;
}
