// ── Catálogo: dibuja servicios, catálogo y galería desde catalogo-datos.js ──
const RUTA_FOTOS = 'assets/img/catalogo/';

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
};

const precioTexto = (p) => {
  if (p.precio === '' || p.precio == null) return 'Consultar';
  return `${p.desde ? 'Desde ' : ''}$${Number(p.precio).toLocaleString('es-MX')}`;
};

// Fotos con la portada primero, ya con la ruta completa
const fotosDe = (p) => {
  const lista = [...p.fotos];
  if (p.portada > 1) lista.unshift(...lista.splice(p.portada - 1, 1));
  return lista.map(f => RUTA_FOTOS + f);
};

// Botón con foto que abre el visor (main.js se encarga del visor)
const botonFoto = (src, alt, set, cls = '') => {
  const b = el('button', `gallery-item ${cls}`.trim());
  b.type = 'button';
  b.dataset.fotos = JSON.stringify(set);
  const img = el('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  img.width = 600;
  img.height = 600;
  b.append(img, el('span', 'gallery-overlay', set.length > 1 ? `Ver ${set.length} fotos` : 'Ver'));
  return b;
};

const botonPedir = (p, texto = 'Pedir por WhatsApp', cls = 'btn-service') => {
  const a = el('a', `${cls} js-wa`, texto);
  a.href = '#';
  a.dataset.msg = `Hola 💅 me interesa "${p.nombre}" (${p.servicio}) y me gustaría agendar una cita`;
  return a;
};

// ── Página principal: tarjetas de servicios ─────────────────────────
const servicesGrid = document.getElementById('servicesGrid');
if (servicesGrid) {
  CATALOGO.forEach(p => {
    const set = fotosDe(p);
    const card = el('div', 'service-card');
    card.appendChild(botonFoto(set[0], p.nombre, set, 'service-photo'));
    card.appendChild(el('h3', '', p.nombre.replace(/^Querida Yo,\s*/, '')));
    card.appendChild(el('p', 'service-kind', p.servicio));
    card.appendChild(el('div', 'service-price', precioTexto(p)));
    card.appendChild(botonPedir(p, 'Agendar'));
    servicesGrid.appendChild(card);
  });
}

// ── Página principal: galería ───────────────────────────────────────
const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid) {
  const set = GALERIA.map(f => RUTA_FOTOS + f);
  set.forEach((src, i) => {
    const b = botonFoto(src, `Trabajo de Querida Yo Nails Studio ${i + 1}`, set);
    b.dataset.inicio = i;  // el visor arranca en esta foto
    b.querySelector('.gallery-overlay').textContent = 'Ver';
    galleryGrid.appendChild(b);
  });
}

// ── Página principal: reels de Facebook ─────────────────────────────
const fbGrid = document.getElementById('fbGrid');
if (fbGrid && typeof PUBLICACIONES !== 'undefined') {
  PUBLICACIONES.slice(0, 3).forEach((id, i) => {
    const marco = el('div', 'fb-reel');
    const f = el('iframe');
    const reel = encodeURIComponent(`https://www.facebook.com/reel/${id}/`);
    f.src = `https://www.facebook.com/plugins/video.php?href=${reel}&show_text=false&width=320`;
    f.title = `Publicación de Facebook ${i + 1}`;
    f.loading = 'lazy';
    f.allow = 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';
    f.allowFullscreen = true;
    marco.appendChild(f);
    fbGrid.appendChild(marco);
  });
}

// ── Página de catálogo ──────────────────────────────────────────────
const filtros = document.getElementById('catalogFilters');
const grid    = document.getElementById('catalogGrid');

if (filtros && grid) {
  // Filtros (solo categorías que tienen productos)
  const usadas = Object.keys(CATEGORIAS).filter(c => CATALOGO.some(p => p.categoria === c));
  [['todos', 'Todos'], ...usadas.map(c => [c, CATEGORIAS[c]])].forEach(([id, nombre], i) => {
    const b = el('button', 'chip' + (i === 0 ? ' active' : ''), nombre);
    b.type = 'button';
    b.dataset.cat = id;
    b.setAttribute('aria-pressed', i === 0);
    filtros.appendChild(b);
  });

  CATALOGO.forEach(p => {
    const set = fotosDe(p);
    const card = el('article', 'catalog-card');
    card.dataset.cat = p.categoria;

    const foto = botonFoto(set[0], p.nombre, set, 'catalog-photo');
    if (set.length > 1) foto.appendChild(el('span', 'catalog-count', `📷 ${set.length}`));
    if (p.favorito) foto.appendChild(el('span', 'badge catalog-badge', 'Favorito'));

    const body = el('div', 'catalog-body');
    body.appendChild(el('span', 'catalog-cat', CATEGORIAS[p.categoria] || ''));
    body.appendChild(el('h3', '', p.nombre));
    body.appendChild(el('p', 'catalog-kind', p.servicio));

    const desc = el('p', 'catalog-desc', p.descripcion);
    const mas = el('button', 'catalog-more', 'Leer más');
    mas.type = 'button';
    mas.addEventListener('click', () => {
      const abierto = desc.classList.toggle('open');
      mas.textContent = abierto ? 'Leer menos' : 'Leer más';
    });
    body.append(desc, mas);

    const meta = el('div', 'catalog-meta');
    meta.appendChild(el('span', 'catalog-price', precioTexto(p)));
    if (p.duracion) meta.appendChild(el('span', 'catalog-time', `⏱ ${p.duracion}`));
    body.appendChild(meta);
    body.appendChild(botonPedir(p));

    card.append(foto, body);
    grid.appendChild(card);
  });

  // Filtrado
  filtros.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    filtros.querySelectorAll('.chip').forEach(c => {
      c.classList.toggle('active', c === b);
      c.setAttribute('aria-pressed', c === b);
    });
    grid.querySelectorAll('.catalog-card').forEach(card => {
      card.hidden = b.dataset.cat !== 'todos' && card.dataset.cat !== b.dataset.cat;
    });
  });
}
