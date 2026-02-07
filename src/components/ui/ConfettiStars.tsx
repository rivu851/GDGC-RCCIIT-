"use client";

import confetti from "canvas-confetti";

let toastContainer: HTMLDivElement | null = null;
let isAnimating = false; // Prevent duplicate calls

function getOrCreateToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 32px;
      right: 40px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    `;
    
    // Make it responsive for mobile
    if (window.innerWidth < 768) {
      toastContainer.style.bottom = "20px";
      toastContainer.style.right = "20px";
    }
    
    document.body.appendChild(toastContainer);
    
    // Add keyframe animations
    if (!document.getElementById("toast-animations")) {
      const style = document.createElement("style");
      style.id = "toast-animations";
      style.textContent = `
        @keyframes fadeInFromBottom {
          0% {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        @keyframes fadeOut {
          0% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            filter: blur(8px);
          }
        }
        @keyframes borderRotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  return toastContainer;
}

function showToast(message: string, delay: number = 0, duration: number = 2000) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      const container = getOrCreateToastContainer();
      const toast = document.createElement("div");
      
      const isMobile = window.innerWidth < 768;
      
      // Outer wrapper with animated border
      toast.style.cssText = `
        position: relative;
        background: linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853, #4285F4, #EA4335);
        background-size: 300% 100%;
        padding: 2px;
        border-radius: 10px;
        animation: fadeInFromBottom 0.6s ease-out, borderRotate 3s linear infinite;
        pointer-events: auto;
        max-width: ${isMobile ? '280px' : '400px'};
        opacity: 1;
      `;
      
      // Inner content with dark background
      const content = document.createElement("div");
      content.style.cssText = `
        background: rgba(0, 0, 0, 0.92);
        color: white;
        padding: ${isMobile ? '10px 14px' : '12px 18px'};
        border-radius: 8px;
        font-weight: 600;
        font-size: ${isMobile ? '13px' : '15px'};
        line-height: 1.4;
        word-wrap: break-word;
        backdrop-filter: blur(10px);
      `;
      
      content.textContent = message;
      toast.appendChild(content);
      container.appendChild(toast);
      
      // Fade out
      setTimeout(() => {
        toast.style.animation = "fadeOut 0.8s ease-out forwards, borderRotate 3s linear infinite";
        setTimeout(() => {
          if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
          }
          resolve();
        }, 800); // Wait for fade out animation
      }, duration);
    }, delay);
  });
}

export async function triggerConfettiStars() {
  // Prevent duplicate triggers
  if (isAnimating) return;
  isAnimating = true;
  
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
  };

  const shoot = () => {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  };

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
  
  // Show first message, wait for it to fade out completely, pause 1-2s, then show second
  await showToast("Bruh… you actually pulled the lanyard 😭🔥", 0, 2500);
  // Add 500ms delay between messages
  await new Promise(resolve => setTimeout(resolve, 500));
  await showToast("Lanyard Scanned ✅ Identity: Certified GDGC Techy 💥", 0, 3000);
  
  // Reset after animation completes
  isAnimating = false;
}
