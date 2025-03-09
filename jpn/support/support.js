const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendMessage');
const faqItems = document.querySelectorAll('.faq__item');

const responses = {
    こんにちは: "こんにちは！今日はどのようにお手伝いできますか？",
    はい: "こんにちは！どのようにお手伝いできますか？",
    ねえ: "こんにちは！何かお困りですか？",
    挨拶: "ご挨拶！どのようにお手伝いできますか？",
    おはよう: "おはようございます！どのようにお手伝いできますか？",
    こんにちは: "こんにちは！どのようにお手伝いできますか？",
    こんばんは: "こんばんは！何かお困りですか？",
    助けて: "もちろん、お手伝いします！何についてお困りですか？",
    サポート: "サポートが必要ですね。どのようにお手伝いできますか？",
    支援: "今日はどのようにお手伝いできますか？",
    アカウント: "アカウントに関する問題は、アカウントサポートページをご覧ください。",
    ログイン: "ログインの問題がある場合は、ログインヘルプページをご確認ください。",
    パスワード: "パスワードに関する問題は、パスワードリセットページでリセットできます。",
    暗号通貨: "さまざまな暗号通貨をサポートしています。どの通貨について知りたいですか？",
    ビットコイン: "ビットコインに対応しています。取引のサポートが必要ですか？",
    イーサリアム: "イーサリアムに対応しています。どのようなサポートが必要ですか？",
    ライトコイン: "ライトコインに対応しています。どのようにお手伝いできますか？",
    取引: "取引に関する質問は、取引サポートページをご覧ください。",
    支払い: "支払いの問題は、支払いサポートページをご確認ください。",
    返金: "返金のリクエストは、返金ポリシーページをご覧ください。",
    配送: "配送情報については、配送詳細ページをご確認ください。",
    注文: "注文に関する質問は、注文サポートページをご覧ください。",
    商品: "商品の情報については、商品詳細ページをご覧ください。",
    価格: "価格の詳細については、価格ページをご確認ください。",
    割引: "割引情報については、割引オファーページをご覧ください。",
    サブスクリプション: "サブスクリプションの詳細については、サブスクリプションページをご覧ください。",
    キャンセル: "サブスクリプションをキャンセルするには、キャンセルページをご覧ください。",
    アップグレード: "アップグレードのオプションについては、アップグレードページをご覧ください。",
    ダウングレード: "ダウングレードのオプションについては、ダウングレードページをご覧ください。",
    トライアル: "トライアルの情報については、トライアルオファーページをご覧ください。",
    機能: "機能の詳細については、機能ページをご確認ください。",
    お問い合わせ: "お問い合わせは、コンタクトページをご覧ください。",
    フィードバック: "ご意見をお待ちしています！フィードバックページをご覧ください。",
    クレーム: "クレームを提出するには、クレームページをご覧ください。",
    提案: "ご提案ありがとうございます！提案ページをご覧ください。",
    デフォルト: "申し訳ありませんが、理解できませんでした。もう一度言い換えていただけますか？"
};

window.addEventListener('DOMContentLoaded', () => {
    addMessage("おはようございます！Waifuspinのサポートへようこそ。今日はどのようにお手伝いできますか？🎮", false);
    initFAQ();
});

function getResponse(message) {
    const lowerCaseMessage = message.toLowerCase();
    for (const key in responses) {
        if (lowerCaseMessage.includes(key)) {
            return responses[key];
        }
    }
    return responses.default;
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'agent'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message__content';
    
    if (!isUser) {
        const typing = document.createElement('div');
        typing.className = 'typing';
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typing.appendChild(dot);
        }
        messageContent.appendChild(typing);
        
        setTimeout(() => {
            typing.remove();
            messageContent.innerHTML = `<p>${content}</p>`;
        }, 1500);
    } else {
        messageContent.innerHTML = `<p>${content}</p>`;
    }
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleSendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        
        const response = getResponse(message);
        addMessage(response);
    }
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');
        const icon = item.querySelector('.faq__icon');
        
        answer.style.height = '0px';
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq__answer').style.height = '0px';
                    otherItem.querySelector('.faq__icon').style.transform = 'rotate(0deg)';
                }
            });
            
            item.classList.toggle('active');
            answer.style.height = isOpen ? '0px' : `${answer.scrollHeight}px`;
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(45deg)';
        });
    });
}

sendButton.addEventListener('click', handleSendMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
            });
    });
});
