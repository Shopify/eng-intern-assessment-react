import { timeToString } from '../src/StopWatch'
import StopWatch from '../src/StopWatch'

describe('Testing time formatting', () => {
    it('expect time to be at 1 hour 1 min 1 second', () => {
        expect(timeToString(366100)).toBe('01:01:01:00');
    });
    
    it('expect time to be 0h 0m 0s', () => {
        expect(timeToString(0)).toBe('00:00:00:00');
    })

    it('expect time to be 2h 0m 0s', () => {
        expect(timeToString(720000)).toBe('02:00:00:00');
    })
})



