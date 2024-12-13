import fs from 'fs'

let input = fs.readFileSync('inputs/day13.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const solveSimultaneous = ([x1Coef, y1Coef, answ1], [x2Coef, y2Coef, answ2]) => {
    // https://www.codewars.com/kata/55df2e52954f1b311a000024/solutions/javascript
    return [
        (answ1 * y2Coef - answ2 * y1Coef) / (x1Coef * y2Coef - x2Coef * y1Coef),
        (answ1 * x2Coef - answ2 * x1Coef) / (x2Coef * y1Coef - x1Coef * y2Coef)
    ]
}

const part1 = () => {
    let result = 0

    for (let i=0 ; i < input.length ; i += 4) {
        const question = input.slice(i, i + 3)

        const regex = /\d+/g
        const firstValues = question[0].match(regex).map(num => Number(num))
        const secondValues = question[1].match(regex).map(num => Number(num))
        const constants = question[2].match(regex).map(num => Number(num))

        const solutions = solveSimultaneous([firstValues[0], secondValues[0], constants[0]], [firstValues[1], secondValues[1], constants[1]])

        if (solutions[0] % 1 === 0 && solutions[1] % 1 === 0) {
            result += solutions[0] * 3
            result += solutions[1] * 1
        }
    }
    
    console.log(result)
}

const part2 = () => {
    let result = 0

    for (let i=0 ; i < input.length ; i += 4) {
        const question = input.slice(i, i + 3)

        const regex = /\d+/g
        const firstValues = question[0].match(regex).map(num => Number(num))
        const secondValues = question[1].match(regex).map(num => Number(num))
        const constants = question[2].match(regex).map(num => Number(num) + 10000000000000)

        const solutions = solveSimultaneous([firstValues[0], secondValues[0], constants[0]], [firstValues[1], secondValues[1], constants[1]])

        if (solutions[0] % 1 === 0 && solutions[1] % 1 === 0) {
            result += solutions[0] * 3
            result += solutions[1] * 1
        }
    }
    
    console.log(result)
}