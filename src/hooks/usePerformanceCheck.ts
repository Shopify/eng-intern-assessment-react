import { useState, useEffect } from 'react';

// Hook to check rendering performance against a threshold
const usePerformanceCheck = (threshold: number) => {
  const [isPerformanceAdequate, setIsPerformanceAdequate] = useState(true);

  useEffect(() => {
    let frameId: number;
    const times: number[] = []; // Store frame timestamps

    const refreshLoop = () => {
      window.requestAnimationFrame(() => {
        const now = performance.now();
        // Remove timestamps older than 1 second
        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift();
        }
        times.push(now);

        // Update state if FPS is above threshold
        setIsPerformanceAdequate(times.length >= threshold);

        frameId = window.requestAnimationFrame(refreshLoop);
      });
    };

    refreshLoop();

    // Cleanup: cancel animation frame on unmount
    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [threshold]);

  return isPerformanceAdequate;
};

export default usePerformanceCheck;
