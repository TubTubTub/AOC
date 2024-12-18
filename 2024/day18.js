import fs from 'fs'

let input = fs.readFileSync('2024/inputs/day18.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]

const isEqual = (array1, array2) => {
    return (array1.length === array2.length) && (array1.every((item, index) => array2[index] === item))
}

const part1 = () => {
    const bfs = (startPos, endPos) => {
        const visited = new Set()
        let stageQueue = []
        let queue = [startPos]
        let distance = 0

        while (queue.length > 0) {
            const currentPos = queue.shift()

            for (const [dy, dx] of directions) {
                const newPos = [currentPos[0] + dy, currentPos[1] + dx]

                if (
                    newPos[0] < 0 ||
                    newPos[0] >= grid.length ||
                    newPos[1] < 0 ||
                    newPos[1] >= grid[0].length ||
                    grid[newPos[0]][newPos[1]] === '#' ||
                    visited.has(JSON.stringify(newPos))
                ) {
                    continue
                }

                visited.add(JSON.stringify(newPos))
                stageQueue.push(newPos)

                if (isEqual(newPos, endPos)) {
                    return distance + 1
                }
            }

            if (queue.length === 0) {
                distance += 1
                queue = [...stageQueue]
                stageQueue = []
            }
        }
    }

    let grid = Array(71).fill('.').map(line => Array(71).fill('.'))

    for (let i=0 ; i < 1024 ; i++) {
        const [x, y] = input[i].match(/\d+/g).map(num => Number(num))
        grid[y][x] = '#'
    }

    const result = bfs([0, 0], [70, 70])

    console.log(result)
}

const part2 = () => {
    const bfs = (grid, startPos, endPos) => {
        const visited = new Set()
        let queue = [startPos]

        while (queue.length > 0) {
            const currentPos = queue.shift()

            for (const [dy, dx] of directions) {
                const newPos = [currentPos[0] + dy, currentPos[1] + dx]

                if (
                    newPos[0] < 0 ||
                    newPos[0] >= grid.length ||
                    newPos[1] < 0 ||
                    newPos[1] >= grid[0].length ||
                    grid[newPos[0]][newPos[1]] === '#' ||
                    visited.has(JSON.stringify(newPos))
                ) {
                    continue
                }

                visited.add(JSON.stringify(newPos))
                queue.push(newPos)

                if (isEqual(newPos, endPos)) {
                    return true
                }
            }
        }

        return false
    }
    
    const bytes = input.map(item => item.match(/\d+/g).map(num => Number(num)))
    let result
    
    for (let i=0 ; i < bytes.length ; i++) {
        let grid = Array(71).fill('.').map(line => Array(71).fill('.'))

        for (let j=0 ; j <= i ; j++) {
            const [blockX, blockY] = bytes[j]
            grid[blockY][blockX] = '#'
        }

        const hasRoute = bfs(grid, [0, 0], [70, 70])

        if (!hasRoute) {
            result = bytes[i].join(',')
            break
        }
    }
    
    console.log(result)
}