import { useEffect, RefObject } from 'react';

const useSvgAnimation = (
    miniTime: number,
    pathRef: RefObject<SVGPathElement>,
    textRef: RefObject<SVGTextElement>,
    circleRef: RefObject<SVGCircleElement>,
    resetMini: () => void,
    startMini: () => void
) => {
    useEffect(() => {
        if (pathRef.current && textRef.current) {
            const pathLength = pathRef.current.getTotalLength();
            pathRef.current.style.strokeDasharray = `${pathLength}`;

            const updateTextPosition = () => {
                if (miniTime >= 6000) {
                    resetMini();
                    startMini();
                }

                const elapsedTimeInCurrentMinute = miniTime % 36000;
                const proportion = elapsedTimeInCurrentMinute / 6000;
                const pathPoint = pathRef.current.getPointAtLength(pathLength * proportion);

                textRef.current.setAttribute("x", pathPoint.x.toString());
                textRef.current.setAttribute("y", pathPoint.y.toString());
                textRef.current.textContent = Math.floor(elapsedTimeInCurrentMinute / 100).toString();

                circleRef.current.setAttribute("cx", pathPoint.x.toString());
                circleRef.current.setAttribute("cy", pathPoint.y.toString());
            };

            updateTextPosition();
        }
    }, [miniTime, pathRef, textRef, circleRef, resetMini, startMini]);
};

export default useSvgAnimation;
