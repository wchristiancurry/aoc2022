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
  let signalStrengthSum = 0;

  let cycle = 1;
  let pc = 0;
  let xRegister = 1;
  let [instruction, value] = 'noop';
  let burnCycles = 0;
  
  while (pc < input.length) {
    let line = input[pc];
    [instruction, value] = line.split(' ');
    
    if (instruction === 'noop') {
    }
    
    if (instruction === 'addx') {
      if (burnCycles == 0) {
        burnCycles = 1;
      } else if (burnCycles == 1) {
        xRegister += parseInt(value);
        burnCycles = 0;
      }
    }
    
    cycle += 1;
    if (burnCycles < 1) {
      pc += 1;
    }

    if (cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle === 180 || cycle === 220) {
      signalStrengthSum += (cycle * xRegister);
    }
  }

  return signalStrengthSum;
}

function problem2(input) {
  let cycle = 1;
  let pc = 0;
  let xRegister = 1;
  let [instruction, value] = 'noop';
  let burnCycles = 0;

  let crt = [[]];
  for (let i = 0; i < 6; i++) {
    crt[i] = [];
    for(let j = 0; j < 40; j++) {
      crt[i][j] = '';
    }
  }

  while (pc < input.length) {
    let line = input[pc];
    [instruction, value] = line.split(' ');

    let i = Math.floor((cycle-1) / 40);
    let j = (cycle-1) % 40;
    if (j === xRegister 
      || j === (xRegister-1) 
      || j === (xRegister+1)
    ) {
      crt[i][j] = '#';
    } else {
      crt[i][j] = '.';
    }

    if (instruction === 'noop') {
    }
    
    if (instruction === 'addx') {
      if (burnCycles == 0) {
        burnCycles = 1;
      } else if (burnCycles == 1) {
        xRegister += parseInt(value);
        burnCycles = 0;
      }
    }

    cycle += 1;
    if (burnCycles < 1) {
      pc += 1;
    }

  }

  for(let i = 0; i < 6; i++) {
    let text = '';
    for(let j = 0; j < 40; j++) {
      text += crt[i][j];
    }

    console.log(text);
  }
  return 0;
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