// Menú del curso: se edita SOLO aquí y aparece en todas las páginas
(function () {
  var semanas = [
    { n: 'S1', paginas: [{ t: 'Algoritmos', u: 'index.html' }, { t: 'Actividad 1', u: 'index.html#actividad' }] },
    { n: 'S2', paginas: [{ t: 'Semana 2', u: 'semana2.html' }, { t: 'Actividad 2', u: 'actividad2.html' }] },
    { n: 'S3', paginas: [{ t: 'Semana 3', u: 'semana3.html' }, { t: 'Avance', u: 'avance.html' }] },
    { n: 'S4', paginas: [{ t: 'Semana 4', u: 'semana4.html' }, { t: 'Actividad 3', u: 'actividad3.html' }] },
    { n: 'S5', paginas: [{ t: 'Semana 5', u: 'semana5.html' }, { t: 'Actividad 4', u: 'actividad4.html' }] },
    { n: 'S6', paginas: [{ t: 'Semana 6', u: 'semana6.html' }, { t: 'Actividad 5', u: 'semana6.html#actividad' }] },
    { n: 'S7', paginas: [{ t: 'Semana 7', u: 'semana7.html' }] }
  ];

  var actual = location.pathname.split('/').pop() || 'index.html';
  function archivo(u) { return u.split('#')[0]; }

  // 1. Barra de arriba
  var html = '<div class="wrap mc-barra">' +
    '<a class="mc-marca" href="index.html">Fundamentos de Programación</a>' +
    '<button class="mc-boton" type="button" aria-expanded="false">☰ Semanas</button>' +
    '<ul class="mc-lista">';

  semanas.forEach(function (s, i) {
    var activa = s.paginas.some(function (p) { return archivo(p.u) === actual; });
    html += '<li class="mc-semana' + (activa ? ' activa' : '') + '">' +
      '<a class="mc-pill s' + (i + 1) + '" href="' + s.paginas[0].u + '">' + s.n + '</a>' +
      '<ul class="mc-sub">';
    s.paginas.forEach(function (p) {
      var aqui = p.u === actual ? ' aria-current="page"' : '';
      html += '<li><a href="' + p.u + '"' + aqui + '>' + p.t + '</a></li>';
    });
    html += '</ul></li>';
  });
  html += '</ul></div>';

  var nav = document.createElement('nav');
  nav.className = 'menu-curso';
  nav.innerHTML = html;
  document.body.insertBefore(nav, document.body.firstChild);

  var boton = nav.querySelector('.mc-boton');
  boton.addEventListener('click', function () {
    var abierto = nav.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', abierto);
    boton.textContent = abierto ? '✕ Cerrar' : '☰ Semanas';
  });

  // 2. Botones Anterior / Siguiente (solo páginas, sin los enlaces con #)
  var orden = [];
  semanas.forEach(function (s) {
    s.paginas.forEach(function (p) { if (p.u.indexOf('#') === -1) orden.push(p); });
  });

  var pos = -1;
  orden.forEach(function (p, i) { if (p.u === actual) pos = i; });
  if (pos === -1) return;

  var ant = orden[pos - 1];
  var sig = orden[pos + 1];
  var pie = '';
  if (ant) pie += '<a class="ant" href="' + ant.u + '"><small>← Anterior</small><b>' + ant.t + '</b></a>';
  if (sig) pie += '<a class="sig" href="' + sig.u + '"><small>Siguiente →</small><b>' + sig.t + '</b></a>';

  var cont = document.createElement('div');
  cont.className = 'wrap mc-pie';
  cont.innerHTML = pie;

  var footer = document.querySelector('footer');
  if (footer) footer.parentNode.insertBefore(cont, footer);
  else document.body.appendChild(cont);
})();
