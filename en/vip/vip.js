class AnimationController {
  constructor() {
      this.initPreloader();
      this.initCursor();
      this.initViewportAnimations();
      this.initParticles();
      this.initCharAnimation();
      this.initStats();
      this.initModals();
      this.initMobileMenu();
  }

  initPreloader() {
      window.addEventListener('load', () => {
          const preloader = document.querySelector('.preloader');
          preloader.classList.add('hidden');
      });
  }

  initCursor() {
      const cursor = document.querySelector('.custom-cursor');
      
      document.addEventListener('mousemove', (e) => {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
      });

      document.addEventListener('mousedown', () => cursor.classList.add('active'));
      document.addEventListener('mouseup', () => cursor.classList.remove('active'));

      const buttons = document.querySelectorAll('button, a');
      buttons.forEach(button => {
          button.addEventListener('mouseenter', () => cursor.classList.add('active'));
          button.addEventListener('mouseleave', () => cursor.classList.remove('active'));
      });
  }

  initViewportAnimations() {
      const options = {
          threshold: 0.2,
          rootMargin: '50px'
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('is-visible');
              }
          });
      }, options);

      document.querySelectorAll('[data-animation]').forEach(el => {
          observer.observe(el);
      });
  }

  initParticles() {
      const particles = document.querySelector('.particles');
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.cssText = `
              width: ${Math.random() * 3}px;
              height: ${Math.random() * 3}px;
              background: rgba(255, 215, 0, ${Math.random() * 0.5});
              left: ${Math.random() * 100}%;
              top: ${Math.random() * 100}%;
              animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
              animation-delay: -${Math.random() * 10}s;
          `;
          particles.appendChild(particle);
      }
  }

  initCharAnimation() {
      document.querySelectorAll('[data-animation="chars"]').forEach(element => {
          const text = element.textContent;
          element.textContent = '';
          
          [...text].forEach((char, index) => {
              const span = document.createElement('span');
              span.textContent = char;
              span.style.animationDelay = `${index * 0.1}s`;
              span.className = 'char-animate';
              element.appendChild(span);
          });
      });
  }

  initStats() {
      const stats = document.querySelectorAll('.stat__number');
      
      const animateValue = (element, start, end, duration) => {
          const range = end - start;
          const increment = range / (duration / 16);
          let current = start;
          
          const update = () => {
              element.textContent = Math.floor(current).toLocaleString();
              current += increment;
              
              if (current <= end) {
                  requestAnimationFrame(update);
              } else {
                  element.textContent = end.toLocaleString();
              }
          };
          
          update();
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const target = entry.target;
                  const value = parseInt(target.dataset.value);
                  animateValue(target, 0, value, 2000);
                  observer.unobserve(target);
              }
          });
      }, { threshold: 0.5 });

      stats.forEach(stat => observer.observe(stat));
  }

  initModals() {
      const modals = document.querySelectorAll('.modal');
      const triggers = document.querySelectorAll('.modal-trigger');
      const closeButtons = document.querySelectorAll('.modal-close');

      triggers.forEach(trigger => {
          trigger.addEventListener('click', () => {
              const modalId = trigger.dataset.modal + 'Modal';
              const modal = document.getElementById(modalId);
              modal.classList.add('active');
          });
      });

      closeButtons.forEach(button => {
          button.addEventListener('click', () => {
              const modal = button.closest('.modal');
              modal.classList.remove('active');
          });
      });

      modals.forEach(modal => {
          modal.addEventListener('click', (e) => {
              if (e.target === modal) {
                  modal.classList.remove('active');
              }
          });
      });
  }

  initMobileMenu() {
      const toggle = document.querySelector('.nav__toggle');
      const menu = document.querySelector('.nav__menu');
      
      toggle.addEventListener('click', () => {
          menu.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
          if (!menu.contains(e.target) && !toggle.contains(e.target)) {
              menu.classList.remove('active');
          }
      });

      const links = menu.querySelectorAll('a');
      links.forEach(link => {
          link.addEventListener('click', () => {
              menu.classList.remove('active');
          });
      });
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  new AnimationController();
});