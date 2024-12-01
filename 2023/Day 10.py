import numpy as np

mac_filename = '/Users/tobymok/Desktop/Coding/Computer-Science/AOC 2023/Day_10_Input.txt'
windows_filename = 'C:\\Users\\Python\\Documents\\Computer Science\\AOC 2023\\Day_10_Input.txt'

def part_1():
    with open(windows_filename,'r') as f:
        def scan(symbol,row,col,hor,ver):
            if symbol == '|':
                if ver == 1:
                    return (row-1,col,0,1)
                else:
                    return (row+1,col,0,-1)
            
            elif symbol == '-':
                if hor == 1:
                    return (row,col+1,1,0)
                else:
                    return(row,col-1,-1,0)
                
            elif symbol == 'L':
                if ver == -1:
                    return (row,col+1,1,0)
                else:
                    return (row-1,col,0,1)
                
            
            elif symbol == 'J':
                if hor == 1:
                    return (row-1,col,0,1)
                else:
                    return (row,col-1,-1,0)
            
            elif symbol == '7':
                if hor == 1:
                    return (row+1,col,0,-1)
                else:
                    return (row,col-1,-1,0)
            
            elif symbol == 'F':
                if ver == 1:
                    return (row,col+1,1,0)
                else:
                    return (row+1,col,0,-1)
            
            else:
                print('ERROR',symbol)
        matrix = []
        res = 1

        for line in f:
            line = line.strip()
            matrix.append(list(line))
        
        matrix = np.array(matrix)
        row, col = (np.where(matrix=='S'))
        target = ''
        hor = 0
        ver = 0
        row = int(*row)
        col = int(*col)

        if matrix[row-1][col] in '|F7':
            row -= 1
            target = matrix[row][col]
            hor = 0
            ver = 1

        elif matrix[row][col+1] in '-JF':
            col += 1
            target = matrix[row][col]
            hor = 1
            ver = 0

        elif matrix[row+1][col] in '|LJ':
            row += 1
            target = matrix[row][col]
            hor = 0
            ver = -1
        
        else:
            col -= 1
            target = matrix[row][col]
            hor = -1
            ver = 0

        while target != 'S':
            row,col,hor,ver = scan(target,row,col,hor,ver)
            res += 1
            target = matrix[row][col]
        
        print(res/2)

part_1()