/**
 * @param {character[][]} grid
 * @return {number}
 */
// ans = 1
const GRID1 = [
  [1,1,1,1,0],
  [1,1,0,1,0],
  [1,1,0,0,0],
  [0,0,0,0,0]
];

// ans = 3
const GRID2 = [
  [1,1,0,0,0],
  [1,1,0,0,0],
  [0,0,1,0,0],
  [0,0,0,1,1]
];

const GRID3 = [
  [0,0,0,0,1],
  [1,0,0,0,0],
  [0,0,0,0,1],
  [0,0,0,1,0]
];

const GRID4 =
[["1","1","1","1","0"],
["1","1","0","1","0"],
["1","1","0","0","0"],
["0","0","0","0","0"]];

const GRID5 =
[["1","1","1"],
["0","1","0"],
["1","1","1"]]

const GRID6 =
[["1","0","1","1","1"],
["1","0","1","0","1"],
["1","1","1","0","1"]]

var markAround = function(grid, row, x) {
  // recursion
  grid[row][x] = 'x';

  // up
  if (row - 1 >= 0 && grid[row-1][x] === '1') {
    markAround(grid,row-1,x);
  }

  // left
  if (x - 1 >= 0 && grid[row][x-1] === '1') {
    markAround(grid,row,x-1);
  }

  // right
  if (x + 1 < grid[row].length && grid[row][x+1] === '1') {
    markAround(grid,row,x+1);
  }
  // down
  if (row + 1 < grid.length && grid[row+1][x] === '1') {
    markAround(grid,row+1,x);
  }
}

var numIslands = function(grid) {
  let islands = 0;

  grid.forEach((arr,row) => {
    arr.forEach((element, x) => {
        if (element === '1'){
          islands++;
          markAround(grid, row, x);
        };
    })
  });
  return islands;
};

console.log(numIslands(GRID1));
console.log(numIslands(GRID2));
console.log(numIslands(GRID3));
console.log(numIslands(GRID4));
console.log(numIslands(GRID5));
console.log(numIslands(GRID6));
