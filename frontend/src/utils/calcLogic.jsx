// src/utils/calcLogic.js
export function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }
  
  export function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  
  export function nCr(n, r) {
    r = Math.min(r, n - r);
    let num = 1, den = 1;
    for (let i = 0; i < r; i++) {
      num *= (n - i);
      den *= (i + 1);
    }
    return num / den;
  }
  