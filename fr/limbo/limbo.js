function checkLoggedInUser() {
  const username = localStorage.getItem("loggedInUserUsername");
  const storedBalance = localStorage.getItem("loggedInUserBalance");
  
  if (!username || !storedBalance) {
    window.location.href = "/fr/login/login.html?status=not_logged_in";
    return;
  }

  document.getElementById("username").textContent = username;
  document.getElementById("balance").textContent = storedBalance;
  balance = parseFloat(storedBalance);
}

const gameState = {
  betAmount: 10,
  targetMultiplier: 2,
  autoPlay: false,
  autoPlayCount: 0,
  currentAutoPlayCount: 0,
  isPlaying: false,
  wins: 0,
  losses: 0,
  highestWin: 0,
  totalProfit: 0,
  history: [],
  houseEdge: 0.05, 
  strategy: 'flat',
  baseBet: 10,
  currentBetStep: 0,
  fibonacciSequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
};

let balance = 0;

const balanceEl = document.getElementById('balance');
const betAmountEl = document.getElementById('bet__amount');
const targetMultiplierEl = document.getElementById('target__multiplier');
const autoPlayEl = document.getElementById('auto__play');
const autoPlayCountEl = document.getElementById('auto__play__count');
const playButton = document.getElementById('play__button');
const stopButton = document.getElementById('stop__button');
const multiplierDisplayEl = document.getElementById('multiplier__display');
const resultMessageEl = document.getElementById('result__message');
const resultContainerEl = document.getElementById('result__container');
const winRateEl = document.getElementById('win__rate');
const highestWinEl = document.getElementById('highest__win');
const totalProfitEl = document.getElementById('total__profit');
const roundsPlayedEl = document.getElementById('rounds__played');
const historyListEl = document.getElementById('history__list');
const halfBetBtn = document.getElementById('half__bet');
const doubleBetBtn = document.getElementById('double__bet');
const minBetBtn = document.getElementById('min__bet');
const maxBetBtn = document.getElementById('max__bet');
const clearHistoryBtn = document.getElementById('clear__history');
const strategySelect = document.getElementById('strategy__select');
const strategyDescription = document.getElementById('strategy__description');

function initGame() {
  checkLoggedInUser();
  updateBalance();

  playButton.addEventListener('click', startGame);
  stopButton.addEventListener('click', stopAutoPlay);
  betAmountEl.addEventListener('change', validateBetAmount);
  targetMultiplierEl.addEventListener('change', validateTargetMultiplier);
  autoPlayEl.addEventListener('change', toggleAutoPlay);
  halfBetBtn.addEventListener('click', () => adjustBet(0.5));
  doubleBetBtn.addEventListener('click', () => adjustBet(2));
  minBetBtn.addEventListener('click', () => setMinBet());
  maxBetBtn.addEventListener('click', () => setMaxBet());
  clearHistoryBtn.addEventListener('click', clearHistory);
  strategySelect.addEventListener('change', updateStrategy);
  
  document.querySelectorAll('.preset__bet').forEach(button => {
    button.addEventListener('click', () => {
      const amount = parseFloat(button.dataset.amount);
      setPresetBet(amount);
    });
  });

  document.querySelectorAll('.preset__multiplier').forEach(button => {
    button.addEventListener('click', () => {
      const value = parseFloat(button.dataset.value);
      setPresetMultiplier(value);
    });
  });
}

function updateBalance() {
  balanceEl.textContent = balance.toFixed(2);
  localStorage.setItem("loggedInUserBalance", balance.toFixed(2));
}

function validateBetAmount() {
  let value = parseFloat(betAmountEl.value);
  
  if (isNaN(value) || value <= 0) {
    value = 1;
  }
  
  if (value > balance) {
    value = balance;
  }
  
  gameState.betAmount = value;
  gameState.baseBet = value; 
  betAmountEl.value = value.toFixed(2);
}

function validateTargetMultiplier() {
  let value = parseFloat(targetMultiplierEl.value);
  
  if (isNaN(value) || value < 1.01) {
    value = 1.01;
  }
  
  gameState.targetMultiplier = value;
  targetMultiplierEl.value = value.toFixed(2);
}

function toggleAutoPlay() {
  gameState.autoPlay = autoPlayEl.checked;
  
  if (gameState.autoPlay) {
    gameState.autoPlayCount = parseInt(autoPlayCountEl.value) || 0;
    gameState.currentAutoPlayCount = 0;
  }
}

function adjustBet(factor) {
  let newBet = gameState.betAmount * factor;
  
  if (newBet < 1) {
    newBet = 1;
  }
  
  if (newBet > balance) {
    newBet = balance;
  }
  
  gameState.betAmount = newBet;
  gameState.baseBet = newBet;
  betAmountEl.value = newBet.toFixed(2);
}

function setMinBet() {
  gameState.betAmount = 1;
  gameState.baseBet = 1;
  betAmountEl.value = "1.00";
}

function setMaxBet() {
  gameState.betAmount = balance;
  gameState.baseBet = balance;
  betAmountEl.value = balance.toFixed(2);
}

function setPresetBet(amount) {
  if (amount > balance) {
    amount = balance;
  }
  
  gameState.betAmount = amount;
  gameState.baseBet = amount;
  betAmountEl.value = amount.toFixed(2);
}

function setPresetMultiplier(value) {
  gameState.targetMultiplier = value;
  targetMultiplierEl.value = value.toFixed(2);
}

function updateStrategy() {
  gameState.strategy = strategySelect.value;
  gameState.currentBetStep = 0;

  switch (gameState.strategy) {
    case 'flat':
      strategyDescription.textContent = 'Plat: Pariez le même montant à chaque fois.';
      break;
    case 'martingale':
      strategyDescription.textContent = 'Martingale: Réinitialisez le double pari après chaque défaite après la victoire.';
      break;
    case 'd-alembert':
      strategyDescription.textContent = "D'Alembert: Si vous augmentez le pari d'une unité après la perte, diminuez d'une unité après la victoire.";
      break;
    case 'fibonacci':
      strategyDescription.textContent = 'Fibonacci: Suivez la séquence de Fibonacci pour les paris après des pertes et reculez deux pas après la victoire.';
      break;
  }

  gameState.betAmount = gameState.baseBet;
  betAmountEl.value = gameState.baseBet.toFixed(2);
}

function clearHistory() {
  gameState.history = [];
  updateHistoryDisplay();
}

function startGame() {
  if (gameState.isPlaying) return;
  
  validateBetAmount();
  validateTargetMultiplier();
  
  if (balance < gameState.betAmount) {
    showMessage('Solde insuffisant!', 'lose');
    return;
  }
  
  gameState.isPlaying = true;
  playButton.classList.add('hidden');
  
  if (gameState.autoPlay) {
    stopButton.classList.remove('hidden');
  }
  
  playRound();
}

function stopAutoPlay() {
  gameState.autoPlay = false;
  autoPlayEl.checked = false;
  stopButton.classList.add('hidden');
  playButton.classList.remove('hidden');
}

function applyBettingStrategy(isWin) {
  const baseBet = gameState.baseBet;
  
  switch (gameState.strategy) {
    case 'flat':
      gameState.betAmount = baseBet;
      break;
      
    case 'martingale':
      if (isWin) {
        gameState.betAmount = baseBet;
      } else {
        gameState.betAmount *= 2;
      }
      break;
      
    case 'd-alembert':
      if (isWin) {
        gameState.betAmount = Math.max(baseBet, gameState.betAmount - baseBet);
      } else {
        gameState.betAmount += baseBet;
      }
      break;
      
    case 'fibonacci':
      if (isWin) {
        gameState.currentBetStep = Math.max(0, gameState.currentBetStep - 2);
      } else {
        gameState.currentBetStep = Math.min(gameState.fibonacciSequence.length - 1, gameState.currentBetStep + 1);
      }
      
      const multiplier = gameState.fibonacciSequence[gameState.currentBetStep];
      gameState.betAmount = baseBet * multiplier;
      break;
  }

  if (gameState.betAmount > balance) {
    gameState.betAmount = balance;
  }

  betAmountEl.value = gameState.betAmount.toFixed(2);
}

function playRound() {
  balance -= gameState.betAmount;
  updateBalance();

  const fairResult = Math.random() * 100;
  const actualResult = fairResult * (1 - gameState.houseEdge);
  const resultMultiplier = 100 / actualResult;
  const roundedMultiplier = Math.floor(resultMultiplier * 100) / 100;

  const isWin = roundedMultiplier >= gameState.targetMultiplier;

  animateMultiplier(roundedMultiplier, isWin);
  
  if (isWin) {
    const winAmount = gameState.betAmount * gameState.targetMultiplier;
    balance += winAmount;
    gameState.wins++;
    
    const profit = winAmount - gameState.betAmount;
    gameState.totalProfit += profit;
    
    if (profit > gameState.highestWin) {
      gameState.highestWin = profit;
      highestWinEl.textContent = gameState.highestWin.toFixed(2);
    }
    
    showMessage(`Tu gagnes ${profit.toFixed(2)}!`, 'win');
  } else {
    gameState.losses++;
    gameState.totalProfit -= gameState.betAmount;
    showMessage('Perdu!', 'lose');
  }

  updateHistory(roundedMultiplier, isWin);
  updateStats();
  applyBettingStrategy(isWin);

  if (gameState.autoPlay) {
    gameState.currentAutoPlayCount++;
    
    if (gameState.autoPlayCount === 0 || gameState.currentAutoPlayCount < gameState.autoPlayCount) {
      if (balance >= gameState.betAmount) {
        setTimeout(() => {
          playRound();
        }, 1000); 
      } else {
        stopAutoPlay();
        gameState.isPlaying = false;
        playButton.classList.remove('hidden');
        showMessage('Le jeu automatique arrêté: Solde insuffisant', 'lose');
      }
    } else {
      stopAutoPlay();
      gameState.isPlaying = false;
      playButton.classList.remove('hidden');
    }
  } else {
    gameState.isPlaying = false;
    playButton.classList.remove('hidden');
  }
  
  updateBalance();
}

function updateStats() {
  const totalGames = gameState.wins + gameState.losses;
  const winRate = totalGames > 0 ? (gameState.wins / totalGames) * 100 : 0;
  
  winRateEl.textContent = `${winRate.toFixed(1)}%`;
  totalProfitEl.textContent = gameState.totalProfit.toFixed(2);
  roundsPlayedEl.textContent = totalGames;
}

function animateMultiplier(finalMultiplier, isWin) {
  let duration = 600; 
  let steps = 15; 
  let interval = duration / steps;
  let step = 0;

  multiplierDisplayEl.className = '';
  resultContainerEl.style.backgroundColor = '';
  
  const animate = () => {
    if (step < steps) {
      const progress = Math.pow(step / steps, 2);
      const currentValue = progress * finalMultiplier;

      multiplierDisplayEl.textContent = `${currentValue.toFixed(2)}x`;
      
      step++;
      setTimeout(animate, interval);
    } else {
      multiplierDisplayEl.textContent = `${finalMultiplier.toFixed(2)}x`;
      multiplierDisplayEl.classList.add(isWin ? 'win' : 'lose');
      multiplierDisplayEl.classList.add('pulse');

      resultContainerEl.style.backgroundColor = isWin 
        ? 'rgba(0, 200, 83, 0.1)' 
        : 'rgba(255, 61, 0, 0.1)';

      setTimeout(() => {
        multiplierDisplayEl.classList.remove('pulse');
      }, 500);
    }
  };
  
  animate();
}

function showMessage(message, type) {
  resultMessageEl.textContent = message;
  resultMessageEl.className = type;
  resultMessageEl.style.opacity = '1';
  
  setTimeout(() => {
    resultMessageEl.style.opacity = '0';
  }, 3000);
}

function updateHistory(multiplier, isWin) {
  gameState.history.unshift({ multiplier, isWin });
  
  if (gameState.history.length > 10) {
    gameState.history.pop();
  }

  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  historyListEl.innerHTML = '';
  
  gameState.history.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = `history__item ${item.isWin ? 'win' : 'lose'}`;
    historyItem.textContent = `${item.multiplier.toFixed(2)}x`;
    historyItem.style.backgroundColor = item.isWin 
      ? 'rgba(0, 200, 83, 0.2)' 
      : 'rgba(255, 61, 0, 0.2)';
    
    historyListEl.appendChild(historyItem);
  });
}

document.addEventListener('DOMContentLoaded', initGame);