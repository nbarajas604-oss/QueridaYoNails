// ── Catálogo: dibuja filtros y tarjetas a partir de catalogo-datos.js ──
const filtros = document.getElementById('catalogFilters');
const grid    = document.getElementById('catalogGrid');

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

// Filtros (solo categorías que tienen productos)
const usadas = Object.keys(CATEGORIAS).filter(c => CATALOGO.some(p => p.categoria === c));
[['todos', 'Todos'], ...usadas.map(c => [c, CATEGORIAS[c]])].forEach(([id, nombre], i) => {
  const b = el('button', 'chip' + (i === 0 ? ' active' : ''), nombre);
  b.type = 'button';
  b.dataset.cat = id;
  b.setAttribute('aria-pressed', i === 0);
  filtros.appendChild(b);
});

// Tarjetas
CATALOGO.forEach(p => {
  const card = el('article', 'catalog-card');
  card.dataset.cat = p.categoria;

  const foto = el('button', 'gallery-item catalog-photo');
  foto.type = 'button';
  const img = el('img');
  img.src = `assets/img/${p.foto}`;
  img.alt = p.nombre;
  img.loading = 'lazy';
  img.width = 600;
  img.height = 600;
  foto.append(img, el('span', 'gallery-overlay', 'Ver'));
  if (p.favorito) foto.appendChild(el('span', 'badge catalog-badge', 'Favorito'));

  const body = el('div', 'catalog-body');
  body.appendChild(el('span', 'catalog-cat', CATEGORIAS[p.categoria] || ''));
  body.appendChild(el('h3', '', p.nombre));
  body.appendChild(el('p', '', p.descripcion));

  const meta = el('div', 'catalog-meta');
  meta.appendChild(el('span', 'catalog-price', precioTexto(p)));
  if (p.duracion) meta.appendChild(el('span', 'catalog-time', `⏱ ${p.duracion}`));
  body.appendChild(meta);

  const pedir = el('a', 'btn-service js-wa', 'Pedir por WhatsApp');
  pedir.href = '#';
  pedir.dataset.msg = `Hola 💅 vi en el catálogo "${p.nombre}" y me gustaría agendar una cita`;
  body.appendChild(pedir);

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
