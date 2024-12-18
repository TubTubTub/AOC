import fs from 'fs'

let input = fs.readFileSync('inputs/day17.txt', { encoding: 'utf8', flag: 'r' })
input = input.toString().split('\n')
input = input.map((line) => line.trim())

const isEqual = (array1, array2) => {
    return (array1.length === array2.length) && (array1.every((item, index) => array2[index] === item))
}

const part1 = () => {
    const comboOperand = (operand) => {
        if (0 <= operand && operand <= 3) {
            return operand
        }

        if (operand === 4) {
            return registers['A']   
        }

        if (operand === 5) {
            return registers['B']
        }

        if (operand === 6) {
            return registers['C']
        }

        if (operand === 7) {
            throw Error('AAAAA')
        }
    }
    const regex = /\d+/g
    const registers = {
        'A': +input[0].match(regex),
        'B': +input[1].match(regex),
        'C': +input[2].match(regex)
    }
    const program = input[4].match(regex).map(num => Number(num))
    const output = []

    let pointer = 0
    while (pointer < program.length) {
        const opcode = program[pointer]
        const operand = program[pointer + 1]

        switch (opcode) {
            case 0:
                registers['A'] = Math.trunc(registers['A'] / (2 ** comboOperand(operand)))
                break
            case 1:
                registers['B'] = registers['B'] ^ operand
                break
            case 2:
                registers['B'] = comboOperand(operand) % 8
                break
            case 3:
                if (registers['A'] !== 0) {
                    pointer = operand
                    continue
                }
                break
            case 4:
                registers['B'] = registers['B'] ^ registers['C']
                break
            case 5:
                output.push(comboOperand(operand) % 8)
                break
            case 6:
                registers['B'] = Math.trunc(registers['A'] / (2 ** comboOperand(operand)))
                break
            case 7:
                registers['C'] = Math.trunc(registers['A'] / (2 ** comboOperand(operand)))
                break
        }
        pointer += 2
    }

    const result = output.join(',')

    console.log(result)
}

const part2 = () => {
    const comboOperand = (registers, operand) => {
        if (0 <= operand && operand <= 3) {
            return operand
        }

        if (operand === 4) {
            return registers['A']   
        }

        if (operand === 5) {
            return registers['B']
        }

        if (operand === 6) {
            return registers['C']
        }

        if (operand === 7) {
            throw Error('AAAAA')
        }
    }
    const regex = /\d+/g
    const registers = {
        'A': +input[0].match(regex),
        'B': +input[1].match(regex),
        'C': +input[2].match(regex)
    }
    const program = input[4].match(regex).map(num => Number(num))

    const runProgram = (originalReg, originalPro) => {
        const registers = {...originalReg}
        const program = [...originalPro]
        const output = []

        let pointer = 0
        while (pointer < program.length) {
            const opcode = program[pointer]
            const operand = program[pointer + 1]

            // console.log('POINTER:', pointer, 'OPCODE:', opcode, 'OPERAND:', operand)
            // console.log('REGISTERS:', registers)
            // console.log('OUTPUT:', output)
            // console.log()

            switch (opcode) {
                case 0:
                    registers['A'] = Math.trunc(registers['A'] / (2 ** comboOperand(registers, operand)))
                    break
                case 1:
                    registers['B'] = registers['B'] ^ operand
                    break
                case 2:
                    registers['B'] = comboOperand(registers, operand) % 8
                    break
                case 3:
                    if (registers['A'] !== 0) {
                        pointer = operand
                        continue
                    }
                    break
                case 4:
                    registers['B'] = registers['B'] ^ registers['C']
                    break
                case 5:
                    output.push(comboOperand(registers, operand) % 8)
                    break
                case 6:
                    registers['B'] = Math.trunc(registers['A'] / (2 ** comboOperand(registers, operand)))
                    break
                case 7:
                    registers['C'] = Math.trunc(registers['A'] / (2 ** comboOperand(registers, operand)))
                    break
            }
            pointer += 2
        }

        return output
    }
    
    // ANSWER BETWEEN 2^46.58 and 2^47
    let result = 0
    let registerA = 0
    let end3 = []
    
    while (true) {
        registers['A'] = registerA
        const newProgram = runProgram(registers, program)

        if (registerA % 100000 === 0) {
            // console.log(`RUN ${registerA}: ${newProgram} ||| ${program} ${2**47}\n`)
        }


        if (isEqual(newProgram.slice(-5), [5, 0, 3, 3, 0])) {
            end3 = newProgram.slice(-3)
            // console.log('END 3:', newProgram.slice(-3), registerA)
            if (newProgram.at(-1) === 0) {
                console.log(registerA, Math.log(registerA) / Math.log(2024))
            }
        }

        if (isEqual(newProgram, program)) {
            result = registerA
            break
        }
        registerA += 1
    }

    console.log(result)
}

part2()