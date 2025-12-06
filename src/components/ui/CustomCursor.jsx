import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

// PERFORMANCE: Removed mix-blend-mode (causes full-page repaints in Chrome)
const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0; 
  left: 0;
  width: 16px; 
  height: 16px;
  background-color: rgba(17, 17, 17, 0.8);
  border: 2px solid rgba(17, 17, 17, 0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  
  /* PERFORMANCE: Force GPU acceleration */
  will-change: transform;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
`;

const CursorText = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #000;
  font-weight: 700;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

// --- MOTION PROPS ---
const variants = {
  default: { 
    width: 16, height: 16, borderRadius: '50%', 
    backgroundColor: 'rgba(17, 17, 17, 0.8)',
    borderColor: 'rgba(17, 17, 17, 0.4)'
  },
  button: { 
    width: 60, height: 60, borderRadius: '50%', 
    backgroundColor: 'rgba(102, 252, 241, 0.2)',
    borderColor: 'rgba(102, 252, 241, 0.8)'
  },
  text: { 
    width: 100, height: 100, borderRadius: '50%', 
    backgroundColor: 'rgba(17, 17, 17, 0.1)',
    borderColor: 'rgba(17, 17, 17, 0.3)'
  },
  crosshair: {
    width: 40, height: 40, borderRadius: '0%', 
    backgroundColor: 'transparent',
    borderColor: '#66FCF1', scale: 1.2
  }
};

const crosshairLineStyle = { position: 'absolute', background: '#66FCF1' };

export default function CustomCursor() {
  const { cursorState } = useCursor() || { cursorState: { mode: 'default' } };
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // PERFORMANCE: Optimized spring for 60fps cursor tracking
  const springConfig = { damping: 25, stiffness: 200, mass: 0.3, restSpeed: 0.001, restDelta: 0.001 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on devices with fine pointer (desktop)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsVisible(mediaQuery.matches);
    
    const handleChange = (e) => setIsVisible(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let rafId = null;
    
    const moveCursor = (e) => {
      if (rafId) return; // Throttle to RAF
      
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        rafId = null;
      });
    };
    
    // PERFORMANCE: Passive listener
    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY, isVisible]);

  // PERFORMANCE: Memoize the style object to prevent recreation on re-render.
  // MUST be before any conditional returns to follow Rules of Hooks
  const style = useMemo(() => ({
    x: cursorXSpring,
    y: cursorYSpring,
  }), [cursorXSpring, cursorYSpring]);

  // PERFORMANCE: Memoize transition optimized for 60fps
  // MUST be before any conditional returns to follow Rules of Hooks
  const transition = useMemo(() => ({ 
    type: "spring", 
    stiffness: 200, 
    damping: 25,
    mass: 0.3,
    restSpeed: 0.001
  }), []);

  // Conditional return AFTER all hooks
  if (!isVisible) return null;

  return (
    <CursorDot
      animate={cursorState.mode}
      variants={variants}
      transition={transition}
      style={style}
    >
      {/* Conditionally render text/elements based on cursor mode */}
      <CursorText style={{ opacity: cursorState.mode === 'text' ? 1 : 0 }}>
        {cursorState.text}
      </CursorText>

      {cursorState.mode === 'crosshair' && (
        <>
          <div style={{ ...crosshairLineStyle, width: '100%', height: '1px' }} />
          <div style={{ ...crosshairLineStyle, height: '100%', width: '1px' }} />
        </>
      )}
    </CursorDot>
  );
}