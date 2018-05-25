/**
 * 接口：sort(arr), return arr
 */

module.exports.bubbleSort = function (arr) {
  let i, j, l = arr.length

  for (i = 0; i < l; i++) {
    for (j = 0; j < l - i - 1; j++) {
      if (arr[j] > arr[j + 1])
        swap(arr, j, j + 1)
    }
  }

  return arr
}

module.exports.selectSort = function (arr) {
  let i, j, minIndex, l = arr.length

  for (i = 0; i < l; i++) {
    minIndex = i
    for (j = i; j < l; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j
    }
    swap(arr, i, minIndex)
  }

  return arr
}

function _insertSort (arr, lo, hi) {
  let i, j

  for (i = lo + 1; i <= hi; i++) {
    for (j = i; j > lo; j--) {
      if (arr[j] < arr[j - 1]) swap(arr, j, j - 1)
    }
  }
}

module.exports.insertSort = function insertSort (arr) {
  _insertSort(arr, 0, arr.length - 1)

  return arr
}

function _merge (arr, lo, mid, hi) {
  const arrTemp = arr.slice()

  let i = lo, j = mid + 1
  while (lo <= hi) {
    if (j > hi) arr[lo++] = arrTemp[i++]
    else if (i > mid) arr[lo++] = arrTemp[j++]
    else if (arrTemp[i] <= arrTemp[j]) arr[lo++] = arrTemp[i++]
    else if (arrTemp[i] > arrTemp[j]) arr[lo++] = arrTemp[j++]
  }
}

function _mergeSort(arr, lo, hi) {
  if (hi - lo <= 4) {
    return _insertSort(arr, lo, hi)
  }

  let mid = parseInt(lo + (hi - lo) / 2)
  _mergeSort(arr, lo, mid)
  _mergeSort(arr, mid + 1, hi)
  _merge(arr, lo, mid, hi)
}

module.exports.mergeSort = function (arr) {
  _mergeSort(arr, 0, arr.length - 1)

  return arr
}

module.exports.mergeSortCycle = function (arr) {
  let i, sz, l = arr.length
  let mid, hi

  for (sz = 1; sz < l; sz += sz) {
    for (i = 0; i < l; i += 2 * sz) {
      mid = i + sz - 1
      hi = Math.min(mid + sz, l - 1)
      _merge(arr, i, mid, hi)
    }
  }

  return arr
}

function _partition (arr, lo, hi) {
  const index = parseInt(Math.random() * (hi - lo)) + lo
  const median = arr[index]
  swap(arr, index, lo)

  let i = lo, j = lo + 1
  while (j <= hi) {
    if (arr[j] < median) swap(arr, ++i, j)
    j++
  }
  swap(arr, lo, i)

  return i
}

function _quickSort (arr, lo, hi) {
  if (hi - lo <= 4) return _insertSort(arr, lo, hi)

  const pivot = _partition(arr, lo, hi)

  _quickSort(arr, lo, pivot)
  _quickSort(arr, pivot + 1, hi)
}

module.exports.quickSort = function (arr) {
  _quickSort(arr, 0, arr.length - 1)

  return arr
}

// 二叉最大堆
module.exports.MaxHeap = class MaxHeap {
  constructor (arr) {
    (arr || (arr = [])).unshift(undefined)
    this.heap = arr

    let l = this.heap.length,
      i = parseInt((l - 1) / 2) + 1

    while (i-- > 1) {
      this.sink(i)
    }
  }

  insert (item) {
    this.heap.push(item)
    this.swim(this.size)
    return item
  }

  popMax () {
    if (this.size === 1) return this.heap.pop()

    let res

    swap(this.heap, 1, this.size)
    res = this.heap.pop()
    this.sink(1)

    return res
  }

  sink (pos) {
    let value, left, right, maxValue, toSwap
    while (true) {
      if (this._isLeaf(pos)) return

      value = this.heap[pos]
      left = this.heap[pos * 2] || Number.NEGATIVE_INFINITY
      right = this.heap[pos * 2 + 1] || Number.NEGATIVE_INFINITY
      maxValue = Math.max(value, left, right)

      if (value === maxValue) return

      if (left === maxValue) toSwap = pos * 2
      else if (right === maxValue) toSwap = pos * 2 + 1

      swap(this.heap, pos, toSwap)
      pos = toSwap
    }
  }

  swim (pos) {
    let parent, value, toSwap
    while (true) {
      if (pos === 1) return

      value = this.heap[pos]
      parent = this.heap[parseInt(pos / 2)]

      if (value < parent) return

      toSwap = parseInt(pos / 2)
      swap(this.heap, pos, toSwap)
      pos = toSwap
    }
  }

  get max () {
    return this.heap[1]
  }

  get size () {
    return this.heap.length - 1
  }

  _isLeaf (pos) {
    return typeof this.heap[pos * 2] === undefined
  }
}

module.exports.heapSort = function (arr) {
  const maxHeap = new exports.MaxHeap(arr)
  const res = []

  while (maxHeap.size) {
    res.unshift(maxHeap.popMax())
  }

  return (arr = res)
}

function swap(arr, i, j) {
  if (i === j) return

  [arr[i], arr[j]] = [arr[j], arr[i]]
}
