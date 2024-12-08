import fs from 'fs'

let input = fs.readFileSync('inputs/day8.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const part1 = () => {
    const frequencyLocations = new Map()
    for (let i=0 ; i < input.length ; i++) {
        for (let j=0 ; j < input[i].length ; j++) {
            const char = input[i][j]
            if (char !== '.') {
                const currentLocations = frequencyLocations.get(char) || []
                currentLocations.push([i, j])
                frequencyLocations.set(char, currentLocations)
            }
        }
    }

    const antinodeLocations = new Set()

    for (const [char, locations] of frequencyLocations) {
        for (let location of locations) {
            const otherLocations = locations.filter(item => item !== location)
            
            for (let otherLocation of otherLocations) {
                const y = otherLocation[0] + (otherLocation[0] - location[0])
                const x = otherLocation[1] + (otherLocation[1] - location[1])

                if (y >= 0 && y < input.length && x >= 0 && x < input[0].length) {
                    antinodeLocations.add(JSON.stringify([y, x]))
                }
            }
        }
    }

    const result = antinodeLocations.size

    console.log(result)
}

const part2 = () => {
    const frequencyLocations = new Map()
    for (let i=0 ; i < input.length ; i++) {
        for (let j=0 ; j < input[i].length ; j++) {
            const char = input[i][j]
            if (char !== '.') {
                const currentLocations = frequencyLocations.get(char) || []
                currentLocations.push([i, j])
                frequencyLocations.set(char, currentLocations)
            }
        }
    }

    const antinodeLocations = new Set()

    for (const [char, locations] of frequencyLocations) {
        for (let location of locations) {
            const otherLocations = locations.filter(item => item !== location)
            
            for (let otherLocation of otherLocations) {
                const yDifference = otherLocation[0] - location[0]
                const xDifference = otherLocation[1] - location[1]
                let y = location[0]
                let x = location[1]
                do {
                    antinodeLocations.add(JSON.stringify([y, x]))
                    y += yDifference
                    x += xDifference
                } while (y >= 0 && y < input.length && x >= 0 && x < input[0].length)
            }
        }
    }

    const result = antinodeLocations.size

    console.log(result)

}

part2()