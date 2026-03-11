/* ============================================
   ESTUDIO DE BELLEZA ALIS — MAIN JAVASCRIPT
   Premium Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initParticles();
  initPageTransitions();
  initCounterAnimation();
  initGallery();
  initLightbox();
  initAppointmentForm();
  initContactForm();
  initParallax();
});

/* --- Navigation --- */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const overlay = document.querySelector('.nav__mobile-overlay');
  const mobileLinks = overlay ? overlay.querySelectorAll('a') : [];

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Mobile menu
  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Floating Particles (Full Page) --- */
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let w, h;
  
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  
  const PARTICLE_COUNT = 60;
  const colors = [
    'rgba(228, 0, 124, ',   // rosa mexicano
    'rgba(255, 105, 180, ', // rosa light
    'rgba(155, 89, 182, ',  // lila
    'rgba(195, 155, 211, ', // lila light
    'rgba(255, 255, 255, ', // white sparkle
  ];
  
  const particles = [];
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 1 + Math.random() * 2.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -0.2 - Math.random() * 0.4,
      opacity: 0.15 + Math.random() * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.02
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, w, h);
    
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;
      
      const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
      
      // Wrap around
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      
      // Draw glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + currentOpacity + ')';
      ctx.fill();
      
      // Soft glow effect
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (currentOpacity * 0.15) + ')';
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

/* --- Page Transitions --- */
function initPageTransitions() {
  const transition = document.querySelector('.page-transition');
  if (!transition) return;

  // Fade in on page load
  transition.classList.add('active');
  setTimeout(() => {
    transition.classList.remove('active');
  }, 100);

  // Fade out on navigation
  const internalLinks = document.querySelectorAll('a[href^="/"]');
  internalLinks.forEach(link => {
    // Skip WhatsApp, external, and anchor links
    if (link.getAttribute('href').startsWith('http') || 
        link.getAttribute('href').startsWith('#') ||
        link.getAttribute('href').includes('wa.me') ||
        link.getAttribute('target') === '_blank') return;

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === window.location.pathname) return;

      e.preventDefault();
      transition.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 350);
    });
  });
}

/* --- Counter Animation --- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* --- Gallery Filters --- */
function initGallery() {
  const filters = document.querySelectorAll('.gallery-filter');
  const items = document.querySelectorAll('.gallery-item');

  if (filters.length === 0 || items.length === 0) return;

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Update active filter
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      const category = filter.getAttribute('data-filter');

      items.forEach((item, index) => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = '';
          item.style.animation = `fadeInUp 0.5s ease-out ${index * 0.08}s both`;
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --- Lightbox --- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const closeBtn = document.querySelector('.lightbox__close');

  if (!lightbox || galleryItems.length === 0) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* --- Appointment Form → WhatsApp --- */
function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#nombre').value.trim();
    const phone = form.querySelector('#telefono').value.trim();
    const service = form.querySelector('#servicio');
    const serviceText = service.options[service.selectedIndex].text;
    const date = form.querySelector('#fecha').value;
    const time = form.querySelector('#hora').value;
    const message = form.querySelector('#mensaje').value.trim();

    if (!name || !phone || !service.value || !date || !time) {
      showFormFeedback(form, 'Por favor completa todos los campos requeridos.', 'error');
      return;
    }

    // Format date
    const dateObj = new Date(date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('es-MX', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    let whatsappMsg = `Hola, me gustaria agendar una cita en Estudio de Belleza Alis.\n\n`;
    whatsappMsg += `Nombre: ${name}\n`;
    whatsappMsg += `Telefono: ${phone}\n`;
    whatsappMsg += `Servicio: ${serviceText}\n`;
    whatsappMsg += `Fecha: ${formattedDate}\n`;
    whatsappMsg += `Hora: ${time}\n`;
    if (message) {
      whatsappMsg += `\nNotas: ${message}`;
    }

    const whatsappURL = `https://wa.me/522211762033?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(whatsappURL, '_blank');
  });
}

/* --- Contact Form → WhatsApp --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-nombre').value.trim();
    const message = form.querySelector('#contact-mensaje').value.trim();

    if (!name || !message) {
      showFormFeedback(form, 'Por favor completa todos los campos.', 'error');
      return;
    }

    let whatsappMsg = `Hola, me comunico desde la pagina web de Estudio de Belleza Alis.\n\n`;
    whatsappMsg += `Nombre: ${name}\n`;
    whatsappMsg += `Mensaje: ${message}`;

    const whatsappURL = `https://wa.me/522211762033?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(whatsappURL, '_blank');
  });
}

/* --- Form Feedback --- */
function showFormFeedback(form, message, type) {
  let feedback = form.querySelector('.form-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.classList.add('form-feedback');
    form.appendChild(feedback);
  }

  feedback.textContent = message;
  feedback.style.cssText = `
    padding: 12px 16px;
    margin-top: 16px;
    border-radius: 2px;
    font-size: 0.88rem;
    font-weight: 500;
    animation: fadeInUp 0.3s ease;
    ${type === 'error' 
      ? 'background: rgba(228,0,124,0.1); border: 1px solid rgba(228,0,124,0.3); color: #ff6bb5;' 
      : 'background: rgba(37,211,102,0.1); border: 1px solid rgba(37,211,102,0.3); color: #25d366;'
    }
  `;

  setTimeout(() => {
    feedback.style.opacity = '0';
    setTimeout(() => feedback.remove(), 300);
  }, 4000);
}

/* --- Parallax Effect --- */
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    if (scrollY < heroHeight) {
      const bg = hero.querySelector('.hero__bg');
      if (bg) {
        bg.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    }
  }, { passive: true });
}
