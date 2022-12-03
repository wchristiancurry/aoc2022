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
  let sum = 0;
  input.forEach((line) => {
    let len = line.length;
    let compartmentSize = len / 2;

    let compartment1 = line.substring(0, compartmentSize);
    let compartment2 = line.substring(compartmentSize);

    for(let i = 0; i < compartment1.length; i++) {
      if (compartment2.includes(compartment1[i])) {

        let common = compartment1[i].charCodeAt(0);
        if (common > 96) {
          //its a lowercase letter
          common -= 96;
        } else {
          //its an uppercase letter
          common -= 65;
          common += 27;
        }
        sum += (common);
        break;
      }
    }

    
  });

  return sum;
}

function problem2(input) {
  let sum = 0;
  for(let i = 0; i < input.length; i+=3) {
    let group = [ input[i], input[i+1], input[i+2] ];
    console.log(group);

    let common;
    for(let j = 0; j < group[0].length; j++) {
      if (group[1].includes(group[0][j])
        && group[2].includes(group[0][j])) {
          common = group[0][j];
          break;
        }
    }

    common = common.charCodeAt(0);
    if (common > 96) {
      //its a lowercase letter
      common -= 96;
    } else {
      //its an uppercase letter
      common -= 65;
      common += 27;
    }
    sum += (common);
  }

  return sum;
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