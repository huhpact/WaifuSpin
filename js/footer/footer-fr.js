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
                  <li><a href="/fr/casino-games/casino-games.html">Jeux de casino</a></li>
                  <li><a href="/fr/slots-guide/slots-guide.html">Guide des machines à sous</a></li>
                  <li><a href="/fr/live-casino/live-casino.html">Casino en direct</a></li>
                  <li><a href="/fr/lucky-wheel-guide/lucky-wheel-guide.html">Guide des roues chanceuses</a></li>
                  <li><a href="/fr/limbo-guide/limbo-guide.html">Guide de limbo</a></li>
                  <li><a href="/fr/provider/provider.html">Fournisseurs</a></li>
                  <li><a href="/fr/promotions-and-competitions/promotions-and-competitions.html">Promotions et compétitions</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>Assistance</h4>
              <ul>
                  <li><a href="/fr/help-center/help-center.html">Centre d'aide</a></li>
                  <li><a href="/fr/hotline-for-game-problems/hotline-for-game-problems.html">Hotline pour les problèmes de jeu</a></li>
                  <li><a href="/fr/support/support.html">Assistance en direct</a></li>
                  <li><a href="/fr/self-exclusion/self-exclusion.html">Auto-exclusion</a></li>
                  <li><a href="/fr/fairness/fairness.html">Honnêteté</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>À propos de nous</h4>
              <ul>
                  <li><a href="/fr/vip/vip.html">Club VIP</a></li>
                  <li><a href="/fr/affiliates/affiliates.html">Affiliées</a></li>
                  <li><a href="/fr/privacy-policy/privacy-policy">Politique de confidentialité</a></li>
                  <li><a href="/fr/lbc-policy/lbc-policy.html">Politique LBC</a></li>
                  <li><a href="/fr/terms-of-use/terms-of-use.html">Conditions d'utilisation</a></li>
              </ul>
          </div>
  
          <div class="section">
              <h4>Informations de paiement</h4>
              <ul>
                  <li><a href="/fr/deposits-and-withdrawals/deposits-and-withdrawals.html">Dépôts et retraits</a></li>
                  <li><a href="/fr/guide-to-currencies/guide-to-currencies.html">Guide des devises</a></li>
                  <li><a href="/fr/guide-to-crypto/guide-to-crypto.html">Guide des crypto-monnaies</a></li>
                  <li><a href="/fr/supported-crypto/supported-crypto.html">Crypto-monnaies prises en charge</a></li>
                  <li><a href="/fr/how-much-to-bet/how-much-to-bet.html">Combien parier?</a></li>
              </ul>
          </div>
  
          <div class="section">
  
              <div class="language__selector">
                  <select>
										  <option value="fr">Français</option>
											<option value="en">English</option>
                      
                  </select>
              </div>
  
              <div class="currency__selector">
                  <select>
                      <option value="decimal">Décimale</option>
                      <option value="fractional">Fractionell</option>
                      <option value="american">Américain</option>
                  </select>
              </div>
  
            
              <div class="btc__rate">1 BTC = Loading...</div>
          </div>
      </div>
      <hr>
      
  
      <div class="copyright">
          &copy; 2025 waifuspin.com | Tous droits réservés.
      </div>
      </footer>
	`;
	
	document.body.insertAdjacentHTML("beforeend", footerHTML);
});
