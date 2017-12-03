/**
 * @param rows
 * @param columns
 * @param mines
 * @return {Array}
 */
export default function generateGrid(rows, columns, mines) {
  const grid = [];

  let plantedMines = 0;
  const mineLocations = [];
  while (plantedMines < mines) {
    const r = Math.floor(rows * Math.random());
    const c = Math.floor(columns * Math.random());
    const location = `${r}:${c}`;
    if (mineLocations.includes(location)) {
      continue;
    }
    mineLocations.push(location);
    plantedMines += 1;
  }

  // Generate grid of empty Cell Objects
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < columns; c++) {
      grid[r][c] = {
        id: `${r},${c}`,
        risk: 0,
        revealed: false,
        skip: false,
        mine: mineLocations.includes(`${r}:${c}`)
      };
    }
  }

  // Seed mines randomly in grid and calculate each cell's risk
  mineLocations.forEach(location => {
    const [r, c] = location.split(':').map(i => parseInt(i, 10));
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const isInsideGrid = (r + i >= 0 && c + j >= 0 && r + i < rows && c + j < columns);
        if (isInsideGrid) {
          grid[r + i][c + j].risk += 1
        }
      }
    }
  });

  return grid;
}
