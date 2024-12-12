const points = [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2], [2, 2], [1, 2], [0, 2], [0, 1]]

const isEqual = (array, testArray) => {
    return (array[0] === testArray[0] && array[1] === testArray[1])
}

let i = 1
let previousDirection = [-2, -2]
let sides = 0

do {
    let newDirection = [points[i][0] - points[i- 1][0], points[i][1] - points[i- 1][1]]

    if (!isEqual(newDirection, previousDirection)) {
        console.log(points[i], previousDirection, newDirection)
        sides += 1
    }
    previousDirection = newDirection
    i += 1
} while (i < points.length)

const lastDirection = [points[0][0] - points.at(-1)[0], points[0][1] - points.at(-1)[1]]
if (!isEqual(previousDirection, lastDirection)) {
    sides += 1
}

console.log(sides)

console.log(0 === 0.0)