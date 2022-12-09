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
  let tail = { x: 0, y: 0 };
  let head = { x: 0, y: 0 };

  let positionsVisited = [];
  input.forEach((line) => {
    let [ direction, distance ] = line.split(' ');
    distance = parseInt(distance);

    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case 'U':
          head.y += 1;
          break;
        case 'D':
          head.y -= 1;
          break;
        case 'R':
          head.x += 1;
          break;
        case 'L':
          head.x -= 1;
          break;
      }
  
      
      if (head.x === tail.x && head.y === tail.y) {
        continue;
      }
      
      let xDistance = Math.abs(head.x - tail.x);
      let yDistance = Math.abs(head.y - tail.y);
      if (head.x === tail.x && (yDistance > 1)) {
        if (head.y > tail.y) {
          tail.y += 1;
        }
        if (head.y < tail.y) {
          tail.y -= 1;
        }
      } else if (head.y === tail.y && (xDistance > 1)) {
        if (head.x > tail.x) {
          tail.x += 1;
        }
        if (head.x < tail.x) {
          tail.x -= 1;
        }
      } else if (head.y !== tail.y && head.x !== tail.x && (yDistance > 1 || xDistance > 1)) {
        if (head.x > tail.x) {
          tail.x += 1;
        } else {
          tail.x -= 1;
        }

        if (head.y > tail.y) {
          tail.y += 1;
        } else {
          tail.y -= 1;
        }
      }

      positionsVisited.push({x: tail.x, y: tail.y});
    }
  });

  let unique = [];
  positionsVisited.forEach((p) => {
    if(unique.filter(u => u.x === p.x && u.y === p.y).length === 0) {
      unique.push(p);
    }
  })
  return unique.length;
}

function problem2(input) {
  let head = { x: 0, y: 0 };
  let knots = [];
  for (let i = 0; i < 9; i++) {
    knots.push({
      x: 0, y: 0
    });
  }

  let positionsVisited = [ { x: 0, y: 0 } ];
  input.forEach((line) => {
    let [ direction, distance ] = line.split(' ');
    distance = parseInt(distance);

    let caughtUp = false;
    while(!caughtUp || distance > 0) {

      if (distance > 0) {
        switch (direction) {
          case 'U':
            head.y += 1;
            break;
          case 'D':
            head.y -= 1;
            break;
          case 'R':
            head.x += 1;
            break;
          case 'L':
            head.x -= 1;
            break;
        }
  
        distance -= 1;
      }
  
      caughtUp = true;
      for(let knotIdx = 0; knotIdx < knots.length; knotIdx++) {
        let knot = knots[knotIdx];
        let prevKnot = (knotIdx === 0) ? head : knots[knotIdx - 1];
  
        let xDistance = Math.abs(prevKnot.x - knot.x);
        let yDistance = Math.abs(prevKnot.y - knot.y);
        if (prevKnot.x === knot.x && (yDistance > 1)) {
          if (prevKnot.y > knot.y) {
            knot.y += 1;
          }
          if (prevKnot.y < knot.y) {
            knot.y -= 1;
          }
          caughtUp = false;
        } else if (prevKnot.y === knot.y && (xDistance > 1)) {
          if (prevKnot.x > knot.x) {
            knot.x += 1;
          }
          if (prevKnot.x < knot.x) {
            knot.x -= 1;
          }
          caughtUp = false;
        } else if (prevKnot.y !== knot.y && prevKnot.x !== knot.x && (yDistance > 1 || xDistance > 1)) {
          if (prevKnot.x > knot.x) {
            knot.x += 1;
          } else {
            knot.x -= 1;
          }
  
          if (prevKnot.y > knot.y) {
            knot.y += 1;
          } else {
            knot.y -= 1;
          }
          caughtUp = false;
        }
  
        if (knotIdx === knots.length - 1) {
          positionsVisited.push({x: knot.x, y: knot.y});
        }
      }
    }
  });

  let unique = [];
  positionsVisited.forEach((p) => {
    if(unique.filter(u => u.x === p.x && u.y === p.y).length === 0) {
      unique.push(p);
    }
  });

  return unique.length;
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