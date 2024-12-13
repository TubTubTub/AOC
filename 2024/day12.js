import fs from 'fs'

let input = fs.readFileSync('inputs/day12.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const outOfBounds = (y, x) => {
    return (y < 0 || y >= input.length || x < 0 || x >= input[0].length)
}
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]

const part1 = () => {
    const scanArea = (y, x) => {
        const squares = new Set([JSON.stringify([y, x])])
        let queue = [[y, x]]
        let connections = 0

        const bfs = ([y, x]) => {
            const char = input[y][x]

            for (const direction of directions) {
                const [testY, testX] = [y + direction[0], x + direction[1]]

                if (outOfBounds(testY, testX) || input[testY][testX] !== char) {
                    continue
                }

                if (squares.has(JSON.stringify([testY, testX]))) {
                    connections += 1
                    continue
                } else {
                    squares.add(JSON.stringify([testY, testX]))
                    queue.push([testY, testX, direction])
                    connections += 1
                }
            }
        }

        while (queue.length > 0) {
            bfs(queue[0])
            queue.shift()
        }

        return [squares, connections]
    }

    let visited = new Set()
    let result = 0

    for (let i=0 ; i < input.length ; i++) {
        for (let j=0 ; j < input.length ; j++) {

            if (!visited.has(JSON.stringify([i, j]))) {
                const [squares, connections] = scanArea(i, j)
                visited = new Set([...visited, ...squares])
                result += squares.size * (squares.size * 4 - connections)
            }
            
        }
    }

    console.log(result)
}

const part2 = () => {
    const scanArea = (y, x) => {
        const squares = new Set([JSON.stringify([y, x])])
        const edges = []
        let queue = [[y, x]]

        const bfs = ([y, x]) => {
            const char = input[y][x]

            for (const direction of directions) {
                const [testY, testX] = [y + direction[0], x + direction[1]]

                if (outOfBounds(testY, testX) || input[testY][testX] !== char) {
                    edges.push([(y + testY) / 2, (x + testX) / 2])
                    continue
                }

                if (squares.has(JSON.stringify([testY, testX]))) {
                    continue
                } else {
                    squares.add(JSON.stringify([testY, testX]))
                    queue.push([testY, testX, direction])
                }
            }
        }

        while (queue.length > 0) {
            bfs(queue[0])
            queue.shift()
        }

        const sides = computeSides(edges)

        return [squares, sides]
    }

    const calculateLines = (axis, num, edges) => {
        edges.sort((a, b) => a - b)
        let result = 1

        for (let i=1 ; i < edges.length ; i++) {
            if (edges[i] - edges[i - 1] !== 1) {
                result += 1
                continue
            }

            if (axis === 'x') {
                const currentRow = edges[i]
                const rightDifferent = input[currentRow][num + 0.5] && (input[currentRow][num + 0.5] !== input[currentRow - 1][num + 0.5])
                const leftDifferent = input[currentRow][num - 0.5] && (input[currentRow][num - 0.5] !== input[currentRow - 1][num - 0.5])
                if (rightDifferent && leftDifferent) {
                    result += 1
                }

            } else {
                const currentCol = edges[i]
                const bottomDifferent = input[num + 0.5] && input[num + 0.5][currentCol] !== input[num + 0.5][currentCol - 1]
                const topDifferent = input[num - 0.5] && input[num - 0.5][currentCol] !== input[num - 0.5][currentCol - 1]
                if (bottomDifferent && topDifferent) {
                    result += 1
                }
            }
        }

        return result
    }

    const computeSides = (edges) => {
        const xEdgeMap = new Map()
        const yEdgeMap = new Map()
        let result = 0

        for (let edge of edges) {
            const [y, x] = edge

            if (y % 1 !== 0) {
                const yMap = yEdgeMap.get(y) || []
                yMap.push(x)
                yEdgeMap.set(y, yMap)
            }
            if (x % 1 !== 0) {
                const xMap = xEdgeMap.get(x) || []
                xMap.push(y)
                xEdgeMap.set(x, xMap)
            }
        }

        xEdgeMap.forEach((value, key) => {
            const test = calculateLines('x', key, value)
            result += test
        })
        yEdgeMap.forEach((value, key)=> {
            const test = calculateLines('y', key, value)
            result += test
        })

        return result
    }

    let visited = new Set()
    let result = 0

    for (let i=0 ; i < input.length ; i++) {
        for (let j=0 ; j < input.length ; j++) {
            if (!visited.has(JSON.stringify([i, j]))) {
                const [squares, sides] = scanArea(i, j)
                visited = new Set([...visited, ...squares])
                result += squares.size * sides
            }
            
        }
    }

    console.log(result)
}