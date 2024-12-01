import numpy as np
from collections import defaultdict

filename_windows = 'C:\\Users\\Python\\Documents\\Computer Science\\AOC 2023\\Day_3_Input.txt'
symbols = '*=-&+/$%@#'
templist = []

def part_1():
    with open(filename_windows,'r') as f:
        data = [('.'+(x.strip())+'.') for x in f]
        data.insert(0,('.'*len(data[0])))
        data.insert(len(data),('.'*len(data[0])))

    data = [list(x) for x in data]
    data = np.matrix(data)
    i = 1
    total = 0

    while i < len(data)-1:
        res = ''
        pos = []
        checkset = set()
        start_pos = ()
        end_pos = ()
        slice = []

        for j,char in enumerate(data[i].A1):
            if char.isnumeric():
                pos.append((i,j))
                res += char

            elif not(char.isnumeric()) and (len(res) > 0):
                start_pos = (pos[0][0]-1,pos[0][1]-1)
                end_pos = (start_pos[0]+len(res)+2,start_pos[1]+3)
                
                slice = data[start_pos[0]:start_pos[0]+3,start_pos[1]:start_pos[1]+len(res)+2]
                checkset = (set(tuple(slice.A1)))

                if len([x for x in checkset if x in symbols]) > 0:
                    print(pos,res)
                    print(slice)
                    total += int(res)
                
                res = ''
                pos = []
                checkset = set()
                start_pos = ()
                end_pos = ()
                slice = []
        
        i += 1

    print(total)

def part_2():
    with open(filename_windows,'r') as f:
        data = [('.'+(x.strip())+'.') for x in f]
        data.insert(0,('.'*len(data[0])))
        data.insert(len(data),('.'*len(data[0])))

    data = [list(x) for x in data]
    data = np.matrix(data)
    i = 1
    total = 0
    dict = defaultdict(list)

    while i < len(data)-1:
        res = ''
        pos = []
        checkset = set()
        start_pos = ()
        end_pos = ()
        slice = []
        loc = 0

        for j,char in enumerate(data[i].A1):
            if char.isnumeric():
                pos.append((i,j))
                res += char

            elif not(char.isnumeric()) and (len(res) > 0):
                start_pos = (pos[0][0]-1,pos[0][1]-1)
                end_pos = (start_pos[0]+len(res)+2,start_pos[1]+3)
                
                slice = data[start_pos[0]:start_pos[0]+3,start_pos[1]:start_pos[1]+len(res)+2]
                checkset = (set(tuple(slice.A1)))

                if ('*' in checkset):
                    rows,cols = np.where(slice=='*')
                    loc = (-1*(1-rows[0])+pos[0][0],-1*(1-cols[0])+pos[0][1])
                    dict[loc].append(int(res))
                
                res = ''
                pos = []
                checkset = set()
                start_pos = ()
                end_pos = ()
                slice = []
        
        i += 1

    for key,val in dict.items():
        if len(val) == 2:
            total += val[0]*val[1]
    print(total)

part_1()
part_2()