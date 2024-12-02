import fs from 'fs'

let input = fs.readFileSync('inputs/day2 copy.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')

const part1 = () => {
    const result = input.filter((line) => {

        const numbers = line.split(' ').map((num) => Number(num))
        const increasing = (numbers[1] - numbers[0]) >= 0
        
        for (let i=1 ; i<numbers.length ; i++) {
            const difference = numbers[i] - numbers[i-1]
            if (
                (difference < 0 && increasing) ||
                (difference > 0 && !increasing) ||
                (Math.abs(difference) < 1 || Math.abs(difference) > 3)
            ) {
                return false
            }
        }
        return true

    }).length

    console.log(result)
}

const part2 = () => {
    const result = input.filter((line) => {

        const numbers = line.split(' ').map((num) => Number(num))
        let increasing = (numbers[1] - numbers[0]) >= 0
        let updated = false
        
        for (let i=1 ; i<numbers.length ; i++) {
            const difference = numbers[i] - numbers[i-1]
            if (
                (difference < 0 && increasing) ||
                (difference > 0 && !increasing) ||
                (Math.abs(difference) < 1 || Math.abs(difference) > 3)
            ) {
                if (updated) {
                    return false
                } else {
                    numbers.splice(i, 1)
                    updated = true
                }
            }
        }

        if (!updated) {
            return true
        }

        increasing = (numbers[1] - numbers[0]) >= 0
        console.log(numbers, increasing)
        
        for (let i=1 ; i<numbers.length ; i++) {
            const difference = numbers[i] - numbers[i-1]
            if (
                (difference < 0 && increasing) ||
                (difference > 0 && !increasing) ||
                (Math.abs(difference) < 1 || Math.abs(difference) > 3)
            ) {
                return false
            }
        }
        return true

    }).length
    console.log(result)
}

part2()