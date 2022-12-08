import { URL, fileURLToPath } from 'url'
import { getInputInCorrectFormat } from '../helper/helperFunctions.js'
import { readInput } from '../util/readInput.js'

const getSolution = (data) => {
  const inputs = getInputInCorrectFormat(data, 'str')

  const directory = {}
  let currentDir = []
  let currentDirPath = ''

  const formatCurrentDirPath = (dir) => {
    return `/${dir.toString().replaceAll(',', '/')}`
  }
  inputs.forEach((input) => {
    const output = input.split(' ')
    if (output[0] === '$') {
      if (output[1] == 'cd') {
        if (output[2] == '/') {
          currentDir = []
          currentDirPath = ''
        } else if (output[2] == '..') {
          currentDir.pop()
          currentDirPath = formatCurrentDirPath(currentDir)
        } else {
          currentDir = [...currentDir, output[2]]
          currentDirPath = formatCurrentDirPath(currentDir)
        }
      } else if (output[1] == 'ls') {
        currentDirPath = formatCurrentDirPath(currentDir)
        directory[`${currentDirPath}`] = directory[`${currentDirPath}`] || 0
      }
    } else if (output[0] === 'dir') {
      directory[`${currentDirPath}/${output[1]}`] =
        directory[`${currentDirPath}/${output[1]}`] || 0
    } else {
      directory[`${currentDirPath}`] =
        (directory[`${currentDirPath}`] || 0) + +output[0]
    }
  })

  const directoryTotals = {}
  const directoryPaths = Object.keys(directory)
  directoryPaths.forEach((key) => {
    let size = directory[key]

    const subDir = directoryPaths.filter(
      (dir) => key !== dir && dir.substring(0, key.length) === key
    )
    subDir.forEach((d) => {
      size = size + directory[d]
    })
    directoryTotals[key] = size
  })

  let totalSize = 0
  Object.values(directoryTotals)
    .filter((size) => size < 100000)
    .forEach((v) => {
      totalSize = totalSize + v
    })

  return totalSize
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
