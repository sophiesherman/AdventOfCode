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
      treeById[id] = tree
      rows[rowId] = [...(rows[rowId] || []), tree]
      columns[colId] = [...(columns[colId] || []), tree]
      id++
    }
  })

  const getVisibleTreeIds = (orderedTrees) => {
    const visibleIds = []

    orderedTrees.forEach((currentTree, index) => {
      if (index == 0) {
        visibleIds.push(currentTree.id)
      } else {
        let visible = true
        const currentTreeHeight = +currentTree.height
        for (let i = 0; i < index; i++) {
          if (+orderedTrees[i].height >= currentTreeHeight) {
            visible = false
          }
        }
        if (visible) {
          visibleIds.push(currentTree.id)
        }
      }
    })

    return visibleIds
  }

  let visibleTreeIds = []

  // Rows
  Object.values(rows).forEach((rowTrees) => {
    // Left to right
    visibleTreeIds = [...visibleTreeIds, ...getVisibleTreeIds(rowTrees)]
    // Right to left
    visibleTreeIds = [
      ...visibleTreeIds,
      ...getVisibleTreeIds(rowTrees.reverse()),
    ]
  })

  // Columns
  Object.values(columns).forEach((colTrees) => {
    visibleTreeIds = [...visibleTreeIds, ...getVisibleTreeIds(colTrees)]
    visibleTreeIds = [
      ...visibleTreeIds,
      ...getVisibleTreeIds(colTrees.reverse()),
    ]
  })

  const uniqueVisibleTrees = [...new Set(visibleTreeIds)]
  return uniqueVisibleTrees.length
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
