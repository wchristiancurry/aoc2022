const fs = require('fs');
const { performance } = require('perf_hooks');

function getInput() {
  try {
    input = fs.readFileSync('./in.txt', 'utf8');
    // input = input.split("\n").map((item) => {
    //   return item
    // });
  } catch (err) {
    console.error(err);
  }

  return input;
}


function problem1(input) {
  let uniqueCharacters = [];
  let startPos = 0;

  //bvwbjplbgvbhsrlpgdmjqwftvncz
  for(let i = 0; i < input.length; i++) {
    if (uniqueCharacters.includes(input[i])) {
      uniqueCharacters = [];
      startPos++;
      i = startPos-1;
    } else {
      uniqueCharacters.push(input[i]);
    }

    if (uniqueCharacters.length >= 4) {
      break;
    }
  }

  return startPos + 4;
}

function problem2(input) {
  let uniqueCharacters = [];
  let startPos = 0;

  //bvwbjplbgvbhsrlpgdmjqwftvncz
  for(let i = 0; i < input.length; i++) {
    if (uniqueCharacters.includes(input[i])) {
      uniqueCharacters = [];
      startPos++;
      i = startPos-1;
    } else {
      uniqueCharacters.push(input[i]);
    }

    if (uniqueCharacters.length >= 14) {
      break;
    }
  }

  return startPos + 14;
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