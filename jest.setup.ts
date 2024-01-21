// jest.setup.ts
declare global {
    interface SVGPathElement {
      getTotalLength: () => number;
      getPointAtLength: (length: number) => { x: number; y: number };
    }
  }
  
  Object.defineProperty(global, 'SVGPathElement', {
    value: class SVGPathElement extends HTMLElement {
      getTotalLength() {
        return 100; // Return a mock length
      }
      getPointAtLength() {
        return { x: 0, y: 0 }; // Return a mock point
      }
    },
  });
  
  export {};
  