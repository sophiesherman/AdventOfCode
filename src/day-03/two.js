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

  const commonCharacters = function (string1, string2) {
    let duplicateCharacter = ''
    for (let i = 0; i < string1.length; i += 1) {
      if (duplicateCharacter.indexOf(string1[i]) === -1) {
        if (string2.indexOf(string1[i]) !== -1) {
          duplicateCharacter += string1[i]
        }
      }
    }
    return [...duplicateCharacter]
  }

  let groups = []
  let size = 3

  while (inputs.length > 0) groups.push(inputs.splice(0, size))

  groups.forEach((input) => {
    const common1 = commonCharacters(input[0], input[1])
    const common2 = commonCharacters(input[1], input[2])
    const common3 = commonCharacters(input[0], input[2])

    const commonOfCommon = commonCharacters(
      common1.toString().replaceAll(',', ''),
      common2.toString().replace(',', '')
    )

    const character = commonCharacters(
      commonOfCommon.toString().replaceAll(',', ''),
      common3.toString().replace(',', '')
    ).toString()
    const scoreForLetter = alphabet.indexOf(character) + 1
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
