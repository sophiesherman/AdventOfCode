import { URL, fileURLToPath } from 'url'
import { getInputInCorrectFormat } from '../helper/helperFunctions.js'
import { readInput } from '../util/readInput.js'

const getSolution = (data) => {
  const inputs = getInputInCorrectFormat(data, 'str')

  const stacks = [[]]
  const moves = []
  let type = 'stacks'

  // Put inputs into stack / move
  inputs.forEach((input) => {
    if (input === '') {
      // Switch type when input is empty line
      type = 'moves'
    } else if (type === 'stacks') {
      const crates = input
        .match(/.{1,4}/g)
        .map((crate) => crate.replace(/[^a-zA-Z]+/g, ''))
      crates.forEach((char, i) => {
        if (char.length) {
          stacks[i + 1] = [char, ...(stacks[i + 1] || [])]
        }
      })
    } else {
      const move = input.split(' ')
      moves.push({
        amount: move[1],
        from: move[3],
        to: move[5],
      })
    }
  })

  // Move crates accordingly
  moves.forEach((move) => {
    const addOnStack = stacks[move.from].splice(
      stacks[move.from].length - move.amount
    )
    stacks[move.to] = [...stacks[move.to], ...addOnStack]
  })

  const answer = stacks.map((item) => {
    return item.length ? item[item.length - 1] : ''
  })
  return answer.toString().replaceAll(',', '')
}

// SETUP
const sampleInputPath = fileURLToPath(
  new URL('./inputSample.txt', import.meta.url)
)
const inputPath = fileURLToPath(new URL('./input.txt', import.meta.url))
const sampleData = await readInput(sampleInputPath)
const data = await readInput(inputPath)

if (sampleData) {
  console.log('SAMPLE')
  console.log(getSolution(sampleData))
}

if (data) {
  console.log('ANSWER')
  console.log(getSolution(data))
}
