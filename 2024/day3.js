import fs from 'fs'

let input = fs.readFileSync('inputs/day3.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString()

const part1 = () => {
    const matches = input.match(/mul\(\d+,\d+\)/g)
    let result = 0
    for (let equation of matches) {
        const operands = equation.match(/\d+/g)
        result += Number(operands[0]) * Number(operands[1])
    }

    console.log(result)
}

const part2 = () => {
    const matches = input.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)
    let result = 0
    let enabled = true

    for (let item of matches) {
        if ((item[0] === 'm') && (enabled)) {
            const operands = item.match(/\d+/g)
            result += Number(operands[0]) * Number(operands[1])
        }
        else if (item === 'do()') {
            enabled = true
        }
        else if (item === `don't()`) {
            enabled = false
        }
    }

    console.log(result)
}

part2()