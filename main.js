document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            const fullImageSrc = card.getAttribute('data-full-image');
            modalImage.src = fullImageSrc;
            modalOverlay.classList.add('active');
        });
    });

    closeModal.addEventListener('click', function () {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
});


function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
}
