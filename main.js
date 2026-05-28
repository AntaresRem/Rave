// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Mock player
const playBtn = document.getElementById('playBtn');
const vinyl = document.getElementById('vinyl');
const eqBars = document.getElementById('eqBars');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
let playing = false;
let progress = 35;
let seconds = 94; // 1:34
let interval = null;

const playIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
const pauseIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

playBtn.addEventListener('click', () => {
  playing = !playing;
  playBtn.innerHTML = playing ? pauseIcon : playIcon;
  vinyl.classList.toggle('spinning', playing);
  eqBars.classList.toggle('paused', !playing);

  if (playing) {
    interval = setInterval(() => {
      seconds++;
      progress = (seconds / 272) * 100;
      if (progress >= 100) { seconds = 0; progress = 0; }
      progressFill.style.width = progress + '%';
      currentTimeEl.textContent = formatTime(seconds);
    }, 1000);
  } else {
    clearInterval(interval);
  }
});

// Tracklist interaction
document.querySelectorAll('.vibes-tracklist li').forEach(li => {
  li.addEventListener('click', () => {
    document.querySelectorAll('.vibes-tracklist li').forEach(x => x.classList.remove('active'));
    li.classList.add('active');
  });
});

// Scroll-reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.event-card, .dj-card, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Newsletter form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Subscribed!';
  btn.style.background = 'linear-gradient(135deg, #06b6d4, #8b5cf6)';
  setTimeout(() => {
    btn.innerHTML = '<span>Subscribe</span>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});
