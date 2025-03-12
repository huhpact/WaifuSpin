function checkLoggedInUser() {
  const username = localStorage.getItem("loggedInUserUsername");
  const storedBalance = localStorage.getItem("loggedInUserBalance");
  const usernameEl = document.getElementById("username");
  const balanceEl = document.getElementById("balance");
  
  if (!username || !storedBalance) {
    window.location.href = "/de/login/login.html?status=not_logged_in";
    return;
  }

  if (usernameEl && balanceEl) {
    usernameEl.textContent = username;
    balanceEl.textContent = parseFloat(storedBalance).toFixed(2);
    balance = parseFloat(storedBalance);
    gameState.initialBalance = balance;
  } else {
    console.error("Required elements not found");
    return;
  }
}

let gameState = {
  currentBet: 10,
  currentMultiplier: 1,
  isPlaying: false,
  autoPlayEnabled: false,
  gamesPlayed: 0,
  initialBalance: 0,
  winStreak: 0,
  maxWinStreak: 0
};

let balance = 0;

const autoPlaySettings = {
  stopProfit: 100,
  stopLoss: 50,
  gamesCount: 10,
  autoCashout: 2
};

const balanceEl = document.getElementById('balance');
const betAmountEl = document.getElementById('bet__amount');
const playButton = document.getElementById('play__button');
const cashoutButton = document.getElementById('cashout__button');
const continueButton = document.getElementById('continue__button');
const autoPlayButton = document.getElementById('auto__play__button');
const settingsButton = document.getElementById('settings__button');
const settingsPanel = document.getElementById('settings__panel');
const multiplierGrid = document.getElementById('multipliers__grid');
const betIncreaseBtn = document.getElementById('bet__increase');
const betDecreaseBtn = document.getElementById('bet__decrease');

const multipliers = [1, 1.5, 2, 3, 5, 8, 10, 15, 25, 50, 75, 100, 128];
multipliers.forEach(multiplier => {
  const box = document.createElement('div');
  box.className = 'multiplier__box';
  box.textContent = multiplier + 'x';
  box.dataset.multiplier = multiplier;
  multiplierGrid.appendChild(box);
});

function calculateWinChance(currentMultiplier, winStreak) {
  const baseChance = Math.pow(0.95, Math.log2(currentMultiplier));
  const streakPenalty = Math.pow(0.92, winStreak);
  const earlyGameBonus = Math.max(0, (5 - gameState.maxWinStreak) * 0.05);
  const randomVariation = 1 + (Math.random() * 0.1 - 0.05);
  const finalChance = (baseChance * streakPenalty + earlyGameBonus) * randomVariation;
  return Math.min(0.95, Math.max(0.01, finalChance));
}

function updateBalance() {
  if (balanceEl) {
    balanceEl.textContent = balance.toFixed(2);
    localStorage.setItem("loggedInUserBalance", balance.toFixed(2));
  }
}

function startGame() {
  if (balance < gameState.currentBet) {
    showNotification('Unauszureichendes Guthaben', 'error');
    return;
  }

  balance -= gameState.currentBet;
  updateBalance();
  
  gameState.isPlaying = true;
  gameState.currentMultiplier = 1;
  updateUI();
  playButton.style.display = 'none';
  continueButton.style.display = 'inline-flex';
  cashoutButton.disabled = false;

  document.querySelectorAll('.multiplier__box').forEach(box => {
    box.className = 'multiplier__box';
    box.style.animation = 'none';
    box.offsetHeight; 
    box.style.animation = null;
  });
  
  updateMultiplierBoxes();

  if (gameState.autoPlayEnabled) {
    setTimeout(continueGame, 1000);
  }
}

function continueGame() {
  const winChance = calculateWinChance(gameState.currentMultiplier, gameState.winStreak);
  const random = Math.random();
  
  if (random <= winChance) {
    const nextMultiplierIndex = multipliers.indexOf(gameState.currentMultiplier) + 1;
    if (nextMultiplierIndex < multipliers.length) {
      gameState.currentMultiplier = multipliers[nextMultiplierIndex];
      updateMultiplierBoxes();
      gameState.winStreak++;
      gameState.maxWinStreak = Math.max(gameState.maxWinStreak, gameState.winStreak);
      playWinSound();

      if (gameState.autoPlayEnabled && gameState.currentMultiplier >= autoPlaySettings.autoCashout) {
        setTimeout(cashout, 500);
        return;
      }

      if (gameState.autoPlayEnabled) {
        setTimeout(continueGame, 1000);
      }
    } else {
      cashout();
    }
  } else {
    gameState.isPlaying = false;
    gameState.winStreak = 0;
    updateUI();
    showLoseAnimation();
    playLoseSound();
    updateBalance();
    
    if (gameState.autoPlayEnabled) {
      setTimeout(checkAndStartAutoPlay, 1500);
    }
  }
}

function cashout() {
  const winAmount = gameState.currentBet * gameState.currentMultiplier;
  balance += winAmount;
  gameState.isPlaying = false;
  gameState.winStreak = 0;
  updateUI();
  updateBalance();
  showWinAnimation(winAmount);
  playWinSound();
  
  if (gameState.autoPlayEnabled) {
    setTimeout(checkAndStartAutoPlay, 1500);
  }
}

function checkAndStartAutoPlay() {
  if (!gameState.autoPlayEnabled) return;
  
  const profit = balance - gameState.initialBalance;
  const loss = gameState.initialBalance - balance;
  
  if (profit >= autoPlaySettings.stopProfit) {
    stopAutoPlay('Profit-Stop ist erreicht!');
    return;
  }
  
  if (loss >= autoPlaySettings.stopLoss) {
    stopAutoPlay('Stop-Loss erreicht!');
    return;
  }
  
  if (gameState.gamesPlayed >= autoPlaySettings.gamesCount) {
    stopAutoPlay('Maximale Anzahl an Spielen erreicht!');
    return;
  }
  
  if (balance < gameState.currentBet) {
    stopAutoPlay('Unauszureichendes Guthaben!');
    return;
  }
  
  gameState.gamesPlayed++;
  startGame();
}

function stopAutoPlay(reason) {
  gameState.autoPlayEnabled = false;
  autoPlayButton.textContent = 'Auto';
  autoPlayButton.classList.remove('active');
  showNotification('Auto play gestoppt: ' + reason, 'info');
}

function updateUI() {
  if (balanceEl && betAmountEl) {
    balanceEl.textContent = balance.toFixed(2);
    betAmountEl.value = gameState.currentBet.toFixed(2);
  }
  
  if (playButton) {
    playButton.style.display = gameState.isPlaying ? 'none' : 'inline-flex';
  }
  
  if (continueButton) {
    continueButton.style.display = gameState.isPlaying && !gameState.autoPlayEnabled ? 'inline-flex' : 'none';
  }
  
  if (cashoutButton) {
    cashoutButton.disabled = !gameState.isPlaying;
  }
  
  if (!gameState.isPlaying) {
    document.querySelectorAll('.multiplier__box').forEach(box => {
      box.className = 'multiplier__box';
    });
  }
}

function updateMultiplierBoxes() {
  document.querySelectorAll('.multiplier__box').forEach(box => {
    const multiplier = parseFloat(box.dataset.multiplier);
    if (multiplier === gameState.currentMultiplier) {
      box.className = 'multiplier__box active';
    } else if (multiplier < gameState.currentMultiplier) {
      box.className = 'multiplier__box passed';
    }
  });
}

function showWinAnimation(amount) {
  const notification = document.createElement('div');
  notification.className = 'win__notification';
  notification.textContent = `+${amount.toFixed(2)}`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

function showLoseAnimation() {
  document.querySelectorAll('.multiplier__box').forEach(box => {
    if (parseFloat(box.dataset.multiplier) === gameState.currentMultiplier) {
      box.className = 'multiplier-box failed';
    }
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function adjustBet(amount) {
  const newBet = Math.max(1, Math.min(balance, gameState.currentBet + amount));
  if (newBet !== gameState.currentBet) {
    gameState.currentBet = newBet;
    betAmountEl.value = newBet.toFixed(2);
  }
}

function toggleAutoPlay() {
  gameState.autoPlayEnabled = !gameState.autoPlayEnabled;
  autoPlayButton.textContent = gameState.autoPlayEnabled ? 'Stop Auto' : 'Auto';
  autoPlayButton.classList.toggle('active');
  
  if (gameState.autoPlayEnabled) {
    gameState.gamesPlayed = 0;
    if (!gameState.isPlaying) {
      startGame();
    } else {
      continueGame();
    }
  }
}

function playWinSound() {
  // win sound effect
}

function playLoseSound() {
  // lose sound effect
}

if (playButton) playButton.addEventListener('click', startGame);
if (continueButton) continueButton.addEventListener('click', continueGame);
if (cashoutButton) cashoutButton.addEventListener('click', cashout);
if (autoPlayButton) autoPlayButton.addEventListener('click', toggleAutoPlay);

document.addEventListener('click', (e) => {
  if (e.target === settingsButton) {
    settingsPanel.classList.toggle('visible');
  } else if (!settingsPanel.contains(e.target)) {
    settingsPanel.classList.remove('visible');
  }
});

if (betIncreaseBtn) betIncreaseBtn.addEventListener('click', () => adjustBet(1));
if (betDecreaseBtn) betDecreaseBtn.addEventListener('click', () => adjustBet(-1));

if (betAmountEl) {
  betAmountEl.addEventListener('change', (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      gameState.currentBet = Math.min(value, balance);
    }
    betAmountEl.value = gameState.currentBet.toFixed(2);
  });
}

const stopProfitEl = document.getElementById('stop__profit');
const stopLossEl = document.getElementById('stop__loss');
const gamesCountEl = document.getElementById('games__count');
const autoCashoutEl = document.getElementById('auto__cashout');

if (stopProfitEl) {
  stopProfitEl.addEventListener('change', (e) => {
    autoPlaySettings.stopProfit = parseFloat(e.target.value);
  });
}

if (stopLossEl) {
  stopLossEl.addEventListener('change', (e) => {
    autoPlaySettings.stopLoss = parseFloat(e.target.value);
  });
}

if (gamesCountEl) {
  gamesCountEl.addEventListener('change', (e) => {
    autoPlaySettings.gamesCount = parseInt(e.target.value);
  });
}

if (autoCashoutEl) {
  autoCashoutEl.addEventListener('change', (e) => {
    autoPlaySettings.autoCashout = parseFloat(e.target.value);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  checkLoggedInUser();
  updateUI();
});