
const makeUnique = (array) => {
    const convertedArray = array.map(item => JSON.stringify(item))
    const toRemove = []

    for (let i=convertedArray.length - 1 ; i >= 0 ; i--) {
        console.log(convertedArray[i], convertedArray.indexOf(convertedArray[i]))
        if (convertedArray.indexOf(convertedArray[i]) !== i) {
            toRemove.push(i)
        }
    }
    console.log(toRemove)
    for (let num of toRemove) {
        array.splice(num, 1)
    }
}
const array = [1, 3, 3, 5,4, 5]
makeUnique(array)
console.log(array)