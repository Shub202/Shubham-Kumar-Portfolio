/* === helper === */
const $ = (s) => document.querySelector(s);

/* === Theme Toggle ==================================== */
const body = document.body;
const toggleBtn = $('#themeToggle');

function setTheme(dark) {
  body.classList.toggle('dark', dark);
  toggleBtn.innerHTML = dark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  toggleBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', () => {
  const pref = localStorage.getItem('theme');
  setTheme(pref ? pref === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
});

toggleBtn.addEventListener('click', () => setTheme(!body.classList.contains('dark')));

/* === Mobile Nav ====================================== */
const navBtn   = $('#navToggle');
const navLinks = $('#navLinks');

navBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navBtn.setAttribute('aria-expanded', open);
});
navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    navBtn.setAttribute('aria-expanded', 'false');
  }
});

/* === Typing Effect =================================== */
const typingEl = $('#typingText');
const txt = "Hello, I’m Shubham Kumar";
let i = 0, back = false;
(function loop() {
  typingEl.textContent = txt.slice(0, i);
  if (!back && i < txt.length)      { i++; setTimeout(loop, 100); }
  else if ( back && i > 0)          { i--; setTimeout(loop, 60 ); }
  else if (i === txt.length)        { back = true; setTimeout(loop, 1500); }
  else                               { back = false; setTimeout(loop, 700 ); }
})();

/* === Simple Form Validation ========================== */
function validateForm() {
  const name = $('#name').value.trim();
  const email= $('#email').value.trim();
  const msg  = $('#message').value.trim();
  const box  = $('#formMessage');
  const ok   = name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && msg;

  box.textContent = '';
  box.className = 'form-msg';

  if (ok) {
    box.textContent = 'Thanks! I’ll reply soon.';
    box.classList.add('success');
    setTimeout(()=>box.textContent='',3500);
    return false; // prevent real submit
  }
  box.textContent = 'Please fill in all fields correctly.';
  box.classList.add('error');
  return false;
}

/* === Footer year ===================================== */
$('#currentYear').textContent = new Date().getFullYear();
