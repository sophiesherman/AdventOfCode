import { URL, fileURLToPath } from 'url'
import { getInputInCorrectFormat } from '../helper/helperFunctions.js'
import { readInput } from '../util/readInput.js'

const getSolution = (data) => {
  let unqiueMarker = null
  for (let i = 13; i < data.length; i++) {
    if (unqiueMarker === null) {
      const marker = {}
      for (let k = i - 13; k <= i; k++) {
        const letter = data[k]
        marker[`${letter}`] = (marker?.[`${letter}`] || 0) + 1
      }

      const duplicates = Object.values(marker).filter((value) => value > 1)
      if (duplicates.length === 0) {
        unqiueMarker = i + 1
      }
    }
  }
  return unqiueMarker
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
