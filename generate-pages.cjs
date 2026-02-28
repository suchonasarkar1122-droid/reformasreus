const fs = require('fs');

const HEAD_COMMON = `  <meta name="author" content="CUBE Arquitectos y Reformas Reus">
  <meta name="geo.region" content="ES-CT">
  <meta name="geo.placename" content="Reus, Tarragona">`;

const FONTS = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">`;

const NAV = `<header>
<nav class="nav nav--solid" id="navbar" aria-label="Navegación principal">
  <div class="nav-in">
    <a href="/" class="nav-logo" aria-label="CUBE Reformas Reus - Inicio"><img src="/img/logoweb.png" alt="CUBE Arquitectos y Reformas Reus" width="180" height="46"></a>
    <div class="nav-links"><a href="/#servicios">Servicios</a><a href="/#nosotros">Nosotros</a><a href="/#proyectos">Proyectos</a><a href="/#faq">FAQ</a><a href="/#contacto">Contacto</a></div>
    <div class="nav-right"><a href="tel:+34877278125" class="nav-phone" aria-label="Llamar"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> 877 27 81 25</a><a href="/#presupuesto" class="btn btn-p nav-cta">Presupuesto Gratis</a></div>
    <button class="nav-toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</nav>
<div class="nav-mobile" id="navMobile"><a href="/#servicios" onclick="closeMenu()">Servicios</a><a href="/#nosotros" onclick="closeMenu()">Nosotros</a><a href="/#proyectos" onclick="closeMenu()">Proyectos</a><a href="/#faq" onclick="closeMenu()">FAQ</a><a href="/#contacto" onclick="closeMenu()">Contacto</a><a href="tel:+34877278125" onclick="closeMenu()">877 27 81 25</a><a href="/#presupuesto" class="btn btn-p" onclick="closeMenu()">Presupuesto Gratis</a></div>
</header>`;

const FOOTER = `<footer class="footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><div class="footer-logo"><img src="/img/logoweb.png" alt="CUBE Reformas Reus" width="160" height="42"></div><p>Empresa de reformas integrales y arquitectura en Reus. Más de 15 años transformando viviendas y locales.</p></div><div><h4>Servicios</h4><ul class="footer-links"><li><a href="/servicios/reformas-integrales-pisos-reus.html">Reformas integrales</a></li><li><a href="/servicios/reformas-cocinas-reus.html">Reforma de cocinas</a></li><li><a href="/servicios/reformas-banos-reus.html">Reforma de baños</a></li><li><a href="/servicios/reformas-locales-comerciales-reus.html">Reforma de locales</a></li><li><a href="/servicios/reformas-chalets-casas-reus.html">Reforma de chalets</a></li><li><a href="/servicios/arquitectura-diseno-interior-reus.html">Arquitectura y diseño</a></li></ul></div><div><h4>Zonas en Reus</h4><ul class="footer-links"><li><a href="/zonas/reformas-centre-mercadal-reus.html">Centre / Mercadal</a></li><li><a href="/zonas/reformas-barri-gaudi-reus.html">Barri Gaudí</a></li><li><a href="/zonas/reformas-ponent-reus.html">Ponent</a></li><li><a href="/zonas/reformas-montserrat-reus.html">Montserrat</a></li><li><a href="/zonas/reformas-mas-abello-reus.html">Mas Abelló</a></li><li><a href="/zonas/reformas-sant-josep-obrer-reus.html">Sant Josep Obrer</a></li><li><a href="/zonas/reformas-fortuny-reus.html">Fortuny</a></li><li><a href="/zonas/reformas-el-carme-reus.html">El Carme</a></li></ul></div><div><h4>Contacto</h4><ul class="footer-links"><li><a href="tel:+34877278125">Tel: 877 27 81 25</a></li><li><a href="https://wa.me/34623760710" target="_blank" rel="noopener noreferrer">WhatsApp: 623 76 07 10</a></li><li><a href="mailto:info@cubereformasreus.es">info@cubereformasreus.es</a></li><li><a href="/#contacto">C/ Misericòrdia, 5, Reus</a></li></ul></div></div><div class="footer-bot"><span>&copy; 2026 CUBE Arquitectos y Reformas Reus.</span><div class="footer-legal"><a href="/politica-privacidad.html">Privacidad</a><a href="/aviso-legal.html">Aviso legal</a><a href="/politica-cookies.html">Cookies</a></div></div></div></footer>`;

const BOTTOM = `<a href="https://wa.me/34623760710?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20en%20Reus." class="wa" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .611.611l4.458-1.495A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.347 0-4.542-.68-6.398-1.852l-.42-.27-2.791.936.936-2.791-.27-.42A9.72 9.72 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg><span class="wa-tip">¿Hablamos por WhatsApp?</span></a>
<div class="cookie" id="cookieBanner" role="alert"><p>Utilizamos cookies. <a href="/politica-cookies.html">Más info</a>.</p><button class="cookie-btn" id="cookieAccept">Aceptar</button></div>
<script>
const toggle=document.getElementById('navToggle'),mob=document.getElementById('navMobile');toggle.addEventListener('click',()=>{toggle.classList.toggle('active');mob.classList.toggle('open');toggle.setAttribute('aria-expanded',mob.classList.contains('open'));document.body.style.overflow=mob.classList.contains('open')?'hidden':''});function closeMenu(){toggle.classList.remove('active');mob.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.style.overflow=''}const obs=new IntersectionObserver(e=>{e.forEach(el=>{if(el.isIntersecting){el.target.classList.add('vis');obs.unobserve(el.target)}})},{threshold:.12,rootMargin:'0px 0px -30px 0px'});document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-s').forEach(el=>obs.observe(el));if(!localStorage.getItem('cookiesOk'))setTimeout(()=>document.getElementById('cookieBanner').classList.add('show'),2500);document.getElementById('cookieAccept').addEventListener('click',()=>{localStorage.setItem('cookiesOk','1');document.getElementById('cookieBanner').classList.remove('show')});
</script>`;

const ZONE_TAGS = `<div class="zone-tags"><a href="/zonas/reformas-centre-mercadal-reus.html" class="neighborhood">Centre / Mercadal</a><a href="/zonas/reformas-barri-gaudi-reus.html" class="neighborhood">Barri Gaudí</a><a href="/zonas/reformas-ponent-reus.html" class="neighborhood">Ponent</a><a href="/zonas/reformas-montserrat-reus.html" class="neighborhood">Montserrat</a><a href="/zonas/reformas-fortuny-reus.html" class="neighborhood">Fortuny</a><a href="/zonas/reformas-mas-abello-reus.html" class="neighborhood">Mas Abelló</a><a href="/zonas/reformas-sant-josep-obrer-reus.html" class="neighborhood">Sant Josep Obrer</a><a href="/zonas/reformas-el-carme-reus.html" class="neighborhood">El Carme</a></div>`;

const SVC_TAGS = `<div class="service-tags"><a href="/servicios/reformas-cocinas-reus.html" class="service-tag">Reforma de cocinas</a><a href="/servicios/reformas-banos-reus.html" class="service-tag">Reforma de baños</a><a href="/servicios/reformas-integrales-pisos-reus.html" class="service-tag">Reformas integrales</a><a href="/servicios/reformas-locales-comerciales-reus.html" class="service-tag">Locales comerciales</a><a href="/servicios/reformas-chalets-casas-reus.html" class="service-tag">Chalets y casas</a><a href="/servicios/arquitectura-diseno-interior-reus.html" class="service-tag">Arquitectura y diseño</a></div>`;

const CTA = `<section class="cta-inline rv"><div class="container"><h2>Solicita tu presupuesto gratis</h2><p>Te visitamos, medimos y presupuestamos sin coste ni compromiso</p><div class="cta-btns" style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap"><a href="tel:+34877278125" class="btn btn-p">877 27 81 25</a><a href="https://wa.me/34623760710?text=Hola%2C%20presupuesto%20reforma%20Reus" class="btn btn-o" target="_blank" rel="noopener noreferrer">WhatsApp: 623 76 07 10</a></div></div></section>`;

function makePage(type, slug, data) {
  const baseUrl = type === 'servicios' ? 'https://cubereformasreus.es/servicios/' : 'https://cubereformasreus.es/zonas/';
  const bc2name = type === 'servicios' ? 'Servicios' : 'Zonas';
  const bc2url = type === 'servicios' ? 'https://cubereformasreus.es/servicios/' : 'https://cubereformasreus.es/zonas/';
  const crossSection = type === 'servicios'
    ? `<section class="zone-links rv"><div class="container"><h2>Zonas de trabajo en Reus</h2><p class="desc" style="text-align:center;margin:0 auto 28px">Realizamos este servicio en todos los barrios de Reus</p>${ZONE_TAGS}</div></section>`
    : `<section class="service-links rv"><div class="container"><h2>Nuestros Servicios de Reforma</h2><p class="desc" style="text-align:center;margin:0 auto 28px">Ofrecemos todos los tipos de reforma en esta zona</p>${SVC_TAGS}</div></section>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow, max-snippet:150, max-image-preview:large">
  <title>${data.title}</title>
  <meta name="description" content="${data.metaDesc}">
${HEAD_COMMON}
  <link rel="canonical" href="${baseUrl}${slug}">
  <meta property="og:title" content="${data.ogTitle}">
  <meta property="og:description" content="${data.metaDesc}">
  <meta property="og:url" content="${baseUrl}${slug}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_ES">
  <meta property="og:site_name" content="CUBE Reformas Reus">
  <meta property="og:image" content="https://cubereformasreus.es/img/${data.img}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${data.ogTitle}">
  <meta name="twitter:description" content="${data.metaDesc}">
  <meta name="twitter:image" content="https://cubereformasreus.es/img/${data.img}">
${FONTS}
  <script type="application/ld+json">
  {"@context":"https://schema.org","@graph":[
    {"@type":["LocalBusiness","HomeAndConstructionBusiness"],"@id":"https://cubereformasreus.es/#business","name":"CUBE - Arquitectos y Reformas Reus","url":"https://cubereformasreus.es","telephone":"+34877278125","email":"info@cubereformasreus.es","address":{"@type":"PostalAddress","streetAddress":"Carrer de Misericòrdia, 5","addressLocality":"Reus","addressRegion":"Tarragona","postalCode":"43205","addressCountry":"ES"},"geo":{"@type":"GeoCoordinates","latitude":"41.1561","longitude":"1.1069"},"priceRange":"€€"},
    {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://cubereformasreus.es/"},{"@type":"ListItem","position":2,"name":"${bc2name}","item":"${bc2url}"},{"@type":"ListItem","position":3,"name":"${data.bcName}"}]}
  ]}
  </script>
</head>
<body>
<a href="#main" class="skip-link">Ir al contenido</a>
${NAV}
<main id="main">
  <section class="page-hero"><div class="container"><nav class="breadcrumb" aria-label="Migas de pan"><a href="/">Inicio</a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg><a href="/${type}/">${bc2name}</a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg><span>${data.bcName}</span></nav><p class="label">${data.label}</p><h1>${data.h1}</h1><p class="desc">${data.heroDesc}</p></div></section>
${data.sections}
  ${crossSection}
  ${CTA}
</main>
${FOOTER}
${BOTTOM}
</body>
</html>`;
}

// === SERVICE PAGES (4 missing) ===
const svcPages = [
  {
    slug: 'reformas-integrales-pisos-reus.html',
    title: 'Reformas Integrales de Pisos en Reus | CUBE - Presupuesto Gratis',
    metaDesc: 'Reformas integrales de pisos en Reus. Albañilería, electricidad, fontanería, suelos y acabados. Presupuesto cerrado. ☎ 877 27 81 25',
    ogTitle: 'Reformas Integrales de Pisos en Reus | CUBE',
    h1: 'Reformas Integrales de Pisos en Reus', label: 'Reformas integrales', bcName: 'Reformas Integrales',
    img: 'reforma-integral-piso-reus.webp',
    heroDesc: 'Renovamos tu piso por completo en Reus: albañilería, electricidad, fontanería, suelos, pintura y acabados. Un solo interlocutor, presupuesto cerrado y plazos garantizados.',
    sections: `
  <section class="content-section rv"><div class="container"><p class="label">Nuestro servicio</p><h2>¿Qué incluye una reforma integral de piso?</h2><p>Una reforma integral significa renovar la vivienda por completo. En CUBE nos encargamos de todo el proceso en Reus: desde la demolición inicial hasta la entrega de llaves de un piso completamente nuevo. Gestionamos todos los gremios necesarios para que tú no te preocupes de nada.</p><h3>Trabajos incluidos</h3><ul><li>Demolición completa: eliminación de tabiques, suelos, revestimientos y carpintería existente</li><li>Albañilería: nuevas distribuciones, tabiques de pladur o ladrillo, falsos techos</li><li>Fontanería: renovación de tuberías de agua fría, caliente y desagües</li><li>Electricidad: nueva instalación eléctrica con cuadro y circuitos independientes</li><li>Suelos: porcelánico, parquet, tarima flotante o microcemento</li><li>Carpintería: puertas interiores, armarios empotrados y molduras</li><li>Ventanas: aluminio o PVC con rotura de puente térmico</li><li>Pintura: preparación de paredes, alisado y pintura en todas las estancias</li></ul><p>El plazo estimado para reformar un piso de 80m² en Reus es de 2 a 4 meses, dependiendo de la complejidad del proyecto.</p></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Proceso</p><h2>Cómo reformamos tu piso paso a paso</h2><h3>1. Visita gratuita</h3><p>Nuestro arquitecto visita tu piso en Reus, toma medidas y evalúa el estado de las instalaciones. Sin coste ni compromiso.</p><h3>2. Diseño con renders 3D</h3><p>Diseñamos la nueva distribución y seleccionamos materiales. Te presentamos renders fotorrealistas para que veas cómo quedará antes de empezar.</p><h3>3. Presupuesto cerrado</h3><p>Presupuesto desglosado partida por partida. El precio que pactamos es el precio final.</p><h3>4. Ejecución coordinada</h3><p>Nuestro jefe de obra coordina albañiles, fontaneros, electricistas, pintores y carpinteros. Te informamos del avance semanalmente.</p><h3>5. Entrega y garantía</h3><p>Revisión final conjunta, limpieza profesional y entrega. Garantía de 2 años en mano de obra.</p></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Precios</p><h2>¿Cuánto cuesta una reforma integral en Reus?</h2><ul><li>Piso de 60m² con acabados estándar: desde 25.000€</li><li>Piso de 80m² con acabados medios-altos: 35.000€ - 50.000€</li><li>Piso de 100m² con acabados premium: 50.000€ - 75.000€</li></ul><p>Con más de 500 reformas en Reus, conocemos las particularidades de los edificios de la ciudad: desde fincas antiguas del centre hasta bloques en Ponent o Barri Gaudí.</p></div></section>`
  },
  {
    slug: 'reformas-locales-comerciales-reus.html',
    title: 'Reforma de Locales Comerciales en Reus | CUBE - Presupuesto',
    metaDesc: 'Reforma de locales comerciales en Reus. Proyecto técnico, licencia de actividad y obra llave en mano. Presupuesto gratis ☎ 877 27 81 25',
    ogTitle: 'Reforma de Locales Comerciales en Reus | CUBE',
    h1: 'Reforma de Locales Comerciales en Reus', label: 'Locales comerciales', bcName: 'Locales Comerciales',
    img: 'reforma-local-comercial-reus.webp',
    heroDesc: 'Diseñamos y reformamos locales comerciales en Reus adaptados a normativa. Proyecto técnico, licencias de actividad y ejecución completa llave en mano.',
    sections: `
  <section class="content-section rv"><div class="container"><p class="label">Nuestro servicio</p><h2>Reforma completa de locales comerciales</h2><p>En CUBE reformamos todo tipo de locales en Reus: tiendas, restaurantes, bares, oficinas, clínicas y peluquerías. Nos encargamos de todo, desde el proyecto técnico hasta la entrega final.</p><h3>¿Qué incluye?</h3><ul><li>Proyecto técnico firmado por arquitecto colegiado</li><li>Gestión de licencia de actividad en el Ayuntamiento de Reus</li><li>Distribución interior optimizada para tu negocio</li><li>Instalaciones eléctricas, fontanería y climatización según normativa</li><li>Accesibilidad: rampa, baño adaptado y cumplimiento del CTE</li><li>Suelos comerciales de alto tránsito</li><li>Iluminación técnica y decorativa</li><li>Fachada y rótulo exterior</li></ul></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Normativa</p><h2>Licencias para locales en Reus</h2><p>Abrir un negocio en Reus requiere cumplir requisitos municipales. Nuestros arquitectos gestionan toda la documentación:</p><ul><li>Comunicación previa o licencia ambiental</li><li>Proyecto técnico visado que cumpla el CTE</li><li>Plan de evacuación y medidas contra incendios</li><li>Certificado de eficiencia energética</li><li>Instalación eléctrica certificada</li></ul></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Inversión</p><h2>¿Cuánto cuesta reformar un local en Reus?</h2><ul><li>Local de oficina o tienda (50-80m²): desde 15.000€</li><li>Bar o restaurante (80-120m²): 30.000€ - 60.000€</li><li>Clínica o centro de estética: 25.000€ - 50.000€</li></ul><p>Presupuesto cerrado que incluye proyecto, licencia, mano de obra y materiales.</p></div></section>`
  },
  {
    slug: 'reformas-chalets-casas-reus.html',
    title: 'Reforma de Chalets y Casas en Reus | CUBE - Presupuesto Gratis',
    metaDesc: 'Reforma de chalets y casas en Reus. Ampliaciones, rehabilitaciones y mejoras energéticas. Presupuesto gratis ☎ 877 27 81 25',
    ogTitle: 'Reforma de Chalets y Casas en Reus | CUBE',
    h1: 'Reforma de Chalets y Casas en Reus', label: 'Chalets y casas', bcName: 'Chalets y Casas',
    img: 'reforma-salon-vivienda-reus.webp',
    heroDesc: 'Rehabilitamos y renovamos chalets, casas unifamiliares y viviendas adosadas en Reus. Ampliaciones, mejoras energéticas, piscinas y reformas integrales.',
    sections: `
  <section class="content-section rv"><div class="container"><p class="label">Nuestro servicio</p><h2>Reformas completas de chalets y casas</h2><p>Las casas y chalets tienen necesidades diferentes a los pisos. En CUBE abordamos proyectos de mayor envergadura en Reus: ampliaciones, cubiertas, fachadas, jardines y piscinas.</p><h3>Servicios para casas</h3><ul><li>Reforma integral del interior: cocina, baños, salón, dormitorios</li><li>Ampliación: nuevas plantas, extensiones, porches cerrados</li><li>Rehabilitación de fachadas con aislamiento SATE</li><li>Cubierta y tejado: reparación, cambio de tejas, impermeabilización</li><li>Mejoras energéticas: aerotermia, placas solares, aislamiento</li><li>Piscina: construcción o reforma de piscinas existentes</li><li>Jardín y exteriores: pavimentación, iluminación, riego</li></ul></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Eficiencia</p><h2>Mejoras energéticas para tu vivienda</h2><ul><li>Aislamiento SATE: reduce hasta un 40% el consumo energético</li><li>Ventanas con rotura de puente térmico</li><li>Aerotermia para climatización y ACS</li><li>Paneles solares fotovoltaicos</li><li>Suelo radiante eficiente</li></ul><p>Estas mejoras revalorizan tu propiedad y pueden beneficiarse de subvenciones de la Generalitat.</p></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Inversión</p><h2>¿Cuánto cuesta reformar un chalet?</h2><ul><li>Interior completo (150-200m²): 50.000€ - 90.000€</li><li>Ampliación (30-50m²): 30.000€ - 55.000€</li><li>Fachada con SATE: 8.000€ - 18.000€</li><li>Piscina: 15.000€ - 35.000€</li></ul></div></section>`
  },
  {
    slug: 'arquitectura-diseno-interior-reus.html',
    title: 'Arquitectura y Diseño Interior en Reus | CUBE - Consulta Gratis',
    metaDesc: 'Arquitectura y diseño interior en Reus. Proyectos técnicos, licencias de obra y diseño de interiores profesional. Consulta gratis ☎ 877 27 81 25',
    ogTitle: 'Arquitectura y Diseño Interior en Reus | CUBE',
    h1: 'Arquitectura y Diseño Interior en Reus', label: 'Arquitectura', bcName: 'Arquitectura y Diseño',
    img: 'reforma-apartamento-estudio-reus.webp',
    heroDesc: 'Proyectos arquitectónicos, diseño de interiores, licencias de obra y dirección técnica en Reus. Arquitectos colegiados al servicio de tu proyecto.',
    sections: `
  <section class="content-section rv"><div class="container"><p class="label">Nuestro servicio</p><h2>Servicios de arquitectura en Reus</h2><p>En CUBE contamos con arquitectos colegiados que ofrecen un servicio completo. Ya sea para una reforma, obra nueva o regularización urbanística.</p><h3>Servicios</h3><ul><li>Proyectos básicos y de ejecución para reformas y obra nueva</li><li>Dirección de obra y coordinación de seguridad</li><li>Licencias de obra mayor y comunicaciones previas</li><li>Licencias de actividad para locales comerciales</li><li>Certificados de eficiencia energética</li><li>Cédulas de habitabilidad</li><li>Diseño interior: distribución, materiales, iluminación</li><li>Renders 3D fotorrealistas</li></ul></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Diseño</p><h2>Diseño de interiores profesional</h2><p>Creamos espacios funcionales y estéticos adaptados a tu forma de vivir o trabajar.</p><ul><li>Análisis de necesidades y forma de uso del espacio</li><li>Optimización de distribución</li><li>Selección de materiales con visitas a showrooms</li><li>Proyecto de iluminación completo</li><li>Renders 3D para visualizar antes de ejecutar</li><li>Supervisión de la obra para fidelidad al diseño</li></ul></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Trámites</p><h2>Gestión de licencias en Reus</h2><p>Nuestros arquitectos conocen la normativa municipal de Reus y el PGOU en detalle.</p><ul><li>Licencia de obra mayor: cambios estructurales o fachada</li><li>Comunicación previa: reformas menores</li><li>Licencia de primera ocupación y habitabilidad</li><li>Licencia de actividad para negocios</li></ul><p>Plazo medio de tramitación: 2 a 6 semanas según tipo de licencia.</p></div></section>`
  }
];

// === ZONE PAGES (4 missing) ===
const zonePages = [
  {
    slug: 'reformas-fortuny-reus.html',
    title: 'Reformas en Fortuny Reus | CUBE Reformas - Presupuesto Gratis',
    metaDesc: 'Reformas en el barrio de Fortuny en Reus. Cocinas, baños, pisos y locales. Empresa local con 15 años de experiencia. Presupuesto gratis ☎ 877 27 81 25',
    ogTitle: 'Reformas en Fortuny Reus | CUBE Reformas',
    h1: 'Reformas en el Barrio de Fortuny en Reus', label: 'Fortuny', bcName: 'Fortuny',
    img: 'reforma-apartamento-estudio-reus.webp',
    heroDesc: 'Especialistas en reformas integrales en el barrio de Fortuny, Reus. Cocinas, baños, pisos completos y locales comerciales con presupuesto cerrado.',
    sections: `
  <section class="content-section rv"><div class="container"><p class="label">La zona</p><h2>Reformas en Fortuny: un barrio consolidado</h2><p>El barrio de Fortuny es una de las zonas más consolidadas de Reus, situado al sur del centro histórico. Lleva el nombre del célebre pintor reusense Marià Fortuny y se caracteriza por sus edificios de mediados del siglo XX, con pisos de distribuciones generosas pero instalaciones que a menudo necesitan una actualización completa.</p><p>En CUBE conocemos bien las particularidades de los edificios de Fortuny: estructuras sólidas de ladrillo, techos altos en muchos casos, y unas instalaciones de fontanería y electricidad que suelen requerir renovación completa al superar los 40-50 años de antigüedad.</p><h3>Reformas más habituales en Fortuny</h3><ul><li>Reforma integral de pisos de los años 60-70 con renovación completa de instalaciones</li><li>Reforma de cocinas antiguas: nueva distribución, mobiliario y electrodomésticos</li><li>Actualización de baños: plato de ducha, mampara, mueble suspendido</li><li>Cambio de ventanas por carpintería de PVC o aluminio con aislamiento</li><li>Reforma de locales comerciales en las plantas bajas</li></ul></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Experiencia local</p><h2>Por qué elegir CUBE en Fortuny</h2><p>Nuestra oficina en el Carrer de Misericòrdia está a pocos minutos del barrio de Fortuny. Hemos realizado decenas de reformas en esta zona y conocemos las particularidades de sus edificios: los materiales originales, las distribuciones típicas y las posibilidades de cada vivienda.</p><p>Esta cercanía nos permite visitarte rápidamente, gestionar la obra con eficiencia y estar disponibles para cualquier consulta durante todo el proceso. En Fortuny, como en el resto de Reus, ofrecemos presupuesto cerrado, plazos garantizados y garantía de 2 años.</p></div></section>`
  },
  {
    slug: 'reformas-mas-abello-reus.html',
    title: 'Reformas en Mas Abelló Reus | CUBE - Presupuesto Gratis',
    metaDesc: 'Reformas en Mas Abelló, Reus. Pisos, cocinas, baños y reformas integrales. Empresa local con experiencia. Presupuesto gratis ☎ 877 27 81 25',
    ogTitle: 'Reformas en Mas Abelló Reus | CUBE',
    h1: 'Reformas en Mas Abelló en Reus', label: 'Mas Abelló', bcName: 'Mas Abelló',
    img: 'reforma-salon-vivienda-reus.webp',
    heroDesc: 'Reformas de cocinas, baños, pisos completos y locales en el barrio de Mas Abelló, Reus. Presupuesto gratuito y sin compromiso.',
    sections: `
  <section class="content-section rv"><div class="container"><p class="label">La zona</p><h2>Reformas en Mas Abelló: modernizando el barrio</h2><p>Mas Abelló es un barrio residencial situado al norte de Reus que ha experimentado un notable crecimiento en las últimas décadas. La zona combina edificios de viviendas de los años 80-90 con promociones más recientes, lo que crea una mezcla de necesidades de reforma diferentes.</p><p>Los pisos más antiguos de Mas Abelló suelen necesitar una actualización de cocinas y baños, renovación de suelos y modernización de las instalaciones eléctricas. Las viviendas más nuevas a menudo requieren reformas parciales para adaptarse a los cambios de vida de sus propietarios.</p><h3>Tipos de reforma habituales</h3><ul><li>Reforma de cocinas con apertura al salón para ganar luminosidad</li><li>Modernización de baños: eliminar bañera, instalar plato de ducha</li><li>Reforma integral de pisos de los años 80-90</li><li>Mejora de aislamiento térmico y acústico</li><li>Adaptación de viviendas para personas mayores</li></ul></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Ventajas</p><h2>CUBE en Mas Abelló</h2><p>En CUBE hemos reformado numerosas viviendas en Mas Abelló. Conocemos las tipologías de pisos más comunes en la zona y sabemos exactamente qué materiales y soluciones funcionan mejor para cada caso. Nuestro compromiso incluye presupuesto cerrado sin sorpresas, plazos garantizados y una garantía de 2 años en toda la mano de obra.</p></div></section>`
  },
  {
    slug: 'reformas-sant-josep-obrer-reus.html',
    title: 'Reformas en Sant Josep Obrer Reus | CUBE - Presupuesto',
    metaDesc: 'Reformas en Sant Josep Obrer, Reus. Rehabilitación de viviendas, cocinas, baños y pisos. Empresa local. Presupuesto gratis ☎ 877 27 81 25',
    ogTitle: 'Reformas en Sant Josep Obrer Reus | CUBE',
    h1: 'Reformas en Sant Josep Obrer en Reus', label: 'Sant Josep Obrer', bcName: 'Sant Josep Obrer',
    img: 'reforma-integral-piso-reus.webp',
    heroDesc: 'Rehabilitación y reforma de viviendas en el barrio de Sant Josep Obrer, Reus. Cocinas, baños, reformas integrales y mejoras de eficiencia energética.',
    sections: `
  <section class="content-section rv"><div class="container"><p class="label">La zona</p><h2>Reformas en Sant Josep Obrer</h2><p>Sant Josep Obrer es un barrio con carácter propio en Reus, conocido por su origen obrero y su fuerte sentido de comunidad. Las viviendas de esta zona son mayoritariamente pisos de los años 60-70 en bloques de entre 4 y 6 plantas, con distribuciones funcionales pero que hoy en día necesitan una actualización importante.</p><p>Las reformas más demandadas en Sant Josep Obrer incluyen la renovación completa de instalaciones eléctricas y de fontanería, que en muchos casos son las originales del edificio. También son frecuentes las reformas de cocinas y baños para adaptarlos a los estándares actuales de confort y funcionalidad.</p><h3>Necesidades de reforma en la zona</h3><ul><li>Renovación completa de instalaciones antiguas (electricidad, fontanería, gas)</li><li>Reforma de cocinas pequeñas para optimizar el espacio</li><li>Sustitución de ventanas para mejorar aislamiento térmico y acústico</li><li>Reforma de baños: accesibilidad y modernización</li><li>Pintado y acondicionamiento general de viviendas</li></ul></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Compromiso</p><h2>CUBE en Sant Josep Obrer</h2><p>En CUBE creemos que todas las viviendas merecen una reforma de calidad, independientemente del barrio. En Sant Josep Obrer trabajamos con el mismo nivel de profesionalidad y atención al detalle que en cualquier otra zona de Reus. Ofrecemos presupuestos adaptados a cada economía familiar, sin renunciar a la calidad de los materiales ni de la ejecución.</p><p>Si vives en Sant Josep Obrer y estás pensando en reformar tu vivienda, llámanos para una visita gratuita. Estudiaremos tu caso y te presentaremos las mejores opciones dentro de tu presupuesto.</p></div></section>`
  },
  {
    slug: 'reformas-el-carme-reus.html',
    title: 'Reformas en El Carme Reus | CUBE Reformas - Presupuesto',
    metaDesc: 'Reformas en El Carme, Reus. Rehabilitación de pisos, cocinas, baños y locales cerca del centro. Empresa local. Presupuesto gratis ☎ 877 27 81 25',
    ogTitle: 'Reformas en El Carme Reus | CUBE Reformas',
    h1: 'Reformas en El Carme en Reus', label: 'El Carme', bcName: 'El Carme',
    img: 'reforma-bano-ducha-cristal-reus.webp',
    heroDesc: 'Reformas de viviendas y locales en el barrio de El Carme, Reus. Rehabilitación, cocinas, baños y reformas integrales con presupuesto cerrado.',
    sections: `
  <section class="content-section rv"><div class="container"><p class="label">La zona</p><h2>Reformas en El Carme: entre la tradición y la modernidad</h2><p>El Carme es uno de los barrios con más encanto de Reus, situado muy cerca del centro histórico. Su nombre proviene del antiguo convento del Carme y es una zona que mezcla edificios de diferentes épocas: desde fincas antiguas con elementos arquitectónicos de valor hasta bloques de viviendas más modernos.</p><p>Esta diversidad arquitectónica hace que las reformas en El Carme requieran un conocimiento específico de las diferentes tipologías constructivas. En CUBE contamos con la experiencia necesaria para abordar tanto la rehabilitación de edificios antiguos como la modernización de pisos más recientes.</p><h3>Reformas típicas en El Carme</h3><ul><li>Rehabilitación de pisos antiguos respetando elementos originales de valor</li><li>Reforma integral con actualización completa de instalaciones</li><li>Cocinas modernas integradas en distribuciones abiertas</li><li>Baños de diseño con materiales contemporáneos</li><li>Reforma de locales comerciales en plantas bajas</li><li>Restauración de elementos arquitectónicos: molduras, carpintería, hidráulicos</li></ul></div></section>
  <section class="content-section rv"><div class="container"><p class="label">Experiencia</p><h2>CUBE en El Carme</h2><p>La proximidad de El Carme a nuestras oficinas en el Carrer de Misericòrdia hace que sea una de las zonas donde más reformas hemos realizado. Conocemos los edificios, las comunidades de vecinos y las particularidades urbanísticas de la zona.</p><p>En El Carme es especialmente importante contar con profesionales que entiendan la normativa de protección del patrimonio que aplica a algunos edificios del entorno del centro histórico. Nuestros arquitectos dominan esta normativa y pueden guiarte sobre qué tipo de reforma es posible en tu vivienda.</p></div></section>`
  }
];

// Generate all pages
svcPages.forEach(p => {
  fs.writeFileSync('servicios/' + p.slug, makePage('servicios', p.slug, p), 'utf8');
  console.log('Created: servicios/' + p.slug);
});

zonePages.forEach(p => {
  fs.writeFileSync('zonas/' + p.slug, makePage('zonas', p.slug, p), 'utf8');
  console.log('Created: zonas/' + p.slug);
});

console.log('All 8 missing pages created!');
