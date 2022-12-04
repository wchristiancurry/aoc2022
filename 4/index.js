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
  let containCount = 0;
  input.forEach((line) => {
    let pair = line.split(",");
    let range1 = pair[0].split("-");
    let range2 = pair[1].split("-");

    let range1Expanded = expandRange(range1);
    let range2Expanded = expandRange(range2);
    let check = (r1, r2) => r2.every(i => r1.includes(i));
    if (check(range1Expanded, range2Expanded) || check(range2Expanded, range1Expanded)) {
      containCount += 1;
    }
  });

  return containCount;
}

function problem2(input) {
  let containCount = 0;
  input.forEach((line) => {
    let pair = line.split(",");
    let range1 = pair[0].split("-");
    let range2 = pair[1].split("-");

    let range1Expanded = expandRange(range1);
    let range2Expanded = expandRange(range2);
    let check = (r1, r2) => r2.some(i => r1.includes(i));
    if (check(range1Expanded, range2Expanded) || check(range2Expanded, range1Expanded)) {
      containCount += 1;
    }
  });

  return containCount;
}

function expandRange(range) {
  let expanded = [];

  for (let i = parseInt(range[0]); i < parseInt(range[1])+1; i++) {
    expanded.push(i);
  }

  return expanded;
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