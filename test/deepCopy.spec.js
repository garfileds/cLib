const deepCopy = require('../deepCopy').deepCopy

const obj = {
  d: 'd'
}

const objB = {
  c: 'c'
}

obj.b = objB
objB.a = obj

const res = deepCopy(obj)

objB.a.d = 'change'
console.assert(res.b.a.d === 'd', 'circular reference not resolved')