function createCTAParticles() {
  const particlesContainer = document.querySelector('.cta__particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.width = `${Math.random() * 3 + 1}px`;
    particle.style.height = particle.style.width;
    particlesContainer.appendChild(particle);
  }
}

const featureCards = document.querySelectorAll('.feature__card');
featureCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
  
  card.addEventListener('mouseenter', () => {
    card.querySelector('.feature__icon').style.transform = 'scale(1.1) rotate(5deg)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.querySelector('.feature__icon').style.transform = 'scale(1) rotate(0)';
  });
});

const benefits = document.querySelectorAll('.benefit');
benefits.forEach((benefit, index) => {
  benefit.style.animationDelay = `${index * 0.1}s`;
  
  benefit.addEventListener('mouseenter', () => {
    benefit.style.transform = 'translateX(10px)';
  });
  
  benefit.addEventListener('mouseleave', () => {
    benefit.style.transform = 'translateX(0)';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

createCTAParticles();