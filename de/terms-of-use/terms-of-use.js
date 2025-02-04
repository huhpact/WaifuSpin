document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('section');
  const progressBar = document.querySelector('.progress-bar');
  const currentSection = document.querySelector('.current-section');
  const currentNumber = document.querySelector('.section-counter .current');
  const nav = document.querySelector('.floating-nav');
  const totalSections = document.querySelector('.section-counter .total');

  if (totalSections) {
    totalSections.textContent = `/${sections.length}`;
  }

  const observerOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: '-20% 0px -20% 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        updateNavigation(entry.target);
 
        const paragraphs = entry.target.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
          p.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
          p.style.opacity = '0';
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  function updateNavigation(currentElement) {
    if (!currentElement) return;
    
    const heading = currentElement.querySelector('h2');
    if (!heading) return;

    const sectionTitle = heading.textContent;
    const sectionNumber = Array.from(sections).indexOf(currentElement) + 1;
    
    if (currentSection) {
      currentSection.style.opacity = '0';
      setTimeout(() => {
        currentSection.textContent = sectionTitle;
        currentSection.style.opacity = '1';
      }, 300);
    }
    
    if (currentNumber) {
      currentNumber.style.opacity = '0';
      setTimeout(() => {
        currentNumber.textContent = sectionNumber;
        currentNumber.style.opacity = '1';
      }, 300);
		}
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);

          const ease = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
          
          window.scrollTo(0, startPosition + distance * ease(progress));
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }

        requestAnimationFrame(animation);
      }
    });
  });

  let lastScroll = 0;
  let hideTimeout;
  
  window.addEventListener('scroll', () => {
    if (!nav) return;
    
    const currentScroll = window.pageYOffset;
    clearTimeout(hideTimeout);
    
    if (currentScroll > lastScroll && currentScroll > 200) {
      nav.style.transform = 'translate(-50%, -100px)';
      nav.style.opacity = '0';
    } else {
      nav.style.transform = 'translate(-50%, 0)';
      nav.style.opacity = '1';
    }

    hideTimeout = setTimeout(() => {
      if (currentScroll > 200) {
        nav.style.transform = 'translate(-50%, -100px)';
        nav.style.opacity = '0';
      }
    }, 3000);
    
    lastScroll = currentScroll;
  });

  const hero = document.querySelector('.hero-background');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scroll = window.pageYOffset;
      const rotation = scroll * 0.02;
      const scale = 1 + scroll * 0.0005;
      hero.style.transform = `skewY(-6deg) translateY(${scroll * 0.5}px) rotate(${rotation}deg) scale(${scale})`;
    });
  }

  if (sections.length > 0) {
    updateNavigation(sections[0]);
  }

  sections.forEach(section => {
    section.addEventListener('mouseenter', () => {
      section.style.transform = 'translateY(-5px)';
      section.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    });

    section.addEventListener('mouseleave', () => {
      section.style.transform = 'translateY(0)';
      section.style.borderColor = 'rgba(255, 255, 255, 0.05)';
    });
  });
});