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
  //1 for rock, 2 for paper, 3 for scissors
  //0 lose, 3 draw, 6 win
  
  let total = 0;
  input.forEach((line) => {
    let moves = line.split(' ');
    let opponentMove = moves[0];
    let yourMove = moves[1];

    //a = rock, b = paper, c = scissors
    switch (yourMove) {
      case 'X':
        total += 1;
        yourMove = 'A';
        break;
      case 'Y':
        total += 2;
        yourMove = 'B';
        break;
      case 'Z':
        total += 3;
        yourMove = 'C';
        break;
    }

    if (yourMove == opponentMove) {
      total += 3;
    }

    if (yourMove == 'A' && opponentMove == 'C') {
      total += 6;
    }

    if (yourMove == 'B' && opponentMove == 'A') {
      total += 6;
    }

    if (yourMove == 'C' && opponentMove == 'B') {
      total += 6;
    }

  });

  return total;
}

function problem2(input) {
  //x - loss, y - draw, z - win
  //A - rock, B - paper, C - scissors

  let rps = ['A', 'B', 'C'];

  let total = 0;
  input.forEach((line) => {
    let moves = line.split(' ');
    let opponentMove = moves[0];
    let yourOutcome = moves[1];

    switch (yourOutcome) {
      case 'X':
        total += 0; // for the loss

        let lossIdx = rps.lastIndexOf(opponentMove) - 1;
        if (lossIdx < 0) {
          lossIdx = 2;
        }

        total += (lossIdx + 1);
        break;
      case 'Y':
        total += 3; // for the draw

        total += (rps.lastIndexOf(opponentMove) + 1);
        break;
      case 'Z':
        total += 6; // for the win
        
        let i = rps.lastIndexOf(opponentMove) + 1;
        if (i >= 3) {
          i = 0;
        }

        total += (i + 1);
        break;
    }

  });
  
  return total;
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