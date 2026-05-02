/* Navigation */
// Native anchor links handle scrolling + URL hash.
window.addEventListener('load', function() {
  // If you open the page with no hash, always start at the top (About).
  if (!window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
});

/* Theme */
var storedTheme = localStorage.getItem('theme');
var isDark = storedTheme === 'dark';
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
// Show the *action* icon:
// - light mode → show moon (switch to dark)
// - dark mode  → show sun  (switch to light)
document.getElementById('moon-icon').style.display = isDark ? 'none' : '';
document.getElementById('sun-icon').style.display = isDark ? '' : 'none';

function toggleTheme() {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.getElementById('moon-icon').style.display = isDark ? 'none' : '';
  document.getElementById('sun-icon').style.display = isDark ? '' : 'none';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

document.addEventListener('keydown', function(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    toggleTheme();
  }
});

/* Typewriter */
var phrases = ['product management.', 'software development.', 'technical program management.'];
var typedEl = document.getElementById('typed');
var phraseIndex = 0;
var charIndex = 0;
var deleting = false;

function type() {
  var current = phrases[phraseIndex];
  if (deleting) {
    typedEl.textContent = current.substring(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 35);
  } else {
    typedEl.textContent = current.substring(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 60);
  }
}

setTimeout(type, 600);
