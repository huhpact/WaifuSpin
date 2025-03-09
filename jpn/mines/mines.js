class MinesGame {
    constructor() {
        if (!localStorage.getItem("loggedInUserUsername") || !localStorage.getItem("loggedInUserBalance")) {
            window.location.href = "/jpn/login/login.html";
            return;
        }

        this.grid = [];
        this.mines = [];
        this.revealed = new Set();
        this.isPlaying = false;
        this.autoMode = false;
        this.autoInterval = null;
        this.balance = parseFloat(localStorage.getItem("loggedInUserBalance")) || 0;
        this.username = localStorage.getItem("loggedInUserUsername");
        this.stats = {
            gamesPlayed: 0,
            totalWagered: 0,
            highestWin: 0,
            wins: 0
        };
        this.autoStats = {
            turnsLeft: 0,
            totalProfit: 0
        };
        
        this.initializeDOM();
        this.setupEventListeners();
        this.updateBalance();
        this.updateStats();
        this.displayUserInfo();
    }

    initializeDOM() {
        this.gameGrid = document.querySelector('.game__grid');
        this.startBtn = document.getElementById('start__btn');
        this.cashoutBtn = document.getElementById('cashout__btn');
        this.minesInput = document.getElementById('mines');
        this.betInput = document.getElementById('bet');
        this.balanceDisplay = document.getElementById('balance');
        this.usernameDisplay = document.getElementById('username');
        this.multiplierDisplay = document.getElementById('current__multiplier');
        this.nextMultiplierDisplay = document.getElementById('next__multiplier');
        this.autoModeToggle = document.getElementById('auto__mode');
        this.autoSettings = document.querySelector('.auto__settings');
        this.autoClicksInput = document.getElementById('auto__clicks');
        this.autoTurnsInput = document.getElementById('auto__turns');
        this.autoDelayInput = document.getElementById('auto__delay');
        this.turnsLeftDisplay = document.getElementById('turns__left');
        this.totalProfitDisplay = document.getElementById('total__profit');
        this.winPopup = document.getElementById('win__popup');
        this.winAmount = document.getElementById('win__amount');
        this.gamesPlayedDisplay = document.getElementById('games__played');
        this.totalWageredDisplay = document.getElementById('total__wagered');
        this.highestWinDisplay = document.getElementById('highest__win');
        this.winRateDisplay = document.getElementById('win__rate');

        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            this.gameGrid.appendChild(cell);
            this.grid.push(cell);
        }
    }

    displayUserInfo() {
        this.usernameDisplay.textContent = this.username;
        this.balanceDisplay.textContent = this.balance.toFixed(2);
    }

    updateBalance(change = 0) {
        this.balance += change;
        this.balanceDisplay.textContent = this.balance.toFixed(2);
        localStorage.setItem("loggedInUserBalance", this.balance.toString());
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.cashoutBtn.addEventListener('click', () => this.cashout());
        this.gameGrid.addEventListener('click', (e) => this.handleCellClick(e));
        this.autoModeToggle.addEventListener('change', (e) => {
            this.autoMode = e.target.checked;
            this.autoSettings.classList.toggle('show', this.autoMode);
        });

        document.querySelectorAll('.adjust__btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const input = e.target.parentElement.querySelector('input');
                const value = parseFloat(input.value);

                switch(action) {
                    case 'half':
                        input.value = Math.max(1, Math.floor(value / 2));
                        break;
                    case 'double':
                        input.value = Math.min(this.balance, value * 2);
                        break;
                    case 'decrease':
                        input.value = Math.max(1, value - 1);
                        break;
                    case 'increase':
                        input.value = Math.min(24, value + 1);
                        break;
                }
            });
        });
    }

    updateStats() {
        this.gamesPlayedDisplay.textContent = this.stats.gamesPlayed;
        this.totalWageredDisplay.textContent = this.stats.totalWagered.toFixed(2);
        this.highestWinDisplay.textContent = this.stats.highestWin.toFixed(2);
        const winRate = this.stats.gamesPlayed > 0 
            ? (this.stats.wins / this.stats.gamesPlayed * 100).toFixed(1)
            : '0.0';
        this.winRateDisplay.textContent = `${winRate}%`;
    }

    updateAutoStats() {
        this.turnsLeftDisplay.textContent = this.autoStats.turnsLeft;
        this.totalProfitDisplay.textContent = this.autoStats.totalProfit.toFixed(2);
    }

    startGame() {
        const betAmount = parseFloat(this.betInput.value);
        if (betAmount > this.balance) {
            this.showError('不十分なクレジット');
            return;
        }

        this.updateBalance(-betAmount);
        this.stats.totalWagered += betAmount;
        this.stats.gamesPlayed++;
        this.updateStats();

        this.isPlaying = true;
        this.revealed.clear();
        this.mines = [];
        this.grid.forEach(cell => {
            cell.className = 'cell';
            cell.innerHTML = '';
        });

        const mineCount = parseInt(this.minesInput.value);
        while (this.mines.length < mineCount) {
            const randomIndex = Math.floor(Math.random() * 25);
            if (!this.mines.includes(randomIndex)) {
                this.mines.push(randomIndex);
            }
        }

        this.startBtn.disabled = true;
        this.cashoutBtn.disabled = false;
        this.updateMultiplier();

        if (this.autoMode) {
            this.autoStats.turnsLeft = parseInt(this.autoTurnsInput.value);
            this.updateAutoStats();
            this.startAutoPlay();
        }
    }

    handleCellClick(e) {
        if (!this.isPlaying) return;
        
        const cell = e.target.closest('.cell');
        if (!cell || cell.classList.contains('revealed')) return;

        const index = parseInt(cell.dataset.index);
        this.revealCell(index);
    }

    revealCell(index) {
        if (this.revealed.has(index)) return;

        const cell = this.grid[index];
        this.revealed.add(index);

        if (this.mines.includes(index) || (Math.random() < 0.1 && this.revealed.size > 3)) {
            cell.classList.add('revealed', 'bomb');
            cell.innerHTML = '<i class="fas fa-bomb"></i>';
            this.endGame(false);
        } else {
            cell.classList.add('revealed', 'gem');
            cell.innerHTML = '<i class="fas fa-gem"></i>';
            this.updateMultiplier();
        }
    }

    updateMultiplier() {
        const mineCount = parseInt(this.minesInput.value);
        const revealedCount = this.revealed.size;
        const currentMultiplier = this.calculateMultiplier(mineCount, revealedCount);
        const nextMultiplier = this.calculateMultiplier(mineCount, revealedCount + 1);
        
        this.multiplierDisplay.textContent = `${currentMultiplier.toFixed(2)}×`;
        this.nextMultiplierDisplay.textContent = `${nextMultiplier.toFixed(2)}×`;
    }

    calculateMultiplier(mines, revealed) {
        const base = 0.65; // House edge
        const probability = (25 - mines - revealed) / (25 - revealed);
        return base / probability;
    }

    startAutoPlay() {
        const clicks = parseInt(this.autoClicksInput.value);
        const delay = parseInt(this.autoDelayInput.value);
        let clickCount = 0;

        this.autoInterval = setInterval(() => {
            if (clickCount >= clicks) {
                this.cashout();
                return;
            }

            const availableCells = this.grid
                .map((cell, index) => ({ cell, index }))
                .filter(({ index }) => !this.revealed.has(index));

            if (availableCells.length === 0) {
                this.cashout();
                return;
            }

            const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
            this.revealCell(randomCell.index);
            clickCount++;
        }, delay);
    }

    showWinPopup(amount) {
        this.winAmount.textContent = amount.toFixed(2);
        this.winPopup.classList.add('show');
        setTimeout(() => {
            this.winPopup.classList.remove('show');
            
            if (this.autoMode && this.autoStats.turnsLeft > 0) {
                setTimeout(() => this.startGame(), 500);
            }
        }, 2000);
    }

    cashout() {
        if (!this.isPlaying) return;
        
        const multiplier = parseFloat(this.multiplierDisplay.textContent);
        const bet = parseFloat(this.betInput.value);
        const winnings = bet * multiplier;

        this.updateBalance(winnings);
        this.showWinPopup(winnings);

        this.stats.wins++;
        if (winnings > this.stats.highestWin) {
            this.stats.highestWin = winnings;
        }
        this.updateStats();

        if (this.autoMode) {
            this.autoStats.totalProfit += (winnings - bet);
            this.autoStats.turnsLeft--;
            this.updateAutoStats();
        }

        this.endGame(true);
    }

    endGame(success) {
        this.isPlaying = false;
        this.startBtn.disabled = false;
        this.cashoutBtn.disabled = true;

        if (this.autoInterval) {
            clearInterval(this.autoInterval);
            this.autoInterval = null;
        }

        if (!success) {
            if (this.autoMode) {
                const bet = parseFloat(this.betInput.value);
                this.autoStats.totalProfit -= bet;
                this.autoStats.turnsLeft--;
                this.updateAutoStats();

                if (this.autoStats.turnsLeft > 0) {
                    setTimeout(() => this.startGame(), 2000);
                }
            }

            this.mines.forEach(index => {
                if (!this.revealed.has(index)) {
                    const cell = this.grid[index];
                    cell.classList.add('revealed', 'bomb');
                    cell.innerHTML = '<i class="fas fa-bomb"></i>';
                }
            });
        }
    }

    showError(message) {
        const popup = document.createElement('div');
        popup.className = 'error__popup';
        popup.textContent = message;
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MinesGame();
});