import { describe, expect, it } from 'vitest'

import { judge } from '@/utils'

describe('judge', () => {
  it('should return the correct interval when value is within the range', () => {
    const value = 5
    const interval: Array<[number, number]> = [
      [2, 6],
      [1, 3],
      [4, 7],
    ]

    const result = judge(value, interval)

    expect(result).toEqual([2, 6])
  })

  it('should return undefined when value is not within any range', () => {
    const value = 10
    const interval: Array<[number, number]> = [
      [2, 6],
      [1, 3],
      [4, 7],
    ]

    const result = judge(value, interval)

    expect(result).toBeUndefined()
  })

  it('should return the correct interval when value is at the upper limit', () => {
    const value = 7
    const interval: Array<[number, number]> = [
      [2, 6],
      [1, 3],
      [4, 7],
    ]

    const result = judge(value, interval)

    expect(result).toEqual([4, 7])
  })

  it('should return the correct interval when value is at the lower limit', () => {
    const value = 2
    const interval: Array<[number, number]> = [
      [2, 6],
      [1, 3],
      [4, 7],
    ]

    const result = judge(value, interval)

    expect(result).toEqual([1, 3])
  })

  it('should return undefined when interval is empty', () => {
    const value = 5
    const interval: Array<[number, number]> = []

    const result = judge(value, interval)

    expect(result).toBeUndefined()
  })
})
