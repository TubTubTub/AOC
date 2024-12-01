FUCKINGFILENAME = '/Users/tobymok/Desktop/Coding/Computer-Science/AOC 2023/Day_1_Input.txt'
filename_windows = 'C:\\Users\\Python\\Documents\\Computer Science\\AOC 2023\\Day_1_Input.txt'

res1 = []
res2 = []
dict = {'one':1,'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9}
numbers = ['one','two','three','four','five','six','seven','eight','nine','1','2','3','4','5','6','7','8','9']

with open(filename_windows,'r') as f:

    for line in f:
        
        line = line.strip()
        nums = [x for x in line if x.isnumeric()]
        res1.append(int(''.join([nums[0],nums[-1]])))

print(sum(res1))

with open(filename_windows,'r') as f:

    for line in f:
        
        line = line.strip()
        
        res = ''
        i = 0
        
        while len(res) == 0:
            for char in numbers:
                if char in line[:i]:
                    res += str(dict[char])
                    break
            i += 1
        
        i = len(line)

        while len(res) == 1:
            for char in numbers:
                if char in line[i:]:
                    res += str(dict[char])
                    break
            i -= 1
        
        res2.append(int(res))
    
    print(sum(res2))