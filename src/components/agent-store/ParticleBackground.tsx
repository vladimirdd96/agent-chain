"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create local references to avoid null checks
    const canvasElement = canvas;
    const canvasContext = ctx;

    // Set canvas size
    const resizeCanvas = () => {
      canvasElement.width = window.innerWidth;
      canvasElement.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvasElement.width;
        this.y = Math.random() * canvasElement.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;

        // Random colors from the brand palette
        const colors = [
          "rgba(168, 85, 247, ", // purple-400
          "rgba(59, 130, 246, ", // blue-500
          "rgba(236, 72, 153, ", // pink-500
          "rgba(34, 197, 94, ", // green-500
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > canvasElement.width) this.x = 0;
        if (this.x < 0) this.x = canvasElement.width;
        if (this.y > canvasElement.height) this.y = 0;
        if (this.y < 0) this.y = canvasElement.height;

        // Subtle opacity pulsing
        this.opacity += (Math.random() - 0.5) * 0.01;
        this.opacity = Math.max(0.05, Math.min(0.4, this.opacity));
      }

      draw() {
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        canvasContext.fillStyle = this.color + this.opacity + ")";
        canvasContext.fill();

        // Add a subtle glow
        canvasContext.shadowColor = this.color + "0.3)";
        canvasContext.shadowBlur = this.size * 2;
        canvasContext.fill();
        canvasContext.shadowBlur = 0;
      }
    }

    // Create particles
    const particleCount = 50;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            canvasContext.beginPath();
            canvasContext.moveTo(particle.x, particle.y);
            canvasContext.lineTo(otherParticle.x, otherParticle.y);
            canvasContext.strokeStyle = `rgba(168, 85, 247, ${
              0.1 * (1 - distance / 100)
            })`;
            canvasContext.lineWidth = 0.5;
            canvasContext.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default ParticleBackground;
