import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import GlobalStyles from './styles/GlobalStyles';
import { CursorProvider } from './context/CursorContext';
import { usePageTracking, useScrollDepthTracking } from './hooks/useAnalytics';
import { useTouchOptimization } from './hooks/useTouchGestures';

import HeroNavbar from './components/hero/HeroNavbar';
import CustomCursor from './components/ui/CustomCursor';
import Grain from './components/ui/Grain';
import HeroLoader from './components/hero/HeroLoader';
import KonamiCode from './KonamiCode';
import AvailabilityBadge from './components/ui/AvailabilityBadge';
import PerformanceMonitor from './components/ui/PerformanceMonitor';

// Route Pages
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFound from './pages/NotFound';

const SkipToContent = styled.a`
  position: fixed;
  top: -100px;
  left: 20px;
  z-index: 9999;
  padding: 1rem 2rem;
  background: #FF6B35;
  color: white;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  border-radius: 4px;
  transition: top 0.3s ease;
  
  &:focus {
    top: 20px;
    outline: 3px solid #66FCF1;
    outline-offset: 4px;
  }
`;

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);
  const location = useLocation();

  // Analytics tracking
  usePageTracking(location);
  useScrollDepthTracking();
  
  // Touch optimization for mobile devices
  useTouchOptimization();

  useEffect(() => {
    // Handle hash navigation (e.g., /#works)
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash.replace('#', ''));
        if (element && lenisRef.current) {
          lenisRef.current.scrollTo(element, {
            duration: 0.8,
            offset: 0
          });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true,
      lerp: 0.08,
      infinite: false,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchInertiaMultiplier: 25,
      prevent: (node) => node.classList.contains('lenis-prevent') || node.hasAttribute('data-lenis-prevent'),
      autoResize: true,
      normalizeWheel: true
    });
    
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleNavClick = (section) => {
    // For router-based navigation, navigate to home with hash
    window.location.href = `/#${section.toLowerCase().replace(' ', '-')}`;
  };

  return (
    <CursorProvider>
      <GlobalStyles />
      <CustomCursor />
      <Grain />
      <KonamiCode />
      
      {/* Skip to content link for accessibility */}
      <SkipToContent href="#main-content">Skip to main content</SkipToContent>

      {!loading && <HeroNavbar onNavClick={handleNavClick} />}

      <AnimatePresence mode="wait">
        {loading && <HeroLoader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:projectId" element={<ProjectDetailPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Availability Badge - only show after loading */}
          <AvailabilityBadge 
            status="both"
            position="fixed"
            email="yogavignesh.dev@gmail.com"
            isDark={false}
            showPopover={true}
          />
          
          {/* Performance Monitor - Toggle with Ctrl+Shift+P */}
          <PerformanceMonitor enabled={true} />
        </>
      )}
    </CursorProvider>
  );
}

export default App;