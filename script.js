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