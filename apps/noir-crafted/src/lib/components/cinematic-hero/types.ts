export interface Perspective {
  title: string;
  description?: string;
  position:
    | 'top'
    | 'top-left'
    | 'left'
    | 'right'
    | 'center'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right';
}

export interface ParticleUserData {
  baseAngle: number;
  angleSpan: number;
  baseY: number;
  speed: number;
  radius: number;
}

export interface CameraAnimation {
  x: number;
  y: number;
  z: number;
  rotY: number;
}

export interface CylinderConfig {
  radius: number;
  height: number;
  radialSegments: number;
  heightSegments: number;
}

export interface ParticleConfig {
  numParticles: number;
  particleRadius: number;
  segments: number;
  angleSpan: number;
}

// We need to import Mesh from 'three' or 'ogl' depending on usage.
// The original used 'ogl' for types but React Three Fiber uses Three.js.
// Let's stick to Three.js types if possible or generic.
// However, the utils used OGL. Let's see utils.ts content again.
// The original utils.ts imported Geometry from 'ogl'.
// But the main component uses @react-three/fiber (Three.js).
// This seems to be a mix in the reference repo?
// Wait, the reference repo has two variants. Variant 1 uses OGL (cylinder-carousel). Variant 2 uses R3F (cinematic-scene-showcase).
// Let's check variant-2 types again.
