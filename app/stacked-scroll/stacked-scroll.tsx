import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);
const animation = gsap.timeline()

const sections = [
    {
      id: 1,
      title: "Welcome",
      subtitle: "First Section",
      bg: "bg-gradient-to-br from-blue-600 to-purple-700",
      content: "This is the first section that introduces our stacking animation.",
    },
    {
      id: 2,
      title: "About",
      subtitle: "Second Section",
      bg: "bg-gradient-to-br from-green-600 to-teal-700",
      content: "Watch as this section slides up and stacks on top of the previous one.",
    },
    {
      id: 3,
      title: "Services",
      subtitle: "Third Section",
      bg: "bg-gradient-to-br from-orange-600 to-red-700",
      content: "Each section creates a beautiful stacking effect as you scroll.",
    },
    {
      id: 4,
      title: "Portfolio",
      subtitle: "Fourth Section",
      bg: "bg-gradient-to-br from-purple-600 to-pink-700",
      content: "The smooth scrolling enhances the overall user experience.",
    },
    {
      id: 5,
      title: "Contact",
      subtitle: "Final Section",
      bg: "bg-gradient-to-br from-indigo-600 to-blue-700",
      content: "This is the final section in our stacking animation demo.",
    },
];

export default function StackedScroll() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.stack-section');
        
        if (cards.length === 0) return;
        
        const initCards = () => {
            const cardHeight = cards[0]?.offsetHeight || window.innerHeight;
            console.log("initCards()", cardHeight);
            
            // Clear any existing animations
            gsap.killTweensOf(cards);
            
            // Set initial positions - stack cards on top of each other with offsets
            cards.forEach((card, index) => {
                if (index > 0) {
                    // Increment y value of each card by cardHeight (stack them)
                    gsap.set(card, { y: index * cardHeight });
                }
            });
            
            // Create the main timeline for the stacking animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${cards.length * cardHeight}`,
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    markers: true, // Remove in production
                }
            });
            
            // Animate each card back to 0 (for stacking effect)
            cards.forEach((card, index) => {
                if (index > 0) {
                    tl.to(card, {
                        y: 0,
                        duration: index * 0.5,
                        ease: "none"
                    }, 0); // All animations start at the same time
                }
            });
        };
        
        // Initialize cards
        initCards();
        
        // Reinitialize on resize
        const handleResize = () => {
            ScrollTrigger.refresh();
            initCards();
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, { scope: containerRef });

    return (
        <>
            {/* Header section that scrolls normally */}
            <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-6xl font-bold mb-4">Stacked Cards Demo</h1>
                    <p className="text-xl opacity-80">Scroll down to see the stacking animation</p>
                    <div className="mt-8 animate-bounce">
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Stacked sections container */}
            <div ref={containerRef} className="relative">
                {sections.map((section, index) => (
                    <section
                        key={section.id}
                        className={`stack-section h-screen flex items-center justify-center absolute top-0 left-0 w-full ${section.bg}`}
                        style={{ 
                            zIndex: index + 1,
                        }}
                    >
                        <div className="text-center text-white px-8 max-w-4xl">
                            <h1 className="text-6xl font-bold mb-4 font-sans">{section.title}</h1>
                            <h2 className="text-2xl mb-6 opacity-80">{section.subtitle}</h2>
                            <p className="text-lg max-w-2xl mx-auto leading-relaxed mb-8">{section.content}</p>
                            <div className="inline-block px-6 py-3 border-2 border-white/30 rounded-full text-sm tracking-wider">
                                Section {section.id} of {sections.length}
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
                        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full"></div>
                        <div className="absolute top-1/2 left-20 w-2 h-2 bg-white/30 rounded-full"></div>
                        <div className="absolute top-1/3 right-32 w-3 h-3 bg-white/20 rounded-full"></div>
                        
                        {/* Card number indicator */}
                        <div className="absolute top-8 right-8 text-white/50 text-sm font-mono">
                            {String(section.id).padStart(2, '0')}
                        </div>
                    </section>
                ))}
            </div>

            {/* Footer section that scrolls normally */}
            <div 
                className="h-screen w-screen bg-gradient-to-br from-gray-800 to-black flex items-center justify-center"
                style={{
                    zIndex: sections.length + 1,
                }}
            >
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">End of Demo</h1>
                    <p className="text-lg opacity-80">The stacking animation is complete!</p>
                </div>
            </div>
        </>
    );
}