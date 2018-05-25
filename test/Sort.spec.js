const Sort = require('../Sort')

let arr = [10, 8, 7, 15, 6, 7]
console.log('bubbleSort:', Sort.bubbleSort(arr))

arr = [10, 8, 7, 15, 6, 7]
console.log('selectSort:', Sort.selectSort(arr))

arr = [10, 8, 7, 15, 6, 7]
console.log('insertSort:', Sort.insertSort(arr))

arr = [10, 8, 7, 15, 6, 7]
console.log('mergeSort:', Sort.mergeSort(arr))

arr = [10, 8, 7, 15, 6, 7]
console.log('mergeSort by cycle:', Sort.mergeSortCycle(arr))

arr = [10, 8, 7, 15, 6, 7]
console.log('quickSort:', Sort.quickSort(arr))

arr = [10, 8, 7, 15, 6, 7]
console.log('heapSort:', Sort.heapSort(arr))
