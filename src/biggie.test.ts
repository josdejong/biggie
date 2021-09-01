import { add, biggie, Biggie, subtract, multiply, divide } from './biggie'

test('create a Biggie', () => {
  const value = new Biggie(2n, 3n)
  expect(value).toBeInstanceOf(Biggie)
  expect(value.coefficient).toStrictEqual(2n)
  expect(value.exponent).toStrictEqual(3n)
  expect(new Biggie(2n)).toStrictEqual(new Biggie(2n))
})

test('create a Biggie with default exponent', () => {
  expect(new Biggie(2n)).toStrictEqual(new Biggie(2n))
})

test('create a Biggie from a number', () => {
  expect(biggie(0)).toStrictEqual(new Biggie(0n))
  expect(biggie(2)).toStrictEqual(new Biggie(2n))
  expect(biggie(2000)).toStrictEqual(new Biggie(2000n, 0n))
  expect(biggie(0.002)).toStrictEqual(new Biggie(2n, -3n))

  expect(biggie(1.2345678)).toStrictEqual(new Biggie(12345678n, -7n))
  expect(biggie(12.345678)).toStrictEqual(new Biggie(12345678n, -6n))
  expect(biggie(1234.5678)).toStrictEqual(new Biggie(12345678n, -4n))
  expect(biggie(1234.5678).toString()).toStrictEqual('1234.5678')
  
  expect(biggie(-1.2345678)).toStrictEqual(new Biggie(-12345678n, -7n))
  expect(biggie(-12.345678)).toStrictEqual(new Biggie(-12345678n, -6n))
  expect(biggie(-1234.5678)).toStrictEqual(new Biggie(-12345678n, -4n))

  // TODO: test Infinity input, NaN, etc
})

test('create a Biggie from a string', () => {
  expect(biggie('0')).toStrictEqual(new Biggie(0n))
  expect(biggie('0.002')).toStrictEqual(new Biggie(2n, -3n))
  expect(biggie('1.2e500')).toStrictEqual(new Biggie(12n, 499n))
  expect(biggie('-5.4')).toStrictEqual(new Biggie(-54n, -1n))
  expect(biggie('123456789123456789123456789')).toStrictEqual(new Biggie(123456789123456789123456789n))
  
  // TODO: test invalid input
})

test('stringify a Biggie', () => {
  expect(new Biggie(2n, 3n).toString()).toStrictEqual('2000')
  expect(new Biggie(2n).toString()).toStrictEqual('2')
  
  expect(new Biggie(123n, 2n).toString()).toStrictEqual('12300')
  expect(new Biggie(123n, 1n).toString()).toStrictEqual('1230')
  expect(new Biggie(123n).toString()).toStrictEqual('123')
  expect(new Biggie(123n, -1n).toString()).toStrictEqual('12.3')
  expect(new Biggie(123n, -2n).toString()).toStrictEqual('1.23')
  expect(new Biggie(123n, -3n).toString()).toStrictEqual('0.123')
  expect(new Biggie(123n, -4n).toString()).toStrictEqual('0.0123')

  expect('biggie:' + new Biggie(5n)).toStrictEqual('biggie:5')
})

test('convert a Biggie to a number', () => {
  expect(new Biggie(2n, 3n).toNumber()).toStrictEqual(2000)
  expect(new Biggie(2n).toNumber()).toStrictEqual(2)
  
  expect(new Biggie(123n, 2n).toNumber()).toStrictEqual(12300)
  expect(new Biggie(123n, 1n).toNumber()).toStrictEqual(1230)
  expect(new Biggie(123n).toNumber()).toStrictEqual(123)
  expect(new Biggie(123n, -1n).toNumber()).toStrictEqual(12.3)
  expect(new Biggie(123n, -2n).toNumber()).toStrictEqual(1.23)
  expect(new Biggie(123n, -3n).toNumber()).toStrictEqual(0.123)
  expect(new Biggie(123n, -4n).toNumber()).toStrictEqual(0.0123)
})

test('the infamous round-off error 0.1+0.2 should not occur', () => {
  expect(add(new Biggie(1n, -1n), new Biggie(2n, -1n)))
    .toStrictEqual(new Biggie(3n, -1n))
})

test('add two Biggies', () => {
  expect(add(new Biggie(2n), new Biggie(3n)))
    .toStrictEqual(new Biggie(5n))

  expect(add(new Biggie(2n, 3n), new Biggie(5n, 1n))) // 2000 + 50
    .toStrictEqual(new Biggie(205n, 1n))

  expect(add(new Biggie(5n, 1n), new Biggie(2n, 3n))) // 50 + 2000
    .toStrictEqual(new Biggie(205n, 1n))

  expect(add(new Biggie(5n, -2n), new Biggie(2n, -1n))) // 0.05 + 0.2
    .toStrictEqual(new Biggie(25n, -2n))
    expect(add(new Biggie(1n, 32n), new Biggie(1n)))
      .toStrictEqual(new Biggie(100000000000000000000000000000001n))
})

test('subtract two Biggies', () => {
  expect(subtract(new Biggie(5n), new Biggie(3n))).toStrictEqual(new Biggie(2n))

  expect(subtract(new Biggie(205n, 1n), new Biggie(2n, 3n))) // 2050 - 2000
    .toStrictEqual(new Biggie(5n, 1n))

    expect(subtract(new Biggie(205n, 1n), new Biggie(5n, 1n))) // 2050 - 50
    .toStrictEqual(new Biggie(200n, 1n))

  expect(subtract(new Biggie(25n, -2n), new Biggie(5n, -2n))) // 0.25 - 0.05
    .toStrictEqual(new Biggie(20n, -2n))
})

test('multiply two Biggies', () => {
  expect(multiply(new Biggie(5n), new Biggie(3n))).toStrictEqual(new Biggie(15n))
  expect(multiply(new Biggie(2n, 3n), new Biggie(5n))).toStrictEqual(new Biggie(10n, 3n))
  expect(multiply(new Biggie(4n, 2n), new Biggie(5n, -1n))).toStrictEqual(new Biggie(20n, 1n))

  expect(multiply(new Biggie(25n, -2n), new Biggie(5n, -1n))) // 0.25 * 0.5
    .toStrictEqual(new Biggie(125n, -3n))
})

test('divide two Biggies', () => {
  expect(divide(new Biggie(40n), new Biggie(8n))).toStrictEqual(new Biggie(5n, 0n))
  expect(divide(new Biggie(2n), new Biggie(4n))).toStrictEqual(new Biggie(5n, -1n))
  expect(divide(new Biggie(1n), new Biggie(3n))).toStrictEqual(new Biggie(BigInt('3'.repeat(64)), -64n))
})

// TODO: test with 0 everywhere
