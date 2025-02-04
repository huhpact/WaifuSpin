const betInput = document.getElementById('betAmount');
const decreaseBtn = document.getElementById('decreaseBet');
const increaseBtn = document.getElementById('increaseBet');
const autoplayBtn = document.getElementById('autoplayButton');
const playBtn = document.getElementById('playButton');

decreaseBtn.addEventListener('click', () => {
  let currentBet = Number(betInput.value);
  if (currentBet > 1) {
    betInput.value = currentBet - 1;
  }
});

increaseBtn.addEventListener('click', () => {
  let currentBet = Number(betInput.value);
  if (currentBet < 1000) {
    betInput.value = currentBet + 1;
  }
});

betInput.addEventListener('input', (e) => {
  let value = Number(e.target.value);
  if (value < 1) e.target.value = 1;
  if (value > 1000) e.target.value = 1000;
});

autoplayBtn.addEventListener('click', () => {
  isAutoPlaying = !isAutoPlaying;
  autoplayBtn.classList.toggle('active');
  
  if (isAutoPlaying) {
    autoPlayInterval = setInterval(play, 2000);
    playBtn.disabled = true;
  } else {
    clearInterval(autoPlayInterval);
    playBtn.disabled = false;
  }
});

playBtn.addEventListener('click', play);

