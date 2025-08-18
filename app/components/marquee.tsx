"use client"

import React, { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useSpring,
  useTransform,
  type PanInfo,
  MotionValue,
  useAnimationFrame
} from "motion/react";
import normalizeWheel from "normalize-wheel";
import { useWindowSize } from "@react-hook/window-size";

type MarqueeItemData = {
  name: string;
  image: string;
  link: string;
};

type MarqueeItemProps = {
  children: React.ReactNode;
  speed: MotionValue<any>;
};

export function MarqueeItem(props: MarqueeItemProps) {
  const { children, speed } = props;

  const itemRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useRef(0);
  const [width, height] = useWindowSize();

  const setX = () => {
    if (!itemRef.current || !rectRef.current) {
      return;
    }

    const xPercentage = (x.current / rectRef.current.width) * 100;

    if (xPercentage < -100) {
      x.current = 0;
    }

    if (xPercentage > 0) {
      x.current = -rectRef.current.width;
    }

    itemRef.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
  };

  useEffect(() => {
    if (itemRef.current) {
      rectRef.current = itemRef.current.getBoundingClientRect();
    }
  }, [width, height]);

  // Using Framer Motion's useAnimationFrame instead of useRafLoop
  useAnimationFrame(() => {
    x.current -= speed.get();
    setX();
  });

  return (
    <motion.div className="marquee-item flex-shrink-0" ref={itemRef}>
      {children}
    </motion.div>
  );
};

type InteractiveMarqueeProps = {
  items: MarqueeItemData[];
  speed?: number;
  threshold?: number;
  wheelFactor?: number;
  dragFactor?: number;
};

export function InteractiveMarquee({
  items,
  speed = 1,
  threshold = 0.014,
  wheelFactor = 1.8,
  dragFactor = 1.2,
}: InteractiveMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const slowDown = useRef(false);
  const isScrolling = useRef<NodeJS.Timeout | null>(null);

  const x = useRef(0);
  const [wWidth] = useWindowSize();
  const speedSpring = useSpring(speed, {
    damping: 40,
    stiffness: 90,
    mass: 5
  });

  const opacity = useTransform(
    speedSpring,
    [-wWidth * 0.05, 0, wWidth * 0.05],
    [1, 0, 1]
  );
  const skewX = useTransform(
    speedSpring,
    [-wWidth * 0.05, 0, wWidth * 0.05],
    [1, 0, 1]
  );

  const handleOnWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const normalized = normalizeWheel(e);

    x.current = normalized.pixelY * wheelFactor;

    if (isScrolling.current) {
      window.clearTimeout(isScrolling.current);
    }

    isScrolling.current = setTimeout(() => {
      speedSpring.set(speed);
    }, 30);
  };

  const handleDragStart = () => {
    slowDown.current = true;
    if (marqueeRef.current) {
      marqueeRef.current.classList.add("drag");
    }
    speedSpring.set(0);
  };

  const handleOnDrag = (_: any, info: PanInfo) => {
    speedSpring.set(dragFactor * -info.delta.x);
  };

  const handleDragEnd = () => {
    slowDown.current = false;
    if (marqueeRef.current) {
      marqueeRef.current.classList.remove("drag");
    }
    x.current = speed;
  };

  const loop = useCallback(() => {
    if (slowDown.current || Math.abs(x.current) < threshold) {
      return;
    }

    x.current *= 0.66;

    if (x.current < 0) {
      x.current = Math.min(x.current, 0);
    } else {
      x.current = Math.max(x.current, 0);
    }

    speedSpring.set(speed + x.current);
  }, [speed, threshold, speedSpring]);

  // Using Framer Motion's useAnimationFrame instead of useRafLoop
  useAnimationFrame(loop);

  return (
    <div className="relative overflow-hidden">
      <motion.div className="marquee-bg" style={{ opacity }} />
      <motion.div
        className="marquee flex items-center cursor-grab active:cursor-grabbing"
        ref={marqueeRef}
        style={{ skewX }}
        onWheel={handleOnWheel}
        drag="x"
        dragPropagation={true}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDrag={handleOnDrag}
        onDragEnd={handleDragEnd}
        dragElastic={0.000001}
      >
        {/* First set of items */}
        <MarqueeItem speed={speedSpring}>
          <div className="flex items-center space-x-8">
            {items.map((item, index) => (
              <a
                key={`${item.name}-${index}-1`}
                href={item.link}
                className="flex items-center justify-center p-4 hover:scale-105 transition-transform"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </MarqueeItem>
        
        {/* Duplicate set for infinite scroll */}
        <MarqueeItem speed={speedSpring}>
          <div className="flex items-center space-x-8">
            {items.map((item, index) => (
              <a
                key={`${item.name}-${index}-2`}
                href={item.link}
                className="flex items-center justify-center p-4 hover:scale-105 transition-transform"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </MarqueeItem>
      </motion.div>
    </div>
  );
}

