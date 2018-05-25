/**
 * longest common subsequence
 * proof: http://www.columbia.edu/~cs2035/courses/csor4231.F11/lcs.pdf
 */
module.exports = {
  LCS,
  LCS2,
  LIS,
  LeastEditDistance,
  LCSubstr
}

/**
 * 思路：写出状态和状态转移方程，自下而上递推求解
 * 状态定义：序列型
 *
 * @return {number}
 */
function LCS (s1, s2) {
  let l1 = s1.length
  let l2 = s2.length
  let res = new Array(l1 + 1)

  for (let i = 0; i <= l1; i++) {
    res[i] = new Array(l2 + 1)
    res[i][0] = { num: 0, dire: null }
  }
  for (let i = 0; i <= l2; i++) {
    res[0][i] = { num: 0, dire: null }
  }

  for (let i = 1; i <= l1; i++) {
    for (let j = 1; j <= l2; j++) {
      let cur
      if (s1[i - 1] === s2[j - 1]) {
        let diagonal = res[i - 1][j - 1].num
        cur = { 'num': diagonal + 1, 'dire': 'diagonal' }
      } else {
        let left = res[i][j - 1].num
        let up = res[i - 1][j].num

        if(left < up) cur = { 'num': up, 'dire': 'up' }
        else if(left > up) cur = { 'num': left, 'dire': 'left' }
        else cur = { 'num': left, 'dire': 'both' }
      }
      res[i][j] = cur
    }
  }

  return res[l1][l2].num
}

/**
 * 自上而下递归 + memory 求解
 *
 */
function LCS2 (s1, s2) {
  let l1 = s1.length
  let l2 = s2.length
  let res = new Array(l1 + 1)

  for (let i = 0; i <= l1; i++) {
    res[i] = new Array(l2 + 1)
    res[i][0] = 0
  }
  res[0].fill(0)

  return transfer(l1, l2)

  function transfer(l1, l2) {
    let cur = res[l1][l2]
    if (cur >= 0) return cur

    if (s1[l1 - 1] === s2[l2 - 1]) {
      cur = transfer(l1 - 1, l2 - 1) + 1
    } else {
      cur = Math.max(
        transfer(l1, l2 - 1),
        transfer(l1 - 1, l2)
      )
    }
    res[l1][l2] = cur
    return cur
  }
}

/**
 * 变形：LIS(longest incremental subsequence)
 * 思路1：对arr递增排序得到arr2，问题转化为LCS(arr, arr2)
 *
 * 思路2：DP，状态定义：序列型
 * F(i) = Max(F(j) + 1) or 1, arr[j] <= arr[i]
 * F(1) = 1
 *
 * @param {Array} arr
 * @returns {number}
 */
function LIS (arr) {
  let l = arr.length
  if (l === 1) return 1

  let state = new Array(l)
  state[0] = 1

  for (let i = 1; i < l; i++) {
    let cur = 1
    for (let j = 0; j < i; j++) {
      if (arr[j] <= arr[i]) cur = Math.max(cur, state[j] + 1)
    }
    state[i] = cur
  }

  return state[l - 1]
}

/**
 * 变形：最小编辑距离(删除、插入)
 *
 * 思路1：转化为LCS
 *
 * 思路2：状态定义，双序列型
 * 状态： F(i, j) 序列A_i和B_j的最小编辑距离
 * 状态转移：F(i, j) = Min(F(i, j-1) + 1, F(i-1, j) + 1, F(i, j))  if a_i === b_j
 *         F(i, j) = Max(F(i, j-1) + 1, F(i-1, j) + 1, F(i, j) + 2)  if a_i === b_j
 *
 */
function LeastEditDistance () {

}

/**
 * 变形：LCSubstr(longest common substring)
 *
 * 状态定义：双序列型
 * 状态：F(i, j) 序列A_i和B_j中以a_i和b_j结尾的最长公共子串
 * 状态转移：F(i, j) = F(i-1, j-1) + 1  if a_i === b_j
 *         F(i, j) = 0                if a_i !== b_j
 *
 * @return {number}
 */
function LCSubstr(s1, s2) {
  const l1 = s1.length
  const l2 = s2.length
  const res = new Array(l1 + 1)
  for (let i = 0; i <= l1; i++) {
    res[i] = new Array(l2 + 1)
    res[i][0] = 0
  }
  for (let j = 0; j <= l2; j++) {
    res[0][j] = 0
  }

  let max = 0
  for (let i = 1; i <= l1; i++) {
    for (let j = 1; j <= l2; j++) {
      if (s1[i - 1] === s2[j - 1]) res[i][j] = res[i - 1][j - 1] + 1
      else res[i][j] = 0
      max = Math.max(res[i][j], max)
    }
  }
  return max
}

/**
 * 变形：LISubstr(longest incremental substring)
 *
 */
