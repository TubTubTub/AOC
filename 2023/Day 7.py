from collections import Counter, defaultdict
mac_filename = '/Users/tobymok/Desktop/Coding/Computer-Science/AOC 2023/Day_7_Input.txt'

def part_1():
    def change(line):
        line = line.replace('2','a')
        line = line.replace('3','b')
        line = line.replace('4','c')
        line = line.replace('5','d')
        line = line.replace('6','e')
        line = line.replace('7','f')
        line = line.replace('8','g')
        line = line.replace('9','h')
        line = line.replace('T','i')
        line = line.replace('J','j')
        line = line.replace('Q','k')
        line = line.replace('K','l')
        line = line.replace('A','m')

        return line

    def assign(test):
        if test == [5]:
            return 6
        elif test == [1,4]:
            return 5
        elif test == [2,3]:
            return 4
        elif test == [1,1,3]:
            return 3
        elif test == [1,2,2]:
            return 2
        elif test == [1,1,1,2]:
            return 1
        else:
            return 0
            
    def greater_than(char1,char2):
        
        if dict[char1][1] == dict[char2][1]:
            for i in range(len(char1)):
                if char1 > char2:
                    return True
                elif char1 < char2:
                    return False
        
        else:
            return dict[char1][1] > dict[char2][1]

    def bubble_sort(mylist):
        len_array = len(mylist)

        for i in range(len_array-1):
            flag = False

            for j in range(len_array-1):

                if greater_than(mylist[i],mylist[i+1]):
                    mylist[i],mylist[i+1] = mylist[i+1],mylist[i]
                    flag = True
            
            len_array = len_array - 1
            if flag == False:
                break

    def insertion(arr):
        n = len(arr)
        if n <= 1:
            return arr
        
        for i in range(1,n):
            key = arr[i]
            j = i - 1

            while j >= 0 and greater_than(arr[j],key):
                arr[j+1] = arr[j]
                j -= 1

            arr[j+1] = key
        
        return arr
        
    with open(mac_filename,'r') as f:
        res_dict = defaultdict(list)
        dict = {}
        data = []
        res = 0

        for line in f:
            line = line.strip()
            line = (change(line.split(' ')[0]),line.split(' ')[1])
            
            c = Counter(line[0])
            test = sorted([i for i in [*c.values()]])

            dict[line[0]] = (line[1],assign(test))

            data.append(line[0])

        data = insertion(data)
        
        for count, i in enumerate(data):
            res += (count+1) * int(dict[i][0])
        
        print(res)
def part_2():
    def change(line):
        line = line.replace('J','a')
        line = line.replace('2','b')
        line = line.replace('3','c')
        line = line.replace('4','d')
        line = line.replace('5','e')
        line = line.replace('6','f')
        line = line.replace('7','g')
        line = line.replace('8','h')
        line = line.replace('9','i')
        line = line.replace('T','j')
        line = line.replace('Q','k')
        line = line.replace('K','l')
        line = line.replace('A','m')

        return line

    def assign(test):
        if test == [5]:
            return 6
        elif test == [1,4]:
            return 5
        elif test == [2,3]:
            return 4
        elif test == [1,1,3]:
            return 3
        elif test == [1,2,2]:
            return 2
        elif test == [1,1,1,2]:
            return 1
        else:
            return 0
            
    def greater_than(char1,char2):
        
        if dict[char1][1] == dict[char2][1]:
            for i in range(len(char1)):
                if char1 > char2:
                    return True
                elif char1 < char2:
                    return False
        
        else:
            return dict[char1][1] > dict[char2][1]

    def bubble_sort(mylist):
        len_array = len(mylist)

        for i in range(len_array-1):
            flag = False

            for j in range(len_array-1):

                if greater_than(mylist[i],mylist[i+1]):
                    mylist[i],mylist[i+1] = mylist[i+1],mylist[i]
                    flag = True
            
            len_array = len_array - 1
            if flag == False:
                break

    def insertion(arr):
        n = len(arr)
        if n <= 1:
            return arr
        
        for i in range(1,n):
            key = arr[i]
            j = i - 1

            while j >= 0 and greater_than(arr[j],key):
                arr[j+1] = arr[j]
                j -= 1

            arr[j+1] = key
        
        return arr
        
    with open(mac_filename,'r') as f:
        res_dict = defaultdict(list)
        dict = {}
        data = []
        res = 0

        for line in f:
            test = []
            j_count = 0
            
            line = line.strip()
            line = (change(line.split(' ')[0]),line.split(' ')[1])
            
            c = Counter(line[0])

            for key,val in c.items():
                if key == 'a':
                    j_count = val
                else:
                    test.append(val)

            test = sorted(test)
            if test != []:
                test[-1] = test[-1] + j_count
            else:
                test = [5]

            dict[line[0]] = (line[1],assign(test))

            data.append(line[0])

        data = insertion(data)

        for count, i in enumerate(data):
            res += (count+1) * int(dict[i][0])
        
        print(res)

part_1()
part_2()