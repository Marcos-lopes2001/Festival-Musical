// ============================================
// FESTIVAL NAZARENO 2026 - JAVASCRIPT
// ============================================

// Menu Mobile
var mobileMenuBtn = document.getElementById('mobileMenuBtn');
var navList = document.getElementById('navList');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
}

// Fecha menu ao clicar em link
var navLinks = document.querySelectorAll('.nav-list a');
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function() {
        navList.classList.remove('active');
    });
}

// ============================================
// ANIMAÇÕES DE SCROLL
// ============================================
var observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            entries[i].target.classList.add('visible');
        }
    }
}, observerOptions);

var elementosAnimados = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
for (var i = 0; i < elementosAnimados.length; i++) {
    observer.observe(elementosAnimados[i]);
}

// ============================================
// CARROSSEL - CORRIGIDO (Sem loop)
// ============================================
var track = document.getElementById('carrosselTrack');
var slides = document.querySelectorAll('.carrossel-slide');
var prevBtn = document.getElementById('prevBtn');
var nextBtn = document.getElementById('nextBtn');
var indicadoresContainer = document.getElementById('indicadores');

// Verifica se o carrossel existe na página
if (track && slides.length > 0) {
    var currentSlide = 0;
    var totalSlides = slides.length;
    var autoplayInterval = null;
    var isPlaying = true;

    // Criar indicadores
    if (indicadoresContainer) {
        for (var i = 0; i < totalSlides; i++) {
            var indicador = document.createElement('button');
            indicador.className = 'indicador';
            if (i === 0) indicador.classList.add('active');
            indicador.setAttribute('data-index', i);
            
            (function(index) {
                indicador.addEventListener('click', function() {
                    goToSlide(index);
                    resetAutoplay();
                });
            })(i);
            
            indicadoresContainer.appendChild(indicador);
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        if (currentSlide >= totalSlides) currentSlide = 0;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        
        track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        
        var indicadores = document.querySelectorAll('.indicador');
        for (var i = 0; i < indicadores.length; i++) {
            if (i === currentSlide) {
                indicadores[i].classList.add('active');
            } else {
                indicadores[i].classList.remove('active');
            }
        }
    }

    function nextSlide() {
        if (isPlaying) {
            goToSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Eventos dos botões
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoplay();
        });
    }

    // Autoplay
    function startAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
        if (totalSlides > 1 && isPlaying) {
            autoplayInterval = setInterval(function() {
                nextSlide();
            }, 4000);
        }
    }

    function resetAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
        startAutoplay();
    }

    function stopAutoplay() {
        isPlaying = false;
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    function restartAutoplay() {
        isPlaying = true;
        startAutoplay();
    }

    // Iniciar autoplay
    if (totalSlides > 1) {
        startAutoplay();
    }

    // Pausar no hover
    var carrosselContainer = document.querySelector('.carrossel-container');
    if (carrosselContainer) {
        carrosselContainer.addEventListener('mouseenter', function() {
            stopAutoplay();
        });
        carrosselContainer.addEventListener('mouseleave', function() {
            restartAutoplay();
        });
    }

    // Pausar quando a aba não está visível
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoplay();
        } else {
            restartAutoplay();
        }
    });
}

// ============================================
// ANIMAÇÃO DE CONTAGEM (Números)
// ============================================
var numbers = document.querySelectorAll('.numero-destaque');

if (numbers.length > 0) {
    var numberObserver = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                var element = entries[i].target;
                var finalNumber = parseInt(element.innerText);
                
                if (!element.hasAttribute('data-animated')) {
                    element.setAttribute('data-animated', 'true');
                    var current = 0;
                    var increment = finalNumber / 30;
                    
                    var timer = setInterval(function() {
                        current += increment;
                        if (current >= finalNumber) {
                            element.innerText = finalNumber;
                            clearInterval(timer);
                        } else {
                            element.innerText = Math.floor(current);
                        }
                    }, 30);
                }
            }
        }
    }, { threshold: 0.5 });
    
    for (var i = 0; i < numbers.length; i++) {
        numberObserver.observe(numbers[i]);
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
var links = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

console.log('🎵 Festival Nazareno 2026 - Site carregado com sucesso!');
console.log('📅 7 de Agosto de 2026 - Igreja Nazarena da Central');