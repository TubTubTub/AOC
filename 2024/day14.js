import fs from 'fs'

let input = fs.readFileSync('inputs/day14.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const part1 = () => {
    const quadrants = [0, 0, 0, 0]

    for (let line of input) {
        const regex = line.match(/-?\d+/g)
        const position = [+regex[0], +regex[1]]
        const velocity = [+regex[2], +regex[3]]

        let newX = (position[0] + velocity[0] * 100) % 101
        let newY = (position[1] + velocity[1] * 100) % 103

        if (newX < 0) {
            newX = 101 + newX
        }
        if (newY < 0) {
            newY = 103 + newY
        }

        console.log(position,velocity, newX, newY)

        if (newX <= 49) {
            if (newY <= 50) {
                quadrants[0] += 1
            }
            else if (newY >= 52) {
                quadrants[1] += 1
            }
        }
        else if (newX >= 51) {
            if (newY <= 50) {
                quadrants[2] += 1
            }
            else if (newY >= 52) {
                quadrants[3] += 1
            }
        }
    }

    const result = quadrants.reduce((a, b) => a * b)

    console.log(result)
}

const part2 = () => {
    // Checks for long vertical line because I had no idea what the Christmas tree was supposed to look like
    // https://community.alteryx.com/t5/General-Discussions/Advent-of-Code-2024-Day-14-Base-A-Style/m-p/1349969
    const drawGrid = (array) => {
        const base = Array(103).fill(0).map(line => Array(101).fill(0))

        for (const [x, y] of array) {
            base[y][x] += 1
        }

        base.forEach(line => console.log(...line))
    }

    const checkChristmas = (array) => {
        const stringifiedArray = array.map(pos => JSON.stringify(pos))

        for (let [x, y] of array) {
            const requiredPos = [
                JSON.stringify([x, y-1]),
                JSON.stringify([x, y-2]),
                JSON.stringify([x, y-3]),
                JSON.stringify([x, y-4]),
                JSON.stringify([x, y-5]),
                JSON.stringify([x, y-6]),
                JSON.stringify([x, y-7]),
            ]
            if (requiredPos.every(pos => stringifiedArray.includes(pos))) {
                return true
            }
        }
        return false
    }

    const robots = []

    for (let line of input) {
        const regex = line.match(/-?\d+/g)
        const position = [+regex[0], +regex[1]]
        const velocity = [+regex[2], +regex[3]]

        robots.push([position, velocity])
    }

    let i = 1
    let result

    while (!result) {
        const occupied = []

        for (let robot of robots) {
            const [position, velocity] = robot
            
            let newX = (position[0] + velocity[0] * i) % 101
            let newY = (position[1] + velocity[1] * i) % 103

            if (newX < 0) {
                newX = 101 + newX
            }
            if (newY < 0) {
                newY = 103 + newY
            }

            occupied.push([newX, newY])
        }

        if (checkChristmas(occupied)) {
            result = i
            // drawGrid(occupied)
        }

        i += 1
    }

    console.log(result)
}