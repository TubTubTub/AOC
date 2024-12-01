import math

filename_windows = 'C:\\Users\\Python\\Documents\\Computer Science\\AOC 2023\\Day_2_Input.txt'

def part_1():
    with open(filename_windows,'r') as f:
        res = 0
        x = 1

        for line in f:
            
            line = line.strip()
            line = line.split(':')[1]
            line = line.split(';')
            possible = True

            for subgame in line:
                subgame = ''.join(char for char in subgame if char.isalnum())
                correct = [0]*3
                order  = []
                count = []
                
                letters = ''.join([x for x in subgame if x.isalpha()])
                numbers = [' ' if x.isalpha() else x for x in subgame]

                order.append(letters.find('red'))
                order.append(letters.find('green'))
                order.append(letters.find('blue'))

                curr = ''
                for i in range(len(numbers)):
                    if numbers[i].isnumeric():
                        curr += numbers[i]
                    else:
                        count.append(curr)
                        curr = ''

                count = [int(x) for x in count if x != '']

                for i in range(3):
                    if len(count) > 0:
                        idx = order.index(max(order))
                        correct[idx] = count[-1]
                        order[idx] = -1000
                        count.pop(-1)

                if not((correct[0] <= 12) and (correct[1] <= 13) and (correct[2] <= 14)):
                    possible = False
                    break
            
            if possible:
                res += x
            
            x += 1

        print(res)
def part_2():
    with open(filename_windows,'r') as f:
            res = 0
            x = 1
            total = 0

            for line in f:
                
                line = line.strip()
                line = line.split(':')[1]
                line = line.split(';')
                minimum = [0]*3
                possible = True

                for subgame in line:

                    subgame = ''.join(char for char in subgame if char.isalnum())
                    correct = [1]*3
                    order  = []
                    count = []
                    
                    letters = ''.join([x for x in subgame if x.isalpha()])
                    numbers = [' ' if x.isalpha() else x for x in subgame]

                    order.append(letters.find('red'))
                    order.append(letters.find('green'))
                    order.append(letters.find('blue'))

                    curr = ''
                    for i in range(len(numbers)):
                        if numbers[i].isnumeric():
                            curr += numbers[i]
                        else:
                            count.append(curr)
                            curr = ''

                    count = [int(x) for x in count if x != '']

                    for i in range(3):
                        if len(count) > 0:
                            idx = order.index(max(order))
                            correct[idx] = count[-1]
                            minimum[idx] = max(minimum[idx],count[-1])
                            order[idx] = -1000
                            count.pop(-1)
                    

                    if not((correct[0] <= 12) and (correct[1] <= 13) and (correct[2] <= 14)):
                        possible = False
                    
                
                if possible:
                    res += x
                
                total += math.prod(minimum)
                x += 1

            print(total)

part_1()
part_2()