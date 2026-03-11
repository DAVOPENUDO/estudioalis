const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Middleware for common data
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.whatsappNumber = '522211762033';
  res.locals.whatsappLink = 'https://wa.me/522211762033';
  res.locals.facebookLink = 'https://www.facebook.com/share/1DiXgN2B6n/';
  res.locals.businessName = 'Estudio de Belleza Alis';
  res.locals.businessPhone = '2211762033';
  next();
});

// Routes bien
                                                       
app.get('/', (req, res) => {
  res.render('inicio', {
    title: 'Estudio de Belleza Alis | Cambios de Imagen Profesionales',
    description: 'Realzamos tu belleza con cambios de imagen profesionales y creativos. Efectos de color, maquillaje, peinado y barberia en un ambiente premium.'
  });
});

app.get('/nosotros', (req, res) => {
  res.render('nosotros', {
    title: 'Sobre Nosotros | Estudio de Belleza Alis',
    description: 'Conoce a Luz Alicia y la historia detras de Estudio de Belleza Alis. Pasion, creatividad y anos de experiencia en cambios de imagen.'
  });
});

app.get('/servicios', (req, res) => {
  res.render('servicios', {
    title: 'Servicios | Estudio de Belleza Alis',
    description: 'Descubre nuestros servicios de cambios de imagen, efectos de color, maquillaje profesional, peinado y barberia.'
  });
});

app.get('/agenda', (req, res) => {
  res.render('agenda', {
    title: 'Agenda tu Cita | Estudio de Belleza Alis',
    description: 'Reserva tu cita en Estudio de Belleza Alis. Agenda tu cambio de imagen, maquillaje, peinado o servicio de barberia.'
  });
});

app.get('/galeria', (req, res) => {
  res.render('galeria', {
    title: 'Galeria | Estudio de Belleza Alis',
    description: 'Explora nuestra galeria de transformaciones, cambios de color, maquillaje profesional y estilos de barberia.'
  });
});

app.get('/contacto', (req, res) => {
  res.render('contacto', {
    title: 'Contacto | Estudio de Belleza Alis',
    description: 'Contacta a Estudio de Belleza Alis por WhatsApp o redes sociales. Estamos para atenderte.'
  });
});

// 404
app.use((req, res) => {
  res.status(404).render('inicio', {
    title: 'Pagina no encontrada | Estudio de Belleza Alis',
    description: 'Pagina no encontrada'
  });
});

// Start server (only in non-Vercel environment)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Estudio de Belleza Alis corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
