// Оптимизация загрузки фонового изображения
window.addEventListener('load', function() {
    const heroImage = document.querySelector('.hero img');
    if (heroImage) {
        heroImage.loading = 'eager';
        heroImage.style.display = 'block'; // Убедимся, что изображение видимо
    }
});

// Плавный скролл
let isScrolling = false;

window.addEventListener('wheel', function(event) {
    if (!isScrolling) {
        isScrolling = true;
        
        const delta = Math.sign(event.deltaY);
        const scrollAmount = 200; // Увеличил количество пикселей за одно прокручивание
        
        window.scrollBy({
            top: delta * scrollAmount,
            behavior: 'smooth'
        });

        setTimeout(() => {
            isScrolling = false;
        }, 100); // Уменьшил задержку между прокрутками
    }
    event.preventDefault();
}, { passive: false });

// Анимация появления карточек
function checkCards() {
    const cards = document.querySelectorAll('.card');
    const triggerBottom = window.innerHeight * 0.8;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
            card.classList.add('show');
        }
    });
}

// Проверяем при загрузке страницы
window.addEventListener('load', checkCards);
// Проверяем при скролле
window.addEventListener('scroll', checkCards);

// Оптимизация загрузки изображений
document.addEventListener('DOMContentLoaded', function() {
    // Предзагрузка критических изображений
    const preloadImages = () => {
        const criticalImages = [
            './img/background-header.svg',
            './img/Logo1.svg',
            './img/telegramLogo.svg',
            './img/whatsupLogo.svg',
            './img/phoneLogo.svg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };

    // Запускаем предзагрузку сразу
    preloadImages();

    // Оптимизированная ленивая загрузка
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    // Наблюдаем за всеми изображениями
    document.querySelectorAll('.lazyload').forEach(img => {
        imageObserver.observe(img);
    });

    // Предзагрузка следующих изображений при прокрутке
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(scrollTop - lastScrollTop) > 100) {
            const nextImages = document.querySelectorAll('.lazyload:not(.loaded)');
            if (nextImages.length > 0) {
                const img = nextImages[0];
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
            }
            lastScrollTop = scrollTop;
        }
    });
}); 