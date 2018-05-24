/* eslint-disable */
const GRID = [
      ["", "", "", "^", "", "", "", "", "", ""],
      ["", "", "", "", "~", "", "", "", "", ""],
      ["", "", "", "", "^", "^", "", "", "", ""],
      ["", "", "", "", "^", "^", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "^", "~", "~", "", "", "", "^", "", ""],
      ["", "^", "", "~", "~", "", "", "", "", ""],
      ["", "^", "", "", "~", "~", "", "", "", ""],
    ];

function gridSize() {
  let height = GRID.length;
  let width = GRID[0].length;
  return width + ' x ' + height;
}

function totalCells() {
  let output = gridSize().split(" ");
  let width = parseInt(output[0]);
  let height = parseInt(output[2]);
  return width * height;
}

function lightCell(coord) {
  let row = parseInt(coord.substring(1)) - 1;
  let col = coord.charCodeAt(0) - 65;
  if (row >= GRID.length || col >= GRID[row].length) {
    return false;
  }
  return GRID[row][col];
}

function isRock(coord) {
  return lightCell(coord) == '^' ? true : false;
}

function isCurrent(coord) {
  return lightCell(coord) == '~' ? true : false;
}

function isSafe(coord) {
  return !(isRock(coord) || isCurrent(coord));
}

function lightRow(row) {
  return GRID[row];
}

function lightColumn(col) {
  let content = [];
  let x = col.charCodeAt(0) - 65;
  GRID.forEach(function(element){
    content.push(element[x]);
  })
  return content;
}

function allRocks(){
  let rocks = [];
  let currentCol = 'A';
  let currentRow = 1;
  GRID.forEach(function(col){
    currentCol = 'A';
    col.forEach(function(row){
      if (isRock(currentCol+currentRow)){
          rocks.push(currentCol+currentRow);
      }
      currentCol = String.fromCharCode(currentCol.charCodeAt(0)+1);
    });
    currentRow += 1;
  });
  return rocks;
}

function allCurrents(){
  let rocks = [];
  let currentCol = 'A';
  let currentRow = 1;
  GRID.forEach(function(col){
    currentCol = 'A';
    col.forEach(function(row){
      if (isCurrent(currentCol+currentRow)){
          rocks.push(currentCol+currentRow);
      }
      currentCol = String.fromCharCode(currentCol.charCodeAt(0)+1);
    });
    currentRow += 1;
  });
  return rocks;
}

function firstRock(){
  let list = allRocks();
  return list[0];
}

function firstCurrent(){
  let list = allCurrents();
  return list[0];
}


function isDangerous(coord){
  if (!isSafe(coord))
    return true;

  let row = parseInt(coord.substring(1)) - 1;
  let col = coord.charCodeAt(0) - 65;

  if (row >= GRID.length || col >= GRID[col].length) {
    return false;
  }

  // check top
  if (row - 1 >= 0 && GRID[row-1][col] !== ""){
    return true;
  }

  // check below
  if (row + 1 < GRID.length && GRID[row+1][col] !== ""){
    return true;
  }

  // check left
  if (col - 1 >= 0 && GRID[row][col-1] !== ""){
    return true;
  }

  // check right
  if (col + 1 < GRID[0].length && GRID[row][col+1] !== ""){
    return true;
  }

  return false;
}

function isDangerousRaw(row, col){
  if (GRID[row][col] !== ""){
    return true;
  }

  // check top
  if (row - 1 >= 0 && GRID[row-1][col] !== ""){
    return true;
  }

  // check below
  if (row + 1 < GRID.length && GRID[row+1][col] !== ""){
    return true;
  }

  // check left
  if (col - 1 >= 0 && GRID[row][col-1] !== ""){
    return true;
  }

  // check right
  if (col + 1 < GRID[0].length && GRID[row][col+1] !== ""){
    return true;
  }

}

function distressBeacon(coord) {
  let row = parseInt(coord.substring(1)) - 1;
  let col = coord.charCodeAt(0) - 65;

  // check top row
  if (row - 1 >= 0){
    //check top
    if (!isDangerousRaw(row-1,col)){
      // directly on top
      return String.fromCharCode(col+65) + (row-1+1).toString();
    }else if (col-1 >= 0 && !isDangerousRaw(row-1,col-1)) {
      // top left
      return String.fromCharCode(col-1+65) + (row-1+1).toString();
    }else if(col + 1 < GRID[0].length && !isDangerousRaw(row-1,col+1)){
      // top right
      return String.fromCharCode(col+1+65) + (row-1+1).toString();
    }
  }

  // check bottom row
  if (row + 1 >= GRID.length){
    //check top
    if (!isDangerousRaw(row+1,col)){
      // directly bottom
      return String.fromCharCode(col+65) + (row+1+1).toString();
    }else if (col-1 >= 0 && !isDangerousRaw(row+1,col-1)) {
      // bottom left
      return String.fromCharCode(col-1+65) + (row+1+1).toString();
    }else if(col + 1 < GRID[0].length && !isDangerousRaw(row+1,col+1)){
      // bottom right
      return String.fromCharCode(col+1+65) + (row+1+1).toString();
    }
  }

  // check left
  if (col - 1 >= 0 && !isDangerousRaw(row,col-1)){
    return String.fromCharCode(col-1+65) + (row+1).toString();
  }

  // check right
  if (col + 1 < GRID[0].length && !isDangerousRaw(row,col+1)){
    return String.fromCharCode(col+1+65) + (row+1).toString();
  }

  return false;

}

console.log(distressBeacon('E8'));
