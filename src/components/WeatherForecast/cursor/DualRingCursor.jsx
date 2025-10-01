import React, { useEffect, useRef } from 'react';
import './cursor.css';

export default function DualRingCursor() {
  const mainRef = useRef(null);
  const followerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let animationFrame;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Occasionally spawn a particle
      if (Math.random() < 0.18) {
        spawnParticle(mouseX, mouseY);
      }
    };

    const animate = () => {
      // Smooth follow for follower
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      if (mainRef.current) {
        mainRef.current.style.left = mouseX + 'px';
        mainRef.current.style.top = mouseY + 'px';
      }
      if (followerRef.current) {
        followerRef.current.style.left = followerX + 'px';
        followerRef.current.style.top = followerY + 'px';
      }
      animationFrame = requestAnimationFrame(animate);
    };

    const spawnParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'cursor-particle cursor-droplet';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.background = pickNeon();
      // Give each droplet a random rotation and horizontal drift
      const drift = (Math.random() - 0.5) * 24; // px
      const rot = (Math.random() - 0.5) * 40; // deg
      particle.style.setProperty('--droplet-drift', `${drift}px`);
      particle.style.setProperty('--droplet-rot', `${rot}deg`);
      document.body.appendChild(particle);
      setTimeout(() => {
        particle.classList.add('droplet-fall');
      }, 10);
      setTimeout(() => {
        document.body.removeChild(particle);
      }, 900);
    };

    const pickNeon = () => {
      const colors = [
        'radial-gradient(circle, #5090c4c0 0%, #3b6cc2ff 100%)', // cyan
        'radial-gradient(circle, #0066ffff 0%, #295bd1c1 100%)', // magenta
        'radial-gradient(circle, #2c68c7ff 0%, #3f6ec0c5 100%)', // yellow
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', moveCursor);
    animate();
    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Hover glow for interactive elements
  useEffect(() => {
    const addGlow = (e) => {
      if (mainRef.current) mainRef.current.classList.add('cursor-glow');
    };
    const removeGlow = (e) => {
      if (mainRef.current) mainRef.current.classList.remove('cursor-glow');
    };
    const selectors = 'a, button, input, textarea, select, [role="button"], .cursor-glow-target';
    const nodes = document.querySelectorAll(selectors);
    nodes.forEach(node => {
      node.addEventListener('mouseenter', addGlow);
      node.addEventListener('mouseleave', removeGlow);
    });
    return () => {
      nodes.forEach(node => {
        node.removeEventListener('mouseenter', addGlow);
        node.removeEventListener('mouseleave', removeGlow);
      });
    };
  }, []);

  return (
    <>
      <div ref={mainRef} className="dualring-cursor-main" />
      <div ref={followerRef} className="dualring-cursor-follower" />
    </>
  );
}
