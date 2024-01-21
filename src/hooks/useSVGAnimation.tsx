import { useEffect, RefObject } from 'react';

/**
 * Custom React hook for animating SVG elements based on a timer.
 * 
 * @param {number} miniTime - The current time of the mini stopwatch in milliseconds.
 * @param {RefObject<SVGPathElement>} pathRef - Reference to the SVG path element.
 * @param {RefObject<SVGTextElement>} textRef - Reference to the SVG text element.
 * @param {RefObject<SVGCircleElement>} circleRef - Reference to the SVG circle element.
 * @param {Function} resetMini - Function to reset the mini stopwatch.
 * @param {Function} startMini - Function to start the mini stopwatch.
 */
const useSvgAnimation = (
    miniTime: number,
    pathRef: RefObject<SVGPathElement>,
    textRef: RefObject<SVGTextElement>,
    circleRef: RefObject<SVGCircleElement>,
    resetMini: () => void,
    startMini: () => void
) => {
    useEffect(() => {
        // Check if SVG elements are available
        if (pathRef.current && textRef.current && circleRef.current) {
            // Calculate the total length of the SVG path
            const pathLength = pathRef.current.getTotalLength();
            // Set the stroke dash array to create the animation effect
            pathRef.current.style.strokeDasharray = `${pathLength}`;

            // Function to update the position of text and circle based on the miniTime
            const updateTextPosition = () => {
                // Reset and start mini stopwatch every 6 seconds
                if (miniTime >= 6000) {
                    resetMini();
                    startMini();
                }

                // Calculate elapsed time in the current minute
                const elapsedTimeInCurrentMinute = miniTime % 36000;
                // Calculate the proportion of the path to be covered
                const proportion = elapsedTimeInCurrentMinute / 6000;
                // Determine the point on the path corresponding to the current time
                const pathPoint = pathRef.current.getPointAtLength(pathLength * proportion);

                // Set the position of the text element at the calculated path point
                textRef.current.setAttribute("x", pathPoint.x.toString());
                textRef.current.setAttribute("y", pathPoint.y.toString());
                // Update the text content with the elapsed time
                textRef.current.textContent = Math.floor(elapsedTimeInCurrentMinute / 100).toString();

                // Set the position of the circle element at the calculated path point
                circleRef.current.setAttribute("cx", pathPoint.x.toString());
                circleRef.current.setAttribute("cy", pathPoint.y.toString());
            };

            // Call the function to update text position
            updateTextPosition();
        }
    }, [miniTime, pathRef, textRef, circleRef, resetMini, startMini]);
};

export default useSvgAnimation;
