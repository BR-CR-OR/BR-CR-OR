// Preloader
const preloader = document.getElementById("preloader");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  preloader.classList.add("hidden");
  document.body.classList.remove("locked");
  // Iniciar animaciones de habilidades después de cargar
  setTimeout(animateSkillBars, 500);
});

// Navbar toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });
});

// Dark mode
const darkToggle = document.getElementById("darkModeToggle");

// Verificar si hay una preferencia guardada
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  // Guardar preferencia
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem('darkMode', 'enabled');
    darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    darkToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});

// Gallery data with URL
const projectData = {
  farmaket: {
    image: "New folder/image-removebg-preview (1).png",
    description:
      "Farmaket ayuda a los usuarios a encontrar medicamentos al mejor precio. Este proyecto fue desarrollado durante un hackathon y representa mi primera experiencia significativa en desarrollo de soluciones tecnológicas. <a href='https://youtu.be/yfu0rXcjvBg' class='project-link' target='_blank'>Visitar Proyecto</a>",
    gallery: [
      "New folder/farmarket2.png",
      "New folder/farmarket3.png",
      "New folder/farmarket1.png"
    ]
  },
  codeharu1: {
    image: "New folder/codeharu.png",
    description:
      "Codeharu es una plataforma educativa que enseña programación de manera interactiva. Desarrollado con fines educativos en ¡Superate! ADOC para hacer la programación accesible para niños. <a href='https://codeharu.infinityfreeapp.com/' class='project-link' target='_blank'>Visitar Codeharu</a>",
    gallery: [
      "New folder/codeharu1.png",
      "New folder/codeharu2.png",
      "New folder/codeharu3.png"
    ]
  },
  codeharu2: {
    image: "New folder/image-removebg-preview.png",
    description:
      "Codeharu 2 expandió el proyecto original con nuevos cuestionarios y lecciones. Implementamos mejoras en la interfaz y funcionalidades basadas en el feedback recibido. <a href='https://codeharuadoc.infinityfreeapp.com/?i=1' class='project-link' target='_blank'>Ver Codeharu 2</a>",
    gallery: [
      "New folder/codeharuadoc1.png",
      "New folder/codeharuadoc2.png",
      "New folder/codeharuadoc3.png"
    ]
  }
};

// Open project gallery
function openProject(id) {
  const data = projectData[id];
  if (!data) return;
  document.getElementById("mainProjectImage").src = data.image;
  document.getElementById("projectDescription").innerHTML = data.description;

  const gallery = document.getElementById("galleryImages");
  gallery.innerHTML = "";
  data.gallery.forEach((img, index) => {
    const image = document.createElement("img");
    image.src = img;
    image.dataset.index = index;
    image.addEventListener("click", () => openImageViewer(data.gallery, index));
    gallery.appendChild(image);
  });

  document.getElementById("project-gallery").classList.remove("hidden");
  window.scrollTo(0, document.getElementById("project-gallery").offsetTop);
}

document.getElementById("closeGallery").addEventListener("click", () => {
  document.getElementById("project-gallery").classList.add("hidden");
});

// Image viewer logic
const viewer = document.getElementById("imageViewer");
const viewerImg = document.getElementById("viewerImg");
const prevBtn = document.getElementById("prevImg");
const nextBtn = document.getElementById("nextImg");
const closeBtn = document.getElementById("closeViewer");
let currentIndex = 0;
let currentGallery = [];

function openImageViewer(gallery, index) {
  currentGallery = gallery;
  currentIndex = index;
  viewerImg.src = currentGallery[currentIndex];
  viewer.style.display = "flex";
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  viewerImg.src = currentGallery[currentIndex];
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  viewerImg.src = currentGallery[currentIndex];
});

closeBtn.addEventListener("click", () => {
  viewer.style.display = "none";
});

viewer.addEventListener("click", (e) => {
  if (e.target === viewer) viewer.style.display = "none";
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
      
      // Cerrar menú móvil si está abierto
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    }
  });
});

// ========== SCROLL TO TOP FUNCTIONALITY ==========
const scrollToTopBtn = document.getElementById('scrollToTop');

// Mostrar u ocultar el botón basado en la posición de scroll
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

// Scroll suave al hacer clic en el botón
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========== ANIMACIÓN DE BARRAS DE HABILIDADES ==========
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

// ========== FORMULARIO DE CONTACTO CON EMAILJS ==========
const contactForm = document.getElementById('contactForm');
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Mostrar loader
  submitText.textContent = 'Enviando...';
  submitLoader.classList.remove('hidden');
  
  // Obtener datos del formulario
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  // Enviar email usando EmailJS
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData) // Reemplaza con tus IDs
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      
      // Mostrar mensaje de éxito
      showMessage('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
      
      // Restablecer formulario
      contactForm.reset();
      
      // Restablecer botón
      submitText.textContent = 'Enviar Mensaje';
      submitLoader.classList.add('hidden');
    }, function(error) {
      console.log('FAILED...', error);
      
      // Mostrar mensaje de error
      showMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
      
      // Restablecer botón
      submitText.textContent = 'Enviar Mensaje';
      submitLoader.classList.add('hidden');
    });
});

// Función para mostrar mensajes
function showMessage(text, type) {
  // Eliminar mensajes anteriores
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Crear nuevo mensaje
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  
  // Insertar antes del formulario
  contactForm.parentNode.insertBefore(message, contactForm);
  
  // Eliminar mensaje después de 5 segundos
  setTimeout(() => {
    message.remove();
  }, 5000);
}

// ========== ANIMACIÓN DE ELEMENTOS AL HACER SCROLL ==========
// Observador de intersección para animar elementos al entrar en vista
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
  // Observar tarjetas
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    observer.observe(card);
  });
  
  // Observar secciones
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Observar elementos de habilidades
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    observer.observe(item);
  });
});

// ========== EFECTOS HOVER MEJORADOS PARA TARJETAS ==========
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
    this.style.boxShadow = '0 15px 30px rgba(0, 86, 179, 0.2)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.05)';
  });
});

// ========== INICIALIZACIÓN ADICIONAL ==========

// Inicializar todos los observadores después de cargar la página
window.addEventListener('load', () => {
  // Asegurar que las imágenes estén completamente cargadas
  const images = document.querySelectorAll('img');
  let loadedImages = 0;
  const totalImages = images.length;
  
  images.forEach(img => {
    if (img.complete) {
      loadedImages++;
    } else {
      img.addEventListener('load', () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          document.body.classList.add('all-content-loaded');
        }
      });
    }
  });
  
  if (loadedImages === totalImages) {
    document.body.classList.add('all-content-loaded');
  }
  
  // Inicializar animación de barras de habilidades si el preloader ya se cerró
  if (preloader.classList.contains('hidden')) {
    animateSkillBars();
  }
});