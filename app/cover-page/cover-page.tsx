
"use client"

import { useState, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import Preview from "../components/preview"
import Content from "../components/content"


// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const content = [
    {
        year: 2025,
        title: "Aaron Kai",
        image: "img/aaron-kai_banner.png",
        description: "I PAINT THE MOVIES... And almost anything else.",
        link: "https://www.aaronkai.com/",
    },
    {
        year: 2025,
        title: "Good Charlotte",
        image: "img/good-charlotte_banner.png",
        description: "Good Charlotte is an American rock band formed in Waldorf, Maryland, in 1995. Since 2005, the band's lineup has consisted of Joel Madden, Benji Madden, Paul Thomas, Billy Martin, and Dean Butterworth. The band released their self-titled debut album in 2000",
        link: "https://www.goodcharlotte.com/",
    },
    {
        year: 2024,
        title: "Astro Boy Reimagined",
        image: "img/astro-boy_banner.png",
        description: "Get ready to elevate your collection featuring ASTRO BOY: REIMAGINED – a bold collaboration between ANIME Impulse and Tezuka Productions, bringing a meticulously crafted 1000% collectible and exclusive limited-edition releases into a new era of premium collectibles.",
        link: "https://astroboy.ai/",
    },
    {
        year: 2025,
        title: "Steve Aoki",
        image: "img/steve-aoki_banner.png",
        description: "Steven Hiroyuki Aoki is a Grammy-nominated DJ and record producer known for his jet-setting lifestyle and throwing cake into the crowd. In 2012, Pollstar named him the highest-grossing touring dance artist in North America. ",
        link: "https://steveaoki.com/",
    },
]

const previews = [
    {
        year: 2025,
        title: "Aaron Kai",
        shortTitle: "Aaron Kai",
        image: "img/aaron-kai_banner.png",
        largeImage: "img/aaron-kai_banner.png",
    },
    {
        year: 2025,
        title: "Good Charlotte", 
        shortTitle: "Good Charlotte",
        image: "img/good-charlotte_banner.png",
        largeImage: "img/good-charlotte_banner.png",
    },
    {
        year: 2024,
        title: "Astro Boy Reimagined",
        shortTitle: "Astro Boy Reimagined", 
        image: "img/astro-boy_banner.png",
        largeImage: "img/astro-boy_banner.png",
    },
    {
        year: 2025,
        title: "Steve Aoki",
        shortTitle: "Steve Aoki",
        image: "img/steve-aoki_banner.png",
        largeImage: "img/steve-aoki_banner.png",
    },
]

export function CoverPage() {
    const [activePreview, setActivePreview] = useState<number | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [contentHidden, setContentHidden] = useState(false)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    
    const overlay1Ref = useRef<HTMLDivElement>(null)
    const overlay2Ref = useRef<HTMLDivElement>(null)
    const mainRef = useRef<HTMLElement>(null)
    const contentSwiperRef = useRef<SwiperType | null>(null)
    const previewSwiperRef = useRef<SwiperType | null>(null)

    const openPreview = useCallback((index: number) => {
        if (isAnimating) return
        
        setIsAnimating(true)
        setActivePreview(index)
        
        // Sync preview swiper to the same slide
        if (previewSwiperRef.current) {
            previewSwiperRef.current.slideTo(index, 0) // No transition for instant sync
        }
        
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
    }, [isAnimating])

    const closePreview = useCallback(() => {
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
            .add(() => {
                setContentHidden(false)
                setIsAnimating(false)
            }, 'grid+=1')
    }, [isAnimating])

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setCurrentSlideIndex(swiper.activeIndex)
    }, [])

    return (
        <main 
            ref={mainRef}
            className="p-6 h-screen grid grid-template-main gap-y-[8vh] m-0"
        >
            {/* Content Swiper - CSS: .content */}
            <div className={`grid-area-content ${contentHidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
                <Swiper
                    modules={[Navigation, Pagination, Keyboard]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.swiper-button-next-content',
                        prevEl: '.swiper-button-prev-content',
                    }}
                    pagination={{ 
                        clickable: true,
                        el: '.swiper-pagination-content'
                    }}
                    keyboard={{
                        enabled: activePreview === null, // Only enable when preview is not active
                        onlyInViewport: true,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        }
                    }}
                    onSwiper={(swiper) => {
                        contentSwiperRef.current = swiper
                    }}
                    onSlideChange={handleSlideChange}
                    className="w-full h-full"
                    style={{
                        '--swiper-navigation-color': '#000',
                        '--swiper-pagination-color': '#000',
                    } as React.CSSProperties}
                >
                    {content.map((item, index) => (
                        <SwiperSlide key={index} className="flex justify-center">
                            <div className="w-full">
                                <Content 
                                    {...item} 
                                    onPreviewOpen={() => openPreview(index)}
                                    disabled={isAnimating}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                    
                    {/* Custom Navigation - Only visible when preview is not active */}
                    <div className={`swiper-button-prev-content absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/60 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 ${
                        activePreview !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15,18 9,12 15,6"></polyline>
                        </svg>
                    </div>
                    <div className={`swiper-button-next-content absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/60 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 ${
                        activePreview !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9,18 15,12 9,6"></polyline>
                        </svg>
                    </div>
                    
                    {/* Custom Pagination - Only visible when preview is not active */}
                    <div className={`swiper-pagination-content absolute bottom-4 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${
                        activePreview !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}></div>
                </Swiper>
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
            
            {/* Preview Swiper - CSS: .previews */}
            <section className="relative grid-area-content pointer-events-none">
                <Swiper
                    modules={[]}
                    spaceBetween={0}
                    slidesPerView={1}
                    allowTouchMove={false} // Disable touch/swipe navigation
                    keyboard={{
                        enabled: false, // Disable keyboard navigation
                    }}
                    onSwiper={(swiper) => {
                        previewSwiperRef.current = swiper
                    }}
                    className="w-full h-full"
                >
                    {previews.map((preview, index) => (
                        <SwiperSlide key={index}>
                            <Preview 
                                {...preview} 
                                isActive={activePreview === index}
                                onClose={closePreview}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </main>
    )
}