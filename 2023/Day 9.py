mac_filename = '/Users/tobymok/Desktop/Coding/Computer-Science/AOC 2023/Day_9_Input.txt'
windows_filename = 'C:\\Users\\Python\\Documents\\Computer Science\\AOC 2023\\Day_9_Input.txt'

def part_1():
    with open(windows_filename,'r') as f:
        total = 0
        for line in f:
            line = line.strip()
            line = [int(x) for x in line.split(' ')]

            flag = True
            res = []
            arr= []

            res.append(line)

            while flag:
                for x,y in zip(res[-1][0::],res[-1][1::]):
                    arr.append(y-x)
                
                res.append(arr)
                
                if set(arr) == {0}:
                    flag = False

                arr = []

            for i in range(len(res)-2,-1,-1):
                res[i].append(res[i][-1]+res[i+1][-1])

            total += res[0][-1]

        print(total)
def part_2():
    with open(windows_filename,'r') as f:
        total = 0
        for line in f:
            line = line.strip()
            line = [int(x) for x in line.split(' ')]

            flag = True
            res = []
            arr= []

            res.append(line)

            while flag:
                for x,y in zip(res[-1][0::],res[-1][1::]):
                    arr.append(y-x)
                
                res.append(arr)
                
                if set(arr) == {0}:
                    flag = False
                arr = []

            for i in range(len(res)-2,-1,-1):
                res[i].insert(0,res[i][0]-res[i+1][0])

            total += res[0][0]

        print(total)

part_1()
part_2()