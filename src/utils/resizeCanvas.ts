export const resizeCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) =>
  () => {
    const drawing = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (window.devicePixelRatio > 1) {
      canvas.width *= window.devicePixelRatio;
      canvas.height *= window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    ctx.putImageData(drawing, 0, 0);
  };
