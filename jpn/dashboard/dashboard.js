let userData = {
    username: localStorage.getItem('loggedInUserUsername') || 'ゲスト',
    balance: parseFloat(localStorage.getItem('loggedInUserBalance')) || "00.00"
};

const greetings = [
    `おかえり, ${userData.username}! スピンする準備はできましたか？`,
    `おい ${userData.username}! 今日はあなたの幸運な日を作ってみましょう！`,
    `お会いできてうれしいです, ${userData.username}! 今日はスロットが暑いです！`
];

function updateUI() {
    document.getElementById('username').textContent = userData.username;
    document.getElementById('userBalance').textContent = `$${userData.balance.toFixed(2)}`;
    document.getElementById('greeting').textContent = greetings[Math.floor(Math.random() * greetings.length)];
}

const profileTrigger = document.querySelector('.profile__trigger');
const dropdown = document.querySelector('.dropdown');

profileTrigger.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!profileTrigger.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

function setupModal(modalId, triggerId, closeClass = 'close') {
    const modal = document.getElementById(modalId);
    const trigger = document.getElementById(triggerId);
    const closeBtn = modal.querySelector(`.${closeClass}`);

    trigger.addEventListener('click', () => {
        modal.classList.add('active');
        dropdown.classList.remove('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

setupModal('notificationsModal', 'notificationsBtn');
setupModal('settingsModal', 'settingsBtn');
setupModal('withdrawModal', 'withdrawModal');

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedInUserUsername');
    localStorage.removeItem('loggedInUserBalance');
    window.location.href = '/jpn/login/login.html';
});

document.querySelectorAll('.amount__buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const amount = parseFloat(button.dataset.amount);
        userData.balance += amount;
        localStorage.setItem('loggedInUserBalance', userData.balance);
        updateUI();

        alert(`正常に堆積しました $${amount}! ストライプにリダイレクトされます。`);
    });
});

document.getElementById('withdrawBtn').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('walletAddress').value);
    const crypto = document.getElementById('cryptoSelect').value;
    const wallet = document.getElementById('walletAddress').value;

    if (!wallet) {
        alert('有効なウォレットアドレスを入力してください');
        return;
    }

    document.getElementById('transactionId').textContent = Math.random().toString(36).substr(2, 9).toUpperCase();
    document.getElementById('withdrawAmount').textContent = `$${userData.balance.toFixed(2)}`;
    document.getElementById('withdrawCrypto').textContent = crypto.toUpperCase();
    document.getElementById('withdrawWallet').textContent = wallet;
    document.getElementById('withdrawDate').textContent = new Date().toLocaleString();

    document.getElementById('withdrawModal').classList.add('active');

    userData.balance = 0;
    localStorage.setItem('loggedInUserBalance', userData.balance);
    updateUI();
});

async function updateCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=usd');
        const data = await response.json();

        document.querySelector('[data-crypto="btc"] .price').textContent = `$${data.bitcoin.usd.toLocaleString()}`;
        document.querySelector('[data-crypto="eth"] .price').textContent = `$${data.ethereum.usd.toLocaleString()}`;
        document.querySelector('[data-crypto="sol"] .price').textContent = `$${data.solana.usd.toLocaleString()}`;
        document.querySelector('[data-crypto="xrp"] .price').textContent = `$${data.ripple.usd.toLocaleString()}`;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
}

updateCryptoPrices();
setInterval(updateCryptoPrices, 30000);

updateUI();

document.querySelectorAll('.game__card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

document.querySelectorAll('.amount__buttons button').forEach(button => {
    const amount = button.getAttribute('data-amount');
    let link;
    switch(amount) {
        case '10':
            link = 'https://buy.stripe.com/8wM15P1sk5Hg5W0bII';
            break;
        case '25':
            link = 'https://buy.stripe.com/eVa5m5fjaglU1FK146';
            break;
        case '50':
            link = 'https://buy.stripe.com/00gbKtgned9IdoseUX';
            break;
        case '100':
            link = 'https://buy.stripe.com/28og0Jgne7Po7049AE';
            break;
        case '250':
            link = 'https://buy.stripe.com/00g15P4EwedMesw28d';
            break;
        case '500':
            link = 'https://buy.stripe.com/6oE15Pfja8Tsesw5kq';
            break;
        default:
            link = 'https://buy.stripe.com/6oE15Pfja8Tsesw5kq';
    }
    button.setAttribute('onclick', `window.location.href='${link}'`);
});

const loggedInUserUsername = localStorage.getItem("loggedInUserUsername");

if (!loggedInUserUsername) {
    window.location.href = "/jpn/login/login.html"; 
}
