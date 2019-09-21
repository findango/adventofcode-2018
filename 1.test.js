// https://adventofcode.com/2018/day/1

import * as R from 'ramda';
import raw from './inputs/1.input';

const calculate = list => R.sum(R.map(Number.parseInt, list));

const findRepeat = list => {
    const changes = R.map(Number.parseInt, list);
    const alreadySeen = {};
    let frequency = 0;
    let i = 0;
    while (!alreadySeen[frequency]) {
        alreadySeen[frequency] = true;
        frequency += changes[i % changes.length];
        i++;
    }
    return frequency;
};

describe('Day 1', () => {
    test('example: calculate', () => {
        expect(calculate(['+1', '+1', '+1'])).toEqual(3);
        expect(calculate(['+1', '+1', '-2'])).toEqual(0);
        expect(calculate(['-1', '-2', '-3'])).toEqual(-6);
    });

    test('example: repeat', () => {
        expect(findRepeat(['+1', '-1'])).toEqual(0);
        expect(findRepeat(['+3', '+3', '+4', '-2', '-4'])).toEqual(10);
        expect(findRepeat(['-6', '+3', '+8', '+5', '-6'])).toEqual(5);
        expect(findRepeat(['+7', '+7', '-2', '-7', '-4'])).toEqual(14);
    });

    test('Part 1: calculate frequency', () => {
        const input = raw.split(/\n/);
        const result = calculate(input);
        // console.log(result);
        expect(result).toEqual(427);
    });

    test('Part 2: find repeat', () => {
        const input = raw.split(/\n/);
        const result = findRepeat(input);
        // console.log(result);
        expect(result).toEqual(341);
    });
});
