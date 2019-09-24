// https://adventofcode.com/2018/day/3

import * as R from 'ramda';
import input from './inputs/3.input';

const claimToShape = str => {
    const pattern = /^\#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;
    const match = R.map(Number.parseInt, pattern.exec(str));
    return {
        id: match[1],
        left: match[2],
        top: match[3],
        width: match[4],
        height: match[5],
    };
};

const gte = R.flip(R.gte);
const range = (start, count) => R.range(start, start + count);
const points = shape =>
    R.xprod(
        range(shape.left, shape.width), //
        range(shape.top, shape.height)
    );

const overlap = claims =>
    R.pipe(
        R.map(claimToShape),
        R.chain(shape => points(shape)),
        R.countBy(R.identity),
        R.filter(gte(2)),
        R.values,
        R.length
    )(claims);

describe('Day 3', () => {
    test('example: overlap', () => {
        const input = [
            '#1 @ 1,3: 4x4', //
            '#2 @ 3,1: 4x4',
            '#3 @ 5,5: 2x2',
        ];
        expect(overlap(input)).toEqual(4);
    });

    test('Part 1: overlap', () => {
        const result = overlap(input);
        // console.log(result);
        expect(result).toEqual(118858);
    });
});
