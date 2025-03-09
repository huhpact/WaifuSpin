const translations = {
	en: {
			title: "404",
			message: "Oops! Looks like this page got lost in the casino.",
			button: "Return to Homepage"
	},
	de: {
			title: "404",
			message: "Ups! Diese Seite hat sich im Casino verlaufen.",
			button: "Zurück zur Startseite"
	},
	fr: {
			title: "404",
			message: "Oups ! Cette page s'est perdue dans le casino.",
			button: "Retour à l'accueil"
	},
	ja: {
			title: "404",
			message: "おっと！このページはカジノで迷子になってしまいました。",
			button: "ホームページに戻る"
	}
};

class I18n {
	constructor() {
			this.currentLang = this.getBrowserLanguage();
			this.init();
	}

	getBrowserLanguage() {
			const browserLang = navigator.language.split('-')[0];
			return translations[browserLang] ? browserLang : 'fr';
	}

	init() {
			this.updateContent();
			this.setupLanguageSelector();
	}

	updateContent() {
			document.querySelectorAll('[data-i18n]').forEach(element => {
					const key = element.getAttribute('data-i18n');
					element.textContent = translations[this.currentLang][key];
			});

			document.documentElement.lang = this.currentLang;

			document.querySelectorAll('.language__selector button').forEach(btn => {
					btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
			});
	}
}