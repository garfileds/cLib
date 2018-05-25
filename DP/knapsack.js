function pushState(state, stateMap) {
  let oldState = stateMap.get(state.content)
  if (oldState) {
    if (oldState.val < state.val) stateMap.set(state.content, state)
    else if (oldState.val === state.val) {
      oldState.decisions = oldState.decisions.concat(state.decisions)
    }
  } else {
    stateMap.set(state.content, state)
  }
}

/**
 * 做出决策，实现状态转移，并合并相同状态
 */
function decide(index, weights, values, states, stateMap) {
  let state
  // 做出决策0或1（选或不选）后分别达到的状态
  let state0, state1
  for (state of states) {
    state0 = {
      content: state.content,
      decisions: [state.decisions + '0'],
      val: state.val
    }
    pushState(state0, stateMap)

    if (weights[index] <= state.content) {
      state1 = {
        content: state.content - weights[index],
        decisions: [state.decisions + '1'],
        val: state.val + values[index]
      }
      pushState(state1, stateMap)
    }
  }

  // 新有效状态集替换老状态集
  states.length = 0
  for (let state of stateMap.values()) {
    states.push(state)
  }
  stateMap.clear()
}

/**
 * 将01背包问题转为BFS + 状态合并的问题
 * 节点是状态，边是状态转移
 */
module.exports.knapsack = function knapsack(weights, values, w) {
  // 初始化状态
  const states = []
  const stateMap = new Map()

  states.push({
    // 真正的状态字段：背包剩余的容量
    content: w,
    // 可能存在不同的决策达到相同的状态和相同的最大价值
    decisions: [''],
    val: 0
  })

  // 逐层决策（状态转移）得到每一层的有效状态集
  for (let i = 0, l = weights.length; i < l; i++) {
    decide(i, weights, values, states, stateMap)
  }

  // 遍历最后一层的状态集，找出最大价值的状态
  let max = { val: 0 }
  for (let state of states) {
    if (state.val > max.val) {
      max = state
    }
  }

  return max
}
