const multiplierValue = document.getElementById('multiplierValue');
const limboCanvas = document.getElementById('limboCanvas');
const exploreBtn = document.getElementById('exploreBtn');

const ctx = limboCanvas.getContext('2d');
limboCanvas.width = limboCanvas.parentElement.clientWidth;
limboCanvas.height = 200;

let isAnimating = false;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

exploreBtn.addEventListener('click', () => {
  document.querySelector('#basics').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  });
});

function drawLimboCurve() {
  ctx.clearRect(0, 0, limboCanvas.width, limboCanvas.height);

  const gradient = ctx.createLinearGradient(0, 0, limboCanvas.width, 0);
  gradient.addColorStop(0, '#5f94ff');
  gradient.addColorStop(1, '#0900ab');

  ctx.beginPath();
  ctx.moveTo(0, limboCanvas.height);

  for (let x = 0; x < limboCanvas.width; x++) {
    const progress = x / limboCanvas.width;
    const multiplier = 1 + Math.pow(progress * 5, 2);
    const y = limboCanvas.height - (limboCanvas.height / multiplier);
    
    ctx.lineTo(x, y);
  }
  
  ctx.lineTo(limboCanvas.width, 0);
  ctx.lineTo(limboCanvas.width, limboCanvas.height);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.globalAlpha = 0.2;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, limboCanvas.height);
  
  for (let x = 0; x < limboCanvas.width; x++) {
    const progress = x / limboCanvas.width;
    const multiplier = 1 + Math.pow(progress * 5, 2);
    const y = limboCanvas.height - (limboCanvas.height / multiplier);
    
    ctx.lineTo(x, y);
  }
  
  ctx.strokeStyle = gradient;
  ctx.globalAlpha = 1;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.globalAlpha = 0.1;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;

  for (let i = 1; i <= 4; i++) {
    const y = limboCanvas.height * (i / 5);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(limboCanvas.width, y);
    ctx.stroke();
  }

  for (let i = 1; i <= 4; i++) {
    const x = limboCanvas.width * (i / 5);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, limboCanvas.height);
    ctx.stroke();
  }
}

function animateHeroMultiplier() {
  let currentValue = 1.00;
  let targetValue = 1.00 + Math.random() * 9;
  let speed = 0.01;
  let acceleration = 0.001;
  
  function updateMultiplier() {
    if (currentValue < targetValue) {
      speed += acceleration;
      currentValue += speed;
      
      if (currentValue > targetValue) {
        currentValue = targetValue;
      }
      
      multiplierValue.textContent = currentValue.toFixed(2);
      requestAnimationFrame(updateMultiplier);
    } else {
      setTimeout(() => {
        currentValue = 1.00;
        targetValue = 1.00 + Math.random() * 9;
        speed = 0.01;
        multiplierValue.textContent = currentValue.toFixed(2);
        requestAnimationFrame(updateMultiplier);
      }, 2000);
    }
  }
  
  updateMultiplier();
}

function init() {
  drawLimboCurve();

  animateHeroMultiplier();

  window.addEventListener('resize', () => {
    limboCanvas.width = limboCanvas.parentElement.clientWidth;
    drawLimboCurve();
  });

  const stepCards = document.querySelectorAll('.step__card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });
  
  stepCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  const strategyCards = document.querySelectorAll('.strategy__card');
  const strategyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });
  
  strategyCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    strategyObserver.observe(card);
  });

  const infoCards = document.querySelectorAll('.info__card');
  const infoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });
  
  infoCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    infoObserver.observe(card);
  });
}

document.addEventListener('DOMContentLoaded', init);