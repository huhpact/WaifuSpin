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
                  <li><a href="/en/casino-games/casino-games.html">Casino Games</a></li>
                  <li><a href="/en/slots-guide/slots-guide.html">Slots Guide</a></li>
                  <li><a href="/en/live-casino/live-casino.html">Live Casino</a></li>
                  <li><a href="/en/lucky-wheel-guide/lucky-wheel-guide.html">Lucky Wheel Guide</a></li>
                  <li><a href="/en/limbo-guide/limbo-guide.html">Limbo Guide</a></li>
                  <li><a href="/en/provider/provider.html">Provider</a></li>
                  <li><a href="/en/promotions-and-competitions/promotions-and-competitions.html">Promotions & Competitions</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>Support</h4>
              <ul>
                  <li><a href="/en/help-center/help-center.html">Help Center</a></li>
                  <li><a href="/en/hotline-for-game-problems/hotline-for-game-problems.html">Hotline for Game Problems</a></li>
                  <li><a href="/en/support/support.html">Live Support</a></li>
                  <li><a href="/en/self-exclusion/self-exclusion.html">Self-Exclusion</a></li>
                  <li><a href="/en/fairness/fairness.html">Fairness</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>About Us</h4>
              <ul>
                  <li><a href="/en/vip/vip.html">VIP Club</a></li>
                  <li><a href="/en/affiliates/affiliates.html">Affiliates</a></li>
                  <li><a href="/en/privacy-policy/privacy-policy">Privacy Policy</a></li>
                  <li><a href="/en/lbc-policy/lbc-policy.html">LBC Policy</a></li>
                  <li><a href="/en/terms-of-use/terms-of-use.html">Terms of Use</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>Payment Information</h4>
              <ul>
                  <li><a href="/en/deposits-and-withdrawals/deposits-and-withdrawals.html">Deposits & Withdrawals</a></li>
                  <li><a href="/en/guide-to-currencies/guide-to-currencies.html">Guide to Currencies</a></li>
                  <li><a href="/en/guide-to-crypto/guide-to-crypto.html">Guide to Cryptocurrencies</a></li>
                  <li><a href="/en/supported-crypto/supported-crypto.html">Supported Cryptocurrencies</a></li>
                  <li><a href="/en/how-much-to-bet/how-much-to-bet.html">How much to bet?</a></li>
              </ul>
          </div>
  
          <div class="section">
  
              <div class="language__selector">
                  <select>
											<option value="en">English</option>
                      <option value="fr">Français</option>
                  </select>
              </div>
  
              <div class="currency__selector">
                  <select>
                      <option value="decimal">Decimal</option>
                      <option value="fractional">Fractional</option>
                      <option value="american">American</option>
                  </select>
              </div>
  
            
              <div class="btc__rate">1 BTC = Loading...</div>
          </div>
      </div>
      <hr>
      
  
      <div class="copyright">
          &copy; 2025 waifuspin.com | All rights reserved.
      </div>
      </footer>
	`;
	
	document.body.insertAdjacentHTML("beforeend", footerHTML);
});
