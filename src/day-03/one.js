import { URL, fileURLToPath } from 'url'
import { getInputInCorrectFormat } from '../helper/helperFunctions.js'
import { readInput } from '../util/readInput.js'

const getSolution = (data) => {
  const inputs = getInputInCorrectFormat(data, 'str')
  let score = 0

  let alphabet = []
  // Lowercase
  for (let i = 0; i < 26; i++) {
    alphabet.push(String.fromCharCode(97 + i))
  }
  // Uppercase
  for (let i = 0; i < 26; i++) {
    alphabet.push(String.fromCharCode(65 + i))
  }

  const splitInHalf = (str) => {
    const index = str.length / 2
    const result = [str.slice(0, index), str.slice(index)]

    return result
  }

  const commonCharacter = (string1, string2) => {
    let duplicateCharacter = ''
    for (let i = 0; i < string1.length; i += 1) {
      if (duplicateCharacter.indexOf(string1[i]) === -1) {
        if (string2.indexOf(string1[i]) !== -1) {
          duplicateCharacter += string1[i]
        }
      }
    }
    return duplicateCharacter
  }

  inputs.forEach((input) => {
    const [first, second] = splitInHalf(input)
    const character = commonCharacter(first, second)
    const scoreForLetter = chr.indexOf(character) + 1
    score = score + scoreForLetter
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
