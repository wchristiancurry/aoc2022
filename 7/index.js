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
  let root = parseFileSystem(input);
  let [sum, size] = traverse1(0, root);
  return sum;
}

function traverse1(sum, file) {
  let size = 0;
  if(file.children && file.children.length > 0) {
    file.children.forEach((child) => {
      let ret = traverse1(sum, child);
      sum = ret[0];
      size += ret[1];
    });

    file.dirSize = size;

    if (file.dirSize < 100000) {
      sum += file.dirSize;
    }
    return [sum, file.dirSize];
  }
  
  return [sum, file.size];
}

function problem2(input) {
  let root = parseFileSystem(input);

  let [sum, size] = traverse1(0, root);
  
  let unusedSpace = 70000000 - root.dirSize;
  let spaceNeeded = 30000000 - unusedSpace;

  let [sizeOfDirectoryToDelete, s] = traverse2(
    spaceNeeded, 
    Number.MAX_SAFE_INTEGER, 
    root);
  return sizeOfDirectoryToDelete;
}

function parseFileSystem(input) {
  let root = {
    name: '/',
    parent: null,
    children: [],
    dirSize: 0
  }

  let currentDir = root;
  for(let i = 1; i < input.length; i++) { //skip $ cd /
    let line = input[i];

    if (line.includes('$ cd')) {
      let newDirName = line.split(' ')[2];
      if (newDirName === '..') {
        currentDir = currentDir.parent;
      } else {
        currentDir.children.forEach((child) => {
          if (child.name === newDirName) {
            currentDir = child;
          }
        });
      }
    }

    if (line === '$ ls') {
      do {
        i += 1;
        line = input[i];

        if(!line) {
          break;
        }

        if(line.includes('$')) {
          break;
        }

        if (line.includes('dir')) {
          let dirName = line.split(' ')[1];
          currentDir.children.push({
            name: dirName,
            parent: currentDir,
            children: [],
            dirSize: 0,
          });
        } else {
          let fileSize = line.split(' ')[0];
          let fileName = line.split(' ')[1];
          currentDir.children.push({
            size: parseInt(fileSize),
            name: fileName,
          });
        }
      } while (!line.includes('$'));
      
      i -= 1;
    }
  };

  return root;
}

function traverse2(sizeToDelete, sizeOfDirToDelete, file) {
  let size = 0;
  if(file.children && file.children.length > 0) {
    file.children.forEach((child) => {
      let ret = traverse2(sizeToDelete, sizeOfDirToDelete, child);
      sizeOfDirToDelete = ret[0];
      size += ret[1];
    });

    file.dirSize = size;

    if (file.dirSize >= sizeToDelete 
      && file.dirSize < sizeOfDirToDelete) {
        sizeOfDirToDelete = file.dirSize;
    }
    return [sizeOfDirToDelete, file.dirSize];
  }
  
  return [sizeOfDirToDelete, file.size];
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