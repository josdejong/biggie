
export class Biggie {
  readonly coefficient: bigint
  readonly exponent: bigint

  constructor(coefficient: bigint, exponent: bigint = ZERO) {
    this.coefficient = coefficient,
    this.exponent = exponent
  }

  toString() : string {
    if (this.exponent >= 0) {
      return String(this.coefficient * 10n ** this.exponent)
    } else {
      const digits = String(this.coefficient)  
      const point = -Number(this.exponent)
      
      const digitsWithZeros = (digits.length <= point) 
        ? ('0'.repeat(point - digits.length + 1) + digits) // add prepending zeros
        : digits 

      const index = digitsWithZeros.length - point
      return digitsWithZeros.slice(0, index) + '.' + digitsWithZeros.slice(index)
    }    
  }

  toNumber() : number {
    return Number(this.toString())
  }
}

export function biggie(value: number | string | bigint): Biggie {
  if (typeof value === 'bigint') {
    return new Biggie(value)
  }

  if (typeof value === 'number') {
    return biggie(String(value))
  }

  const [dotCoefficient, signExponent] = value.split('e')
  const index = dotCoefficient.indexOf('.')
  const coefficient = dotCoefficient.replace('.', '')
  const relExponent = signExponent 
    ? Number(signExponent.startsWith('+') ? signExponent.slice(1) : signExponent)
    : 0
  const exponent = index !== -1 
    ? (relExponent - (dotCoefficient.length - index - 1))
    : relExponent

  return new Biggie(
    BigInt(coefficient),
    BigInt(exponent)
  )
}

export function add(a: Biggie, b: Biggie) : Biggie {
  if (a.exponent === b.exponent) {
    return new Biggie(
      a.coefficient + b.coefficient,
      a.exponent
    )
  } else if (a.exponent < b.exponent) {
    return new Biggie(
      a.coefficient + normalizeCoefficient(b, a.exponent),
      a.exponent
    )
  } else { // a.exponent > b.exponent
    return new Biggie(
      normalizeCoefficient(a, b.exponent) + b.coefficient,
      b.exponent
    )
  }
}

export function subtract(a: Biggie, b: Biggie) : Biggie {
  if (a.exponent === b.exponent) {
    return new Biggie(
      a.coefficient - b.coefficient,
      a.exponent
    )
  } else if (a.exponent < b.exponent) {
    return new Biggie(
      a.coefficient - normalizeCoefficient(b, a.exponent),
      a.exponent
    )
  } else { // a.exponent > b.exponent
    return new Biggie(
      normalizeCoefficient(a, b.exponent) - b.coefficient,
      b.exponent
    )
  }
}

export function multiply(a: Biggie, b: Biggie) : Biggie {
  return new Biggie(
    a.coefficient * b.coefficient,
    a.exponent + b.exponent
  )
}

export function divide(a: Biggie, b: Biggie) : Biggie {
  // TODO: normalize is relatively slow
  return normalize(new Biggie(
    a.coefficient * (10n ** PRECISION) / b.coefficient,
    a.exponent - b.exponent - PRECISION
  ))
}

// TODO: test equals
export function equals(a: Biggie, b: Biggie) : boolean {
  if (a.exponent === b.exponent) {
    return a.coefficient === b.coefficient
  } else if (a.exponent < b.exponent) {
    return a.coefficient === normalizeCoefficient(b, a.exponent)
  } else { // a.exponent > b.exponent
    return normalizeCoefficient(a, b.exponent) === b.coefficient
  }
}

function normalizeCoefficient(value: Biggie, exponent: bigint) : bigint {
  const diff = value.exponent - exponent

  return value.coefficient * 10n ** diff
}

function normalize(value: Biggie) : Biggie {
  // TODO: calculating the number  of trailing zeros via string is probably not the fastest solution
  const coefficient = String(value.coefficient)
  const match = coefficient.match(/0*$/)
  const trailingZeros = BigInt(match ? match[0].length : 0)

  if (trailingZeros === ZERO || value.coefficient === ZERO) {
    return value
  }

  return new Biggie(
    value.coefficient / 10n ** trailingZeros,
    value.exponent + trailingZeros
  )
}

// TODO: make the precision customizable
const PRECISION = 64n

const ZERO = 0n

// TODO: implement smaller
// TODO: implement larger
// TODO: implement compare
// TODO: implement negate
// TODO: implement abs

/**
    TODO: implement:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
    
    Math.E
    Math.LN10
    Math.LN2
    Math.LOG10E
    Math.LOG2E
    Math.PI
    Math.SQRT1_2
    Math.SQRT2

    Math.abs()
    Math.cbrt()
    Math.ceil()
    Math.exp()
    Math.expm1()
    Math.floor()
    Math.fround()
    Math.hypot()
    Math.log()
    Math.log10()
    Math.log1p()
    Math.log2()
    Math.max()
    Math.min()
    Math.pow()
    Math.random()
    Math.round()
    Math.sign()
    Math.sin()
    Math.sqrt()
    Math.trunc()
    
    Math.cos()
    Math.tan()
    Math.acos()
    Math.asin()
    Math.atan()
    Math.atan2()

    Math.imul()
    Math.clz32()
    Math.cosh()
    Math.sinh()
    Math.tanh()
    Math.acosh()
    Math.asinh()
    Math.atanh()
 */

