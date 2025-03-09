class LuckyWheel {
  constructor() {
      this.wheel = document.querySelector('.wheel');
      this.currentRotation = 0;
      this.isSpinning = false;
      this.spinDuration = 5000;
      this.autoSpinInterval = null;
      this.frameId = null;
      this.segments = document.querySelectorAll('.wheel__segment');

      this.wheel.style.willChange = 'transform';
      this.setupSegmentAnimations();

      this.startAutoSpin();

      document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
              this.cleanup();
          } else {
              this.startAutoSpin();
          }
      });

      this.setupFAQHoverEffect();
  }

  setupSegmentAnimations() {
      this.segments.forEach((segment, index) => {
          segment.addEventListener('mouseover', () => {
              if (!this.isSpinning) {
                  this.highlightSegment(index);
              }
          });

          segment.addEventListener('mouseout', () => {
              if (!this.isSpinning) {
                  this.unhighlightSegments();
              }
          });
      });
  }

  highlightSegment(index) {
      const span = this.segments[index].querySelector('span');
      span.style.transform = 'translateY(-50%) rotate(-45deg) scale(1.2)';
      span.style.color = 'white';
      span.style.textShadow = '0 0 20px rgba(61, 106, 255, 0.8)';
  }

  unhighlightSegments() {
      this.segments.forEach(segment => {
          const span = segment.querySelector('span');
          span.style.transform = 'translateY(-50%) rotate(-45deg) scale(1)';
          span.style.color = '';
          span.style.textShadow = '';
      });
  }

  setupFAQHoverEffect() {
      const details = document.querySelectorAll('details');
      
      details.forEach(detail => {
          detail.addEventListener('mousemove', (e) => {
              const rect = detail.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              detail.style.setProperty('--x', `${x}px`);
              detail.style.setProperty('--y', `${y}px`);
          });
      });
  }

  cleanup() {
      this.stopAutoSpin();
      if (this.frameId) {
          cancelAnimationFrame(this.frameId);
      }
  }

  getRandomRotation() {
      const minRotations = 2;
      const maxRotations = 4;
      const baseRotation = 360;
      const randomOffset = Math.random() * 45; 
      
      return (minRotations + Math.random() * (maxRotations - minRotations)) * baseRotation + randomOffset;
  }

  spin() {
      if (this.isSpinning) return;
      
      this.isSpinning = true;
      this.unhighlightSegments();
      
      const rotation = this.getRandomRotation();
      const startRotation = this.currentRotation;
      const targetRotation = this.currentRotation + rotation;
      const startTime = performance.now();

      const easeInOutBack = (t) => {
          const c1 = 1.70158;
          const c2 = c1 * 1.525;
          
          return t < 0.5
              ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
              : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
      };

      const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / this.spinDuration, 1);
          
          if (progress < 1) {
              const easedProgress = easeInOutBack(progress);
              const currentRotation = startRotation + (rotation * easedProgress);
              
              this.wheel.style.transform = `rotate(${currentRotation}deg)`;
              this.frameId = requestAnimationFrame(animate);
          } else {
              this.currentRotation = targetRotation;
              this.wheel.style.transform = `rotate(${this.currentRotation}deg)`;
              this.isSpinning = false;
              this.frameId = null;

              const winningIndex = Math.floor((this.currentRotation % 360) / 45) % 8;
              this.highlightSegment(winningIndex);
              
              setTimeout(() => {
                  if (!this.wheel.matches(':hover')) {
                      this.unhighlightSegments();
                  }
              }, 2000);
          }
      };

      this.frameId = requestAnimationFrame(animate);
  }

  startAutoSpin() {
      if (this.autoSpinInterval) return;
      
      this.spin();
      this.autoSpinInterval = setInterval(() => {
          if (!this.isSpinning && document.visibilityState === 'visible') {
              this.spin();
          }
      }, this.spinDuration + 1000);
  }

  stopAutoSpin() {
      if (this.autoSpinInterval) {
          clearInterval(this.autoSpinInterval);
          this.autoSpinInterval = null;
      }
  }
}

class TutorialAnimator {
  constructor() {
      this.steps = document.querySelectorAll('.tutorial__step');
      this.tips = document.querySelectorAll('.tip');
      this.faqItems = document.querySelectorAll('details');
      this.initializeObserver();
      this.setupParallaxEffect();
  }

  initializeObserver() {
      const options = {
          threshold: 0.2,
          rootMargin: '0px'
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  requestAnimationFrame(() => {
                      entry.target.style.opacity = '1';
                      entry.target.style.transform = 'translateY(0) scale(1)';
                  });
              }
          });
      }, options);

      const setupElement = (element, index = 0) => {
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px) scale(0.95)';
          element.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
          observer.observe(element);
      };

      requestAnimationFrame(() => {
          this.steps.forEach(setupElement);
          this.tips.forEach(setupElement);
          this.faqItems.forEach(setupElement);
      });
  }

  setupParallaxEffect() {
      const parallaxElements = document.querySelectorAll('.tutorial__step, .tip');
      let ticking = false;

      window.addEventListener('scroll', () => {
          if (!ticking) {
              requestAnimationFrame(() => {
                  parallaxElements.forEach(element => {
                      const rect = element.getBoundingClientRect();
                      const centerPosition = rect.top + rect.height / 2;
                      const screenCenter = window.innerHeight / 2;
                      const distance = centerPosition - screenCenter;
                      const parallaxValue = distance * 0.02;

                      element.style.transform = `translateY(${parallaxValue}px) scale(1)`;
                  });
                  ticking = false;
              });
              ticking = true;
          }
      }, { passive: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
      const luckyWheel = new LuckyWheel();
      const tutorialAnimator = new TutorialAnimator();
  });
});