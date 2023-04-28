import React from 'react';

import { drawPoint, drawFigures, calcArea, Points } from './utils/draw';
import { resizeCanvas } from './utils/resizeCanvas';
import { COLOURS } from './constants';

import { Info } from './components/Info/Info';
import { About } from './components/About/About';

import './App.css';

export const App = () => {
  const canvasEl = React.useRef<HTMLCanvasElement>(null);
  const [p1, setP1] = React.useState([]);
  const [p2, setP2] = React.useState([]);
  const [p3, setP3] = React.useState([]);
  const [area, setArea] = React.useState(0);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
  const [draggingPoint, setDraggingPoint] = React.useState<Points | null>(null);
  const [isAboutShown, setIsAboutShown] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasEl.current;
    const ctx = canvas.getContext('2d');
    resizeCanvas(canvas, ctx)();
    canvas.style.backgroundColor = COLOURS.background;
    
    setContext(ctx);
    window.addEventListener('resize', resizeCanvas(canvas, ctx), false);

    return window.removeEventListener('resize', resizeCanvas(canvas, ctx), false);
  }, []);

  React.useEffect(() => {
    if (p3.length) {
      const parallelogramArea = calcArea({ p1, p2, p3 });
      setArea(parallelogramArea);
      drawFigures({ context, p1, p2, p3, area: parallelogramArea });
    }
  }, [p1, p2, p3]);

  const clearCanvas = () => {
    context.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
  };

  const drawPointFromCurrentCoords = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>, setter: React.Dispatch<React.SetStateAction<number[]>>) => {
    setter([event.pageX, event.pageY]);
    drawPoint({ context, x: event.pageX, y: event.pageY });
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!p1.length) {
      drawPointFromCurrentCoords(event, setP1);
      return;
    }

    if (!p2.length) {
      drawPointFromCurrentCoords(event, setP2);
      return;
    }

    if (!p3.length) {
      drawPointFromCurrentCoords(event, setP3);
    }
  };

  const handleReset = () => {
    setP1([]);
    setP2([]);
    setP3([]);
    setArea(0);
    clearCanvas();
  };

  const handleCanvasMouseDown = (event: React.MouseEvent) => {
    [p1, p2, p3].forEach((point, index) => {
      if (event.pageX >= point[0] - 5 &&
        event.pageX <= point[0] + 5 &&
        event.pageY >= point[1] - 5 &&
        event.pageY <= point[1] + 5) {
        setDraggingPoint(`p${index + 1}` as Points);
      }
    });
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    switch (draggingPoint) {
    case 'p1':
      clearCanvas();
      drawPointFromCurrentCoords(event, setP1);
      drawPoint({ context, x: p2[0], y: p2[1] });
      drawPoint({ context, x: p3[0], y: p3[1] });
      break;

    case 'p2':
      clearCanvas();
      drawPointFromCurrentCoords(event, setP2);
      drawPoint({ context, x: p1[0], y: p1[1] });
      drawPoint({ context, x: p3[0], y: p3[1] });
      break;

    case 'p3':
      clearCanvas();
      drawPointFromCurrentCoords(event, setP3);
      drawPoint({ context, x: p2[0], y: p2[1] });
      drawPoint({ context, x: p1[0], y: p1[1] });
      break;

    default:
    }
  };

  const handleCanvasMouseUp = () => {
    if (draggingPoint !== null) {
      setDraggingPoint(null);
    }
  };
 
  return <div className='App'>
    <canvas
      ref={canvasEl}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
      onClick={handleCanvasClick}
    />
    <Info
      p1={p1}
      p2={p2}
      p3={p3}
      area={area}
      onResetClick={handleReset}
      onAboutClick={() => setIsAboutShown(true)}
    />
    {isAboutShown && <About onClick={() => setIsAboutShown(false)} />}
  </div>;
};

export default App;
