"use client"

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useTextLinesReveal } from '../hooks/use-text-lines-reveal'

type PreviewProps = {
    year: number
    title: string
    shortTitle: string
    image: string
    largeImage: string
    isActive: boolean
    onClose: () => void
}

export default function Preview({ year, title, shortTitle, largeImage, isActive, onClose }: PreviewProps) {
    const elementRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const imageInnerRef = useRef<HTMLDivElement>(null)
    const titleSpanRef = useRef<HTMLSpanElement>(null)
    const titleMetaRef = useRef<HTMLSpanElement>(null)
    const yearSpanRef = useRef<HTMLSpanElement>(null)
    const locationHeaderRef = useRef<HTMLSpanElement>(null)
    const materialHeaderRef = useRef<HTMLSpanElement>(null)
    const backButtonRef = useRef<HTMLButtonElement>(null)
    const locationParagraphRef = useRef<HTMLParagraphElement>(null)
    const materialParagraphRef = useRef<HTMLParagraphElement>(null)
    
    const locationTextReveal = useTextLinesReveal()
    const materialTextReveal = useTextLinesReveal()

    // Initialize text reveals
    const initLocationText = (element: HTMLParagraphElement | null) => {
        if (element) {
            locationTextReveal.init(element)
            locationParagraphRef.current = element
        }
    }

    const initMaterialText = (element: HTMLParagraphElement | null) => {
        if (element) {
            materialTextReveal.init(element)
            materialParagraphRef.current = element
        }
    }

    // Handle active state changes
    useEffect(() => {
        if (!isActive) return

        const timeline = gsap.timeline({
            defaults: {
                duration: 1,
                ease: 'power3.inOut'
            }
        })

        // Initial setup - hide elements that will animate in
        timeline
            .set([titleSpanRef.current, titleMetaRef.current, yearSpanRef.current, locationHeaderRef.current, materialHeaderRef.current, backButtonRef.current], {
                opacity: 0,
                yPercent: 101
            })
            .set([imageRef.current], {
                y: '-101%'
            })
            .set([imageInnerRef.current], {
                y: '101%'
            })
            
            // Image reveal animation
            .to([imageRef.current, imageInnerRef.current], {
                y: '0%'
            }, 'content')
            
            // Text animations
            .add(() => {
                locationTextReveal.animateIn()
                materialTextReveal.animateIn()
                // Set paragraph opacity to 1 with slight delay
                gsap.set([locationParagraphRef.current, materialParagraphRef.current], {
                    opacity: 1,
                    delay: 0.1
                })
            }, 'content')
            
            // Other elements slide in
            .to([titleSpanRef.current, titleMetaRef.current, yearSpanRef.current, locationHeaderRef.current, materialHeaderRef.current], {
                ease: 'expo',
                yPercent: 0,
                opacity: 1,
                stagger: 0.05
            }, 'content+=0.3')
            
            .to(backButtonRef.current, {
                opacity: 1
            }, 'content')

    }, [isActive, locationTextReveal, materialTextReveal])

    const handleBackClick = () => {
        // Animate out
        const timeline = gsap.timeline({
            defaults: {
                duration: 1,
                ease: 'power3.inOut'
            }
        })

        timeline
            .to([titleSpanRef.current, titleMetaRef.current, yearSpanRef.current, locationHeaderRef.current, materialHeaderRef.current], {
                yPercent: -101,
                opacity: 0
            })
            .add(() => {
                locationTextReveal.animateOut()
                materialTextReveal.animateOut()
            }, '<')
            .to(backButtonRef.current, {
                opacity: 0
            }, '<')
            .to(imageRef.current, {
                y: '101%'
            }, '<')
            .to(imageInnerRef.current, {
                y: '-101%',
                onComplete: onClose
            }, '<')
    }

    return (
        <div 
            ref={elementRef}
            className={`absolute w-full h-full top-0 text-white transition-opacity duration-300 ${
                isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            } md:grid md:gap-x-[10vw] md:gap-y-4 md:grid-cols-4 md:grid-rows-[1fr_auto_auto]`}
        >
            {/* Preview Image - CSS: .preview__img */}
            <div ref={imageRef} className="grid-area-image w-full min-h-[200px] overflow-hidden relative -translate-y-full pointer-events-none will-change-transform">
                {/* Preview Image Inner - CSS: .preview__img-inner */}
                <div 
                    ref={imageInnerRef}
                    className="bg-cover w-full h-full translate-y-full will-change-transform bg-[50%_35%]" 
                    style={{backgroundImage:`url(${largeImage})`}}
                />
            </div>
            
            {/* Preview Title - CSS: .preview__title */}
            <h2 className="grid-area-title relative overflow-hidden my-8 leading-[0.7] text-[clamp(2rem,18vw,15rem)] whitespace-nowrap font-light justify-self-center self-center font-[kudryashev-d-excontrast-sans,sans-serif] md:my-0">
                {/* CSS: .oh__inner */}
                <span ref={titleSpanRef} className="inline-block will-change-transform leading-[0.7] pt-[3%]">{shortTitle}</span>
            </h2>
            
            {/* Preview Column Start - CSS: .preview__column--start */}
            <div className="grid-area-column-start">
                {/* CSS: .preview__column-title--main */}
                <span className="block font-light mt-0 text-base relative overflow-hidden">
                    <span ref={titleMetaRef} className="inline-block will-change-transform">{title}</span>
                </span>
                <span className="block relative overflow-hidden">
                    <span ref={yearSpanRef} className="inline-block will-change-transform">{year}</span>
                </span>
            </div>
            
            {/* Preview Column - CSS: .preview__column */}
            <div className="grid-row-[2/span_2]">
                {/* CSS: .preview__column-title */}
                <h3 className="relative overflow-hidden font-light mt-0 text-base text-[#727170]">
                    <span ref={locationHeaderRef} className="inline-block will-change-transform">Location</span>
                </h3>
                {/* CSS: .preview__column p */}
                <p ref={initLocationText} className="leading-tight opacity-0 text-white">
                    And if it rains, a closed car at four. And we shall play a game of chess, pressing lidless eyes and waiting for a knock upon the door.
                </p>
            </div>
            
            {/* Preview Column - CSS: .preview__column */}
            <div className="grid-row-[2/span_2]">
                {/* CSS: .preview__column-title */}
                <h3 className="relative overflow-hidden font-light mt-0 text-base text-[#727170]">
                    <span ref={materialHeaderRef} className="inline-block will-change-transform">Material</span>
                </h3>
                {/* CSS: .preview__column p */}
                <p ref={initMaterialText} className="leading-tight opacity-0 text-white">
                    At the violet hour, when the eyes and back, turn upward from the desk, when the human engine waits.
                </p>
            </div>
            
            {/* Preview Back Button - CSS: .preview__back */}
            <button 
                ref={backButtonRef}
                onClick={handleBackClick}
                className="grid-area-back bg-none border-0 p-0 m-0 font-inherit my-8 mx-auto stroke-white cursor-pointer fill-none justify-self-start self-end hover:stroke-[#a17445] focus:outline-none md:my-0"
            >
                <svg width="100px" height="18px" viewBox="0 0 50 9">
                    <path vectorEffect="non-scaling-stroke" d="m0 4.5 5-3m-5 3 5 3m45-3h-77"></path>
                </svg>
            </button>
        </div>
    )
}