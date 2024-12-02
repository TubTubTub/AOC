import fs from 'fs'

let input = fs.readFileSync('inputs/day2.txt', { encoding: 'utf8', flag: 'r' })
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
    const arraysEqual = (array1, array2) => {
        for (let i=0 ; i < array1.length ; i++) {
            if (array1[i] !== array2[i]) {
                return false
            }
        }
        return true
    }
    
    const sortNum = (array, ascending) => {
        if (ascending) {
            array.sort((a, b) => a - b)
        } else {
            array.sort((a, b) => b - a)
        }
    }
    
    const orderCorrect = (array) => {
        const ascending = [...array]
        const descending = [...array]
        sortNum(ascending, true)
        sortNum(descending, false)
        
        return (arraysEqual(array, ascending) || arraysEqual(array, descending))
    }
    
    const differenceCorrect = (array) => {
        for (let i=1 ; i < array.length ; i++) {
            const difference = Math.abs(array[i] - array[i-1])
            if (difference < 1 || difference > 3) {
                return false
            }
        }
        return true
    }
    
    const validNumbers = (numbers) => {
        return (orderCorrect(numbers) && differenceCorrect(numbers))
    }

    const result = input.filter((line) => {

        const numbers = line.split(' ').map((num) => Number(num))

        if (validNumbers(numbers)) {
            return true
        }

        for (let i=0 ; i < numbers.length ; i++) {
            const testNumbers = [...numbers]
            testNumbers.splice(i, 1)

            if (validNumbers(testNumbers)) {
                return true
            }
        }
        
        return false

    }).length

    console.log(result)
}