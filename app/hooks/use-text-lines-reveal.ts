import SplitType from 'split-type';
import { wrapLines } from '../lib/utils';
import { gsap } from 'gsap';
import { useRef, useCallback, useEffect } from 'react';

export const useTextLinesReveal = () => {
    // DOM elements ref
    const elementRef = useRef<HTMLElement | null>(null);
    // Split Type instance ref
    const splitTypeInstanceRef = useRef<SplitType | null>(null);
    // Checks if the Split Type lines are visible or not
    const isVisibleRef = useRef<boolean>(false);
    // Animation timelines refs
    const inTimelineRef = useRef<gsap.core.Timeline | null>(null);
    const outTimelineRef = useRef<gsap.core.Timeline | null>(null);

    /**
     * Initializes the text reveal animation for a DOM element.
     * @param {HTMLElement} element - a text DOM element
     */
    const init = useCallback((element: HTMLElement) => {
        elementRef.current = element;

        splitTypeInstanceRef.current = new SplitType(element, { types: 'lines' });
        // Wrap the lines (div with class .oh)
        // The inner child will be the one animating the transform
        if (splitTypeInstanceRef.current.lines) {
            wrapLines(splitTypeInstanceRef.current.lines, 'div', 'oh');
        }
        
        initEvents();
    }, []);

    /**
     * Animates the lines in.
     * @param {Boolean} animation - with or without animation.
     * @return {GSAP Timeline} the animation timeline
     */
    const animateIn = useCallback((animation = true): gsap.core.Timeline | null => {
        if (!splitTypeInstanceRef.current) return null;

        // Lines are visible
        isVisibleRef.current = true;

        gsap.killTweensOf(splitTypeInstanceRef.current.lines);
        inTimelineRef.current = gsap.timeline({defaults: {
            duration: 1.1, 
            ease: 'power4.inOut'
        }})
        .addLabel('start', 0)
        .set(splitTypeInstanceRef.current.lines, {
            yPercent: 105
        }, 'start');
        
        if (animation) {
            inTimelineRef.current.to(splitTypeInstanceRef.current.lines, {
                yPercent: 0,
                stagger: 0.05
            }, 'start');
        }
        else {
            inTimelineRef.current.set(splitTypeInstanceRef.current.lines, {
                yPercent: 0
            }, 'start');
        }
        
        return inTimelineRef.current;
    }, []);

    /**
     * Animates the lines out.
     * @param {Boolean} animation - with or without animation.
     * @return {GSAP Timeline} the animation timeline
     */
    const animateOut = useCallback((animation = true): gsap.core.Timeline | null => {
        if (!splitTypeInstanceRef.current) return null;

        // Lines are invisible
        isVisibleRef.current = false;

        gsap.killTweensOf(splitTypeInstanceRef.current.lines);
        
        outTimelineRef.current = gsap.timeline({defaults: {
            duration: 1.1, 
            ease: 'power4.inOut'
        }}).addLabel('start', 0);
        
        if (animation) {
            outTimelineRef.current.to(splitTypeInstanceRef.current.lines, {
                yPercent: -105,
                stagger: 0.05
            }, 'start');
        }
        else {
            outTimelineRef.current.set(splitTypeInstanceRef.current.lines, {
                yPercent: -105,
            }, 'start');
        }

        return outTimelineRef.current;
    }, []);

    /**
     * Initializes resize event listener.
     */
    const initEvents = useCallback(() => {
        const handleResize = () => {
            if (!splitTypeInstanceRef.current) return;

            // Re-split text
            // https://github.com/lukePeavey/SplitType#instancesplitoptions-void
            splitTypeInstanceRef.current.split({});

            // Need to wrap again the new lines elements (div with class .oh)
            if (splitTypeInstanceRef.current.lines) {
                wrapLines(splitTypeInstanceRef.current.lines, 'div', 'oh');
            }
                
            // Hide the lines
            if (!isVisibleRef.current) {
                gsap.set(splitTypeInstanceRef.current.lines, {yPercent: 105});
            }
        };

        window.addEventListener('resize', handleResize);

        // Return cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Kill any running animations
            if (splitTypeInstanceRef.current) {
                gsap.killTweensOf(splitTypeInstanceRef.current.lines);
            }
            if (inTimelineRef.current) {
                inTimelineRef.current.kill();
            }
            if (outTimelineRef.current) {
                outTimelineRef.current.kill();
            }
        };
    }, []);

    return {
        init,
        animateIn,
        animateOut
    };
}