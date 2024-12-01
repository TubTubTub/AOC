from collections import defaultdict
mac_filename = '/Users/tobymok/Desktop/Coding/Computer-Science/AOC 2023/Day_4_Input.txt'

def part_1():
    with open(mac_filename,'r') as f:
        res = 0
        
        for line in f:
            winnings = []

            line = line.strip()

            win = line.split('|')[0].split(':')[1]
            numbers = line.split('|')[1]

            win = win.split(' ')
            numbers = numbers.split(' ')

            win = list(filter(None,win))
            numbers = list(filter(None,numbers))

            winnings = [num for num in numbers if num in win]
            
            if len(winnings) > 0:
                res += (2**(len(winnings)-1))

    print(res)

def part_2():
    with open(mac_filename,'r') as f:
        length = 0
        res = 0
        dict = defaultdict(lambda:1)

        for line in f:
            winnings = []

            line = line.strip()

            win = line.split('|')[0].split(':')
            card = int(''.join([x for x in win[0] if x.isnumeric()]))
            win = win[1]
            numbers = line.split('|')[1]

            win = win.split(' ')
            numbers = numbers.split(' ')

            win = list(filter(None,win))
            numbers = list(filter(None,numbers))

            winnings = [num for num in numbers if num in win]

            for i in range(card+1,card+len(winnings)+1):
                dict[i] += dict[card]
            print(card,win,numbers,len(winnings))

            length += 1

    no = 0

    for key,val in dict.items():
        no += 1
        res += val

    res += (length-no)

    print(res)

part_1()
part_2()