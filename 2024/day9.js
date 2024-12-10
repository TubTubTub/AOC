import exp from 'constants'
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
            if (dotIndex < 100) {
                console.log(dotIndex)
            }
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
}

const part2 = () => {
    let expanded = []
    const sizeMap = new Map()
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
            const indexes = sizeMap.get(num) || []
            sizeMap.set(num, [...indexes, runningSum])
        }
        runningSum += Number(num)
    }



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

    let i = expanded.length - 1
    let current = null
    let length = 0

    while (i >= -1) {
        if (expanded[i] !== current) {
            if (current !== '.') {
                const insertIndex = findSpace(length, i)

                if (insertIndex) {
                    console.log('free space', insertIndex, length)
                    for (let j=0 ; j < length ; j++) {
                        // console.log('inserting', length, current, 'at', insertIndex + j, 'replacing at', i + j)
                        expanded[i + j] = '.'
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

    console.log(expanded)
}

    // for (let i=expanded.length - 1 ; i >= 0 ; i--) {
    //     const numToMove = expanded[i]

    //     let candidate = Infinity
    //     let candidateSize = null

    //     for (let j=1 ; j <= numToMove.length ; j++) {
    //         const availablePos = sizeMap.get(j) || []
            
    //         if (availablePos.length > 0 && availablePos[0] < candidate) {
    //             candidate = availablePos[0]
    //             candidateSize = j
    //         }
    //     }

    //     if (candidate === Infinity) {
    //         continue
    //     }

    //     expanded[i] = '.'

    //     for (let j=0 ; j < numToMove.length ; j++) {
    //         expanded[candidate + j] = numToMove
    //     }

    //     candi

    //     const remainder = numToMove.length - candidateSize

part2()