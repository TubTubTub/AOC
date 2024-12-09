import fs from 'fs'

let input = fs.readFileSync('2024/inputs/day9.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().trim()

const part1 = () => {
    let expandedString = ''
    for (let i=0 ; i < input.length ; i++) {
        if (i % 2 === 0) {
            expandedString += String(i / 2).repeat(input[i])
        } else {
            expandedString += '.'.repeat(input[i])
        }
    }

    const strLength = expandedString.length

    while (expandedString.indexOf('.') > -1) {
        if (expandedString.at(-1) === '.') {
            expandedString = expandedString.slice(0, -1)
        } else {
            const charToMove = expandedString.at(-1)
            const dotIndex = expandedString.indexOf('.')
            expandedString = expandedString.slice(0, dotIndex) + charToMove + expandedString.slice(dotIndex + 1, -1)
        }
    }

    expandedString = expandedString.padEnd(strLength, '.')
    const charList = expandedString.split('')
    
    const result = charList.reduce((accumalator, currentValue, currentIndex) => {
        if (currentValue !== '.') {
            return accumalator + (Number(currentValue) * currentIndex)
        } else {
            return accumalator
        }
    }, 0)

    console.log(result)
}

part1()