const GRID_SIZE = 50;
const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 600;

const xSize = IMAGE_WIDTH / GRID_SIZE;
const ySize = IMAGE_HEIGHT / GRID_SIZE;

const randomVector = () => {
  return {
    x0: Math.random(),
    y0: Math.random(),
    x1: Math.random(),
    y1: Math.random()
  };
};

const grid = Array(xSize).fill(Array(ySize));
const pixelGrid = Array(IMAGE_WIDTH * IMAGE_HEIGHT);

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    grid[i][j] = randomVector();
  }
}

const getBoxFromCoords = (x, y) => {
  // todo: probably isn't necessary to find this by division
  const xBox = Math.floor(x / GRID_SIZE);
  const yBox = Math.floor(y / GRID_SIZE);
  return grid[xBox][yBox];
};
// Linear Interpolate
const lerp = (a, b, x) => a + x * (b - a);
const normalize = (x, y) => {
  const magnitude = Math.sqrt((x * x) + (y * y));
  return {
    x: x / magnitude,
    y: y / magnitude
  };
};
const dotProduct2d = (x1, y1, x2, y2) => (x1 * y1) + (x2 * y2);

const computeNoiseAtCoordinate = (x, y) => {
  const gridBox = getBoxFromCoords(x, y);

  const { x0, y0, x1, y1 } = gridBox;

  // Determine interpolation weights
  const sx = x - x0;
  const sy = y - y0;

  const normalized1 = normalize(dotProduct2d(x0, y0, x, y), dotProduct2d(x1, y0, x, y));
  const n00 = normalized1.x;
  const n10 = normalized1.y;

  const ix0 = lerp(n00, n10, sx);

  const normalized2 = normalize(dotProduct2d(x0, y1, x, y), dotProduct2d(x1, y1, x, y));
  const n01 = normalized2.x;
  const n11 = normalized2.y;

  const ix1 = lerp(n01, n11, sx);
  return lerp(ix0, ix1, sy);
};

export default function () {
  for (let x = 0; x < IMAGE_WIDTH; x++) {
    for (let y = 0; y < IMAGE_HEIGHT; y++) {
      const value = computeNoiseAtCoordinate(x, y);
      pixelGrid[x * y] = value;
    }
  }

  return pixelGrid;
}
