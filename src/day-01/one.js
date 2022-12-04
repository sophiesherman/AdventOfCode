import { URL, fileURLToPath } from 'url'
import { getInputInCorrectFormat } from '../helper/helperFunctions.js'
import { readInput } from '../util/readInput.js'

const getSolution = (data) => {
  const inputs = getInputInCorrectFormat(data, 'str')

  let inputsByElf = []
  let elfPosition = 0
  inputs.forEach((input) => {
    if (input.length > 0) {
      inputsByElf[elfPosition] = inputsByElf[elfPosition]
        ? [...inputsByElf[elfPosition], +input]
        : [+input]
    } else {
      elfPosition++
    }
  })

  const elfTotals = inputsByElf.map((group) =>
    group.reduce((partialSum, a) => partialSum + a, 0)
  )

  return Math.max(...elfTotals)
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
