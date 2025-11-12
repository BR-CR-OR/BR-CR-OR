// ========== PRELOADER ==========
const preloader = document.getElementById("preloader");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  preloader.classList.add("hidden");
  document.body.classList.remove("locked");
  // Start skill bar animations after loading
  setTimeout(animateSkillBars, 500);
});

// ========== NAVBAR TOGGLE ==========
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });
});

// ========== DARK MODE ==========
const darkToggle = document.getElementById("darkModeToggle");

// Check for saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  // Save user preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem('darkMode', 'enabled');
    darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    darkToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});

// ========== PROJECT GALLERY DATA ==========
const projectData = {
  farmaket: {
    image: "New folder/image-removebg-preview (1).png",
    description:
      "Farmaket helps users find medicines at the best price. This project was developed during a hackathon and represents my first meaningful experience in creating technological solutions. <a href='https://youtu.be/yfu0rXcjvBg' class='project-link' target='_blank'>View Project</a>",
    gallery: [
      "New folder/farmarket2.png",
      "New folder/farmarket3.png",
      "New folder/farmarket1.png"
    ]
  },
  codeharu1: {
    image: "New folder/codeharu.png",
    description:
      "Codeharu is an educational platform that teaches programming interactively. It was developed at ¡Superate! ADOC to make coding accessible to children. <a href='https://codeharu.infinityfreeapp.com/' class='project-link' target='_blank'>Visit Codeharu</a>",
    gallery: [
      "New folder/codeharu1.png",
      "New folder/codeharu2.png",
      "New folder/codeharu3.png"
    ]
  },
  codeharu2: {
    image: "New folder/image-removebg-preview.png",
    description:
      "Codeharu 2 expanded the original project with new quizzes and lessons. We implemented UI and functionality improvements based on feedback. <a href='https://codeharuadoc.infinityfreeapp.com/?i=1' class='project-link' target='_blank'>See Codeharu 2</a>",
    gallery: [
      "New folder/codeharuadoc1.png",
      "New folder/codeharuadoc2.png",
      "New folder/codeharuadoc3.png"
    ]
  }
};

// ========== OPEN PROJECT GALLERY ==========
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

// ========== IMAGE VIEWER ==========
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

// ========== SMOOTH SCROLLING ==========
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
      
      // Close mobile menu if open
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    }
  });
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show or hide button based on scroll position
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

// Smooth scroll when clicking button
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========== SKILL BAR ANIMATION ==========
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

// ========== CONTACT FORM WITH EMAILJS ==========
const contactForm = document.getElementById('contactForm');
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Show loader
  submitText.textContent = 'Sending...';
  submitLoader.classList.remove('hidden');
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  // Send email via EmailJS
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      
      // Success message
      showMessage('Message sent successfully! I’ll get back to you soon.', 'success');
      
      // Reset form
      contactForm.reset();
      
      // Reset button
      submitText.textContent = 'Send Message';
      submitLoader.classList.add('hidden');
    }, function(error) {
      console.log('FAILED...', error);
      
      // Error message
      showMessage('Failed to send message. Please try again.', 'error');
      
      // Reset button
      submitText.textContent = 'Send Message';
      submitLoader.classList.add('hidden');
    });
});

// Show message function
function showMessage(text, type) {
  // Remove previous messages
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  
  // Insert before form
  contactForm.parentNode.insertBefore(message, contactForm);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    message.remove();
  }, 5000);
}

// ========== SCROLL ANIMATION FOR ELEMENTS ==========
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

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    observer.observe(card);
  });
  
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    observer.observe(item);
  });
});

// ========== HOVER EFFECTS FOR CARDS ==========
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

// ========== FINAL INITIALIZATION ==========
window.addEventListener('load', () => {
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
  
  // Start skill bar animation if preloader is already closed
  if (preloader.classList.contains('hidden')) {
    animateSkillBars();
  }
});
