// https://adventofcode.com/2018/day/2

import * as R from 'ramda';
import * as RA from 'ramda-adjunct';
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

const toLetters = R.splitEvery(1);

const diff = (a, b) =>
    R.pipe(
        R.map(toLetters),
        R.apply(R.zip),
        R.filter(RA.allEqual),
        R.map(R.head),
        R.join('')
    )([a, b]);

const findPair = ids => {
    // for each element
    // compare with each subsequent element (tail)
    // compute the delta
    // if the delta is one character: return as the result
    for (let i = 0; i < ids.length; i++) {
        for (let j = i + 1; j < ids.length; j++) {
            const d = diff(ids[i], ids[j]);
            if (d.length === ids[i].length - 1) return d;
        }
    }
};

describe('Day 2', () => {
    test('example: checksum', () => {
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

    test('example: find pair', () => {
        const input = [
            'abcde',
            'fghij', // 1
            'klmno',
            'pqrst',
            'fguij', // 2
            'axcye',
            'wvxyz',
        ];

        expect(findPair(input)).toEqual('fgij');
    });

    test('Part 1: calculate checksum', () => {
        const result = checksum(input);
        // console.log(result);
        expect(result).toEqual(6422);
    });

    test('Part 2: find pair', () => {
        const result = findPair(input);
        // console.log(result);
        expect(result).toEqual('qcslyvphgkrmdawljuefotxbh');
    });
});
