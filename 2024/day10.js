import fs from 'fs'

let input = fs.readFileSync('inputs/day10.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => {
    line = line.trim()
    return line.split('').map((char) => Number(char))
})



const part1 = () => {
    const recursiveMove = (target, y, x, previousDirection, set) => {
        const testDirections = directions.filter((direction) => (direction[0] !== -previousDirection[0] || direction[1] !== -previousDirection[1]))

        for (const direction of testDirections) {
            const [testY, testX] = [y + direction[0], x + direction[1]]

            if (testY < 0 || testY >= input.length || testX < 0 || testX >= input[0].length) {
                continue
            }

            if (input[testY][testX] === target) {
                if (target === 9) {
                    set.add(JSON.stringify([testY, testX]))
                } else {
                    recursiveMove(target + 1, testY, testX, direction, set)
                }
            }
        }
    }
    
    const trailheads = []
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]

    for (let y=0 ; y < input.length ; y++) {
        for (let x=0 ; x < input[y].length ; x++) {
            if (input[y][x] === 0) {
                trailheads.push([y, x])
            }
        }
    }

    let result = 0

    for (const trailhead of trailheads) {
        const trailheadSet = new Set()
        recursiveMove(1, trailhead[0], trailhead[1], [null, null], trailheadSet)
        result += trailheadSet.size
    }

    console.log(result)
}

const part2 = () => {
    const recursiveMove = (target, y, x, previousDirection) => {
        const testDirections = directions.filter((direction) => (direction[0] !== -previousDirection[0] || direction[1] !== -previousDirection[1]))

        for (const direction of testDirections) {
            const [testY, testX] = [y + direction[0], x + direction[1]]

            if (testY < 0 || testY >= input.length || testX < 0 || testX >= input[0].length) {
                continue
            }

            if (input[testY][testX] === target) {
                if (target === 9) {
                    result += 1
                } else {
                    recursiveMove(target + 1, testY, testX, direction)
                }
            }
        }
    }
    
    let result = 0
    const trailheads = []
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]

    for (let y=0 ; y < input.length ; y++) {
        for (let x=0 ; x < input[y].length ; x++) {
            if (input[y][x] === 0) {
                trailheads.push([y, x])
            }
        }
    }

    for (const trailhead of trailheads) {
        recursiveMove(1, trailhead[0], trailhead[1], [null, null])
    }

    console.log(result)
}

part2()