disk_map = open('2024/inputs/day9.txt', 'r').read().strip()

is_free_space = False
storage = []

id_count = 0
for i in range(len(disk_map)):
    if is_free_space:
        storage.append((-1, int(disk_map[i])))

    else:
        storage.append((id_count, int(disk_map[i])))
        id_count += 1
        
    is_free_space = not is_free_space

tail = 0
for i in range(len(storage) - 1, -1, -1):
    if storage[i][0] != -1:
        tail = i
        break

while tail > 0:
    identifier, length = storage[tail]
    for i in range(0, tail):
        if storage[i][0] == -1 and storage[i][1] >= length:
            diff = storage[i][1] - length
            storage[i] = (-1, diff)
            storage.insert(i, (identifier, length))
            tail += 1
            storage[tail] = (-1, length)
            break

    tail -= 1

    while tail >= 0 and storage[tail][0] == -1:
        tail -= 1


s = []
for symbol, length in storage:
    if symbol == -1:
        s += [-1] * length
    else:
        s += [symbol] * length

checksum = 0
for i in range(len(s)):
    if s[i] != -1:
        checksum += i * s[i]

print(checksum)