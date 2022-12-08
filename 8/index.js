const fs = require('fs');
const { performance } = require('perf_hooks');

function getInput() {
  try {
    input = fs.readFileSync('./in.txt', 'utf8');
    input = input.split("\n").map((item) => {
      return item
    });
  } catch (err) {
    console.error(err);
  }

  return input;
}


function problem1(input) {
  let treeMap = [];
  input.forEach((treeLine) => {
    let trees = [];
    for(let i = 0; i < treeLine.length; i++) {
      trees.push(parseInt(treeLine[i]));
    }
    treeMap.push(trees);
  });

  let visibleTrees = [];
  for(let i = 0; i < treeMap.length; i++) {
    for(let j = 0; j < treeMap[i].length; j++) {

      //edges
      if (i == 0 
        || i == (treeMap.length - 1) 
        || j == 0
        || j == (treeMap[i].length - 1)
      ) {
        visibleTrees.push(treeMap[i][j]);
        continue;
      }

      if (checkUp(treeMap, i, j)[0]
        || checkDown(treeMap, i, j)[0]
        || checkLeft(treeMap, i, j)[0]
        || checkRight(treeMap, i, j)[0]
      ) {
        visibleTrees.push(treeMap[i][j]); 
      }
    }
  }

  return visibleTrees.length;
}

function problem2(input) {
  let treeMap = [];
  input.forEach((treeLine) => {
    let trees = [];
    for(let i = 0; i < treeLine.length; i++) {
      trees.push(parseInt(treeLine[i]));
    }
    treeMap.push(trees);
  });

  let highScore = -1;
  for(let i = 0; i < treeMap.length; i++) {
    for(let j = 0; j < treeMap[i].length; j++) {

      let [isVisibleUp, upScore] = checkUp(treeMap, i, j);
      let [isVisibleDown, downScore] = checkDown(treeMap, i, j);
      let [isVisibleLeft, leftScore] = checkLeft(treeMap, i, j);
      let [isVisibleRight, rightScore] = checkRight(treeMap, i, j);

      let score = upScore * downScore * leftScore * rightScore;
      if (score > highScore) {
        highScore = score;
      }
    }
  }

  return highScore;
}

function checkUp(treeMap, i, j) {
  let score = 0;

  for(let x = j-1; x >= 0; x--) {
    score += 1;
    
    if (treeMap[i][x] >= treeMap[i][j]) {
      return [false, score];
    }
  }
  return [true, score];
}

function checkDown(treeMap, i, j) {
  let score = 0;

  for(let x = j+1; x < treeMap[i].length; x++) {
    score += 1;

    if (treeMap[i][x] >= treeMap[i][j]) {
      return [false, score];
    }
  }
  return [true, score];
}

function checkLeft(treeMap, i, j) {
  let score = 0;

  for(let x = i-1; x >= 0; x--) {
    score += 1;

    if (treeMap[x][j] >= treeMap[i][j]) {
      return [false, score];
    }
  }
  return [true, score];
}

function checkRight(treeMap, i, j) {
  let score = 0;

  for(let x = i+1; x < treeMap.length; x++) {
    score += 1;

    if (treeMap[x][j] >= treeMap[i][j]) {
      return [false, score];
    }
  }
  return [true, score];
}

function solve() {
  var input = getInput();

  let startTime = performance.now();
  console.log('problem 1 solution: ' + problem1(input));
  console.log('problem 1 execution time: ' + (performance.now() - startTime) + ' ms');

  startTime = performance.now();
  console.log('problem 2 solution: ' + problem2(input));
  console.log('problem 2 execution time: ' + (performance.now() - startTime) + ' ms');
}
 
solve();