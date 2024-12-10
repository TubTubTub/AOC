import fs from 'fs'

let input = fs.readFileSync('2024/inputs/day9.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().trim()

const part1 = () => {
    let expanded = []
    for (let i=0 ; i < input.length ; i++) {
        if (i % 2 === 0) {
            for (let j=0 ; j < input[i] ; j++) {
                expanded.push(String(i / 2))
            }
        } else {
            for (let j=0 ; j < input[i] ; j++) {
                expanded.push('.')
            }
        }
    }

    const originalLength = expanded.length

    while (expanded.indexOf('.') > -1) {
        if (expanded.at(-1) !== '.') {
            const numberToMove = expanded.at(-1)
            const dotIndex = expanded.indexOf('.')
            expanded[dotIndex] = numberToMove
            expanded = expanded.slice(0, -1)
        } else {
            expanded = expanded.slice(0, -1)
        }
    }

    expanded = expanded.concat(Array(originalLength).fill('.').slice(0, originalLength))
    let result = 0
    let i = 0

    while (expanded[i] !== '.') {
        result += Number(expanded[i]) * i
        i += 1
    }

    console.log(result)
}

const part2 = () => {
    const findSpace = (number, limit) => {
        let streak = 0

        for (let i=0 ; i < limit ; i++) {
            if (expanded[i] === '.') {
                streak += 1

                if (streak === number) {
                    return i - streak + 1
                }

            } else {
                streak = 0
            }
        }

        return null
    }

    let expanded = []
    let runningSum = 0

    for (let i=0 ; i < input.length ; i++) {
        const num = Number(input[i])
        if (i % 2 === 0) {
            for (let j=0 ; j < num ; j++) {
                expanded.push(String(i / 2))
            }
        } else {
            for (let j=0 ; j < num ; j++) {
                expanded.push('.')
            }
        }
        runningSum += Number(num)
    }

    let i = expanded.length - 1
    let current = null
    let length = 0

    while (i >= -1) {
        if (expanded[i] !== current) {
            if (current !== '.') {
                const insertIndex = findSpace(length, i + 1)

                if (insertIndex) {
                    for (let j=0 ; j < length ; j++) {
                        expanded[i + j + 1] = '.'
                        expanded[insertIndex + j] = current
                    }
                }
            }

            current = expanded[i]
            length = 1
        } else {
            length += 1
        }

        i -= 1
    }
    
    let result = 0

    for (const [index, item] of expanded.entries()) {
        if (item !== '.') {
            result += Number(item) * index
        }
    }

    console.log(result)
}