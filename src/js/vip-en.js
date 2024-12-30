document.addEventListener('DOMContentLoaded', () => {
  new AnimationController();
  new Modal();
});

class Modal {
  constructor() {
    this.modal = null;
    this.overlay = null;
    this.closeButton = null;
    this.init();
  }

  init() {
    // Create modal elements
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    
    // Add close button
    this.closeButton = document.createElement('button');
    this.closeButton.className = 'modal-close';
    this.closeButton.innerHTML = '×';
    
    // Event listeners
    this.closeButton.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
    
    // Add to DOM
    this.modal.appendChild(this.closeButton);
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.modal);
    
    // Hide initially
    this.close();
  }

  open(content) {
    this.modal.innerHTML = content;
    this.modal.appendChild(this.closeButton);
    this.modal.classList.add('active');
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize modal
const modal = new Modal();

// Add click handlers to CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('click', () => {
    modal.open(`
      <h2>Join VIP Club</h2>
      <form class="vip-form">
        <input type="text" placeholder="Full Name" required>
        <input type="email" placeholder="Email Address" required>
        <button type="submit" class="cta-button">Submit Application</button>
      </form>
    `);
  });
});

export class AnimationController {
  constructor() {
    this.initObservers();
    this.initParallax();
  }

  initObservers() {
    const fadeOptions = { threshold: 0.2, rootMargin: '50px' };
    const scaleOptions = { threshold: 0.1 };

    this.fadeObserver = new IntersectionObserver(
      (entries) => this.handleFadeEntries(entries),
      fadeOptions
    );

    this.scaleObserver = new IntersectionObserver(
      (entries) => this.handleScaleEntries(entries),
      scaleOptions
    );

    this.observeElements();
  }

  observeElements() {
    document.querySelectorAll('[data-animation="fade"]')
      .forEach(el => this.fadeObserver.observe(el));
    
    document.querySelectorAll('[data-animation="scale"]')
      .forEach(el => this.scaleObserver.observe(el));
  }

  handleFadeEntries(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        this.fadeObserver.unobserve(entry.target);
      }
    });
  }

  handleScaleEntries(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scale-in-visible');
        this.scaleObserver.unobserve(entry.target);
      }
    });
  }

  initParallax() {
    const grid = document.querySelector('.hero__grid');
    if (!grid) return;

    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = clientX / innerWidth;
      const yPercent = clientY / innerHeight;
      
      const xOffset = (xPercent - 0.5) * 40;
      const yOffset = (yPercent - 0.5) * 40;
      
      grid.style.transform = `
        translate(${xOffset}px, ${yOffset}px)
        scale(1.1)
      `;
    });
  }
}