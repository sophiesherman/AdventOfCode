import { URL, fileURLToPath } from 'url'
import { getInputInCorrectFormat } from '../helper/helperFunctions.js'
import { readInput } from '../util/readInput.js'

const getSolution = (data) => {
  const inputs = getInputInCorrectFormat(data, 'str')

  const opp = {
    A: 'r',
    B: 'p',
    C: 's',
  }

  const outcome = {
    X: 'lose',
    Y: 'draw',
    Z: 'win',
  }

  const potential = {
    win: [
      ['r', 'p'],
      ['p', 's'],
      ['s', 'r'],
    ],
    draw: [
      ['p', 'p'],
      ['r', 'r'],
      ['s', 's'],
    ],
    lose: [
      ['p', 'r'],
      ['s', 'p'],
      ['r', 's'],
    ],
  }

  const choiceScore = {
    r: 1,
    p: 2,
    s: 3,
  }

  const resultScore = {
    lose: 0,
    draw: 3,
    win: 6,
  }

  let score = 0

  inputs.forEach((input) => {
    const [first, second] = input.split(' ')
    let oppChoice = opp[first]
    let requiredResult = outcome[second]

    const myChoice = potential[requiredResult].filter(
      (option) => option[0] === oppChoice
    )[0][1]

    score = score + resultScore[requiredResult] + choiceScore[myChoice]
  })

  return score
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
