import { URL, fileURLToPath } from 'url'
import { getInputInCorrectFormat } from '../helper/helperFunctions.js'
import { readInput } from '../util/readInput.js'

const getSolution = (data) => {
  const inputs = getInputInCorrectFormat(data, 'str')

  let treeById = {}
  let rows = {}
  let columns = {}

  // Put trees into their respective row/column and add them to treeById lookup
  let id = 0
  inputs.forEach((input, index) => {
    const rowId = index + 1
    for (let i = 0; i < input.length; i++) {
      const colId = i + 1
      const tree = { id, height: +input[i] }
      treeById[id] = { ...tree, column: colId, row: rowId }
      rows[rowId] = [...(rows[rowId] || []), tree]
      columns[colId] = [...(columns[colId] || []), tree]
      id++
    }
  })

  const getScoreInLine = (tree, orderedTrees) => {
    let score = 0

    const treeHeight = tree.height
    let foundId = false
    orderedTrees.forEach((t) => {
      if (t.id === tree.id) {
        foundId = true
      } else if (!foundId) {
        if (treeHeight > t.height) {
          score++
        } else if (t.height >= treeHeight) {
          score = 1
        }
      }
    })

    return score
  }

  const getTreeScore = (tree) => {
    const row = rows[tree.row]
    const column = columns[tree.column]

    const up = getScoreInLine(tree, column)
    const right = getScoreInLine(tree, row)
    const left = getScoreInLine(tree, row.reverse())
    const down = getScoreInLine(tree, column.reverse())

    return up * left * right * down
  }

  let highestScore = 0
  Object.values(treeById).forEach((tree) => {
    const treeScore = getTreeScore(tree)
    if (treeScore > highestScore) {
      highestScore = treeScore
    }
  })

  return highestScore
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
