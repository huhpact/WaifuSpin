document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCurrencySelector();
  initDepositForm();
  initPaymentMethods();
  initCryptoSelector();
  initWithdrawForm();
  initWalletAddressInput();
  initConfirmationForm();
  initAnimations();
});

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab__btn');
  const tabPanes = document.querySelectorAll('.tab__pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

function initCurrencySelector() {
  const selectedCurrency = document.querySelector('.selected__currency');
  const currencyOptions = document.querySelector('.currency__options');
  const options = document.querySelectorAll('.currency__option');
  
  if (!selectedCurrency) return;

  selectedCurrency.addEventListener('click', () => {
    currencyOptions.style.display = currencyOptions.style.display === 'block' ? 'none' : 'block';
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      const currency = option.getAttribute('data-currency');
      const currencyText = option.querySelector('span').textContent;
      const currencyIcon = option.querySelector('i').cloneNode(true);

      selectedCurrency.innerHTML = '';
      selectedCurrency.appendChild(currencyIcon);
      const span = document.createElement('span');
      span.textContent = currencyText;
      selectedCurrency.appendChild(span);

      const chevron = document.createElement('i');
      chevron.className = 'fas fa-chevron-down';
      selectedCurrency.appendChild(chevron);

      currencyOptions.style.display = 'none';

      const currencySymbol = document.querySelector('.currency__symbol');
      if (currencySymbol) {
        switch(currency) {
          case 'USD':
            currencySymbol.textContent = '$';
            break;
          case 'EUR':
            currencySymbol.textContent = '€';
            break;
          case 'GBP':
            currencySymbol.textContent = '£';
            break;
          case 'JPY':
            currencySymbol.textContent = '¥';
            break;
        }
      }
    });
  });
  
  document.addEventListener('click', (e) => {
    if (!selectedCurrency.contains(e.target)) {
      currencyOptions.style.display = 'none';
    }
  });
}

function initDepositForm() {
  const depositAmount = document.getElementById('deposit__amount');
  const cryptoAmount = document.getElementById('crypto__amount');
  const cryptoCurrency = document.getElementById('crypto__currency');
  
  if (!depositAmount || !cryptoAmount || !cryptoCurrency) return;

  const exchangeRates = {
    BTC: 0.000025,
    ETH: 0.00042,
    SOL: 0.0125,
    XRP: 0.5
  };

  depositAmount.addEventListener('input', updateCryptoAmount);
  cryptoCurrency.addEventListener('change', updateCryptoAmount);
  
  function updateCryptoAmount() {
    const amount = parseFloat(depositAmount.value) || 0;
    const currency = cryptoCurrency.value;
    const rate = exchangeRates[currency];
    
    const converted = amount * rate;
    cryptoAmount.textContent = converted.toFixed(8);

    const confirmationAmount = document.querySelector('.crypto__amount');
    const balanceValue = document.querySelector('.balance__value');
    
    if (confirmationAmount && balanceValue) {
      confirmationAmount.textContent = `${converted.toFixed(8)} ${currency}`;
      balanceValue.textContent = `${converted.toFixed(8)} ${currency}`;
    }
  }
}

function initPaymentMethods() {
  const paymentMethods = document.querySelectorAll('.payment__method');
  
  paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
      paymentMethods.forEach(m => m.classList.remove('selected'));

      method.classList.add('selected');

      const paymentType = method.getAttribute('data-method');
      console.log(`選択された支払い方法: ${paymentType}`);
    });
  });
}

function initCryptoSelector() {
  const cryptoOptions = document.querySelectorAll('.crypto__option');
  
  cryptoOptions.forEach(option => {
    option.addEventListener('click', () => {
      cryptoOptions.forEach(o => o.classList.remove('selected'));

      option.classList.add('selected');

      const crypto = option.getAttribute('data-crypto');
      const balance = option.querySelector('.crypto__balance').textContent;
      
      const currencySymbol = document.querySelector('.amount__input.crypto .currency__symbol');
      const availableBalance = document.querySelector('.available__balance');
      
      if (currencySymbol && availableBalance) {
        currencySymbol.textContent = crypto;
        availableBalance.textContent = balance;
      }

      updateReviewValues(crypto, balance);
    });
  });
  
  function updateReviewValues(crypto, balance) {
    const reviewAmount = document.querySelector('.review__item:first-child .review__value');
    const reviewFee = document.querySelector('.review__item:nth-child(2) .review__value');
    const reviewReceive = document.querySelector('.review__item:nth-child(3) .review__value');
    
    if (reviewAmount && reviewFee && reviewReceive) {
      const balanceValue = parseFloat(balance.split(' ')[0]);
      const amount = balanceValue * 0.8; 
      const fee = balanceValue * 0.05; 
      const receive = amount - fee;
      
      reviewAmount.textContent = `${amount.toFixed(8)} ${crypto}`;
      reviewFee.textContent = `${fee.toFixed(8)} ${crypto}`;
      reviewReceive.textContent = `${receive.toFixed(8)} ${crypto}`;
    }
  }
}

function initWithdrawForm() {
  const withdrawAmount = document.getElementById('withdraw__amount');
  const quickAmounts = document.querySelectorAll('.quick__amount');
  
  if (!withdrawAmount || !quickAmounts.length) return;

  quickAmounts.forEach(btn => {
    btn.addEventListener('click', () => {
      const percent = parseInt(btn.getAttribute('data-percent'));
      const availableBalance = document.querySelector('.available__balance');
      
      if (availableBalance) {
        const balanceText = availableBalance.textContent;
        const balance = parseFloat(balanceText.split(' ')[0]);
        const amount = (balance * percent / 100).toFixed(8);
        
        withdrawAmount.value = amount;

        const crypto = balanceText.split(' ')[1];
        updateReviewValues(amount, crypto);
      }
    });
  });

  withdrawAmount.addEventListener('input', () => {
    const amount = withdrawAmount.value;
    const availableBalance = document.querySelector('.available__balance');
    
    if (availableBalance) {
      const crypto = availableBalance.textContent.split(' ')[1];
      updateReviewValues(amount, crypto);
    }
  });
  
  function updateReviewValues(amount, crypto) {
    const reviewAmount = document.querySelector('.review__item:first-child .review__value');
    const reviewFee = document.querySelector('.review__item:nth-child(2) .review__value');
    const reviewReceive = document.querySelector('.review__item:nth-child(3) .review__value');
    
    if (reviewAmount && reviewFee && reviewReceive) {
      const amountValue = parseFloat(amount);
      const fee = amountValue * 0.05; 
      const receive = amountValue - fee;
      
      reviewAmount.textContent = `${amountValue.toFixed(8)} ${crypto}`;
      reviewFee.textContent = `${fee.toFixed(8)} ${crypto}`;
      reviewReceive.textContent = `${receive.toFixed(8)} ${crypto}`;
    }
  }
}

function initWalletAddressInput() {
  const walletAddress = document.getElementById('wallet__address');
  const scanQrBtn = document.querySelector('.scan__qr__btn');
  const qrScanner = document.querySelector('.qr__scanner');
  
  if (!walletAddress || !scanQrBtn || !qrScanner) return;

  scanQrBtn.addEventListener('click', () => {
    qrScanner.style.display = qrScanner.style.display === 'block' ? 'none' : 'block';

    if (qrScanner.style.display === 'block') {
      setTimeout(() => {
        walletAddress.value = 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq';
        qrScanner.style.display = 'none';

        const addressValue = document.querySelector('.address__value');
        if (addressValue) {
          addressValue.textContent = 'bc1q...7e9h';
        }
      }, 3000);
    }
  });
}

function initConfirmationForm() {
  const inputBoxes = document.querySelectorAll('.input__box');
  const timerCount = document.querySelector('.timer__count');
  const confirmBtn = document.querySelector('.confirm__btn');
  
  if (!inputBoxes.length || !timerCount || !confirmBtn) return;

  let currentBox = 0;
  
  function simulateCodeInput() {
    if (currentBox >= inputBoxes.length) return;
    
    const digits = ['1', '2', '3', '4', '5', '6'];
    inputBoxes[currentBox].textContent = digits[currentBox];
    currentBox++;
    
    if (currentBox < inputBoxes.length) {
      setTimeout(simulateCodeInput, 500);
    }
  }
  
  setTimeout(simulateCodeInput, 2000);

  let timeLeft = 30;
  
  const timer = setInterval(() => {
    timeLeft--;
    timerCount.textContent = timeLeft;
    
    if (timeLeft <= 0) {
      clearInterval(timer);
    }
  }, 1000);

  confirmBtn.addEventListener('click', () => {
    if (currentBox >= inputBoxes.length) {
      const progressSteps = document.querySelectorAll('.progress__step');
      
      if (progressSteps.length >= 4) {
        setTimeout(() => {
          progressSteps[2].classList.remove('active');
          progressSteps[2].classList.add('completed');
          progressSteps[2].querySelector('i').className = 'fas fa-check-circle';
          
          progressSteps[3].classList.add('active');
          progressSteps[3].querySelector('i').className = 'fas fa-check-circle';

          alert('撤退は正常に処理されました！');
        }, 2000);
      }
    } else {
      alert('完全な2FAコードを入力してください');
    }
  });
}

function initAnimations() {
  const addressValue = document.querySelector('.address__value');
  const addressTooltip = document.querySelector('.address__tooltip');
  
  if (addressValue && addressTooltip) {
    addressValue.addEventListener('mouseenter', () => {
      addressTooltip.style.display = 'block';
    });
    
    addressValue.addEventListener('mouseleave', () => {
      addressTooltip.style.display = 'none';
    });
  }

  const steps = document.querySelectorAll('.step');
  
  function checkScroll() {
    steps.forEach(step => {
      const stepTop = step.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (stepTop < windowHeight * 0.8) {
        step.style.opacity = '1';
        step.style.transform = 'translateY(0)';
      }
    });
  }

  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(20px)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('load', checkScroll);
  window.addEventListener('scroll', checkScroll);
  
  const processSteps = document.querySelectorAll('.process__step');
  let currentStep = 2; 
  
  if (processSteps.length >= 4) {
    const interval = setInterval(() => {
      if (currentStep >= processSteps.length) {
        clearInterval(interval);
        return;
      }
      
      processSteps[currentStep].classList.remove('active');
      processSteps[currentStep].classList.add('completed');
      processSteps[currentStep].querySelector('i').className = 'fas fa-check-circle';
      
      currentStep++;
      
      if (currentStep < processSteps.length) {
        processSteps[currentStep].classList.add('active');
        processSteps[currentStep].querySelector('i').className = 'fas fa-spinner fa-spin';
      }
    }, 5000); 
  }
}