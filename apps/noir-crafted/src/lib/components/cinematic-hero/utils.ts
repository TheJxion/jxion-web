import type { ScenePerspective } from './scene-data';

/**
 * Returns Tailwind classes for positioning text based on perspective position
 */
export function getPositionClasses(
  position: ScenePerspective['position'],
): string {
  switch (position) {
    case 'top':
      return 'top-[20vh] left-1/2 -translate-x-1/2 text-center';
    case 'top-left':
      return 'top-[20vh] max-md:top-[25vh] left-20 max-md:left-6';
    case 'left':
      return 'left-[20vh] top-1/2 -translate-y-1/2';
    case 'right':
      return 'right-20 top-1/2 -translate-y-1/2 max-md:left-1/2 max-md:-translate-x-1/2';
    case 'center':
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center';
    case 'top-right':
      return 'top-[20vh] max-md:top-[25vh] right-20 max-md:right-6 flex flex-col items-end';
    case 'bottom':
      return 'bottom-[20vh] left-1/2 -translate-x-1/2 text-center';
    case 'bottom-left':
      return 'bottom-[20vh] left-20 max-md:left-12 flex flex-col items-start text-left';
    case 'bottom-right':
      return 'bottom-[20vh] right-20 max-md:right-12 flex flex-col items-end text-right';
    default:
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
  }
}
