window.addEventListener('resize', () => {
    if (particlesCanvas) {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.strategy__card, .calculator, .stat__card').forEach(element => {
    observer.observe(element);
});

VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

const bankrollInput = document.getElementById('bankroll');
const riskInput = document.getElementById('risk');
const riskValue = document.getElementById('risk__value');
const calculateBtn = document.getElementById('calculate__btn');
const betAmount = document.getElementById('bet__amount');
const riskLevel = document.querySelector('.risk__level');

riskInput.addEventListener('input', () => {
    const value = riskInput.value;
    riskValue.textContent = `${value}%`;
    riskLevel.style.width = `${value * 10}%`;

    if (value < 4) {
        riskLevel.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
    } else if (value < 7) {
        riskLevel.style.background = 'linear-gradient(90deg, #FFC107, #FF9800)';
    } else {
        riskLevel.style.background = 'linear-gradient(90deg, #FF5722, #F44336)';
    }
});

calculateBtn.addEventListener('click', () => {
    const bankroll = parseFloat(bankrollInput.value);
    const riskPercentage = parseFloat(riskInput.value);
    
    if (isNaN(bankroll) || bankroll <= 0) {
        alert('Bitte geben Sie einen gültigen Bankrollbetrag ein');
        return;
    }

    const recommendedBet = (bankroll * (riskPercentage / 100)).toFixed(2);

    betAmount.offsetHeight;
    betAmount.style.animation = 'fadeInUp 0.6s ease';
    betAmount.textContent = `$${recommendedBet}`;
    
    updateResultChart(recommendedBet, bankroll);
});

const simulateBtn = document.getElementById('simulate__btn');
const winRateInput = document.getElementById('win__rate');
const payoutInput = document.getElementById('payout');
const sessionsInput = document.getElementById('sessions');
let simulationChart = null;

simulateBtn.addEventListener('click', () => {
    const winRate = parseFloat(winRateInput.value) / 100;
    const payout = parseFloat(payoutInput.value);
    const sessions = parseInt(sessionsInput.value);
    const initialBankroll = parseFloat(bankrollInput.value);
    
    const results = simulateSessions(winRate, payout, sessions, initialBankroll);
    updateSimulationChart(results);
});

function simulateSessions(winRate, payout, sessions, initialBankroll) {
    let bankroll = initialBankroll;
    const results = [bankroll];
    
    for (let i = 0; i < sessions; i++) {
        const bet = bankroll * 0.05; 
        const win = Math.random() < winRate;
        
        if (win) {
            bankroll += bet * (payout - 1);
        } else {
            bankroll -= bet;
        }
        
        results.push(bankroll);
    }
    
    return results;
}

function updateSimulationChart(results) {
    const ctx = document.getElementById('simulation__chart').getContext('2d');
    
    if (simulationChart) {
        simulationChart.destroy();
    }
    
    simulationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: results.length }, (_, i) => i),
            datasets: [{
                label: 'Die Bankroll im Laufe der Zeit',
                data: results,
                borderColor: 'rgb(61, 106, 255)',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(61, 106, 255, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            clearInterval(timer);
            current = end;
        }
        
        element.textContent = current.toFixed(1);
    }, 16);
}

const statValues = document.querySelectorAll('.stat__value');
let animated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            statValues.forEach(stat => {
                const value = parseFloat(stat.dataset.value);
                animateValue(stat, 0, value, 2000);
            });
            animated = true;
        }
    });
});

document.querySelectorAll('.stat__card').forEach(card => {
    statsObserver.observe(card);
});

const tabBtns = document.querySelectorAll('.tab__btn');
const tabContents = document.querySelectorAll('.tab__content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.querySelector(`.tab__content[data-tab="${tab}"]`).classList.add('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});