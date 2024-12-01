import math

mac_filename = '/Users/tobymok/Desktop/Coding/Computer-Science/AOC 2023/Day_8_Input.txt'

def part_1():
    with open(mac_filename,'r') as f:
        instructions = ''
        dict = {}

        for i in range(2):
            line = next(f).strip()
            instructions += line

        for line in f:
            line = line.strip()
            line = line.split(' ')
            line.remove('=')
            line[1] = line[1][1:4]
            line[2] = line[2][:-1]
            dict[line[0]] = (line[1],line[2])

        curr = 'AAA'
        i = 0
        total = 0

        while True:
            
            if curr == 'ZZZ':
                break
            if instructions[i] == 'R':
                curr = dict[curr][1]
            else:
                curr = dict[curr][0]
            total += 1
            i = total % len(instructions)
        
        print(total)
def part_2():
    with open(mac_filename,'r') as f:
        instructions = ''
        dict = {}

        for i in range(2):
            line = next(f).strip()
            instructions += line

        for line in f:
            line = line.strip()
            line = line.split(' ')
            line.remove('=')
            line[1] = line[1][1:4]
            line[2] = line[2][:-1]
            dict[line[0]] = (line[1],line[2])

        curr = []
        
        for i in dict.keys():
            if i[-1] == 'A':
                curr.append(i)
                
        res = []

        for j in range(len(curr)):

            i = 0
            total = 0

            while True:
                    
                if curr[j][-1] == 'Z':
                    break
                if instructions[i] == 'R':
                    curr[j] = dict[curr[j]][1]
                else:
                    curr[j] = dict[curr[j]][0]
                total += 1
                i = total % len(instructions)
        
            res.append(total)

        print(math.lcm(*res))

part_1()
part_2()