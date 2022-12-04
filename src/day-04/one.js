import { URL, fileURLToPath } from 'url'
import { getInputInCorrectFormat } from '../helper/helperFunctions.js'
import { readInput } from '../util/readInput.js'

const getSolution = (data) => {
  const inputs = getInputInCorrectFormat(data, 'str')
  let score = 0

  inputs.forEach((input) => {
    const [[firstStart, firstEnd], [secondStart, secondEnd]] = input
      .split(',')
      .map((nums) => nums.split('-').map((value) => +value))

    if (
      (firstStart <= secondStart && firstEnd >= secondEnd) ||
      (secondStart <= firstStart && secondEnd >= firstEnd)
    ) {
      score++
    }
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
