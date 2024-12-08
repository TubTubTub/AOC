import fs from 'fs'

let input = fs.readFileSync('inputs/day7.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const part1 = () => {
    const generateOperators = (length) => {
        const result = []

        for (let i=0 ; i < 2 ** length ; i++) {
            const template = Number(i).toString(2).padStart(length, '0')
            result.push(
                template
                    .replaceAll('0', '+')
                    .replaceAll('1', '*')
            )
        }

        return result
    }

    let result = 0

    for (const line of input) {
        const [targetStr, numberStr] = line.split(': ')

        const target = Number(targetStr)
        const operands = numberStr.split(' ').map((num) => Number(num))
        const operatorPermutations = generateOperators(operands.length - 1)

        for (const operators of operatorPermutations) {
            const computedValue = operands.reduce((accumalator, currentVal, currentIdx) => {
                if (operators[currentIdx - 1] === '+') { 
                    return accumalator + currentVal
                }
                else if (operators[currentIdx - 1] === '*') {
                    return accumalator * currentVal
                }
            })

            if (computedValue === target) {
                result += target
                break
            }
        }
    }

    console.log(result)
}

const part2 = () => {
    const generateOperators = (length) => {
        const result = []

        for (let i=0 ; i < 3 ** length ; i++) {
            const template = Number(i).toString(3).padStart(length, '0')
            result.push(
                template
                    .replaceAll('0', '+')
                    .replaceAll('1', '*')
                    .replaceAll('2', '|')
            )
        }

        return result
    }

    let result = 0

    for (const line of input) {
        const [targetStr, numberStr] = line.split(': ')

        const target = Number(targetStr)
        const operands = numberStr.split(' ').map((num) => Number(num))
        const operatorPermutations = generateOperators(operands.length - 1)

        for (const operators of operatorPermutations) {
            const computedValue = operands.reduce((accumalator, currentVal, currentIdx) => {
                if (operators[currentIdx - 1] === '+') { 
                    return accumalator + currentVal
                }
                else if (operators[currentIdx - 1] === '*') {
                    return accumalator * currentVal
                }
                else if (operators[currentIdx - 1] === '|') {
                    return Number(String(accumalator) + String(currentVal))
                }
            })

            if (computedValue === target) {
                result += target
                break
            }
        }
    }

    console.log(result)
}

part2()