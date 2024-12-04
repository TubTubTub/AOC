import fs from 'fs'

let input = fs.readFileSync('inputs/day4.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())




const part1 = () => {
    const scan360 = (i, j) => {
        let numberOfXmas = 0
        const testChars = 'MAS'
        const directions = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]

        for (let direction of directions) {
            let charIndex = 0

            let x = i + direction[0]
            let y = j + direction[1]

            while (
                (x < input[0].length && x >= 0) &&
                (y < input.length && y >= 0) &&
                (input[x][y] === testChars[charIndex])
            ) {
                if (charIndex === 2) {
                    numberOfXmas += 1
                    break
                }

                x += direction[0]
                y += direction[1]
                charIndex += 1
            }

        }
        return numberOfXmas
    }

    let result = 0
    
    for (let i=0; i < input.length ; i++) {
        const line = input[i]

        for (let j=0 ; j < line.length ; j++) {
            if (line[j] === 'X') {
                const num = scan360(i, j)
                result += num
            }
        }
    }

    console.log(result)
}

const part2 = () => {
    const outOfBounds = (x, y) => {
        return !((x < input[0].length && x >= 0) && (y < input.length && y >= 0))
    }

    const scan360 = (i, j) => {
        const directions = [[1, 1], [1, -1]]
        const testChars = 'MS'
        let score = 0

        for (let direction of directions) {
            const x = i + direction[0]
            const y = j + direction[1]

            if (outOfBounds(x, y)){
                break
            }

            if (input[x][y] === 'S' || input[x][y] === 'M') {
                const targetChar = testChars.split(input[x][y]).join('')
                const newX = i - direction[0]
                const newY = j - direction[1]

                if (outOfBounds(newX, newY)){
                    break
                }

                if (input[newX][newY] === targetChar) {
                    score += 1
                }
            }
        }

        if (score === 2) {
            return 1
        } else {
            return 0
        }
    }

    let result = 0
    
    for (let i=0; i < input.length ; i++) {
        const line = input[i]

        for (let j=0 ; j < line.length ; j++) {
            if (line[j] === 'A') {
                const num = scan360(i, j)
                result += num
            }
        }
    }

    console.log(result)
}