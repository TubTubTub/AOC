import fs from 'fs'

let input = fs.readFileSync('2024/inputs/day7.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const part1 = () => {
    const generateOperators = (length) => {
        const result = []

        for (let i=0 ; i < 2 ** length ; i++) {
            const template = Number(i).toString(2).padStart(length, '0')
            result.push(template.replaceAll('0', '+').replaceAll('1', '*'))
        }

        return result
    }

    for (const line of input) {
        const [targetStr, numberStr] = line.split(': ')
        const target = Number(targetStr)
        const operands = numberStr.split(' ').map((num) => Number(num))

        const operandPermutations = generateOperators(operands.length - 1)

        for (let operandPermutation of operandPermutations) {
            for (let i=0 ; i < operandPermutation.length ; i++) {

            }
        }
    }
}

part1()