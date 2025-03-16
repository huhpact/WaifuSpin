document.addEventListener("DOMContentLoaded", function() {
	const footerHTML = `
		<footer>
        <div class="logo__footer1">
          <img src="/images/logo.png" alt="Waifuspin Logo">
      </div>
  
      <div class="container">
  
          <div class="section">
              <h4>Casino</h4>
              <ul>
                  <li><a href="/de/casino-games/casino-games.html">Casino-Spiele</a></li>
                  <li><a href="/de/slots-guide/slots-guide.html">Slots-Guide</a></li>
                  <li><a href="/de/live-casino/live-casino.html">Live Casino</a></li>
                  <li><a href="/de/lucky-wheel-guide/lucky-wheel-guide.html">Glücksrad-Guide</a></li>
                  <li><a href="/de/limbo-guide/limbo-guide.html">Limbo-Guide</a></li>
                  <li><a href="/de/provider/provider.html">Anbieter</a></li>
                  <li><a href="/de/promotions-and-competitions/promotions-and-competitions.html">Promotions & Wettbewerbe</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>Support</h4>
              <ul>
                  <li><a href="/de/help-center/help-center.html">Hilfe-Center</a></li>
                  <li><a href="/de/hotline-for-game-problems/hotline-for-game-problems.html">Hotline für Spielprobleme</a></li>
                  <li><a href="/de/support/support.html">Live-Kundenservice</a></li>
                  <li><a href="/de/self-exclusion/self-exclusion.html">Selbstausschluss</a></li>
                  <li><a href="/de/fairness/fairness.html">Fairness</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>Über uns</h4>
              <ul>
                  <li><a href="/de/vip/vip.html">VIP Club</a></li>
                  <li><a href="/de/affiliates/affiliates.html">Affiliates</a></li>
                  <li><a href="/de/privacy-policy/privacy-policy">Datenschutzrichtlinie</a></li>
                  <li><a href="/de/lbc-policy/lbc-policy.html">LBC-Richtlinie</a></li>
                  <li><a href="/de/terms-of-use/terms-of-use.html">Nutzungsbedingungen</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>Informationen zu Zahlungen</h4>
              <ul>
                  <li><a href="/de/deposits-and-withdrawals/deposits-and-withdrawals.html">Einzahlungen & Abhebungen</a></li>
                  <li><a href="/de/guide-to-currencies/guide-to-currencies.html">Leitfaden zu Währungen</a></li>
                  <li><a href="/de/guide-to-crypto/guide-to-crypto.html">Leitfaden zu Crypto</a></li>
                  <li><a href="/de/supported-crypto/supported-crypto.html">Unterstützte Crypto-Währungen</a></li>
                  <li><a href="/de/how-much-to-bet/how-much-to-bet.html">Wie viel wetten?</a></li>
              </ul>
          </div>
  
          <div class="section">
  
              <div class="language__selector">
                  <select>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                  </select>
              </div>
  
              <div class="currency__selector">
                  <select>
                      <option value="decimal">Dezimal</option>
                      <option value="fractional">Fraktionell</option>
                      <option value="american">Amerikanisch</option>
                  </select>
              </div>
  
            
              <div class="btc__rate">1 BTC = Loading...</div>
          </div>
      </div>
      <hr>
      
  
      <div class="copyright">
          &copy; 2025 waifuspin.com | Alle Rechte vorbehalten.
      </div>
       <p class="credit">Réalisé par 
            <a href="https://huhpact.dev?utm_source=waifuspin&utm_medium=webbrowser&utm_campaign=ws-footer">
                <img class="img-credit" src="https://huhpact.dev/s/logo-huhpact.png" alt="huh(pact)"></a></p>
      </footer>
	`;
	
	document.body.insertAdjacentHTML("beforeend", footerHTML);
});
