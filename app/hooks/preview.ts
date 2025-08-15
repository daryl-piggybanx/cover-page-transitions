import { useRef, useCallback } from 'react';
import SplitType from 'split-type';
import { wrapLines } from '../lib/utils';
import { gsap } from 'gsap';

// Create a factory function to create TextLinesReveal instances
const createTextLinesReveal = (element: HTMLElement) => {
    let splitTypeInstance: SplitType | null = null;
    let isVisible = false;
    let inTimeline: gsap.core.Timeline | null = null;
    let outTimeline: gsap.core.Timeline | null = null;

    // Initialize
    splitTypeInstance = new SplitType(element, { types: 'lines' });
    if (splitTypeInstance.lines) {
        wrapLines(splitTypeInstance.lines, 'div', 'oh');
    }

    // Setup resize listener
    const handleResize = () => {
        if (!splitTypeInstance) return;
        splitTypeInstance.split({});
        if (splitTypeInstance.lines) {
            wrapLines(splitTypeInstance.lines, 'div', 'oh');
        }
        if (!isVisible && splitTypeInstance.lines) {
            gsap.set(splitTypeInstance.lines, { yPercent: 105 });
        }
    };

    window.addEventListener('resize', handleResize);

    return {
        in: (animation = true): gsap.core.Timeline | null => {
            if (!splitTypeInstance?.lines) return null;

            isVisible = true;
            gsap.killTweensOf(splitTypeInstance.lines);
            
            inTimeline = gsap.timeline({
                defaults: { duration: 1.1, ease: 'power4.inOut' }
            })
            .addLabel('start', 0)
            .set(splitTypeInstance.lines, { yPercent: 105 }, 'start');

            if (animation) {
                inTimeline.to(splitTypeInstance.lines, {
                    yPercent: 0,
                    stagger: 0.05
                }, 'start');
            } else {
                inTimeline.set(splitTypeInstance.lines, { yPercent: 0 }, 'start');
            }

            return inTimeline;
        },

        out: (animation = true): gsap.core.Timeline | null => {
            if (!splitTypeInstance?.lines) return null;

            isVisible = false;
            gsap.killTweensOf(splitTypeInstance.lines);
            
            outTimeline = gsap.timeline({
                defaults: { duration: 1.1, ease: 'power4.inOut' }
            }).addLabel('start', 0);

            if (animation) {
                outTimeline.to(splitTypeInstance.lines, {
                    yPercent: -105,
                    stagger: 0.05
                }, 'start');
            } else {
                outTimeline.set(splitTypeInstance.lines, { yPercent: -105 }, 'start');
            }

            return outTimeline;
        },

        destroy: () => {
            window.removeEventListener('resize', handleResize);
            if (splitTypeInstance?.lines) {
                gsap.killTweensOf(splitTypeInstance.lines);
            }
            if (inTimeline) inTimeline.kill();
            if (outTimeline) outTimeline.kill();
        }
    };
};

export const usePreview = () => {
    // DOM elements refs
    const elementRef = useRef<HTMLElement | null>(null);
    const imageRef = useRef<HTMLElement | null>(null);
    const imageInnerRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLElement | null>(null);
    const backCtrlRef = useRef<HTMLElement | null>(null);
    const innerElementsRef = useRef<HTMLElement[]>([]);
    const multiLineWrapRef = useRef<HTMLElement[]>([]);
    const multiLinesRef = useRef<Array<ReturnType<typeof createTextLinesReveal>>>([]);

    /**
     * Initializes the preview component with DOM elements.
     * @param {HTMLElement} element - main element (.preview)
     */
    const init = useCallback((element: HTMLElement) => {
        // Clean up existing instances
        multiLinesRef.current.forEach(instance => instance.destroy());
        multiLinesRef.current = [];

        elementRef.current = element;
        imageRef.current = element.querySelector('.preview__img');
        imageInnerRef.current = element.querySelector('.preview__img-inner');
        titleRef.current = element.querySelector('.preview__title');
        backCtrlRef.current = element.querySelector('.preview__back');

        const innerElements = element.querySelectorAll('.oh__inner');
        innerElementsRef.current = [...innerElements] as HTMLElement[];
        
        // Get all text elements that need line animation
        const multiLineWrap = element.querySelectorAll('.preview__column > p');
        multiLineWrapRef.current = [...multiLineWrap] as HTMLElement[];
        
        // Initialize TextLinesReveal for each text element
        multiLineWrapRef.current.forEach(line => {
            const textLinesReveal = createTextLinesReveal(line);
            multiLinesRef.current.push(textLinesReveal);
        });
    }, []);

    /**
     * Gets the DOM elements for external access.
     */
    const getDOMElements = useCallback(() => {
        return {
            el: elementRef.current,
            image: imageRef.current,
            imageInner: imageInnerRef.current,
            title: titleRef.current,
            backCtrl: backCtrlRef.current,
            innerElements: innerElementsRef.current,
            multiLineWrap: multiLineWrapRef.current,
        };
    }, []);

    /**
     * Gets all TextLinesReveal instances.
     */
    const getMultiLines = useCallback(() => {
        return multiLinesRef.current;
    }, []);

    /**
     * Clean up all instances when component unmounts.
     */
    const destroy = useCallback(() => {
        multiLinesRef.current.forEach(instance => instance.destroy());
        multiLinesRef.current = [];
    }, []);

    return {
        init,
        getDOMElements,
        getMultiLines,
        destroy
    };
}