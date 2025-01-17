const featureBoxes = document.querySelectorAll('.vip-feature-box');
const featureImages = document.querySelectorAll('.vip-feature-image');
const DURATION = 5000;
let currentIndex = 0;
let progressInterval;

function updateProgress(progress) {
  const activeBox = document.querySelector('.vip-feature-box.active');
  if (activeBox) {
    activeBox.querySelector('.vip-progress').style.width = `${progress}%`;
  }
}

function resetProgress() {
  document.querySelectorAll('.vip-progress').forEach(progress => {
    progress.style.width = '0%';
  });
}

function switchFeature(index) {
  featureBoxes.forEach(box => box.classList.remove('active'));
  featureImages.forEach(img => img.classList.remove('active'));

  featureBoxes[index].classList.add('active');
  featureImages[index].classList.add('active');

  resetProgress();
  let progress = 0;
  clearInterval(progressInterval);
  
  progressInterval = setInterval(() => {
    progress += (100 / (DURATION / 100)); 
    updateProgress(progress);
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      currentIndex = (currentIndex + 1) % featureBoxes.length;
      switchFeature(currentIndex);
    }
  }, 100);
}

switchFeature(currentIndex);

featureBoxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    currentIndex = index;
    switchFeature(currentIndex);
  });
});