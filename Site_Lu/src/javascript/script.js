$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop+ section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })
});

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('header');
    let lastScrollTop = 0; // Guarda a posição anterior do scroll

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Verifica a direção do scroll
        if (currentScroll > lastScrollTop) {
            // Rolar para baixo - esconder navbar
            gsap.to(navbar, {
                y: -navbar.offsetHeight, // Move a navbar para fora da tela
                duration: 0.3, // Duração da animação
                ease: "power2.out" // Tipo de easing
            });
        } else {
            // Rolar para cima - mostrar navbar
            gsap.to(navbar, {
                y: 0, // Move a navbar de volta para a tela
                duration: 0.3, // Duração da animação
                ease: "power2.out" // Tipo de easing
            });
            navbar.classList.add('shrink'); // Adiciona a classe para a navbar menor
        }

        // Atualiza a posição anterior do scroll
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel__track');
    const articles = Array.from(track.children);
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');

    let currentIndex = 0;

    function updateCarousel() {
        const moveAmount = -currentIndex * (articles[0].getBoundingClientRect().width + 20); // 20px é o espaço entre os cards
        track.style.transform = `translateX(${moveAmount}px)`;
    }

    // Navegação para a direita
    nextButton.addEventListener('click', () => {
        if (currentIndex === articles.length - 1) {
            currentIndex = 0;
            track.style.transition = 'none';
            updateCarousel();
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease';
                currentIndex++;
                updateCarousel();
            }, 20);
        } else {
            currentIndex++;
            updateCarousel();
        }
    });

    // Navegação para a esquerda
    prevButton.addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = articles.length - 1;
            track.style.transition = 'none';
            updateCarousel();
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease';
                currentIndex--;
                updateCarousel();
            }, 20);
        } else {
            currentIndex--;
            updateCarousel();
        }
    });

    // Função para clonar o primeiro e último artigo para o efeito infinito
    function cloneArticles() {
        const firstArticle = articles[0].cloneNode(true);
        const lastArticle = articles[articles.length - 1].cloneNode(true);
        track.appendChild(firstArticle);
        track.insertBefore(lastArticle, articles[0]);
    }

    cloneArticles();
});
