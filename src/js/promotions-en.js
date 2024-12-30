document.addEventListener('DOMContentLoaded', () => {

  const emojis = ['💰', '💎', '🎰', '🌟', '💵'];
  const heroSection = document.querySelector('.hero');
  
  function createFloatingElement() {
    const emoji = document.createElement('div');
    emoji.className = 'floating-element';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    emoji.style.left = `${Math.random() * 100}vw`;
    emoji.style.setProperty('--translate-x', `${Math.random() * 200 - 100}px`);
    emoji.style.setProperty('--rotate', `${Math.random() * 360}deg`);
    
    heroSection.appendChild(emoji);
    

    emoji.addEventListener('animationend', () => emoji.remove());
  }


  setInterval(createFloatingElement, 1000);


  const copyButton = document.getElementById('copyButton');
  const refLink = document.getElementById('refLink');

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(refLink.value);
      copyButton.textContent = 'Copied!';
      copyButton.style.background = 'linear-gradient(45deg, var(--gold), var(--accent-gold))';
      
      setTimeout(() => {
        copyButton.textContent = 'Copy Link';
        copyButton.style.background = '';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      refLink.select();
      document.execCommand('copy');
    }
  });


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


  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    },
    { threshold: 0.1 }
  );


  document.querySelectorAll('.tutorial-box, .creator-card').forEach(el => {
    observer.observe(el);
  });
});