const canvas = document.getElementById("canvas-root")! as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

import machine from "./img/CopieMachine.png";

const drawing = new Image();
drawing.src = machine;
drawing.onload = (): void => {
  context.drawImage(drawing, 0, 0);
};
