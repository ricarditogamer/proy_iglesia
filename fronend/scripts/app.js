// ===== CARRUSEL PRINCIPAL Y MINIATURAS =====
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del carrusel
    const slides = document.querySelectorAll('.event-slide');
    const dots = document.querySelectorAll('.slide-dots .dot');
    const thumbnails = document.querySelectorAll('.event-thumbnail');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let slideInterval;

    // Función para actualizar todos los elementos
    function updateActiveSlide(index) {
        // Actualizar slides principales
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Actualizar puntos indicadores
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Actualizar miniaturas
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }

    // Navegación
    function nextSlide() {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        
        if (isLastSlide) {
            slides[currentIndex].classList.add('last-slide');
            setTimeout(() => {
                updateActiveSlide(newIndex);
                slides[currentIndex].classList.remove('last-slide');
            }, 300);
        } else {
            updateActiveSlide(newIndex);
        }
    }

    function prevSlide() {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        
        if (isFirstSlide) {
            slides[currentIndex].classList.add('last-slide');
            setTimeout(() => {
                updateActiveSlide(newIndex);
                slides[currentIndex].classList.remove('last-slide');
            }, 300);
        } else {
            updateActiveSlide(newIndex);
        }
    }

    // Autoplay
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(slideInterval);
    }

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    if (dots) dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateActiveSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    if (thumbnails) thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateActiveSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Inicialización del carrusel solo si existe en la página
    if (slides.length > 0) {
        updateActiveSlide(0);
        startAutoPlay();

        // Pausar al interactuar
        document.querySelector('.featured-events')?.addEventListener('mouseenter', stopAutoPlay);
        document.querySelector('.featured-events')?.addEventListener('mouseleave', startAutoPlay);
    }

    // ===== NAVEGACIÓN Y PESTAÑA ACTIVA =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            
            const linkHref = link.getAttribute('href');
            const isIndexLink = linkHref === '#' || linkHref === 'index.html';
            const isCurrentIndex = currentPage === 'index.html' || currentPage === '';
            
            if ((linkHref === currentPage) || (isIndexLink && isCurrentIndex)) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Actualizar URL sin recargar
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }
                }
            }
        });
    });

    // Manejar cambios de estado (navegación adelante/atrás)
    window.addEventListener('popstate', function() {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Inicializar navegación
    setActiveNavLink();
});

// ===== MODAL DE REGISTRO =====
document.querySelector('.btn-register')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('modal-register').style.display = 'flex';
});

document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('modal-register').style.display = 'none';
});

document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validación básica
    const email = document.getElementById('email').value;
    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor ingrese un correo electrónico válido');
        return;
    }

    const password = document.getElementById('password').value;
    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // Simular envío
    const formData = {
        name: document.getElementById('name').value,
        lastname: document.getElementById('lastname').value,
        email: email,
        birthdate: document.getElementById('birthdate').value,
        district: document.getElementById('district').value,
        password: password
    };
    
    console.log('Datos de registro:', formData);
    alert('Registro exitoso. Bienvenido!');
    document.getElementById('modal-register').style.display = 'none';
    e.target.reset();
});

// ===== CARGA DE IMÁGENES =====
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    }
});