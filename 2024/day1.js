import fs from 'fs'

let input = fs.readFileSync('inputs/day1.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')

const list1= []
const list2 = []

input.forEach((string) => {
    const [item1, item2] = string.split('   ')
    list1.push(item1)
    list2.push(item2.trim())
})

const part1 = () => {
    list1.sort()
    list2.sort()

    let result = 0

    for (let i=0 ; i < list1.length ; i++) {
        result += Math.abs(list1[i] - list2[i])
    }

    console.log(result)
}

const part2 = () => {
    const list1Count = list1.reduce((countMap, item) => countMap.set(item, (countMap.get(item) || 0) + 1), new Map())
    const list2Count = list2.reduce((countMap, item) => countMap.set(item, (countMap.get(item) || 0) + 1), new Map())

    let result = 0

    for (let [key, value] of list1Count) {
        result += Number(key) * value * (list2Count.get(key) || 0)
    }

    console.log(result)
}