"use client"

import { useRef } from 'react'
import { gsap } from 'gsap'

type ContentProps = {
    year: number
    title: string
    image: string   
    description: string
    link: string
    onPreviewOpen: () => void
    disabled?: boolean
}

export default function Content({ year, title, image, description, link, onPreviewOpen, disabled }: ContentProps) {
    const imageInnerRef = useRef<HTMLDivElement>(null)

    const handleMouseEnter = () => {
        if (disabled) return
        
        const imageInner = imageInnerRef.current
        if (!imageInner) return
        
        gsap.killTweensOf(imageInner)
        gsap.to(imageInner, {
            duration: 2,
            ease: 'power4',
            scale: 1.2
        })
    }

    const handleMouseLeave = () => {
        if (disabled) return
        
        const imageInner = imageInnerRef.current
        if (!imageInner) return
        
        gsap.killTweensOf(imageInner)
        gsap.to(imageInner, {
            duration: 0.7,
            ease: 'expo',
            scale: 1
        })
    }

    const handleClick = () => {
        if (disabled) return
        onPreviewOpen()
    }

    return (
        <div className="mb-20 grid grid-cols-1 grid-rows-[1rem_auto_auto_1fr_auto] md:mb-0">
            <span className="text-current">{year}</span>
            <h2 className="font-light text-[2rem] mb-2 font-[kudryashev-d-excontrast-sans,sans-serif] md:text-[clamp(1.25rem,3vw,2rem)]">{title}</h2>
            <div className="relative overflow-hidden w-full aspect-[500/333]">
                <div 
                    ref={imageInnerRef}
                    className="bg-center bg-cover w-full h-full bg-[50%_45%]" 
                    style={{backgroundImage:`url(${image})`}}
                />
            </div>
            <p className="mt-10 leading-tight">{description}</p>
            <button 
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                disabled={disabled}
                className="cursor-pointer lowercase w-full p-4 text-current border border-[#a0988a] rounded-[2rem] text-center hover:bg-black hover:border-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
                view
            </button>
        </div>
    )
}