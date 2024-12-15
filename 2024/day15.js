import fs from 'fs'

let input = fs.readFileSync('inputs/day15.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const part1 = () => {
    const canMove = (y, x, move) => {
        switch (move) {
            case '^':
                while (y >= 0) {
                    if (warehouse[y][x] === '.') {
                        return [y, x]
                    }
                    else if (warehouse[y][x] === '#') {
                        return false
                    }
                    y -= 1
                }
            case '>':
                while (x < warehouse[0].length) {
                    if (warehouse[y][x] === '.') {
                        return [y, x]
                    }
                    else if (warehouse[y][x] === '#') {
                        return false
                    }
                    x += 1
                }
            case 'v':
                while (y < warehouse.length) {
                    if (warehouse[y][x] === '.') {
                        return [y, x]
                    }
                    else if (warehouse[y][x] === '#') {
                        return false
                    }
                    y += 1
                }
            case '<':
                while (x >= 0) {
                    if (warehouse[y][x] === '.') {
                        return [y, x]
                    }
                    else if (warehouse[y][x] === '#') {
                        return false
                    }
                    x -= 1
                }
        }
    }

    let processInstructions = false
    let warehouse = []
    let moves = ''
    let robotPos = [null, null]

    for (let i=0 ; i < input.length ; i++) {
        const line = input[i]
        if (line === '') {
            processInstructions = true
            continue
        }

        if (processInstructions) {
            moves += line
        } else {
            if (line.indexOf('@') > -1) {
                robotPos = [i, line.indexOf('@')]
            }
            warehouse.push(line.split(''))
        }
    }

    for (let move of moves) {
        let freePos
        switch (move) {
            case '^':
                freePos = canMove(robotPos[0], robotPos[1], move)
                if (freePos !== false) {
                    for (let i=freePos[0] ; i < robotPos[0] ; i++) {
                        warehouse[i][robotPos[1]] = warehouse[i + 1][robotPos[1]]
                    }
                    warehouse[robotPos[0]][robotPos[1]] = '.'
                    robotPos[0] -= 1
                }
                break
            case '>':
             freePos = canMove(robotPos[0], robotPos[1], move)
                if (freePos !== false) {
                    for (let i=freePos[1] ; i > robotPos[1] ; i--) {
                        warehouse[robotPos[0]][i] = warehouse[robotPos[0]][i - 1]
                    }
                    warehouse[robotPos[0]][robotPos[1]] = '.'
                    robotPos[1] += 1
                }
                break
            case 'v':
             freePos = canMove(robotPos[0], robotPos[1], move)
                if (freePos !== false) {
                    for (let i=freePos[0] ; i > robotPos[0] ; i--) {
                        warehouse[i][robotPos[1]] = warehouse[i - 1][robotPos[1]]
                    }
                    warehouse[robotPos[0]][robotPos[1]] = '.'
                    robotPos[0] += 1
                }
                break
            case '<':
                freePos = canMove(robotPos[0], robotPos[1], move)
                if (freePos !== false) {
                    for (let i=freePos[1] ; i < robotPos[1] ; i++) {
                        warehouse[robotPos[0]][i] = warehouse[robotPos[0]][i + 1]
                    }
                    warehouse[robotPos[0]][robotPos[1]] = '.'
                    robotPos[1] -= 1
                }
                break
        }
    }
        
    let result = 0

    for (let i=0 ; i < warehouse.length ; i++) {
        let j = -1
        while ((j = warehouse[i].indexOf('O', j + 1)) !== -1) {
            result +=  (100 * i) + j
        }
    }
    
    console.log(result)
}

const part2 = () => {
    let processInstructions = false
    let warehouse = []
    let moves = ''
    let robotPos = [null, null]

    for (let i=0 ; i < input.length ; i++) {
        const line = input[i]
        if (line === '') {
            processInstructions = true
            continue
        }

        if (processInstructions) {
            moves += line
        } else {
            const newList = []
            for (let j=0 ; j < line.length ; j++) {
                const char = line[j]
                if (char === '#') {
                    newList.push('#')
                    newList.push('#')
                }
                else if (char === '.') {
                    newList.push('.')
                    newList.push('.')
                }
                else if (char === 'O') {
                    newList.push('[')
                    newList.push(']')
                }
                else {
                    robotPos = [i, j * 2]
                    newList.push('@')
                    newList.push('.')
                }
            }
            warehouse.push(newList)
        }
    }

    const makeUnique = (array) => {
        const convertedArray = array.map(item => JSON.stringify(item))
        const toRemove = []

        for (let i=convertedArray.length ; i >= 0  ; i--) {
            if (convertedArray.indexOf(convertedArray[i]) !== i) {
                toRemove.push(i)
            }
        }
        for (let num of toRemove) {
            array.splice(num, 1)
        }
    }

    const checkVertical = (originY, originX, move) => {
        let startPos = [[originY, originX]]
        let blocksToMove = []

        switch (move) {
            case '^':
                while (startPos.length !== 0) {
                    let tempBlocks = []

                    for (let pos of startPos) {
                        let [y, x] = pos
                        const char = warehouse[y - 1][x]
                        if (char === ']') {
                            tempBlocks.push([y - 1, x])
                            tempBlocks.push([y - 1, x - 1])
                        }
                        else if (char === '[') {
                            tempBlocks.push([y - 1, x])
                            tempBlocks.push([y - 1, x + 1])
                        }
                        else if (char === '.') {

                        }
                        else if (char === '#') {
                            return false
                        }
                    }
                    
                    blocksToMove = blocksToMove.concat(startPos)

                    if (tempBlocks.length === 0) {
                        blocksToMove.reverse()
                        return blocksToMove
                    }

                    makeUnique(tempBlocks)
                    startPos = tempBlocks
                }
            case 'v':
                while (startPos.length !== 0) {
                    let tempBlocks = []

                    for (let pos of startPos) {
                        let [y, x] = pos
                        const char = warehouse[y + 1][x]
                        if (char === ']') {
                            tempBlocks.push([y + 1, x])
                            tempBlocks.push([y + 1, x - 1])
                        }
                        else if (char === '[') {
                            tempBlocks.push([y + 1, x])
                            tempBlocks.push([y + 1, x + 1])
                        }
                        else if (char === '.') {

                        }
                        else if (char === '#') {
                            return false
                        }
                    }
                    
                    blocksToMove = blocksToMove.concat(startPos)

                    if (tempBlocks.length === 0) {
                        blocksToMove.reverse()
                        return blocksToMove
                    }

                    makeUnique(tempBlocks)
                    startPos = tempBlocks
                }
        }
    }

    const checkHorizontal = (y, x, move) => {
        const blocksToMove = [[y, x]]
        switch (move) {
            case '>':
                while (x < warehouse[0].length) {
                    x += 1
                    if (warehouse[y][x] === '.') {
                        blocksToMove.reverse()
                        return blocksToMove
                    }
                    else if (warehouse[y][x] === '#') {
                        return false
                    }
                    blocksToMove.push([y, x])
                }
            case '<':
                while (x >= 0) {
                    x -= 1
                    if (warehouse[y][x] === '.') {
                        blocksToMove.reverse()
                        return blocksToMove
                    }
                    else if (warehouse[y][x] === '#') {
                        return false
                    }
                    blocksToMove.push([y, x])
                }
        }
    }

    const moveBlocks = (blocksToMove, move) => {
        const lastPos = blocksToMove.at(-1)
        if (move === '>') {
            for (let pos of blocksToMove) {
                warehouse[pos[0]][pos[1] + 1] = warehouse[pos[0]][pos[1]]
            }
        }
        else if (move === '<') {
            for (let pos of blocksToMove) {
                warehouse[pos[0]][pos[1] - 1] = warehouse[pos[0]][pos[1]]
            }
        }
        else if (move === '^') {
            for (let pos of blocksToMove) {
                warehouse[pos[0] - 1][pos[1]] = warehouse[pos[0]][pos[1]]
                warehouse[pos[0]][pos[1]] = '.'
            }
        }
        else if (move === 'v') {
            for (let pos of blocksToMove) {
                warehouse[pos[0] + 1][pos[1]] = warehouse[pos[0]][pos[1]]
                warehouse[pos[0]][pos[1]] = '.'
            }
        }
        warehouse[lastPos[0]][lastPos[1]] = '.'
    }

    let blocksToMove
    for (let move of moves) {
        const [y, x] = robotPos
        switch (move) {
            case '^':
                blocksToMove = checkVertical(y, x, move)
                if (blocksToMove !== false) {
                    moveBlocks(blocksToMove, move)
                    robotPos[0] -= 1
                }
                break
            case 'v':
                blocksToMove = checkVertical(y, x, move)
                if (blocksToMove !== false) {
                    moveBlocks(blocksToMove, move)
                    robotPos[0] += 1
                }
                break
            case '>':
                blocksToMove = checkHorizontal(y, x, move)
                if (blocksToMove !== false) {
                    moveBlocks(blocksToMove, move)
                    robotPos[1] += 1
                }
                break
            case '<':
                blocksToMove = checkHorizontal(y, x, move)
                if (blocksToMove !== false) {
                    moveBlocks(blocksToMove, move)
                    robotPos[1] -= 1
                }
                break
        }
    }
        
    let result = 0

    for (let i=0 ; i < warehouse.length ; i++) {
        let j = -1
        while ((j = warehouse[i].indexOf('[', j + 1)) !== -1) {
            result +=  (100 * i) + j
        }
    }
    
    console.log(result)
}