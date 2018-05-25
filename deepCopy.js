const visitedMap = new Map()

function isObject (obj) {
  return Object.prototype.toString.call(obj).toLocaleLowerCase() === '[object object]'
}

function resetStatus () {
  visitedMap.clear()
}

function _deepCopy (target) {
  let res

  const cloned = visitedMap.get(target)
  if (cloned) return cloned

  if (Array.isArray(target)) {
    res = []
    visitedMap.set(target, res)

    for (let el of target) {
      res.push(_deepCopy(el))
    }
  } else if (isObject(target)) {
    res = {}
    visitedMap.set(target, res)

    Object.keys(target).forEach(key => {
      res[key] = _deepCopy(target[key])
    })
  } else {
    res = target
  }

  return res
}

exports.deepCopy = function deepCopy (target) {
  resetStatus()
  const res = _deepCopy(target)
  resetStatus()

  return res
}