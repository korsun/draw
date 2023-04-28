import { calcArea, calcMassCentre } from './utils/draw';

describe('maths', () => {
  test('calculates mass centre of a parallelogram', () => {
    // diagonals intersection of a square === 1/2 * its side
    expect(calcMassCentre({
      p1: [0, 0],
      p3: [5, 5]
    })).toStrictEqual([2.5, 2.5]);

    // diagonals intersection of a parallelogram, which is same width as previous square but twice in height: y coord === 2 * width
    expect(calcMassCentre({
      p1: [0, 0],
      p3: [5, 10]
    })).toStrictEqual([2.5, 5]);
  });

  test('given 3 vertices, calculates area of a parallelogram', () => {
    // square area
    expect(calcArea({
      p1: [0, 0],
      p2: [0, 5],
      p3: [5, 5]
    })).toBe(25);

    expect(calcArea({
      p1: [0, 0],
      p2: [0, -5],
      p3: [5, -5]
    })).toBe(25);

    // 45deg parallelogram area with equal sides == square area
    expect(calcArea({
      p1: [0, 0],
      p2: [0, 5],
      p3: [5, 10]
    })).toBe(25);

    // 45deg parallelogram area  where side A == 1/2 * side B == 2 * square area
    expect(calcArea({
      p1: [0, 0],
      p2: [0, 10],
      p3: [5, 5]
    })).toBe(50);
  });
});
