freshProgram = () => {
  return [3,8,1001,8,10,8,105,1,0,0,21,46,59,84,93,110,191,272,353,434,99999,3,9,101,2,9,9,102,3,9,9,1001,9,5,9,102,4,9,9,1001,9,4,9,4,9,99,3,9,101,3,9,9,102,5,9,9,4,9,99,3,9,1001,9,4,9,1002,9,2,9,101,2,9,9,102,2,9,9,1001,9,3,9,4,9,99,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,1002,9,3,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,99]
}

Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
}

runDiagnostic = (program, inputs) => {
  var i = 0
  var diagnostic = 0
  while (program[i] !== 99) {
    let instruction = program[i].pad(5)
    let opCode = Number(instruction[4])
    let mode1 = instruction[2]
    let mode2 = instruction[1]
    var first = program[i+1]
    var second = program[i+2]
    var destination = program[i+3]
    if (mode1 == '0') {
      first = program[first]
    }
    if (mode2 == '0') {
      second = program[second]
    }
    if (opCode === 1) {
      program[destination] = first + second
      i += 4
    } else if (opCode === 2) {
      program[destination] = first * second
      i += 4
    } else if (opCode === 3) {
      destination = program[i+1]
      program[destination] = inputs.pop()
      i += 2
    } else if (opCode === 4) {
      destination = program[i+1]
      diagnostic = program[destination]
      i += 2
    } else if (opCode === 5) {
      if (first !== 0) {
        i = second
      } else {
        i += 3
      }
    } else if (opCode === 6) {
      if (first === 0) {
        i = second
      } else {
        i += 3
      }
    } else if (opCode === 7) {
      program[destination] = Number(first < second)
      i += 4
    } else if (opCode === 8) {
      program[destination] = Number(first === second)
      i += 4
    }
  }
  return diagnostic
}

let permutations = [];

const permute = (numbers, m = []) => {
  if (numbers.length === 0) {
    permutations.push(m)
  } else {
    for (let i = 0; i < numbers.length; i++) {
      let curr = numbers.slice();
      let next = curr.splice(i, 1);
      permute(curr.slice(), m.concat(next))
    }
  }
}
permute([0,1,2,3,4])



let amplifications = permutations.map(permutation => {
  let ampA = runDiagnostic(freshProgram(), [0, permutation[0]]);
  let ampB = runDiagnostic(freshProgram(), [ampA, permutation[1]]);
  let ampC = runDiagnostic(freshProgram(), [ampB, permutation[2]]);
  let ampD = runDiagnostic(freshProgram(), [ampC, permutation[3]]);
  let ampE = runDiagnostic(freshProgram(), [ampD, permutation[4]]);
  return ampE;
})

console.log(Math.max(...amplifications))
