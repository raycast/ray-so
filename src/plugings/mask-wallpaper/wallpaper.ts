// @ts-nocheck
import { hexToRgb } from './colors';
import { curve, positions } from './constants';
import type {
  PatternOptions,
  Position,
  RgbColor,
  MaskWallpaperOptions,
} from './types';

export class MaskWallpaper {
  private width = 50;
  private height = 50;
  private phase = 0;
  private tail = 0;
  private tails: number; // 90
  private scrollTails = 50;
  private timestamp: number;
  private frametime: number; // 1000 / 15
  private scrollDelta = 0;
  private scrollTicking = false;
  private frames: ImageData[] = [];
  private rgb: RgbColor[] = [];
  private curve = curve;
  private positions = positions;
  private phases = positions.length;

  private interval: ReturnType<typeof setInterval> | null;
  private raf: ReturnType<typeof requestAnimationFrame> | null;
  private wheel: (event: WheelEvent) => void;

  private hc: HTMLCanvasElement;
  private hctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private pattern: HTMLDivElement | null;

  constructor(
    private container?: HTMLElement,
    private options?: MaskWallpaperOptions
  ) {
    this.wheel = this.onWheel.bind(this);
  }

  private getPositions(shift: number): Position[] {
    const positions = [...this.positions];
    while (shift > 0) {
      positions.push(positions.shift()!);
      shift--;
    }

    const result = [];
    for (let i = 0; i < positions.length; i += 2) {
      result.push(positions[i]);
    }

    return result;
  }

  private curPosition(phase: number, tail: number): Position[] {
    tail %= this.tails;
    const pos = this.getPositions(phase % this.phases);

    if (tail) {
      const next_pos = this.getPositions(++phase % this.phases);
      const d1x = (next_pos[0].x - pos[0].x) / this.tails;
      const d1y = (next_pos[0].y - pos[0].y) / this.tails;
      const d2x = (next_pos[1].x - pos[1].x) / this.tails;
      const d2y = (next_pos[1].y - pos[1].y) / this.tails;
      const d3x = (next_pos[2].x - pos[2].x) / this.tails;
      const d3y = (next_pos[2].y - pos[2].y) / this.tails;
      const d4x = (next_pos[3].x - pos[3].x) / this.tails;
      const d4y = (next_pos[3].y - pos[3].y) / this.tails;

      return [
        {
          x: pos[0].x + d1x * tail,
          y: pos[0].y + d1y * tail,
        },
        {
          x: pos[1].x + d2x * tail,
          y: pos[1].y + d2y * tail,
        },
        {
          x: pos[2].x + d3x * tail,
          y: pos[2].y + d3y * tail,
        },
        {
          x: pos[3].x + d4x * tail,
          y: pos[3].y + d4y * tail,
        },
      ];
    }

    return pos;
  }

  private changeTail(diff: number): void {
    this.tail += diff;

    while (this.tail >= this.tails) {
      this.tail -= this.tails;
      this.phase++;

      if (this.phase >= this.phases) {
        this.phase -= this.phases;
      }
    }

    while (this.tail < 0) {
      this.tail += this.tails;
      this.phase--;

      if (this.phase < 0) {
        this.phase += this.phases;
      }
    }
  }

  private onWheel(event: WheelEvent): void {
    if (this.interval) {
      return;
    }

    this.scrollDelta += event.deltaY;

    if (!this.scrollTicking) {
      requestAnimationFrame(() => this.drawOnWheel());
      this.scrollTicking = true;
    }
  }

  private drawOnWheel(): void {
    let diff = this.scrollDelta / this.scrollTails;
    this.scrollDelta %= this.scrollTails;

    diff = diff > 0 ? Math.floor(diff) : Math.ceil(diff);

    if (diff) {
      this.changeTail(diff);
      this.drawGradient();
    }

    this.scrollTicking = false;
  }

  private drawNextPositionAnimated(callback?: () => void): void {
    if (this.frames.length > 0) {
      const id = this.frames.shift()!;
      this.drawImageData(id);
    } else {
      clearInterval(this.interval!);
      this.interval = null;

      if (callback) {
        callback();
      }
    }
  }

  private getGradientImageData(positions: Position[]): ImageData {
    const id = this.hctx.createImageData(this.width, this.height);
    const pixels = id.data;
    let offset = 0;

    for (let y = 0; y < this.height; y++) {
      const directPixelY = y / this.height;
      const centerDistanceY = directPixelY - 0.5;
      const centerDistanceY2 = centerDistanceY * centerDistanceY;

      for (let x = 0; x < this.width; x++) {
        const directPixelX = x / this.width;

        const centerDistanceX = directPixelX - 0.5;
        const centerDistance = Math.sqrt(
          centerDistanceX * centerDistanceX + centerDistanceY2
        );

        const swirlFactor = 0.35 * centerDistance;
        const theta = swirlFactor * swirlFactor * 0.8 * 8;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        const pixelX = Math.max(
          0,
          Math.min(
            1,
            0.5 + centerDistanceX * cosTheta - centerDistanceY * sinTheta
          )
        );
        const pixelY = Math.max(
          0,
          Math.min(
            1,
            0.5 + centerDistanceX * sinTheta + centerDistanceY * cosTheta
          )
        );

        let distanceSum = 0;
        let r = 0;
        let g = 0;
        let b = 0;

        for (let i = 0; i < this.rgb.length; i++) {
          const colorX = positions[i].x;
          const colorY = positions[i].y;

          const distanceX = pixelX - colorX;
          const distanceY = pixelY - colorY;

          let distance = Math.max(
            0,
            0.9 - Math.sqrt(distanceX * distanceX + distanceY * distanceY)
          );
          distance = distance * distance * distance * distance;
          distanceSum += distance;

          r += (distance * this.rgb[i].r) / 255;
          g += (distance * this.rgb[i].g) / 255;
          b += (distance * this.rgb[i].b) / 255;
        }

        pixels[offset++] = (r / distanceSum) * 255;
        pixels[offset++] = (g / distanceSum) * 255;
        pixels[offset++] = (b / distanceSum) * 255;
        pixels[offset++] = 0xff; // 255
      }
    }

    return id;
  }

  private drawImageData(id: ImageData): void {
    this.hctx.putImageData(id, 0, 0);
    this.ctx.drawImage(this.hc, 0, 0, this.width, this.height);
  }

  private drawGradient(): void {
    const position = this.curPosition(this.phase, this.tail);
    this.drawImageData(this.getGradientImageData(position));
  }

  private requestAnimate(): void {
    this.raf = requestAnimationFrame(() => this.doAnimate());
  }

  private doAnimate(): void {
    const now = +Date.now();

    if (now - this.timestamp < this.frametime) {
      return this.requestAnimate();
    }

    this.timestamp = now;
    this.changeTail(1);
    this.drawGradient();
    this.requestAnimate();
  }

  /**
   * Initialize wallpaper
   * @param options wallpaper options
   * @param container container element
   */
  init(options?: MaskWallpaperOptions, container?: HTMLElement): void {
    this.options = options ? { ...this.options, ...options } : this.options;
    this.container = container ?? this.container;

    if (!this.container || !this.options.colors.length) {
      throw new Error('Container or colors do not exist');
    }

    this.dispose();

    if (!this.hc) {
      this.hc = document.createElement('canvas');
      this.hc.width = this.width;
      this.hc.height = this.height;
      this.hctx = this.hc.getContext('2d')!;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('tw-canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d')!;
    this.container.appendChild(this.canvas);

    if (!this.container.classList.contains('tw-wrap')) {
      this.container.classList.add('tw-wrap');
    }

    if (this.options.pattern) {
      this.pattern = document.createElement('div');
      this.pattern.classList.add('tw-pattern');
      this.updatePattern(this.options.pattern);
      this.container.appendChild(this.pattern);
    }

    this.animate(this.options.animate);
    this.updateTails(this.options.tails);
    this.updateColors(this.options.colors);
    this.updateFrametime(this.options.fps);
    this.scrollAnimate(this.options.scrollAnimate);
    this.drawGradient();
  }

  /**
   * Dispose wallpaper
   */
  dispose(): void {
    if (this.hc) {
      clearInterval(this.interval!);
      this.interval = null;
      this.animate(false);
      this.canvas.remove();
      this.pattern?.remove();
      this.hc.remove();
      this.frames = [];
    }
  }

  /**
   * Tails speed animation
   * @param tails number of tails
   * @default 90
   */
  updateTails(tails = 90): void {
    if (tails > 0) {
      this.tails = tails;
    }
  }

  /**
   * Frame time is just the time between frames
   * @param fps frames per second
   * @default 30
   */
  updateFrametime(fps = 30): void {
    this.frametime = 1000 / fps;
  }

  /**
   * Update pattern options
   * @param pattern pattern options
   */
  updatePattern(pattern: PatternOptions): void {
    if (!this.pattern || !this.container) return;

    const {
      size = 'auto',
      opacity = 0.5,
      blur = 0,
      background = '#000',
      image,
      mask,
    } = pattern;

    this.container.style.setProperty('--app-pattern-size', size);
    this.container.style.setProperty('--app-pattern-opacity', `${opacity}`);
    this.container.style.setProperty('--app-pattern-blur', `${blur}px`);
    this.container.style.setProperty('--app-pattern-background', background);

    if (image) {
      this.container.style.setProperty('--app-pattern-image', `url(${image})`);
    } else {
      this.container.style.removeProperty('--app-pattern-image');
    }

    if (mask) {
      this.canvas.classList.add('tw-mask');
    } else {
      this.canvas.classList.remove('tw-mask');
    }
  }

  /**
   * Colors for gradient, use 1-4 hex codes
   * @param hexCodes hex colors
   */
  updateColors(hexCodes: string[]): void {
    const colors = hexCodes
      .reduce<RgbColor[]>((rgbColors, color) => {
        const rgb = hexToRgb(color);

        if (rgb) {
          rgbColors.push(rgb);
        }

        return rgbColors;
      }, [])
      .slice(0, 4);

    if (!colors.length) {
      throw new Error(
        'Colors do not exist or are not valid hex codes (e.g. #fff or #ffffff)'
      );
    }

    this.rgb = colors;
  }

  /**
   * Next animation position (animation turns off after use)
   * @param callback execution `toNextPosition` is finished
   */
  toNextPosition(callback?: () => void): void {
    clearInterval(this.interval!);
    this.animate(false);
    this.frames = [];

    const prev_pos = this.getPositions(this.phase % this.phases);
    this.phase++;
    const pos = this.getPositions(this.phase % this.phases);

    const h = 27;
    const d1x = (pos[0].x - prev_pos[0].x) / h;
    const d1y = (pos[0].y - prev_pos[0].y) / h;
    const d2x = (pos[1].x - prev_pos[1].x) / h;
    const d2y = (pos[1].y - prev_pos[1].y) / h;
    const d3x = (pos[2].x - prev_pos[2].x) / h;
    const d3y = (pos[2].y - prev_pos[2].y) / h;
    const d4x = (pos[3].x - prev_pos[3].x) / h;
    const d4y = (pos[3].y - prev_pos[3].y) / h;

    for (let frame = 0; frame < this.curve.length; frame++) {
      const cur_pos: Position[] = [
        {
          x: prev_pos[0].x + d1x * this.curve[frame],
          y: prev_pos[0].y + d1y * this.curve[frame],
        },
        {
          x: prev_pos[1].x + d2x * this.curve[frame],
          y: prev_pos[1].y + d2y * this.curve[frame],
        },
        {
          x: prev_pos[2].x + d3x * this.curve[frame],
          y: prev_pos[2].y + d3y * this.curve[frame],
        },
        {
          x: prev_pos[3].x + d4x * this.curve[frame],
          y: prev_pos[3].y + d4y * this.curve[frame],
        },
      ];

      this.frames.push(this.getGradientImageData(cur_pos));
    }

    this.interval = setInterval(() => {
      this.drawNextPositionAnimated(callback);
    }, this.frametime);
  }

  /**
   * Start or stop animation
   * @param start start or stop animation
   * @default true
   */
  animate(start = true): void {
    if (start) {
      this.doAnimate();
    } else if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
  }

  /**
   * Start or stop mouse scroll animation
   * @param start start or stop scroll animation
   * @default false
   */
  scrollAnimate(start = false): void {
    if (start) {
      document.addEventListener('wheel', this.wheel);
    } else {
      document.removeEventListener('wheel', this.wheel);
    }
  }
}
