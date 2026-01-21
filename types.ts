export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  text?: string;
  isText: boolean;
  alpha: number;
}

export interface MousePosition {
  x: number;
  y: number;
}