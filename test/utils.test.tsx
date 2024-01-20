import {timeToString, splitTime} from '../src/utils'

test('Test timeToString #1', () => {
    expect(timeToString(10000)).toBe("0:00:10.00")
})

test('Test timeToString #2', () => {
    expect(timeToString(0)).toBe("0:00:00.00")
})

test('Test timeToString #3', () => {
    expect(timeToString(52465298)).toBe("14:34:25.29")
})

test('Test splitTime #1', () => {
    expect(splitTime(10000)).toEqual(["0","00","10","00"])
})

test('Test splitTime #2', () => {
    expect(splitTime(0)).toEqual(["0","00","00","00"])
})

test('Test splitTime #3', () => {
    expect(splitTime(52465298)).toEqual(["14","34","25","29"])
})
