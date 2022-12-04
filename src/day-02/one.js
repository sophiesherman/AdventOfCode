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

  const me = {
    X: 'r',
    Y: 'p',
    Z: 's',
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
    let myChoice = me[second]

    let result
    for (const [key, value] of Object.entries(potential)) {
      if (
        value.filter((item) => item[0] === oppChoice && item[1] === myChoice) !=
        0
      ) {
        result = key
      }
    }

    score = score + choiceScore[myChoice] + resultScore[result]
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
