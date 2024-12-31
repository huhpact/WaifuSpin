class AnimationController {
  constructor() {
      this.initPreloader();
      this.initCursor();
      
  }

  initPreloader() {
      window.addEventListener('load', () => {
          const preloader = document.querySelector('.preloader');
          preloader.classList.add('hidden');
      });
  }

	initCursor() {
		const cursor = document.querySelector('.custom-cursor');
		
		document.addEventListener('mousemove', (e) => {
				cursor.style.left = e.clientX + 'px';
				cursor.style.top = e.clientY + 'px';
		});

		document.addEventListener('mousedown', () => cursor.classList.add('active'));
		document.addEventListener('mouseup', () => cursor.classList.remove('active'));

		const buttons = document.querySelectorAll('button, a');
		buttons.forEach(button => {
				button.addEventListener('mouseenter', () => cursor.classList.add('active'));
				button.addEventListener('mouseleave', () => cursor.classList.remove('active'));
		});
	}
}

document.addEventListener('DOMContentLoaded', () => {
  new AnimationController();
});