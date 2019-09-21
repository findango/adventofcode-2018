// https://adventofcode.com/2018/day/2

import * as R from 'ramda';
import input from './inputs/2.input';

const countByValue = R.countBy(R.identity);

const countPerLetter = str =>
    R.pipe(
        R.splitEvery(1),
        countByValue
    )(str);

const pickValues = wanted => obj =>
    R.pipe(
        R.values,
        R.filter(R.contains(R.__, wanted)),
        R.uniq
    )(obj);

const checksum = ids =>
    R.pipe(
        R.map(countPerLetter),
        R.chain(pickValues([2, 3])),
        countByValue,
        counts => counts[2] * counts[3]
    )(ids);

describe('Day 2', () => {
    test('example', () => {
        const input = [
            'abcdef', // 0 0
            'bababc', // 1 1
            'abbcde', // 1 0
            'abcccd', // 0 1
            'aabcdd', // 1 0
            'abcdee', // 1 0
            'ababab', // 0 1
        ]; // -------------------
        //               4x3 = 12
        expect(checksum(input)).toEqual(12);
    });

    test('Part 1 - calculate checksum', () => {
        const result = checksum(input);
        // console.log(result);
        expect(result).toEqual(6422);
    });
});
