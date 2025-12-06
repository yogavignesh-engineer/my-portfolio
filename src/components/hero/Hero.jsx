import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useMouseParallax';

import EmberParticles from './EmberParticles';
import BackgroundElements from './BackgroundElements';
import HeroContent from './HeroContent';

// 1. THE VISUAL LAYER (Fixed to viewport)
const FixedContainer = styled(motion.div)`
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh; 
  background-color: #F9F9F9;
  color: #111;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  z-index: 0; /* Stays behind everything else */
  
  /* Cinematic Vignette - Enhanced */
  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 50vh;
    background: linear-gradient(
      to bottom, 
      transparent 0%, 
      rgba(0, 0, 0, 0.3) 40%,
      rgba(0, 0, 0, 0.6) 70%,
      rgba(0, 0, 0, 0.85) 100%
    );
    pointer-events: none;
    z-index: 5;
  }
  
  /* Side Vignette for full cinematic effect */
  &::before {
    content: '';
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 40%,
      rgba(0, 0, 0, 0.15) 70%,
      rgba(0, 0, 0, 0.4) 100%
    );
    pointer-events: none;
    z-index: 5;
  }
`;

// 2. THE STRUCTURAL LAYER (Invisible Spacer)
// This pushes the About section down by 100vh so it starts below the fold
const Spacer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: -1;
  pointer-events: none; /* Let clicks pass through to the fixed hero underneath if needed */
  margin: 0;
  padding: 0;
`;

const Hero = React.forwardRef((props, ref) => {
  const { xSpring, ySpring } = useMouseParallax();

  return (
    <>
      {/* The Visible Hero (Fixed) */}
      <FixedContainer
        key="hero"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <EmberParticles /> 
        <BackgroundElements xSpring={xSpring} ySpring={ySpring} />
        <HeroContent xSpring={xSpring} ySpring={ySpring} />
      </FixedContainer>

      {/* The Invisible Spacer (Holds the layout place) */}
      <Spacer ref={ref} />
    </>
  );
});

Hero.displayName = 'Hero';

export default memo(Hero);