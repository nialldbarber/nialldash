import { assertEquals } from 'https://deno.land/std@0.145.0/testing/asserts.ts'

/**
 * compact()
 *
 * @param array Array<any>
 *
 * Creates an array with all falsey
 * values removed. The values false,
 * null, 0, "", undefined, and NaN are falsey.
 *
 * E.G.
 * compact([1, 2, 3, 4]) => [1, 2, 3, 4]
 * compact([0, 1, false, 2, '', 3]) => [1, 2, 3]
 */
const compact = (array: Array<any>) => array.filter((item) => !!item)

Deno.test('compact() removes falsey values', () => {
  assertEquals(compact([1, 2, 3, 4]), [1, 2, 3, 4])
  assertEquals(compact([0, 1, false, 2, '', 3]), [1, 2, 3])
  assertEquals(compact([]), [])
  assertEquals(compact([null, undefined, '', 0]), [])
})

/**
 * drop()
 *
 * @param array Array<any>
 * @param size number
 *
 * Creates a slice of array with n
 * elements dropped from the beginning.
 *
 * E.G.
 * drop([1, 2, 3]) => [2, 3]
 * drop([1, 2, 3], 2) => [3]
 */
const drop = (array: Array<any>, size = 1) => array.splice(size)

Deno.test('drop() removes x amount of values', () => {
  assertEquals(drop([1, 2, 3]), [2, 3])
  assertEquals(drop([1, 2, 3], 2), [3])
  assertEquals(drop([1, 2, 3], 3), [])
})

/**
 * uniq()
 *
 * @param array Array<any>
 *
 * Creates a duplicate-free version of an array,
 * using SameValueZero for equality comparisons,
 * in which only the first occurrence of each element
 * is kept. The order of result values is determined
 * by the order they occur in the array.
 *
 * E.G.
 * uniq([2, 1, 2]) => [2, 1]
 * uniq([1, 2, 3, 3]) => [1, 2, 3]
 */
const uniq = (array: Array<any>) => Array.from(new Set(array))

Deno.test('uniq() removes any duplicate values', () => {
  assertEquals(uniq([2, 1, 2]), [2, 1])
  assertEquals(uniq(['hello', 'hello', 'world']), ['hello', 'world'])
  assertEquals(uniq([false, false, true, 1, 1]), [false, true, 1])
})

/**
 * without()
 *
 * @param array Array<any>
 * @param args Array<any>
 *
 * Creates an array excluding all given values
 * using SameValueZero for equality comparisons.
 *
 * E.G.
 * without([2, 1, 2, 3], 1, 2) => [3]
 * without([2, 1, 2, 3, 1, 2, 3], 1, 2, 3) => []
 * without(['hello', 'pizza', 'world'], 'pizza') => ['hello', 'world']
 */
const without = (array: Array<any>, ...args: Array<any>) =>
  array.filter((item) => !args.includes(item))

Deno.test('without() removes any duplicate values', () => {
  assertEquals(without([1, 2, 3]), [1, 2, 3])
  assertEquals(without([2, 1, 2, 3], 1, 2), [3])
  assertEquals(without([2, 1, 2, 3, 1, 2, 3], 1, 2, 3), [])
  assertEquals(without(['hello', 'pizza', 'world'], 'pizza'), [
    'hello',
    'world',
  ])
})

/**
 * filter()
 *
 * @param array Array<any>
 * @param callbackFn () => any
 *
 * Iterates over elements of collection, returning
 * an array of all elements predicate returns truthy
 * for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * E.G.
 * filter([1, 2, 3], (x) => x > 2) => [3]
 */
const filter = (
  array: Array<any>,
  callbackFn: (...args: Array<any>) => any
) => {
  let newArray: Array<any> = []
  for (const item of array) {
    if (callbackFn(item)) {
      newArray = [...newArray, item]
    }
  }
  return newArray
}

Deno.test('filter() removes values specified by the callback function', () => {
  assertEquals(
    filter([1, 2, 3], (x) => x > 2),
    [3]
  )
  assertEquals(
    filter(
      [
        { user: 'barney', age: 36, active: true },
        { user: 'fred', age: 40, active: false },
      ],
      (x) => x.active === true
    ),
    [{ user: 'barney', age: 36, active: true }]
  )
  assertEquals(filter([1, 0, null, false, 2, 3], Boolean), [1, 2, 3])
})

/**
 * map()
 *
 * @param array Array<any>
 * @param callbackFn () => any
 *
 * Creates an array of values by running each
 * element in collection thru iteratee. The
 * iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * E.G.
 * map([1, 2, 3], (x) => x * 2) => [2, 4, 6]
 * map(['hello', 'world'], (x) => x.toUpperCase()) => ['HELLO', 'WORLD']
 */
const map = (array: Array<any>, callbackFn: (...args: Array<any>) => any) => {
  const newArray: Array<any> = []
  for (const item of array) {
    newArray.push(callbackFn(item))
  }
  return newArray
}

Deno.test(
  'map() should transform the values based on the callback function',
  () => {
    assertEquals(
      map([1, 2, 3], (x) => x * 2),
      [2, 4, 6]
    )
    assertEquals(
      map(['hello', 'world'], (x) => x.toUpperCase()),
      ['HELLO', 'WORLD']
    )
    assertEquals(map([1, 2, 3, 4, null], Boolean), [
      true,
      true,
      true,
      true,
      false,
    ])
  }
)

/**
 * find()
 *
 * @param array Array<any>
 * @param callbackFn () => any
 *
 * Iterates over elements of collection,
 * returning the first element predicate
 * returns truthy for. The predicate is
 * invoked with three arguments: (value,
 * index|key, collection).
 *
 * E.G.
 * find([1, 2, 3], (x) => x > 1) => 2
 * find([5, 12, 8, 130, 44], (x) => x > 10) => 12
 */
const find = (array: Array<any>, callbackFn: (...args: Array<any>) => any) => {
  for (const item of array) {
    if (callbackFn(item)) {
      return item
    }
  }
}

Deno.test(
  'find() return the first value that satisfies the callback function',
  () => {
    assertEquals(
      find([1, 2, 3], (x) => x > 1),
      2
    )
    assertEquals(find([0, null, undefined, '', 'hello'], Boolean), 'hello')
    assertEquals(
      find(
        [
          { name: 'jane', age: 50 },
          { name: 'john', age: 34 },
          { name: 'rachel', age: 21 },
          { name: 'dom', age: 62 },
        ],
        (x) => x.age > 60
      ),
      { name: 'dom', age: 62 }
    )
  }
)

/**
 * findLast()
 *
 * @param array Array<any>
 * @param callbackFn () => any
 *
 * This method is like _.find except
 * that it iterates over elements of
 * collection from right to left.
 *
 * E.G.
 * findLast([1, 2, 3, 4], (x) => x % 2 === 1) => 3
 * findLast([5, 12, 8, 130, 44, 1], (x) => x > 10) => 44
 */
const findLast = (
  array: Array<any>,
  callbackFn: (...args: Array<any>) => any
) => {
  const reversedArray = array.reverse()
  for (const item of reversedArray) {
    if (callbackFn(item)) {
      return item
    }
  }
}

Deno.test(
  'findLast() finds the last value of the given callback function',
  () => {
    assertEquals(
      findLast([1, 2, 3, 4], (x) => x % 2 === 1),
      3
    )
    assertEquals(
      findLast([5, 12, 8, 130, 44, 1], (x) => x > 10),
      44
    )
  }
)

/**
 * assign()
 *
 * @param target Record<any, any>
 * @param source Record<any, any>
 *
 * The Object.assign() method copies all
 * enumerable own properties from one or
 * more source objects to a target object.
 * It returns the modified target object.
 *
 * E.G.
 * findLast([1, 2, 3, 4], (x) => x % 2 === 1) => 3
 * findLast([5, 12, 8, 130, 44, 1], (x) => x > 10) => 44
 */
const assign = (target: Record<any, any>, source: Record<any, any>) => {
  let assignedObj = {}
  for (const [key, value] of Object.entries(target)) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      assignedObj = {
        ...assignedObj,
        [key]: source[key],
      }
    } else {
      assignedObj = {
        ...assignedObj,
        [key]: value,
      }
    }
  }
  return assignedObj
}

Deno.test('assign() will do stuff', () => {
  assertEquals(assign({ a: 1 }, { a: 1 }), { a: 1 })
  assertEquals(assign({ a: 1, b: 2 }, { a: 3, b: 4 }), { a: 3, b: 4 })
  assertEquals(assign({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } }), {
    a: 1,
    b: { c: 3 },
  })
})

/**
 * deepObjectsEqualCheck()
 *
 * @param obj1 Record<string, any>
 * @param obj2 Record<string, any>
 *
 * This deeply compares two objects
 * and checks their equality.
 *
 * E.G.
 * deepObjectsEqualCheck({ a: 1 }, { a: 1 }) => true
 * deepObjectsEqualCheck({ a: 1 }, { a: 2 }) => false
 * deepObjectsEqualCheck({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }) => true
 */
const deepObjectsEqualCheck = (
  obj1: Record<string, any>,
  obj2: Record<string, any>
) => stringifyObject(obj1) === stringifyObject(obj2)

const stringifyObject = (obj: Record<string, any>) => JSON.stringify(obj)

Deno.test(
  'deepObjectsEqualCheck() returns true if two objects are the same',
  () => {
    assertEquals(deepObjectsEqualCheck({ a: 1 }, { a: 1 }), true)
    assertEquals(deepObjectsEqualCheck({ a: 1 }, { a: 2 }), false)
    assertEquals(
      deepObjectsEqualCheck({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }),
      true
    )
  }
)

/**
 * findKey()
 *
 * @param object Record<string, any>
 * @param callbackFn: (...args: Array<any>) => boolean
 *
 * This method is like _.find except that
 * it returns the key of the first element
 * predicate returns truthy for instead of
 * the element itself.
 *
 * E.G.
 * findKey({ a: 1 }, (x) => x > 0) => 'a'
 * findKey({ name: 'niall' }, (x) => x === 'niall') => 'name'
 */
const findKey = (
  object: Record<string, any>,
  callbackFn: (...args: Array<any>) => boolean,
  reverse?: boolean
) => {
  const obj = reverse
    ? Object.entries(object)
    : Object.entries(object).reverse()
  for (const [key, value] of obj) {
    if (callbackFn(value, key, object)) {
      return key
    }
  }
}

Deno.test(
  'findKey() finds the first key that satisfies the callback function',
  () => {
    assertEquals(
      findKey({ a: 1 }, (x) => x > 0),
      'a'
    )
    assertEquals(
      findKey({ name: 'niall' }, (x) => x === 'niall'),
      'name'
    )
  }
)

/**
 * findLastKey()
 *
 * @param object Record<string, any>
 * @param callbackFn: (...args: Array<any>) => boolean
 *
 * This method is like _.findKey except that
 * it iterates over elements of a collection
 * in the opposite order.
 *
 * E.G.
 * findLastKey({ a: 10, b: 20, c: 30 }, (x) => x > 10) => 'c'
 * findLastKey(
 *  { name1: 'niall', name2: 'niall', name3: 'niall' },
 *  (x) => x === 'niall'
 * ) => 'name3'
 */
const findLastKey = (
  object: Record<string, any>,
  callbackFn: (...args: Array<any>) => boolean
) => {
  for (const [key, value] of Object.entries(object).reverse()) {
    if (callbackFn(value, key, object)) {
      return key
    }
  }
}

Deno.test(
  'findLastKey() finds last key that satisfies the callback function',
  () => {
    assertEquals(
      findLastKey({ a: 10, b: 20, c: 30 }, (x) => x > 10),
      'c'
    )
    assertEquals(
      findLastKey(
        { name1: 'niall', name2: 'niall', name3: 'niall' },
        (x) => x === 'niall'
      ),
      'name3'
    )
    assertEquals(findLastKey({ a: false, b: false, c: true }, Boolean), 'c')
  }
)

/**
 * times()
 *
 * @param amount: number
 * @param iteratee: any
 *
 * Invokes the iteratee n times,
 * returning an array of the results
 * of each invocation. The iteratee
 * is invoked with one argument; (index).
 *
 * E.G.
 * times(3, 0) => [0, 0, 0]
 * times(5, 'pizza') => ['pizza', 'pizza', 'pizza', 'pizza', 'pizza']
 */
const times = (amount: number, iteratee: any) => Array(amount).fill(iteratee)

Deno.test('times() repeats the iteratee by the amount', () => {
  assertEquals(times(3, 0), [0, 0, 0])
  assertEquals(times(5, 'pizza'), ['pizza', 'pizza', 'pizza', 'pizza', 'pizza'])
  assertEquals(times(3, 'hello'), ['hello', 'hello', 'hello'])
})

/**
 * difference()
 *
 * @param array: Array<any>
 * @param arrayToCompare: Array<any>
 *
 * Creates an array of array values not
 * included in the other given arrays using
 * SameValueZero for equality comparisons.
 * The order and references of result values
 * are determined by the first array.
 *
 * E.G.
 * difference([2, 1], [2, 3]) => [1]
 * difference(['hello', 'pizza', 'world'], ['hello', 'world']) => ['pizza']
 */
const difference = (array: Array<any>, arrayToCompare: Array<any>) =>
  array.filter((item) => !arrayToCompare.includes(item))

Deno.test(
  'difference() should return the differences in the first array, compared to the second one',
  () => {
    assertEquals(difference([2, 1], [2, 3]), [1])
    assertEquals(difference(['hello', 'pizza', 'world'], ['hello', 'world']), [
      'pizza',
    ])
    assertEquals(
      difference(
        [true, false, null, undefined],
        [true, false, null, undefined]
      ),
      []
    )
    assertEquals(difference([], []), [])
    assertEquals(difference(Array.from('hello'), Array.from('world')), [
      'h',
      'e',
    ])
  }
)
