import { RADIUS, COLOURS } from '../constants';

export type Points = 'p1' | 'p2' | 'p3';

type DrawPoint = {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
}

type DrawBase = {
  context: CanvasRenderingContext2D;
  p1: number[];
  p2: number[];
  p3: number[];
};

type DrawParallelogram = DrawBase & {
  p4: number[];
}

type DrawCircle = {
  context: CanvasRenderingContext2D;
  massCentre: [number, number];
  radius: number;
};

type DrawFigures = DrawBase & {
  area: number;
};

export const drawPoint = ({
  context,
  x,
  y
}: DrawPoint) => {
  context.fillStyle = COLOURS.red;
  context.beginPath();
  context.arc(x, y, RADIUS, 0, Math.PI * 2);
  context.fill();
};

const calcFourthVertex = ({ p1, p2, p3 }: Pick<DrawParallelogram, Points>): number[] => {
  const p4x = (p1[0] + p3[0]) - p2[0];
  const p4y = (p1[1] + p3[1]) - p2[1];

  return [p4x, p4y];
};

const drawParallelogram = ({
  context,
  p1,
  p2,
  p3,
  p4
}: DrawParallelogram) => {
  context.strokeStyle = COLOURS.blue;
  context.beginPath();

  context.moveTo(p1[0], p1[1]);
  context.lineTo(p2[0], p2[1]);
  context.lineTo(p3[0], p3[1]);
  context.lineTo(p4[0], p4[1]);
  context.lineTo(p1[0], p1[1]);

  context.stroke();
};

export const calcMassCentre = ({ p1, p3 }: Pick<DrawParallelogram, 'p1' | 'p3'>): [number, number] => [
  // a point of diagonals intersection
  (p1[0] + p3[0]) / 2,
  (p1[1] + p3[1]) / 2
];

const drawCircle = ({ context, massCentre, radius }: DrawCircle) => {
  context.strokeStyle = COLOURS.yellow;
  context.beginPath();
  context.arc(...massCentre, radius, 0, Math.PI * 2);
  context.stroke();
};

/**
 * @see https://en.wikipedia.org/wiki/Cross_product
 * Area of parallelogram = |a-> * b->| = |p2p1-> * p2p3->| where p2 is a common vertex
 */
export const calcArea = ({ p1, p2, p3 }: Pick<DrawParallelogram, Points>) => {
  const area = ((p1[0] - p2[0]) * (p3[1] - p2[1])) - ((p1[1] - p2[1]) * (p3[0] - p2[0]));

  return Math.abs(area);
};

export const drawFigures = ({ context, p1, p2, p3, area }: DrawFigures) => {
  const p4 = calcFourthVertex({ p1, p2, p3 });
  drawParallelogram({ context, p1, p2, p3, p4 });

  const massCentre = calcMassCentre({ p1, p3 });
  const radius = Math.sqrt(area / Math.PI);

  drawCircle({ context, massCentre, radius });
};
