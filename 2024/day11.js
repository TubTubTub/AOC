import fs from 'fs'

let input = fs.readFileSync('inputs/day11.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split(' ')
input = input.map((line) => line.trim())

const part1 = () => {
    let numbers = [...input]

    for (let i=0 ; i < 25 ; i++) {
        const newList= []

        for (let num of numbers) {
            if (num === '0') {
                newList.push('1')
            }
            else if (num.length % 2 === 0) {
                const firstHalf = num.slice(0, num.length / 2)
                const secondHalf = (+num.slice(num.length / 2)).toString()
                newList.push(firstHalf, secondHalf)
            }
            else {
                newList.push((+num * 2024).toString())
            }

        }

        numbers = newList
    }

    console.log(numbers.length)
}

const part2 = () => {
    const memoiseMap = new Map()
    
    let numbers = input.map(num => Number(num))

    const recurse = (array, depth) => {
        if (depth === 0) {
            return array.length
        }

        if (array.length > 1) {
            let arraySum = 0
            for (const item of array) {
                const computed = memoiseMap.get(JSON.stringify([item, depth]))

                if (computed) {
                    return computed
                } else {
                    arraySum += recurse([item], depth)
                }
            }
            return arraySum
        }

        const num = array[0]

        const computed = memoiseMap.get(JSON.stringify([num, depth]))
        if (computed) {
            return computed
        }


        let savedSum = null

        if (num === 0) {
            savedSum = recurse([1], depth - 1)
        }
        else {
            const strNum = String(num)
            const strLength = strNum.length

            if (strLength % 2 === 0) {
                const firstHalf = +strNum.slice(0, strLength / 2)
                const secondHalf = +strNum.slice(strLength / 2)
                savedSum = recurse([firstHalf], depth - 1) + recurse([secondHalf], depth - 1)
            }
            else {
                savedSum = recurse([num * 2024], depth - 1)
            }
        }

        memoiseMap.set(JSON.stringify([num, depth]), savedSum)
        return savedSum
    }

    const result = recurse(numbers, 75)

    console.log(result)
}