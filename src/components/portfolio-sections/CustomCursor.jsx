import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const handleElementHover = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    // Track mouse movement
    window.addEventListener('mousemove', updateMousePosition);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Add listeners to all interactive elements
    const interactiveSelectors = 'a, button, input, textarea, select, [role="button"]';
    
    // Create a MutationObserver to watch for dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial attachment
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  // Use spring animation for the outer ring (realistic delay/weight)
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'transparent',
      border: '2px solid rgba(139, 92, 246, 0.5)', // Purple/neon blue tint
      transition: { type: "spring", mass: 0.1, stiffness: 200, damping: 20 }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      border: '2px solid rgba(139, 92, 246, 0.8)',
      transition: { type: "spring", mass: 0.1, stiffness: 200, damping: 20 }
    }
  };

  // Center dot has no spring, it follows instantly
  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 1,
      opacity: 1
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 0,
      opacity: 0
    }
  };

  if (isHidden) return null;

  return (
    <>
      {/* Center dot */}
      <motion.div
        variants={dotVariants}
        animate={isHovering ? "hover" : "default"}
        transition={{ duration: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#8b5cf6',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference'
        }}
      />
      {/* Outer ring */}
      <motion.div
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          backdropFilter: isHovering ? 'blur(2px)' : 'none'
        }}
      />
      <style>{`
        /* Hide default cursor globally when in Portfolio View */
        .portfolio-container, .portfolio-container * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
