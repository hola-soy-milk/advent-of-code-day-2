freshProgram = () => {
  return [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,13,19,1,10,19,23,2,9,23,27,1,6,27,31,1,10,31,35,1,35,10,39,1,9,39,43,1,6,43,47,1,10,47,51,1,6,51,55,2,13,55,59,1,6,59,63,1,10,63,67,2,67,9,71,1,71,5,75,1,13,75,79,2,79,13,83,1,83,9,87,2,10,87,91,2,91,6,95,2,13,95,99,1,10,99,103,2,9,103,107,1,107,5,111,2,9,111,115,1,5,115,119,1,9,119,123,2,123,6,127,1,5,127,131,1,10,131,135,1,135,6,139,1,139,5,143,1,143,9,147,1,5,147,151,1,151,13,155,1,5,155,159,1,2,159,163,1,163,6,0,99,2,0,14,0]
}

runProgram = (program) => {
  var i = 0

  while (program[i] !== 99) {
    let opCode = program[i]
    let first = program[program[i+1]]
    let second = program[program[i+2]]
    let destination = program[i+3]
    if (opCode === 1) {
      program[destination] = first + second
    } else if (opCode === 2) {
      program[destination] = first * second
    }
    i += 4
  }
  return program[0]
}

lookupNounVerbPair = (solution) => {
  for (const i of Array(100).keys()) {
    for (const j of Array(100).keys()) {
      let program = freshProgram()
      program[1] = i
      program[2] = j
      let result = runProgram(program)
      if(result === solution) {
        return {noun: i, verb: j}
      }
    }
  }
}


let twelveOhTwo = freshProgram()
twelveOhTwo[1] = 12
twelveOhTwo[2] = 2
console.log(`Part 1: ${runProgram(twelveOhTwo)}`)

let result = lookupNounVerbPair(19690720);
console.log(`Part 2: noun: ${result.noun} verb: ${result.verb} 100*noun+verb: ${100*result.noun+result.verb}`)
