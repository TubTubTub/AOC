import fs from 'fs'

let input = fs.readFileSync('inputs/day5.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const rules = input.filter((line) => (line.indexOf('|') > -1))
const updates = input.filter((line) => line.indexOf(',') > -1)

const part1 = () => {
    const rulesMap = new Map()

    for (let rule of rules) {
        const [before, after] = rule.split('|').map((num) => Number(num))
        const existingArray = rulesMap.get(before) || []
        rulesMap.set(before, [...existingArray, after])
    }

    const filterCallback = (array) => {
        for (let i=0 ; i < array.length ; i++) {
            const testNum = Number(array[i])
            const afterNums = rulesMap.get(testNum) || []

            const valid = array.slice(i+1).every((num) => afterNums.indexOf(num) > -1)

            if (!valid) {
                return false
            }
        }

        return true
    }

    const updatesArray = updates.map((update) => update.split(',').map((num) => Number(num)))
    const filteredUpdates = updatesArray.filter(filterCallback)

    let result = 0
    for (let array of filteredUpdates) {
        const middleValue = array[Math.round(array.length - 1) / 2]
        result += middleValue
    }

    console.log(result)
}

const part2 = () => {
    const rulesMap = new Map()

    for (let rule of rules) {
        const [before, after] = rule.split('|').map((num) => Number(num))
        const existingArray = rulesMap.get(before) || []
        rulesMap.set(before, [...existingArray, after])
    }

    const filterCallback = (array) => {
        for (let i=0 ; i < array.length ; i++) {
            const testNum = Number(array[i])
            const afterNums = rulesMap.get(testNum) || []

            const valid = array.slice(i+1).every((num) => afterNums.indexOf(num) > -1)

            if (!valid) {
                return true
            }
        }

        return false
    }

    const updatesArray = updates.map((update) => update.split(',').map((num) => Number(num)))
    const wrongUpdates = updatesArray.filter(filterCallback)

    const getNumberValid = (testNum, array) => {
        const afterNums = rulesMap.get(testNum) || []
        return afterNums.filter((num) => array.indexOf(num) > -1).length
    }

    let result = 0

    for (let update of wrongUpdates) {
        const updateCopy = [...update]
        const sorted = update.sort((a, b) => getNumberValid(a, updateCopy) - getNumberValid(b, updateCopy))
        const middleValue = sorted[Math.round(sorted.length - 1) / 2]
        result += middleValue
    }

    console.log(result)
}