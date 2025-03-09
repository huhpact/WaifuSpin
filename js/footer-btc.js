function fetchBitcoinPrice() {
	fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
			.then(response => response.json())
			.then(data => {
					const btcPrice = data.bitcoin.usd;
					document.querySelector(".btc__rate").textContent = `1 BTC = ${btcPrice} USD`;
			})
			.catch(error => {
					console.error("Erreur lors de la consultation du prix du bitcoin:", error);
					document.querySelector(".btc__rate").textContent = "1 BTC = Loading...";
			});
}

fetchBitcoinPrice();
setInterval(fetchBitcoinPrice, 60000); 