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
        // Pin the previous section and animate the current one sliding up
        const animation = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start:"top top",
                end:()=>`+=${(cards.length * cardHeight) + header.offsetHeight}`,
                scrub: true,
            }
        });

        // Pin each section when it reaches the top
        sections.forEach((section, index) => {
            if(index > 0){
                animation.to(section, {y:index * cardHeight, duration:index*0.5, ease:"none"},0)
            }
        })

    }, []);

    return (
        <>
        <div className="h-screen w-screen bg-gradient-to-br from-gray-600 to-gray-700">
        <h1 className="text-white text-4xl font-bold">This section does not pin and scrolls normally</h1>
        </div>
        <div ref={containerRef} id="smooth-wrapper">
            <div id="smooth-content">
            {sections.map((section, index) => (
                <section
                key={section.id}
                className={`stack-section h-screen flex items-center justify-center relative ${section.bg}`}
                style={{ zIndex: sections.length - index }}
                >
                <div className="text-center text-white px-8">
                    <h1 className="text-6xl font-bold mb-4 font-sans">{section.title}</h1>
                    <h2 className="text-2xl mb-6 opacity-80">{section.subtitle}</h2>
                    <p className="text-lg max-w-2xl mx-auto leading-relaxed">{section.content}</p>
                    <div className="mt-8">
                    <div className="inline-block px-6 py-3 border-2 border-white/30 rounded-full text-sm tracking-wider">
                        Section {section.id} of {sections.length}
                    </div>
                    </div>
                </div>
    
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-20 w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="absolute top-1/3 right-32 w-3 h-3 bg-white/20 rounded-full"></div>
                </section>
            ))}
    
            {/* Extra spacing for smooth scroll end */}
            <div className="h-screen"></div>
            </div>
        </div>
        </>
    )
}