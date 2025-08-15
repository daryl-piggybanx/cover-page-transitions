
"use client"

import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import Preview from "../components/preview"
import Content from "../components/content"

const content = [
    {
        year: 2020,
        title: "Alex Moulder",
        image: "img/1.jpg",
        description: "I am only waiting for love to give myself up at last into his hands. That is why it is so late and why I have been guilty of such omissions.",
        link: "https://www.google.com",
    },
    {
        year: 2021,
        title: "Aria Bennett",
        image: "img/2.jpg",
        description: "They come with their laws and their codes to bind me fast; but I evade them ever, for I am only waiting for love to give myself up at last into his hands.",
        link: "https://www.google.com",
    },
    {
        year: 2022,
        title: "Jimmy Hughes",
        image: "img/3.jpg",
        description: "Clouds heap upon clouds and it darkens. Ah, love, why dost thou let me wait outside at the door all alone?",
        link: "https://www.google.com",
    },
]

const previews = [
    {
        year: 2020,
        title: "Alex Moulder",
        shortTitle: "Moulder",
        image: "img/1.jpg",
        largeImage: "img/1_big.jpg",
    },
    {
        year: 2021,
        title: "Aria Bennett", 
        shortTitle: "Bennett",
        image: "img/2.jpg",
        largeImage: "img/2_big.jpg",
    },
    {
        year: 2022,
        title: "Jimmy Hughes",
        shortTitle: "Hughes", 
        image: "img/3.jpg",
        largeImage: "img/3_big.jpg",
    },
]

export function CoverPage() {
    const [activePreview, setActivePreview] = useState<number | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [contentHidden, setContentHidden] = useState(false)
    
    const overlay1Ref = useRef<HTMLDivElement>(null)
    const overlay2Ref = useRef<HTMLDivElement>(null)
    const mainRef = useRef<HTMLElement>(null)

    const openPreview = (index: number) => {
        if (isAnimating) return
        
        setIsAnimating(true)
        setActivePreview(index)
        
        const timeline = gsap.timeline({
            defaults: {
                duration: 1,
                ease: 'power3.inOut'
            }
        })
        
        timeline
            .add(() => {
                setContentHidden(true)
            }, 'start')
            .addLabel('start', 0)
            .to([overlay1Ref.current, overlay2Ref.current], {
                scaleY: 1
            }, 'start')
            .addLabel('content', 'start+=0.2')
            .add(() => {
                document.body.classList.add('preview-visible')
                setIsAnimating(false)
            }, 'content')
    }

    const closePreview = () => {
        if (isAnimating) return
        
        setIsAnimating(true)
        
        const timeline = gsap.timeline({
            defaults: {
                duration: 1,
                ease: 'power3.inOut'
            }
        })
        
        timeline
            .addLabel('grid', 'start+=0.2')
            .to([overlay1Ref.current, overlay2Ref.current], {
                scaleY: 0,
                onComplete: () => {
                    setContentHidden(false)
                    setIsAnimating(false)
                }
            }, 'grid')
            .add(() => {
                setActivePreview(null)
                document.body.classList.remove('preview-visible')
            }, 'start')
    }

    return (
        <main 
            ref={mainRef}
            className="p-6 pb-12 h-screen grid grid-template-main gap-y-[8vh]"
        >
            {/* Content - CSS: .content */}
            <div className={`grid-area-content max-w-[400px] md:max-w-none md:grid md:grid-cols-3 md:grid-rows-[100%] md:gap-x-[5vw] ${contentHidden ? 'pointer-events-none' : ''}`}>
                {content.map((item, index) => (
                    <Content 
                        key={index} 
                        {...item} 
                        onPreviewOpen={() => openPreview(index)}
                        disabled={isAnimating}
                    />
                ))}
            </div>
            
            {/* Overlay - CSS: .overlay */}
            <div className="fixed top-0 left-0 w-full h-full grid grid-cols-1 pointer-events-none grid-rows-[repeat(2,1fr)]">
                <div 
                    ref={overlay1Ref}
                    className="bg-black scale-y-0 will-change-transform origin-[50%_0%]"
                />
                <div 
                    ref={overlay2Ref}
                    className="bg-black scale-y-0 will-change-transform origin-[50%_100%]"
                />
            </div>
            
            {/* Previews - CSS: .previews */}
            <section className="relative grid-area-content pointer-events-none">
                {previews.map((preview, index) => (
                    <Preview 
                        key={index} 
                        {...preview} 
                        isActive={activePreview === index}
                        onClose={closePreview}
                    />
                ))}
            </section>
        </main>
    )
}