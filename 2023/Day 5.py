mac_filename = '/Users/tobymok/Desktop/Coding/Computer-Science/AOC 2023/Day_5_Input.txt'

def process_v1(curr):
    with open(mac_filename,'r') as f:
        process = True
        for line in f:
            if line[0].isalpha():
                process = True

            elif process and (line[0] != '\n'):
                line = line.strip().split(' ')
                temp = dict[curr][-1] - int(line[1])

                if (temp >= 0) and (temp <= int(line[2])):
                    dict[curr].append(temp+int(line[0]))
                    process = False

def process_v2(curr):
    with open(mac_filename,'r') as f:
        res = 0
        process = True
        for line in f:
            if line[0].isalpha():
                process = True

            elif process and (line[0] != '\n'):
                line = line.strip().split(' ')
                temp = res - int(line[1])

                if (temp >= 0) and (temp <= int(line[2])):
                    res = temp+int(line[0])
                    process = False

        return res
def part_1():          
    with open(mac_filename,'r') as f:
        res = []
        dict = {}
        head = [next(f) for x in range(2)]
        head = head[0].split(' ')[1:]
        head[-1] = head[-1][:-1]

        for i in head:
            dict[i] = [int(i)]

        for i in dict.keys():
            process_v1(i)
            res.append(dict[i][-1])

        print(min(res))

# part_1()

with open(mac_filename,'r') as f:
    res = 10000000000
    dict = {}
    head = [next(f) for x in range(2)]
    head = head[0].split(' ')[1:]
    head[-1] = head[-1][:-1]
    head = list(zip(head[::2],head[1::2]))

    for i in head:
        for x in range(int(i[0]),int(i[0])+int(i[1])):
            print(x)
            res = min(res,process_v2(x))

    print(res)