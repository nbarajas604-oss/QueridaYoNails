// ── Datos del negocio (cámbialos aquí y se actualiza todo el sitio) ──
const NEGOCIO = {
  whatsapp:  '523121335144',            // código de país + número, sin espacios ni "+"
  telefono:  '3121335144',
  facebook:  '',                        // ⚠ link completo de la página
  instagram: '',                        // ⚠ link completo del perfil
  maps:      'https://maps.google.com/?q=765F%2B4P+Villa+de+%C3%81lvarez,+Colima'
};

// ── Enlaces de WhatsApp / redes ─────────────────────────────────────
document.querySelectorAll('.js-wa').forEach(a => {
  a.href = `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(a.dataset.msg || '')}`;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.referrerPolicy = 'no-referrer';
});
document.querySelectorAll('.js-maps').forEach(a => { a.href = NEGOCIO.maps; });
if (NEGOCIO.telefono) {
  document.querySelectorAll('.js-tel').forEach(a => {
    a.href = `tel:+52${NEGOCIO.telefono}`;
    a.textContent = NEGOCIO.telefono.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  });
}
[['.js-fb', NEGOCIO.facebook], ['.js-ig', NEGOCIO.instagram]].forEach(([sel, url]) => {
  document.querySelectorAll(sel).forEach(a => {
    if (url) a.href = url;
    else a.remove();  // sin link, no mostramos el botón
  });
});

// ── Menú móvil ──────────────────────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('navLinks');

const closeMenu = () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
};
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.js-nav-link').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
});

// ── Navbar al hacer scroll ──────────────────────────────────────────
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Resaltar el día de hoy en horarios ──────────────────────────────
const rows = document.querySelectorAll('.schedule tr');
const hoy = (new Date().getDay() + 6) % 7;  // lunes = 0
if (rows[hoy]) rows[hoy].classList.add('today');

// ── Lightbox galería ────────────────────────────────────────────────
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
lightbox.addEventListener('click', (e) => { if (e.target !== lightboxImg) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// ── Animación de entrada al hacer scroll ────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .pillar, .location-item, .gallery-item')
  .forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
