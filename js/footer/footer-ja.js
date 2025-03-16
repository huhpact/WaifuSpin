document.addEventListener("DOMContentLoaded", function() {
	const footerHTML = `
		<footer>
        <div class="logo__footer1">
          <img src="/images/logo.png" alt="Waifuspin Logo">
      </div>
  
      <div class="container">
  
          <div class="section">
              <h4>カジノ</h4>
              <ul>
                  <li><a href="/jpn/casino-games/casino-games.html">カジノゲーム</a></li>
                  <li><a href="/jpn/slots-guide/slots-guide.html">スロットガイド</a></li>
                  <li><a href="/jpn/live-casino/live-casino.html">ライブカジノ</a></li>
                  <li><a href="/jpn/lucky-wheel-guide/lucky-wheel-guide.html">ラッキーホイールガイド</a></li>
                  <li><a href="/jpn/limbo-guide/limbo-guide.html">リンボガイド</a></li>
                  <li><a href="/jpn/provider/provider.html">プロバイダー</a></li>
                  <li><a href="/jpn/promotions-and-competitions/promotions-and-competitions.html">プロモーションと競争</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>サポート</h4>
              <ul>
                  <li><a href="/jpn/help-center/help-center.html">ヘルプセンター</a></li>
                  <li><a href="/jpn/hotline-for-game-problems/hotline-for-game-problems.html">ゲームの問題のためのホットライン</a></li>
                  <li><a href="/jpn/support/support.html">ライブサポート</a></li>
                  <li><a href="/jpn/self-exclusion/self-exclusion.html">自己排除</a></li>
                  <li><a href="/jpn/fairness/fairness.html">公平性</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>私たちについて</h4>
              <ul>
                  <li><a href="/jpn/vip/vip.html">VIPクラブ</a></li>
                  <li><a href="/jpn/affiliates/affiliates.html">アフィリエイト</a></li>
                  <li><a href="/jpn/privacy-policy/privacy-policy">プライバシーポリシー</a></li>
                  <li><a href="/jpn/lbc-policy/lbc-policy.html">LBCポリシー</a></li>
                  <li><a href="/jpn/terms-of-use/terms-of-use.html">利用規約</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>支払い情報</h4>
              <ul>
                  <li><a href="/jpn/deposits-and-withdrawals/deposits-and-withdrawals.html">預金と引き出し</a></li>
                  <li><a href="/jpn/guide-to-currencies/guide-to-currencies.html">通貨のガイド</a></li>
                  <li><a href="/jpn/guide-to-crypto/guide-to-crypto.html">暗号通貨のガイド</a></li>
                  <li><a href="/jpn/supported-crypto/supported-crypto.html">サポートされた暗号通貨</a></li>
                  <li><a href="/jpn/how-much-to-bet/how-much-to-bet.html">賭けはいくらですか？</a></li>
              </ul>
          </div>
  
          <div class="section">
  
              <div class="language__selector">
                  <select>
											<option value="jpn">日本語</option>
                      <option value="fr">Français</option>
											<option value="en">English</option>
                  </select>
              </div>
  
              <div class="currency__selector">
                  <select>
                      <option value="decimal">小数</option>
                      <option value="fractional">分数</option>
                      <option value="american">アメリカ人</option>
                  </select>
              </div>
  
            
              <div class="btc__rate">1 BTC = Loading...</div>
          </div>
      </div>
      <hr>
      
  
      <div class="copyright">
          &copy; 2025 waifuspin.com | 無断転載を禁じます.
      </div>
       <p class="credit">Réalisé par 
            <a href="https://huhpact.dev?utm_source=waifuspin&utm_medium=webbrowser&utm_campaign=ws-footer">
                <img class="img-credit" src="https://huhpact.dev/s/logo-huhpact.png" alt="huh(pact)"></a></p>
      </footer>
	`;
	
	document.body.insertAdjacentHTML("beforeend", footerHTML);
});
