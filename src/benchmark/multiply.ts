import { strictEqual } from 'assert'
import * as benny from 'benny'
import { multiply, biggie } from '../biggie'
import Decimal from 'decimal.js'

const a = '2.25'
const b = '2.34'

const largeBiggie = biggie(a)
const smallBiggie = biggie(b)

const BigDecimal = Decimal.config({ precision: 64 })

const largeDecimal = new BigDecimal(a)
const smallDecimal = new BigDecimal(b)

console.log(multiply(largeBiggie, smallBiggie).toString())
console.log(BigDecimal.mul(largeDecimal, smallDecimal).toString())

strictEqual(multiply(largeBiggie, smallBiggie).toString(), 
  '5.2650')
strictEqual(BigDecimal.mul(largeDecimal, smallDecimal).toString(), 
  '5.265')

benny.suite(
  'multiply',
 
  benny.add('biggie', () => {
    multiply(largeBiggie, smallBiggie)
  }),
 
  benny.add('decimal.js', () => {
    BigDecimal.mul(largeDecimal, smallDecimal)
  }),
 
  benny.cycle(),
  benny.complete()
)
