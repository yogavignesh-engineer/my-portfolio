import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Section = styled.section`
  position: relative;
  padding: 10rem 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ParallaxTrack = styled(motion.div)`
  display: flex;
  gap: 10vw;
  white-space: nowrap;
  
  /* CRITICAL: Isolate large text rendering */
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  contain: layout style paint;
`;

const Year = styled.span`
  font-family: 'Oswald', sans-serif;
  font-size: 25vw;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1;
  
  /* GPU OPTIMIZATIONS */
  transform: translateZ(0);
  contain: layout style paint;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
`;

const OverlayContent = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 5;
  padding: 0 5vw;
  
  /* Prevent layout thrashing */
  contain: layout style;
  
  @media (max-width: 768px) { 
    flex-direction: column; 
    gap: 2rem; 
  }
`;

const FloatingImage = styled.div`
  width: 200px;
  height: 250px;
  background: #333;
  
  /* GPU LAYER */
  will-change: transform;
  transform: translateZ(0);
  
  img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    filter: grayscale(100%);
  }
`;

const Quote = styled.h2`
  font-size: 2rem;
  max-width: 400px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 400;
  line-height: 1.2;
  
  /* Prevent text reflow */
  contain: layout style;
  
  @media (max-width: 768px) { 
    font-size: 1.5rem; 
    text-align: center; 
  }
`;

const TimelineParallax = React.memo(() => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const x = useSpring(xRaw, { 
    damping: 30, 
    stiffness: 100,
    mass: 0.5
  });

  // PERFORMANCE: use .webp
  const imageUrl = "/about-image-1.webp";

  return (
    <Section ref={ref}>
      <ParallaxTrack style={{ x }}>
        <Year>2023</Year>
        <Year>2024</Year>
        <Year>2025</Year>
        <Year>2026</Year>
      </ParallaxTrack>

      <OverlayContent>
        <Quote>For me, a website is not just code on a screen.</Quote>
        <FloatingImage>
             <img src={imageUrl} alt="Coding" loading="lazy" />
        </FloatingImage>
      </OverlayContent>
    </Section>
  );
});

TimelineParallax.displayName = 'TimelineParallax';

export default TimelineParallax;