const config = {
    symbols: [
        { id: 'seven', value: 200, url: '/images/waifu-slots.webp', weight: 1 },    // Extremely rare
        { id: 'diamond', value: 100, url: '/images/waifu2-slots.png', weight: 1 },  // Very rare
        { id: 'bell', value: 50, url: '/images/waifu3-slots.png', weight: 2 },       // Rare
        { id: 'cherry', value: 25, url: '/images/waifu4-slots.png', weight: 4 },      // Uncommon
        { id: 'lemon', value: 10, url: '/images/waifu5-slots.png', weight: 10 },   // Common
        { id: 'scatter', value: 0, url: '/images/scatter.png', weight: 1 }     // Special
    ],
    reels: 5,
    rows: 3,
    minBet: 1,
    maxBet: 100,
    autoSpinDelay: 2000,
    spinDuration: {
        min: 3000,    
        max: 4000,
        reelDelay: 150
    },
    houseEdge: 0.75,  
    paylines: [
        [[0,0], [1,0], [2,0], [3,0], [4,0]],
        [[0,1], [1,1], [2,1], [3,1], [4,1]],
        [[0,2], [1,2], [2,2], [3,2], [4,2]],
        // V-shaped 
        [[0,0], [1,1], [2,2], [3,1], [4,0]],
        [[0,2], [1,1], [2,0], [3,1], [4,2]],
        // Zigzag
        [[0,0], [1,1], [2,0], [3,1], [4,0]],
        [[0,2], [1,1], [2,2], [3,1], [4,2]]
    ],
    symbolsPerReel: 50,  
    virtualReels: true  
};

class SlotMachine {
    constructor() {
        if (!this.checkAuthentication()) {
            window.location.href = '/fr/login/login.html?status=not_logged_in';
            return;
        }

        this.username = localStorage.getItem('loggedInUserUsername');
        this.balance = parseFloat(localStorage.getItem('loggedInUserBalance'));
        this.bet = config.minBet;
        this.isSpinning = false;
        this.isAutoSpinning = false;
        this.freeSpins = 0;
        this.lastWin = 0;
        this.reelStates = Array(config.reels).fill().map(() => this.generateReelSymbols());
        this.initializeDOM();
        this.setupEventListeners();
        this.updateDisplay();
    }

    checkAuthentication() {
        const username = localStorage.getItem('loggedInUserUsername');
        const balance = localStorage.getItem('loggedInUserBalance');
        return username && balance;
    }

    initializeDOM() {
        this.reelElements = Array.from({ length: config.reels }, (_, i) => document.getElementById(`reel${i}`));
        this.balanceElement = document.getElementById('balance');
        this.betElement = document.getElementById('betAmount');
        this.winAmountElement = document.getElementById('winAmount');
        this.spinButton = document.getElementById('spinButton');
        this.autoSpinButton = document.getElementById('autoSpinButton');
        this.messageBox = document.getElementById('messageBox');
        this.usernameElement = document.getElementById('username');

        this.reelElements.forEach((reel, i) => {
            reel.innerHTML = this.generateReelHTML(this.reelStates[i]);
        });

        if (this.usernameElement) {
            this.usernameElement.textContent = this.username;
        }
    }

    setupEventListeners() {
        document.getElementById('increaseBet').addEventListener('click', () => this.adjustBet(true));
        document.getElementById('decreaseBet').addEventListener('click', () => this.adjustBet(false));
        this.spinButton.addEventListener('click', () => this.spin());
        this.autoSpinButton.addEventListener('click', () => this.toggleAutoSpin());

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (!this.isSpinning) this.spin();
            }
        });
    }

    generateReelSymbols() {
        const symbols = [];
        const totalWeight = config.symbols.reduce((sum, symbol) => sum + symbol.weight, 0);

        for (let i = 0; i < config.symbolsPerReel; i++) {
            let random = Math.random() * totalWeight;
            let symbolIndex = 0;
            
            for (const symbol of config.symbols) {
                random -= symbol.weight;
                if (random <= 0) {
                    symbols.push({ ...symbol });
                    break;
                }
                symbolIndex++;
            }
        }

        for (let i = 1; i < symbols.length - 1; i++) {
            if (symbols[i].id === symbols[i-1].id && symbols[i].id === symbols[i+1].id) {
                const randomPos = Math.floor(Math.random() * symbols.length);
                [symbols[i], symbols[randomPos]] = [symbols[randomPos], symbols[i]];
            }
        }

        return symbols;
    }

    generateReelHTML(symbols) {
        return symbols.map(symbol => `
            <div class="symbol" data-symbol="${symbol.id}">
                <img src="${symbol.url}" alt="${symbol.id}">
            </div>
        `).join('');
    }

    adjustBet(increase) {
        if (increase && this.bet < Math.min(config.maxBet, this.balance)) {
            this.bet = Math.min(this.bet * 2, config.maxBet, this.balance);
        } else if (!increase && this.bet > config.minBet) {
            this.bet = Math.max(this.bet / 2, config.minBet);
        }
        this.updateDisplay();
    }

    async spin() {
        if (this.isSpinning || (this.balance < this.bet && this.freeSpins === 0)) return;

        this.isSpinning = true;
        if (this.freeSpins > 0) {
            this.freeSpins--;
            this.showMessage(`Spins gratuits: ${this.freeSpins}`, '#4a90e2');
        } else {
            this.balance -= this.bet;
            localStorage.setItem('loggedInUserBalance', this.balance.toString());
        }
        this.updateDisplay();

        this.spinButton.disabled = true;
        this.autoSpinButton.disabled = true;

        const newReelStates = this.reelElements.map(() => this.generateReelSymbols());

        const spinPromises = this.reelElements.map((reel, i) => 
            this.animateReel(reel, i, newReelStates[i])
        );
        
        await Promise.all(spinPromises);

        this.reelStates = newReelStates;

        const result = this.calculateWinnings();
        this.balance += result.totalWin;
        this.lastWin = result.totalWin;

        localStorage.setItem('loggedInUserBalance', this.balance.toString());

        if (result.totalWin > 0) {
            const multiplier = result.totalWin / this.bet;
            if (multiplier >= 50) {
                this.showMessage('Grande victoire!', '#ffd700');
                this.playWinAnimation('mega');
            } else if (multiplier >= 20) {
                this.showMessage('Énorme victoire!', '#ff4e50');
                this.playWinAnimation('big');
            } else {
                this.showMessage(`Gagné: $${result.totalWin}!`);
            }
        }

        if (result.freeSpins > 0) {
            this.freeSpins += result.freeSpins;
            this.showMessage(`${result.freeSpins} tours gratuits gagné!`, '#4a90e2');
        }

        this.isSpinning = false;
        this.updateDisplay();

        this.spinButton.disabled = false;
        this.autoSpinButton.disabled = false;

        if (this.isAutoSpinning && (this.balance >= this.bet || this.freeSpins > 0)) {
            setTimeout(() => this.spin(), config.autoSpinDelay);
        } else if (this.isAutoSpinning) {
            this.isAutoSpinning = false;
            this.autoSpinButton.textContent = 'AUTO';
        }
    }

    animateReel(reel, index, newSymbols) {
        return new Promise(resolve => {
            const duration = config.spinDuration.min + 
                           (Math.random() * (config.spinDuration.max - config.spinDuration.min));
            
            const delay = index * config.spinDuration.reelDelay;

            reel.style.transition = 'transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
            reel.style.transform = 'translateY(-50px)';
            
            setTimeout(() => {
                reel.style.transition = `transform ${duration}ms cubic-bezier(0.21, 0.53, 0.29, 0.99)`;
                reel.style.transform = `translateY(-${config.symbolsPerReel * 100}%)`;

                setTimeout(() => {
                    reel.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    reel.style.transform = 'translateY(0)';
                    reel.innerHTML = this.generateReelHTML(newSymbols);
                    
                    setTimeout(resolve, 300);
                }, duration);
            }, delay);
        });
    }

    calculateWinnings() {
        let totalWin = 0;
        let freeSpins = 0;
        const visibleSymbols = this.reelStates.map(reel => reel.slice(0, 3));

        const scatterCount = visibleSymbols.flat().filter(s => s.id === 'scatter').length;
        if (scatterCount >= 3 && Math.random() < 0.3) { 
            freeSpins = scatterCount * 3; 
        }

        config.paylines.forEach(payline => {
            if (Math.random() < 0.3) { 
                const lineSymbols = payline.map(([x, y]) => visibleSymbols[x][y]);
                const lineWin = this.calculateLineWin(lineSymbols);
                totalWin += lineWin;
            }
        });

        totalWin = Math.floor(totalWin * (1 - config.houseEdge) * (0.8 + Math.random() * 0.4));

        return { totalWin, freeSpins };
    }

    calculateLineWin(lineSymbols) {
        const firstSymbol = lineSymbols[0];
        let count = 1;
        
        for (let i = 1; i < lineSymbols.length; i++) {
            if (lineSymbols[i].id === firstSymbol.id) {
                count++;
            } else {
                break;
            }
        }

        if (count < 3) return 0;

        const baseWin = Math.min(firstSymbol.value * (count - 2) * 0.8, 1000);
        return Math.floor(baseWin * this.bet);
    }

    toggleAutoSpin() {
        this.isAutoSpinning = !this.isAutoSpinning;
        this.autoSpinButton.textContent = this.isAutoSpinning ? 'STOP' : 'AUTO';
        
        if (this.isAutoSpinning && !this.isSpinning) {
            this.spin();
        }
    }

    showMessage(text, color = 'white') {
        this.messageBox.style.color = color;
        this.messageBox.textContent = text;
        this.messageBox.style.display = 'block';
        
        setTimeout(() => {
            this.messageBox.style.display = 'none';
        }, 2000);
    }

    playWinAnimation(type) {
        const symbols = document.querySelectorAll('.symbol');
        symbols.forEach(symbol => {
            symbol.classList.add('highlight');
            setTimeout(() => symbol.classList.remove('highlight'), 2000);
        });
    }

    updateDisplay() {
        this.balanceElement.textContent = this.balance.toFixed(2);
        this.betElement.textContent = this.bet.toFixed(2);
        this.winAmountElement.textContent = this.lastWin.toFixed(2);
    }
}

window.addEventListener('load', () => {
    new SlotMachine();
});