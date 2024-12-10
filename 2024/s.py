disk_map = open('2024/inputs/day9.txt', 'r').read().strip()

is_free_space = False
storage = []

id_count = 0
for i in range(len(disk_map)):
    if is_free_space:
        storage += ['.'] * int(disk_map[i])

    else:
        storage += [str(id_count)] * int(disk_map[i])
        id_count += 1
    is_free_space = not is_free_space

head = storage.index('.')

tail = len(storage) - 1
for i in range(len(storage) - 1, -1, -1):
    if storage[i] != '.':
        tail = i
        break

while head < tail:
    storage[head] = storage[tail]
    storage[tail] = '.'
    while storage[head] != '.':
        head += 1
    while storage[tail] == '.':
        tail -= 1

checksum = 0
print(storage[0:100])

for i in range(len(storage)):
    if storage[i].isnumeric():
        checksum += int(storage[i]) * i
    else:
        break