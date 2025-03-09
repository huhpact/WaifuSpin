class LuckyWheel {
    constructor() {
        this.segments = [
            { value: 0.2, color: '#FF4B4B', probability: 0.15, label: '0.2×' },
            { value: 0.5, color: '#FF8F4B', probability: 0.15, label: '0.5×' },
            { value: 0.8, color: '#4BFF4B', probability: 0.15, label: '0.8×' },
            { value: 1.2, color: '#4B8FFF', probability: 0.15, label: '1.2×' },
            { value: 1.5, color: '#8F4BFF', probability: 0.15, label: '1.5×' },
            { value: 2.0, color: '#FF4B8F', probability: 0.12, label: '2.0×' },
            { value: 3.0, color: '#FFD700', probability: 0.08, label: '3.0×' },
            { value: 10.0, color: '#FF0000', probability: 0.05, label: '10.0×' }
        ];
        
        this.currentRotation = 0;
        this.isSpinning = false;
        this.autoSpinActive = false;
        this.autoSpinConfig = {
            spinsRemaining: 0,
            stopWin: 0,
            stopLoss: 0,
            initialBalance: 0
        };
        this.lastResults = [];
        this.houseEdgeMultiplier = 0.98;
  
        this.initializeWheel();
        this.initializeControls();
        this.loadUserData();
        this.createMultiplierPreview();
    }
  
    initializeWheel() {
        const wheel = document.getElementById('wheel');
        const segmentAngle = 360 / this.segments.length;
        
        this.segments.forEach((segment, index) => {
            const segmentElement = document.createElement('div');
            segmentElement.className = 'wheel__segment';
            segmentElement.style.transform = `rotate(${index * segmentAngle}deg)`;
  
            const gradientStart = segment.color;
            const gradientEnd = this.adjustColor(segment.color, -30);
            segmentElement.style.background = `linear-gradient(45deg, ${gradientStart}, ${gradientEnd})`;
  
            const labelContainer = document.createElement('div');
            labelContainer.className = 'segment__label';
            labelContainer.style.transform = `rotate(${segmentAngle / 2}deg)`;
  
            const textElement = document.createElement('span');
            textElement.textContent = segment.label;
            textElement.style.transform = `rotate(${-index * segmentAngle - segmentAngle / 2}deg)`;
            labelContainer.appendChild(textElement);
            
            segmentElement.appendChild(labelContainer);
            wheel.appendChild(segmentElement);
        });
    }
  
    createMultiplierPreview() {
        const container = document.querySelector('.wheel__container');
        const preview = document.createElement('div');
        preview.className = 'multiplier__preview';
        preview.id = 'multiplierPreview';
        preview.textContent = '0.0×';
        container.appendChild(preview);
    }
  
    adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
        const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
        const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
  
    initializeControls() {
        document.getElementById('spinButton').addEventListener('click', () => this.spin());
        document.getElementById('autoSpinButton').addEventListener('click', () => this.toggleAutoSpin());
        
        const betInput = document.getElementById('betAmount');
        betInput.addEventListener('input', () => {
            const value = parseFloat(betInput.value);
            if (value > this.getBalance()) {
                betInput.value = this.getBalance();
            }
        });
    }
  
    loadUserData() {
        const balance = localStorage.getItem('loggedInUserBalance');
        const username = localStorage.getItem('loggedInUserUsername');
        
        document.getElementById('balance').textContent = `Balance: $${parseFloat(balance).toFixed(2)}`;
        document.getElementById('username').textContent = username;
    }
  
    getBalance() {
        const balanceText = document.getElementById('balance').textContent;
        return parseFloat(balanceText.replace('Balance: $', ''));
    }
  
    setBalance(amount) {
        const newBalance = amount.toFixed(2);
        document.getElementById('balance').textContent = `Balance: $${newBalance}`;
        localStorage.setItem('loggedInUserBalance', newBalance);
    }
  
    getBet() {
        return parseFloat(document.getElementById('betAmount').value) || 0;
    }
  
    async spin() {
        if (this.isSpinning) return;
        
        const bet = this.getBet();
        const balance = this.getBalance();
        
        if (bet <= 0 || bet > balance) {
            alert('Ungültiger Einsatz');
            return;
        }
  
        this.isSpinning = true;
        this.setBalance(balance - bet);
  
        const result = await this.calculateSpinResult();
        const finalRotation = this.calculateFinalRotation(result.index);
        
        const wheel = document.getElementById('wheel');
        wheel.style.transform = `rotate(${-finalRotation}deg)`;
  
        const preview = document.getElementById('multiplierPreview');
        preview.style.transform = 'translate(-50%, -50%) scale(1.2)';
        preview.style.transition = 'transform 0.3s';
  
        let currentSegment = 0;
        const spinSpeed = 50; 
        const updateInterval = setInterval(() => {
            currentSegment = (currentSegment + 1) % this.segments.length;
            preview.textContent = this.segments[currentSegment].label;
            preview.style.color = this.segments[currentSegment].color;
        }, spinSpeed);
  
        const spinDuration = 4000;
        setTimeout(() => {
            clearInterval(updateInterval);
            preview.textContent = `${result.multiplier.toFixed(1)}×`;
            preview.style.color = this.segments[result.index].color;
            preview.style.transform = 'translate(-50%, -50%) scale(1)';
            this.handleSpinResult(result, bet);
        }, spinDuration);
    }
  
    calculateFinalRotation(targetIndex) {
        const baseRotations = 4; 
        const randomRotations = Math.random() * 2; 
        const segmentAngle = 360 / this.segments.length;
        const targetAngle = segmentAngle * targetIndex;
  
        const totalRotations = baseRotations + randomRotations;
        const finalRotation = (360 * totalRotations) + targetAngle;
   
        const randomOffset = (Math.random() * 0.5 - 0.25) * segmentAngle;
        
        return finalRotation + randomOffset;
    }
  
    async calculateSpinResult() {
        const random = Math.random();
        const houseEdgeFactor = this.calculateHouseEdgeFactor();
        let adjustedRandom = random * houseEdgeFactor;
  
        const adjustedProbabilities = this.calculateAdjustedProbabilities();
        let probabilitySum = 0;
        
        for (let i = 0; i < this.segments.length; i++) {
            probabilitySum += adjustedProbabilities[i];
            if (adjustedRandom <= probabilitySum) {
                return {
                    index: i,
                    multiplier: this.segments[i].value
                };
            }
        }
  
        return {
            index: 0,
            multiplier: this.segments[0].value
        };
    }
  
    calculateHouseEdgeFactor() {
        const recentWinsCount = this.lastResults.filter(r => r > 1).length;
        const baseEdge = this.houseEdgeMultiplier;
        const dynamicAdjustment = Math.min(recentWinsCount * 0.01, 0.05);
        return baseEdge - dynamicAdjustment;
    }
  
    calculateAdjustedProbabilities() {
        const adjustedProbs = [...this.segments.map(s => s.probability)];
  
        if (this.lastResults.length > 0) {
            const recentResultsWeight = 0.2;
            this.segments.forEach((segment, index) => {
                const occurrences = this.lastResults.filter(r => r === segment.value).length;
                const expectedOccurrences = segment.probability * this.lastResults.length;
                const adjustment = (expectedOccurrences - occurrences) * recentResultsWeight;
                adjustedProbs[index] = Math.max(0.01, segment.probability + adjustment);
            });
     
            const sum = adjustedProbs.reduce((a, b) => a + b, 0);
            return adjustedProbs.map(p => p / sum);
        }
        
        return adjustedProbs;
    }
  
    handleSpinResult(result, bet) {
        const winAmount = bet * result.multiplier * this.houseEdgeMultiplier;
        const newBalance = this.getBalance() + winAmount;
        this.setBalance(newBalance);
  
        this.lastResults.push(result.multiplier);
        if (this.lastResults.length > 20) {
            this.lastResults.shift();
        }
        
        this.addToHistory(result);
        this.isSpinning = false;
  
        if (this.autoSpinActive) {
            this.handleAutoSpin(winAmount - bet);
        }
    }
  
    addToHistory(result) {
        const history = document.getElementById('spinHistory');
        const item = document.createElement('div');
        item.className = 'history__item';
        item.style.backgroundColor = this.segments[result.index].color;
        item.textContent = `${result.multiplier}×`;
        
        if (history.children.length >= 9) {
            history.removeChild(history.firstChild);
        }
        history.appendChild(item);
    }
  
    toggleAutoSpin() {
        const autoSettings = document.getElementById('autoSettings');
        autoSettings.classList.toggle('active');
        
        if (!this.autoSpinActive && autoSettings.classList.contains('active')) {
            this.startAutoSpin();
        } else {
            this.stopAutoSpin();
        }
    }
  
    startAutoSpin() {
        this.autoSpinActive = true;
        this.autoSpinConfig = {
            spinsRemaining: parseInt(document.getElementById('spinCount').value),
            stopWin: parseFloat(document.getElementById('stopWin').value),
            stopLoss: parseFloat(document.getElementById('stopLoss').value),
            initialBalance: this.getBalance()
        };
        
        if (!this.isSpinning) {
            this.spin();
        }
    }
  
    stopAutoSpin() {
        this.autoSpinActive = false;
        document.getElementById('autoSettings').classList.remove('active');
    }
  
    handleAutoSpin(netWin) {
        this.autoSpinConfig.spinsRemaining--;
        
        const totalProfit = this.getBalance() - this.autoSpinConfig.initialBalance;
        
        if (this.autoSpinConfig.spinsRemaining <= 0 ||
            totalProfit >= this.autoSpinConfig.stopWin ||
            -totalProfit >= this.autoSpinConfig.stopLoss) {
            this.stopAutoSpin();
            return;
        }
  
        setTimeout(() => {
            if (this.autoSpinActive) {
                this.spin();
            }
        }, 1000);
    }
  }
  
  const game = new LuckyWheel();
  
  function adjustBet(type) {
    const input = document.getElementById('betAmount');
    const currentBet = parseFloat(input.value) || 0;
    const balance = game.getBalance();
  
    switch(type) {
        case 'half':
            input.value = (currentBet / 2).toFixed(2);
            break;
        case 'double':
            const doubled = currentBet * 2;
            input.value = Math.min(doubled, balance).toFixed(2);
            break;
        case 'max':
            input.value = balance.toFixed(2);
            break;
    }
  }
  
  const loggedInUserUsername = localStorage.getItem("loggedInUserUsername");
  const loggedInUserBalance = localStorage.getItem("loggedInUserBalance");
  
  if (loggedInUserUsername) {
      document.getElementById("username").textContent = loggedInUserUsername;
      document.getElementById("balance").textContent = loggedInUserBalance;
  } else {
      window.location.href = "/de/login/login.html"; 
  }