const fs = require('fs');
const { performance } = require('perf_hooks');

function getInput() {
  // try {
  //   input = fs.readFileSync('./in.txt', 'utf8');
  //   // input = input.split("\n");
  // } catch (err) {
  //   console.error(err);
  // }

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
  let total = 0;
  let totals = [];
  input.forEach((line, i) => {
    if (line === "") {
      totals.push(total);
      total = 0;
    } else {
      total += parseInt(line);
    }
  });

  console.log(...totals);
  return Math.max(...totals);
}

function problem2(input) {

  let totals = [];
  let total = 0;

  input.forEach((line, i) => {
    if (line === "") {
      totals.push(total);
      total = 0;
    } else {
      console.log(line);
      total += parseInt(line);
    }
  });

  totals.sort((a, b) => {
    return a - b;
  });
  console.log(totals);
  let len = totals.length;
  return totals[len-1] + totals[len-2] + totals[len-3];
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