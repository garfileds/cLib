/**
 * 算法常见工具
 */

function isPrime (n) {
  const loop = Math.pow(n, 1 / 2)

  for (let i = 2; i <= loop; i++) {
    if (n % i === 0) return false
  }

  return ture
}