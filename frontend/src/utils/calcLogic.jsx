// src/utils/calcLogic.js

// Number Theory
export function isPrime(n) {
    n = Math.floor(n);
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }
  
  export function firstPrimeBefore(n) {
    let x = Math.floor(n) - 1;
    while (x >= 2) {
      if (isPrime(x)) return x;
      x--;
    }
    return null;
  }
  
  export function firstPrimeAfter(n) {
    let x = Math.ceil(n) + 1;
    while (true) {
      if (isPrime(x)) return x;
      x++;
    }
  }
  
  export function primesBetween(a, b) {
    const start = Math.min(a, b);
    const end = Math.max(a, b);
    const res = [];
    for (let x = start; x <= end; x++) if (isPrime(x)) res.push(x);
    return res;
  }
  
  export function countPrimesBetween(a, b) {
    return primesBetween(a, b).length;
  }
  
  export function primeFactorization(n) {
    let x = Math.floor(n);
    const factors = [];
    for (let p = 2; p * p <= x; p++) {
      while (x % p === 0) {
        factors.push(p);
        x /= p;
      }
    }
    if (x > 1) factors.push(x);
    return factors;
  }
  
  export function getDivisors(n) {
    const x = Math.floor(n);
    const lower = [];
    const upper = [];
    for (let i = 1; i * i <= x; i++) {
      if (x % i === 0) {
        lower.push(i);
        if (i !== x / i) upper.unshift(x / i);
      }
    }
    return lower.concat(upper);
  }
  
  export function countDivisors(n) {
    return getDivisors(n).length;
  }
  
  export function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  }
  
  export function lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs((a * b) / gcd(a, b));
  }
  
  export function isPerfectSquare(n) {
    const r = Math.sqrt(n);
    return Number.isInteger(r);
  }
  
  export function squareRoot(n) {
    return Math.sqrt(n);
  }
  
  export function eulerPhi(n) {
    let result = n;
    let x = n;
    for (let p = 2; p * p <= x; p++) {
      if (x % p === 0) {
        while (x % p === 0) x /= p;
        result -= result / p;
      }
    }
    if (x > 1) result -= result / x;
    return result;
  }
  
  // Combinatorics
  export function factorial(n) {
    n = Math.floor(n);
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }
  
  export function nCr(n, r) {
    n = Math.floor(n);
    r = Math.floor(r);
    if (r < 0 || r > n) return 0;
    r = Math.min(r, n - r);
    let num = 1;
    let den = 1;
    for (let i = 0; i < r; i++) {
      num *= n - i;
      den *= i + 1;
    }
    return num / den;
  }
  
  export function nPr(n, r) {
    n = Math.floor(n);
    r = Math.floor(r);
    if (r < 0 || r > n) return 0;
    let res = 1;
    for (let i = 0; i < r; i++) {
      res *= n - i;
    }
    return res;
  }
  
  export function catalanNumber(n) {
    return nCr(2 * n, n) / (n + 1);
  }
  
  export function stirlingSecondKind(n, k) {
    n = Math.floor(n);
    k = Math.floor(k);
    const S = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
    S[0][0] = 1;
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= k; j++) {
        S[i][j] = j * S[i - 1][j] + S[i - 1][j - 1];
      }
    }
    return S[n][k];
  }
  
  export function bellNumber(n) {
    n = Math.floor(n);
    const B = [1];
    for (let i = 1; i <= n; i++) {
      let sum = 0;
      for (let k = 0; k < i; k++) {
        sum += nCr(i - 1, k) * B[k];
      }
      B[i] = sum;
    }
    return B[n];
  }
  
  // Binary Operations
  export function binaryToDecimal(binary) {
    return parseInt(binary, 2);
  }
  
  export function decimalToBinary(decimal) {
    return (decimal >>> 0).toString(2);
  }
  
  export function binaryAddition(a, b) {
    const sum = parseInt(a, 2) + parseInt(b, 2);
    return sum.toString(2);
  }
  
  export function binarySubtraction(a, b) {
    const diff = parseInt(a, 2) - parseInt(b, 2);
    return diff < 0 ? '-' + Math.abs(diff).toString(2) : diff.toString(2);
  }
  
  export function binaryMultiplication(a, b) {
    const prod = parseInt(a, 2) * parseInt(b, 2);
    return prod.toString(2);
  }
  
  export function binaryDivision(a, b) {
    const div = Math.floor(parseInt(a, 2) / parseInt(b, 2));
    return div.toString(2);
  }
  