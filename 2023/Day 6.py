mac_filename = '/Users/tobymok/Desktop/Coding/Computer-Science/AOC 2023/Day_6_Input.txt'

def part_1():
    with open(mac_filename,'r') as f:
        line1 = f.readline().strip().split(' ')[1:]
        line2 = f.readline().strip().split(' ')[1:]
        times = [x for x in line1 if x.isnumeric()]
        distances = [x for x in line2 if x.isnumeric()]
        
        res = 1

        for x in range(len(times)):
            
            tally = 0

            for speed in range(int(times[x])):

                dist = speed*(int(times[x])-speed)

                if dist > int(distances[x]):
                    tally += 1
            
            res = res * tally
        
        print(res)
def part_2():
    with open(mac_filename,'r') as f:
            line1 = f.readline().strip().split(' ')[1:]
            line2 = f.readline().strip().split(' ')[1:]
            times = [x for x in line1 if x.isnumeric()]
            distances = [x for x in line2 if x.isnumeric()]
            times = int(''.join(times))
            distaces = int(''.join(distances))
            distances = int(''.join(distances))

            res = 0
            tally = 0
            possible = True

            for speed in range(times):

                dist = speed*(times-speed)

                if dist > distances:
                    break
                
                res += 1
            
            print((times-res)-res+1)

part_1()
part_2()