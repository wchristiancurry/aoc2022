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
  let answer = '';
  let crateMap = new Map();
  let instructions = [];
  for(let j = input.length-1; j >= 0; j--) {
    let line = input[j];

    if (line.includes('move')) {
      instructions.push(line);
    } else {
      let idx = 0;
      for(let i = 0; i < line.length; i += 4) {
        let crate = line.substring(i, i+3);

        
        if (crate.includes('[')) {
          if (!crateMap.has(idx)) {
            crateMap.set(idx, [ crate ]);
          } else {
            let arr = crateMap.get(idx);
            arr.push(crate);
            crateMap.set(idx, arr);
          }
        }

        idx += 1;
      } 
    }
  };

  for (let i = instructions.length-1; i >= 0; i--) {
    let instruction = instructions[i].trim().split(' ');
    let numToMove = parseInt(instruction[1]);
    let moveFromStack = parseInt(instruction[3])-1;
    let moveToStack = parseInt(instruction[5])-1;

    for (let i = 0; i < numToMove; i++) {
      let fromArr = crateMap.get(moveFromStack);
      let toArr = crateMap.get(moveToStack);

      toArr.push(fromArr.pop());

      crateMap.set(moveFromStack, fromArr);
      crateMap.set(moveToStack, toArr);
    }
  };

  for (const entry of crateMap.entries()) {
    let top = crateMap.get(entry[0])[entry[1].length-1].replace('[', '').replace(']', '');
    answer += top;
  }

  return answer;
}

function problem2(input) {
  let answer = '';
  let crateMap = new Map();
  let instructions = [];
  for(let j = input.length-1; j >= 0; j--) {
    let line = input[j];

    if (line.includes('move')) {
      instructions.push(line);
    } else {
      let idx = 0;
      for(let i = 0; i < line.length; i += 4) {
        let crate = line.substring(i, i+3);

        
        if (crate.includes('[')) {
          if (!crateMap.has(idx)) {
            crateMap.set(idx, [ crate ]);
          } else {
            let arr = crateMap.get(idx);
            arr.push(crate);
            crateMap.set(idx, arr);
          }
        }

        idx += 1;
      } 
    }
  };

  for (let i = instructions.length-1; i >= 0; i--) {
    let instruction = instructions[i].trim().split(' ');
    let numToMove = parseInt(instruction[1]);
    let moveFromStack = parseInt(instruction[3])-1;
    let moveToStack = parseInt(instruction[5])-1;

    let toAdd = [];
    for (let i = 0; i < numToMove; i++) {
      let fromArr = crateMap.get(moveFromStack);
      toAdd.push(fromArr.pop());
      crateMap.set(moveFromStack, fromArr);
    }

    for (let i = toAdd.length - 1; i >= 0; i--) {
      let toArr = crateMap.get(moveToStack);
      toArr.push(toAdd[i]);
      crateMap.set(moveToStack, toArr);
    }

  };

  console.log(crateMap);

  for (const entry of crateMap.entries()) {
    let top = crateMap.get(entry[0])[entry[1].length-1].replace('[', '').replace(']', '');
    answer += top;
  }

  return answer;
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