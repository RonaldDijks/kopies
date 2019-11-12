/* eslint-disable @typescript-eslint/explicit-function-return-type */
import machineSrc from "./img/CopieMachine.png";

const canvas = document.getElementById("canvas-root")! as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

const frames = 500;
const height = 4000;
const width = 4000;
const gravity = 3.5;
const bounceRate = 0.94;
const machineSizeMult = 1.6;
const machineWidth = 734 * machineSizeMult;
const machineHeight = 1222 * machineSizeMult;

canvas.width = width;
canvas.height = height;

console.log(machineSrc);

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise(res => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      res(image);
    };
  });

interface Vector2 {
  x: number;
  y: number;
}

class Machine {
  constructor(
    private image: HTMLImageElement,
    private location: Vector2,
    private velocity: Vector2,
    private size: Vector2
  ) {}

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.location.x,
      this.location.y,
      this.size.x,
      this.size.y
    );
  }

  update() {
    this.location.x += this.velocity.x;
    this.location.y += this.velocity.y;

    this.velocity.y += gravity;

    const bottom = this.location.y + this.size.y;

    if (bottom > height) {
      this.velocity.y = -this.velocity.y * bounceRate;
      this.location.y = height - this.size.y;
    }

    const right = this.location.x + this.size.x;
    1000;

    if (right > width) {
      this.velocity.x = -this.velocity.x;
      this.location.x = width - this.size.x;
    }

    const left = this.location.x;

    if (left < 0) {
      this.velocity.x = -this.velocity.x;
      this.location.x = 0;
    }
  }
}

const main = async () => {
  const machineImage = await loadImage(machineSrc);

  const machines = [
    new Machine(
      machineImage,
      { x: 1000, y: 1000 },
      { x: 24, y: 24 },
      { x: machineWidth, y: machineHeight }
    ),
    new Machine(
      machineImage,
      { x: 3000, y: 1000 },
      { x: -18, y: -18 },
      { x: machineWidth, y: machineHeight }
    ),
    new Machine(
      machineImage,
      { x: 0, y: 0 },
      { x: 15, y: 15 },
      { x: machineWidth, y: machineHeight }
    ),
    new Machine(
      machineImage,
      { x: width - machineImage.width, y: 0 },
      { x: -50, y: -10 },
      { x: machineWidth, y: machineHeight }
    )
    // new Machine(
    //   machineImage,
    //   { x: width / 2 - machineImage.width / 2, y: 0 },
    //   { x: -50, y: -16 },
    //   { x: machineWidth, y: machineHeight }
    // )
  ];

  for (let i = 0; i < frames; i++) {
    for (const machine of machines) {
      machine.draw(context);
      machine.update();
    }
  }

  const center = new Machine(
    machineImage,
    { x: width - machineWidth, y: height - machineHeight },
    { x: -28, y: -105 },
    { x: machineWidth, y: machineHeight }
  );

  for (let i = 0; i < 50; i++) {
    center.update();
    center.draw(context);
  }
};

main();
