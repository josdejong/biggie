import { strictEqual } from 'assert'
import * as benny from 'benny'
import { divide, biggie } from '../biggie'
import Decimal from 'decimal.js'

const a = '1'
const b = '3'

const largeBiggie = biggie(a)
const smallBiggie = biggie(b)

const BigDecimal = Decimal.config({ precision: 64 })

const largeDecimal = new BigDecimal(a)
const smallDecimal = new BigDecimal(b)

console.log(divide(largeBiggie, smallBiggie).toString())
console.log(BigDecimal.div(largeDecimal, smallDecimal).toString())

strictEqual(divide(largeBiggie, smallBiggie).toString(), 
  '0.3333333333333333333333333333333333333333333333333333333333333333')
strictEqual(BigDecimal.div(largeDecimal, smallDecimal).toString(), 
  '0.3333333333333333333333333333333333333333333333333333333333333333')

benny.suite(
  'divide',
 
  benny.add('biggie', () => {
    divide(largeBiggie, smallBiggie)
  }),
 
  benny.add('decimal.js', () => {
    BigDecimal.div(largeDecimal, smallDecimal)
  }),
 
  benny.cycle(),
  benny.complete()
)
