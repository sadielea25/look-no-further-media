export function initIntro() {
  const introContainer = document.getElementById('intro-container');
  const app = document.getElementById('app');
  const linesContainer = document.getElementById('intro-lines');
  const glitchesContainer = document.getElementById('intro-glitches');

  // Palette with retro/glitch colors + brand colors
  const colors = ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00', '#E50914', '#141414', '#FFFFFF'];

  // Generate 50 narrow lines for full screen swipe
  for (let i = 0; i < 50; i++) {
    const line = document.createElement('div');
    line.className = 'line';
    const color = colors[Math.floor(Math.random() * colors.length)];
    line.style.setProperty('--color', color);
    line.style.setProperty('--i', i);
    // Randomize scale for glitchy width
    line.style.setProperty('--w', Math.random() * 2 + 0.5);
    linesContainer.appendChild(line);
  }

  // Generate 20 random glitch squares
  for (let i = 0; i < 20; i++) {
    const square = document.createElement('div');
    square.className = 'glitch-square';
    const color = colors[Math.floor(Math.random() * colors.length)];
    square.style.backgroundColor = color;
    square.style.left = Math.random() * 100 + 'vw';
    square.style.top = Math.random() * 100 + 'vh';
    square.style.width = (Math.random() * 150 + 20) + 'px';
    square.style.height = (Math.random() * 100 + 10) + 'px';
    // Add 1.5s delay so glitches happen when lines swipe
    square.style.animationDelay = (1.5 + Math.random() * 0.5) + 's';
    glitchesContainer.appendChild(square);
  }

  // Timings:
  // Logo reveals: 0s - 0.8s
  // Lines & glitches swipe: 1.5s
  // Lines zoom out ends: 2.8s
  // Total intro time: ~2.8 seconds
  setTimeout(() => {
    introContainer.classList.add('intro-fade-out');
    app.classList.remove('hidden');
    app.classList.add('app-reveal');

    setTimeout(() => {
      introContainer.style.display = 'none';
    }, 800);
  }, 2800);
}
