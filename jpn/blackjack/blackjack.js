function setupCountdown() {
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 3);
  
  function updateCountdown() {
    const currentTime = new Date();
    const difference = launchDate - currentTime;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function setupBackButton() {
  const backBtn = document.getElementById('backBtn');
  backBtn.addEventListener('click', () => {
    window.history.back();
  });
}

function setupNotifyButton() {
  const notifyBtn = document.querySelector('.notify__btn');
  notifyBtn.addEventListener('click', () => {
    notifyBtn.classList.remove('pulse');
    notifyBtn.innerText = 'ありがとう、私たちはあなたに知らせます！';
    notifyBtn.style.background = 'linear-gradient(90deg, #4CAF50, #2E7D32)';
    
    notifyBtn.style.transform = 'scale(1.05)';
    setTimeout(() => {
      notifyBtn.style.transform = 'scale(1)';
    }, 200);
    
    setTimeout(() => {
      notifyBtn.classList.add('pulse');
      notifyBtn.innerText = 'それが始まるときに私に知らせてください！';
      notifyBtn.style.background = 'var(--gradient)';
    }, 3000);
  });
}

function setupParallax() {
  document.addEventListener('mousemove', (e) => {
    const bubbles = document.querySelectorAll('.bubble');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    bubbles.forEach(bubble => {
      const size = parseFloat(bubble.style.width);
      const speed = size / 150;
      const offsetX = (mouseX - 0.5) * speed * 20;
      const offsetY = (mouseY - 0.5) * speed * 20;

      bubble.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${offsetX * 0.1}deg)`;
    });
  });
}

function setupNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');

      if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
        alert('両方のフィールドに記入してください！');
        return;
      }

      const submitBtn = form.querySelector('.submit__btn');
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Lets goo!';
      submitBtn.style.background = 'linear-gradient(90deg, #4CAF50, #2E7D32)';

      nameInput.value = '';
      emailInput.value = '';

      setTimeout(() => {
        submitBtn.innerHTML = '今すぐ登録してください！';
        submitBtn.style.background = 'var(--gradient)';
      }, 3000);
    });
  }
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  const scrollIndicator = document.querySelector('.scroll__indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const featuresSection = document.querySelector('.features__section');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

function setupScrollAnimations() {
  const animateElements = document.querySelectorAll('.feature, .gallery__item, .newsletter__container, .section__title');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
  });
  
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
  setupCountdown();
  setupBackButton();
  setupNotifyButton();
  setupParallax();
  setupNewsletterForm();
  setupSmoothScroll();
  setupScrollAnimations();
});