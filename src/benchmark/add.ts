import { strictEqual } from 'assert'
import * as benny from 'benny'
import { add, biggie } from '../biggie'
import Decimal from 'decimal.js'

const largeBiggie = biggie('1e60')
const smallBiggie = biggie('1')

const BigDecimal = Decimal.config({ precision: 64 })

const largeDecimal = new BigDecimal('1e60')
const smallDecimal = new BigDecimal('1')

console.log(add(largeBiggie, smallBiggie).toString())
console.log(BigDecimal.add(largeDecimal, smallDecimal).toString())

strictEqual(add(largeBiggie, smallBiggie).toString(), 
  '1000000000000000000000000000000000000000000000000000000000001')
strictEqual(BigDecimal.add(largeDecimal, smallDecimal).toString(), 
  '1.000000000000000000000000000000000000000000000000000000000001e+60')

benny.suite(
  'add',
 
  benny.add('biggie', () => {
    add(largeBiggie, smallBiggie)
  }),
 
  benny.add('decimal.js', () => {
    BigDecimal.add(largeDecimal, smallDecimal)
  }),
 
  benny.cycle(),
  benny.complete()
)
