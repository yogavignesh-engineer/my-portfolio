/**
 * Page Transition Component
 * 
 * Cinematic route transitions with mechanical curtain effects
 * Supports: slide, wipe, curtain, pixelate, glitch
 */

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

// --- STYLED COMPONENTS ---
const TransitionWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  overflow: hidden;
`;

const CurtainPanel = styled(motion.div)`
  position: absolute;
  background: ${props => props.theme?.colors?.steel || '#B0B8C1'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }
`;

const MechanicalGear = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '80px'};
  height: ${props => props.size || '80px'};
  border: 3px solid ${props => props.theme?.colors?.brass || '#D4A574'};
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: ${props => props.theme?.colors?.brass || '#D4A574'};
  }
  
  &::before {
    width: 100%;
    height: 3px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  
  &::after {
    width: 3px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
`;

const PixelGrid = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 20}, 1fr);
  grid-template-rows: repeat(${props => props.rows || 10}, 1fr);
  gap: 2px;
`;

const Pixel = styled(motion.div)`
  background: ${props => props.theme?.colors?.iron || '#3D3D3D'};
  width: 100%;
  height: 100%;
`;

const GlitchLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.color || '#66FCF1'};
  mix-blend-mode: screen;
  opacity: 0.8;
`;

const LoadingText = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  font-weight: 600;
  color: #EAEAEA;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  z-index: 10;
  
  &::after {
    content: '';
    display: inline-block;
    width: 3px;
    height: 1.2rem;
    background: #66FCF1;
    margin-left: 0.5rem;
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

// --- TRANSITION VARIANTS ---
const slideVariants = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '-100%' }
};

const wipeVariants = {
  initial: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
  animate: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
  exit: { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }
};

const curtainVariants = {
  initial: { scaleX: 0, transformOrigin: 'center' },
  animate: { scaleX: 1 },
  exit: { scaleX: 0 }
};

// --- MAIN COMPONENT ---
export default function PageTransition({ 
  isTransitioning, 
  variant = 'curtain',
  duration = 0.8,
  onComplete 
}) {
  const [showGears, setShowGears] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setShowGears(true);
      const timer = setTimeout(() => {
        setShowGears(false);
        onComplete?.();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, duration, onComplete]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <>
          {variant === 'slide' && <SlideTransition duration={duration} />}
          {variant === 'wipe' && <WipeTransition duration={duration} />}
          {variant === 'curtain' && <CurtainTransition duration={duration} showGears={showGears} />}
          {variant === 'pixelate' && <PixelateTransition duration={duration} />}
          {variant === 'glitch' && <GlitchTransition duration={duration} />}
        </>
      )}
    </AnimatePresence>
  );
}

// --- SLIDE TRANSITION ---
function SlideTransition({ duration }) {
  return (
    <TransitionWrapper
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
      style={{ background: '#050505' }}
    >
      <LoadingText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        LOADING
      </LoadingText>
    </TransitionWrapper>
  );
}

// --- WIPE TRANSITION ---
function WipeTransition({ duration }) {
  return (
    <TransitionWrapper
      variants={wipeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
      style={{ background: '#B0B8C1' }}
    />
  );
}

// --- CURTAIN TRANSITION ---
function CurtainTransition({ duration, showGears }) {
  const panelCount = 5;
  
  return (
    <TransitionWrapper>
      {[...Array(panelCount)].map((_, i) => (
        <CurtainPanel
          key={i}
          variants={curtainVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ 
            duration, 
            ease: [0.76, 0, 0.24, 1],
            delay: i * 0.1 
          }}
          style={{
            width: `${100 / panelCount}%`,
            height: '100%',
            left: `${(100 / panelCount) * i}%`,
            background: i % 2 === 0 ? '#3D3D3D' : '#B0B8C1'
          }}
        />
      ))}
      
      {showGears && (
        <>
          <MechanicalGear
            size="80px"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ top: '30%', left: '30%' }}
          />
          <MechanicalGear
            size="60px"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{ top: '60%', left: '70%' }}
          />
        </>
      )}
      
      <LoadingText
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        TRANSITIONING
      </LoadingText>
    </TransitionWrapper>
  );
}

// --- PIXELATE TRANSITION ---
function PixelateTransition({ duration }) {
  const cols = 20;
  const rows = 10;
  const totalPixels = cols * rows;
  
  return (
    <TransitionWrapper>
      <PixelGrid cols={cols} rows={rows}>
        {[...Array(totalPixels)].map((_, i) => (
          <Pixel
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: duration / 2,
              delay: (i / totalPixels) * (duration / 2),
              ease: 'easeOut'
            }}
          />
        ))}
      </PixelGrid>
    </TransitionWrapper>
  );
}

// --- GLITCH TRANSITION ---
function GlitchTransition({ duration }) {
  return (
    <TransitionWrapper>
      <GlitchLayer
        color="#FF0000"
        initial={{ x: 0, opacity: 0 }}
        animate={{ 
          x: [0, -10, 10, -5, 5, 0],
          opacity: [0, 0.8, 0.8, 0.8, 0.8, 0]
        }}
        transition={{ duration, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
      />
      <GlitchLayer
        color="#00FF00"
        initial={{ x: 0, opacity: 0 }}
        animate={{ 
          x: [0, 10, -10, 5, -5, 0],
          opacity: [0, 0.8, 0.8, 0.8, 0.8, 0]
        }}
        transition={{ duration, times: [0, 0.2, 0.4, 0.6, 0.8, 1], delay: 0.1 }}
      />
      <GlitchLayer
        color="#0000FF"
        initial={{ x: 0, opacity: 0 }}
        animate={{ 
          x: [0, -5, 5, -10, 10, 0],
          opacity: [0, 0.8, 0.8, 0.8, 0.8, 0]
        }}
        transition={{ duration, times: [0, 0.2, 0.4, 0.6, 0.8, 1], delay: 0.2 }}
      />
    </TransitionWrapper>
  );
}

// --- HOOK FOR PROGRAMMATIC TRANSITIONS ---
export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const startTransition = (callback, duration = 800) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      callback?.();
    }, duration / 2);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, duration);
  };
  
  return { isTransitioning, startTransition };
}

// --- USAGE EXAMPLE ---
/*
import PageTransition, { usePageTransition } from './components/PageTransition';

function App() {
  const { isTransitioning, startTransition } = usePageTransition();
  
  const handleNavigation = (sectionRef) => {
    startTransition(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  };
  
  return (
    <>
      <PageTransition 
        isTransitioning={isTransitioning}
        variant="curtain" // 'slide' | 'wipe' | 'curtain' | 'pixelate' | 'glitch'
        duration={1.2}
      />
      
      <button onClick={() => handleNavigation(worksRef)}>
        View Work
      </button>
    </>
  );
}
*/
