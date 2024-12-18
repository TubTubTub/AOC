import fs from 'fs'

let input = fs.readFileSync('2024/inputs/day16.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const visualiseRoute = (array) => {
    let mazeCopy = [...input]
    for (const [y, x] of array) {
        const arrayLine = mazeCopy[y].split('')
        arrayLine[x] = 'O'
        mazeCopy[y] = arrayLine.join('')
    }
    mazeCopy.map(line => console.log(...line))
}

const isEqual = (array1, array2) => {
    return array1.every((item, index) => array2[index] === item)
}

const directions  = [[0, 1], [1, 0], [0, -1], [-1, 0]]

const part1 = () => {
    const DYIDijkstra = (startPos, endPos) => {
        let result = 1000000
        const queue = [startPos]
        const scoreMap = new Map([[JSON.stringify(startPos), 0]])
        const directionMap = new Map([[JSON.stringify(startPos), [0, 1]]])

        while (queue.length > 0) {
            const currentPos = queue.shift()

            if (isEqual(currentPos, endPos)) {
                const stringifiedEnd = JSON.stringify(endPos)
                result = Math.min(result, scoreMap.get(stringifiedEnd))
                continue
            }

            const currentScore = scoreMap.get(JSON.stringify(currentPos))

            for (const newDirection of directions) {
                const newPos = [currentPos[0] + newDirection[0], currentPos[1] + newDirection[1]]
                let newScore = currentScore
                const currentDirection = directionMap.get(JSON.stringify(currentPos))
                if (!isEqual(currentDirection, newDirection)) {
                    newScore += 1001
                } else {
                    newScore += 1
                }

                if (
                    newPos[0] > 0 &&
                    newPos[0] < input.length - 1 &&
                    newPos[1] > 0 &&
                    newPos[1] < input[0].length - 1 &&
                    '.E'.indexOf(input[newPos[0]][newPos[1]]) > -1
                ) {
                    const existingScore = scoreMap.get(JSON.stringify(newPos)) || 1000000
                    if (newScore < existingScore) {
                        scoreMap.set(JSON.stringify(newPos), newScore)
                        directionMap.set(JSON.stringify(newPos), newDirection)
                        queue.push(newPos)
                    }
                }
            } 
        }

        return result
    }

    let startPos
    let endPos
    for (let i=0 ; i < input.length ; i++) {
        for (let j=0 ; j < input[0].length ; j++) {
            if (input[i][j] === 'S') {
                startPos = [i, j]
            }
            else if (input[i][j] === 'E') {
                endPos = [i, j]
            }
        }
    }

    const result = DYIDijkstra(startPos, endPos)

    console.log(result)
}

const part2 = () => {
    const DYIDijkstra = (startPos, endPos) => {
        let result = 1000000
        const queue = [startPos]
        const scoreMap = new Map([[JSON.stringify(startPos), 0]])
        const directionMap = new Map([[JSON.stringify(startPos), [0, 1]]])

        while (queue.length > 0) {
            const currentPos = queue.shift()

            if (isEqual(currentPos, endPos)) {
                const stringifiedEnd = JSON.stringify(endPos)
                result = Math.min(result, scoreMap.get(stringifiedEnd))
                continue
            }

            const currentScore = scoreMap.get(JSON.stringify(currentPos))

            for (const newDirection of directions) {
                const newPos = [currentPos[0] + newDirection[0], currentPos[1] + newDirection[1]]
                let newScore = currentScore
                const currentDirection = directionMap.get(JSON.stringify(currentPos))
                if (!isEqual(currentDirection, newDirection)) {
                    newScore += 1001
                } else {
                    newScore += 1
                }

                if (
                    newPos[0] > 0 &&
                    newPos[0] < input.length - 1 &&
                    newPos[1] > 0 &&
                    newPos[1] < input[0].length - 1 &&
                    '.E'.indexOf(input[newPos[0]][newPos[1]]) > -1
                ) {
                    const existingScore = scoreMap.get(JSON.stringify(newPos)) || 1000000
                    console.log(newPos, newScore, currentPos)
                    if (newScore < existingScore) {
                        scoreMap.set(JSON.stringify(newPos), newScore)
                        directionMap.set(JSON.stringify(newPos), newDirection)
                        queue.push(newPos)
                    }
                }
            } 
        }

        return result
    }

    let startPos
    let endPos
    for (let i=0 ; i < input.length ; i++) {
        for (let j=0 ; j < input[0].length ; j++) {
            if (input[i][j] === 'S') {
                startPos = [i, j]
            }
            else if (input[i][j] === 'E') {
                endPos = [i, j]
            }
        }
    }

    const result = DYIDijkstra(startPos, endPos)

    console.log(result)
}

part2()