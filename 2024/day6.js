import fs from 'fs'

let input = fs.readFileSync('2024/inputs/day6.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const part1 = () => {
    let squares = [...input]
    let arrowPos
    let arrowType

    loop1:
        for (let i=0 ; i < squares.length ; i++) {
            for (const char of '<^>v') {
                if (squares[i].indexOf(char) !== -1) {
                    arrowPos = [i, squares[i].indexOf(char)]
                    arrowType = squares[arrowPos[0]][arrowPos[1]]
                    break loop1
                }
            }
        }


    const outOfBounds = (pos) => {
        return (pos[0] >= squares.length || pos[1] >= squares[0].length || pos[0] < 0 || pos[1] < 0)
    }
    
    const moveArrow = (currentPos, currentArrow) => {
        if (outOfBounds(currentPos)) {
            return [null, null]
        }

        let nextPos

        switch (currentArrow) {
            case '^':
                nextPos = [currentPos[0] - 1, currentPos[1]]
                if (
                    !outOfBounds(nextPos) &&
                    squares[nextPos[0]][nextPos[1]] === '#'
                ) {
                    return [currentPos, '>']
                }
                return [nextPos, currentArrow]

            case '>':
                nextPos = [currentPos[0], currentPos[1] + 1]
                if (
                    !outOfBounds(nextPos) &&
                    squares[nextPos[0]][nextPos[1]] === '#'
                ) {
                    return [currentPos, 'v']
                }
                return [nextPos, currentArrow]

            case 'v':
                nextPos = [currentPos[0] + 1, currentPos[1]]
                if (
                    !outOfBounds(nextPos) &&
                    squares[nextPos[0]][nextPos[1]] === '#'
                ) {
                    return [currentPos, '<']
                }
                return [nextPos, currentArrow]

            case '<':
                nextPos = [currentPos[0], currentPos[1] - 1]
                if (
                    !outOfBounds(nextPos) &&
                    squares[nextPos[0]][nextPos[1]] === '#'
                ) {
                    return [currentPos, '^']
                }
                return [nextPos, currentArrow]

            default:
                console.error('Invalid arrow type!')
        }
    }

    const visited = new Set()
    // let test = Array(10).fill().map(() => Array(10).fill('.'))

    do {
        visited.add(JSON.stringify(arrowPos))

        const result = moveArrow(arrowPos, arrowType)
        arrowPos = result[0]
        arrowType = result[1]
    } while (arrowPos !== null)
    
    const result = visited.size - 1

    console.log(result)
}

const part2 = () => {
    const outOfBounds = (squares, pos) => {
        return (pos[0] >= squares.length || pos[1] >= squares[0].length || pos[0] < 0 || pos[1] < 0)
    }
    
    const moveArrow = (squares, currentPos, currentArrow) => {
        if (outOfBounds(squares, currentPos)) {
            return [null, null]
        }

        let nextPos

        switch (currentArrow) {
            case '^':
                nextPos = [currentPos[0] - 1, currentPos[1]]
                if (
                    !outOfBounds(squares,nextPos) &&
                    squares[nextPos[0]][nextPos[1]] === '#'
                ) {
                    return [currentPos, '>']
                }
                return [nextPos, currentArrow]

            case '>':
                nextPos = [currentPos[0], currentPos[1] + 1]
                if (
                    !outOfBounds(squares, nextPos) &&
                    squares[nextPos[0]][nextPos[1]] === '#'
                ) {
                    return [currentPos, 'v']
                }
                return [nextPos, currentArrow]

            case 'v':
                nextPos = [currentPos[0] + 1, currentPos[1]]
                if (
                    !outOfBounds(squares, nextPos) &&
                    squares[nextPos[0]][nextPos[1]] === '#'
                ) {
                    return [currentPos, '<']
                }
                return [nextPos, currentArrow]

            case '<':
                nextPos = [currentPos[0], currentPos[1] - 1]
                if (
                    !outOfBounds(squares, nextPos) &&
                    squares[nextPos[0]][nextPos[1]] === '#'
                ) {
                    return [currentPos, '^']
                }
                return [nextPos, currentArrow]

            default:
                console.error('Invalid arrow type!')
        }
    }
    
    const findStartingArrow = (squares) => {
        for (let i=0 ; i < squares.length ; i++) {
            for (const char of '<^>v') {
                if (squares[i].indexOf(char) !== -1) {
                    const arrowPos = [i, squares[i].indexOf(char)]
                    const arrowType = squares[arrowPos[0]][arrowPos[1]]

                    return [arrowPos, arrowType]
                }
            }
        }
    }

    const isLooping = (squares) => {
        const tempResult = findStartingArrow(squares)

        let arrowPos = tempResult[0]
        let arrowType = tempResult[1]
        const arrowMap = new Map()

        do {
            const result = moveArrow(squares, arrowPos, arrowType)
            arrowPos = result[0]
            arrowType = result[1]

            const posHistory = arrowMap.get(JSON.stringify(arrowPos)) || []
            if (posHistory.includes(arrowType)) {
                return true
            }
            arrowMap.set(JSON.stringify(arrowPos), [...posHistory, arrowType])
        } while (arrowPos !== null)

        return false
    }

    const modifySquares = (squares, arrowPos, arrowType, initialPos) => {
        if (arrowPos[0] <= 0 || arrowPos[0] >= squares.length - 1 || arrowPos[1] <= 0 || arrowPos[1] >= squares[0].length) {
            return [squares,  null]
        }

        let squaresCopy = [...squares]
        let editedSquare

        if (arrowType === '^') {
            editedSquare = [arrowPos[0] - 1, arrowPos[1]]
            const rowString = squaresCopy[arrowPos[0] - 1]

            if ((arrowPos[0] - 1) !== initialPos[0] || (arrowPos[1]) !== initialPos[1]){
                squaresCopy[arrowPos[0] - 1] = rowString.slice(0, arrowPos[1]) + '#' + rowString.slice(arrowPos[1] + 1)
            }
        }
        else if (arrowType === '>') {
            editedSquare = [arrowPos[0], arrowPos[1] + 1]
            const rowString = squaresCopy[arrowPos[0]]

            if ((arrowPos[0]) !== initialPos[0] || (arrowPos[1] + 1) !== initialPos[1]){
                squaresCopy[arrowPos[0]] = rowString.slice(0, arrowPos[1] + 1) + '#' + rowString.slice(arrowPos[1] + 2)
            }
        }
        else if (arrowType === 'v') {
            editedSquare = [arrowPos[0] + 1, arrowPos[1]]
            const rowString = squaresCopy[arrowPos[0] + 1]

            if ((arrowPos[0] + 1) !== initialPos[0] || (arrowPos[1]) !== initialPos[1]){
                squaresCopy[arrowPos[0] + 1] = rowString.slice(0, arrowPos[1]) + '#' + rowString.slice(arrowPos[1] + 1)
            }
        }
        else if (arrowType === '<') {
            editedSquare = [arrowPos[0], arrowPos[1] - 1]
            const rowString = squaresCopy[arrowPos[0]]

            if ((arrowPos[0]) !== initialPos[0] || (arrowPos[1] - 1) !== initialPos[1]){
                squaresCopy[arrowPos[0]] = rowString.slice(0, arrowPos[1] - 1) + '#' + rowString.slice(arrowPos[1])
            }
        }

        return [squaresCopy, editedSquare]
    }

    let initialSquares = [...input]
    const editedSet = new Set()

    const tempResult = findStartingArrow(initialSquares)
    let arrowPos = tempResult[0]
    let arrowType = tempResult[1]
    
    const initialPos = arrowPos


    do {
        const squaresResult = modifySquares(initialSquares, arrowPos, arrowType, initialPos)
        const modifiedSquares = squaresResult[0]
        const editedSquare = squaresResult[1]

        if (editedSquare !== null && isLooping(modifiedSquares)) {
            editedSet.add(JSON.stringify(editedSquare))
        }

        const arrowResult = moveArrow(initialSquares, arrowPos, arrowType)
        arrowPos = arrowResult[0]
        arrowType = arrowResult[1]

    } while (arrowPos !== null)
    
    const result = editedSet.size

    console.log(result)
}