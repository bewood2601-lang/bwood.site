// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. القائمة ---
    const navLinks = document.getElementById("navLinks");
    window.toggleMenu = () => navLinks.classList.toggle("active");

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove("active"));
    });

    // --- 2. معرض الصور ---
    const gallery = document.querySelector('.program-gallery');
    window.scrollGallery = (direction) => {
        if (gallery) gallery.scrollBy({ left: direction * 300, behavior: 'smooth' });
    };

    // --- 3. المنتجات والـ Lightbox ---
    const grid = document.querySelector('#shop .product-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');

    if (grid && typeof products !== 'undefined') {
        grid.innerHTML = ''; 

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.images[0]}" class="product-img" style="cursor:pointer; width:100%;">
                    <div class="zoom-overlay-icon"><i class="fas fa-images"></i></div>
                </div>
                <h3>${product.name}</h3>
                <button class="buy-btn">לנציג</button>
            `;

            card.querySelector('.product-img').onclick = () => {
                lightbox.style.display = "flex";
                document.body.style.overflow = 'hidden';
                lightboxContent.innerHTML = `
                    <img src="${product.images[0]}" class="main-zoomed-img">
                    <button class="agent-btn" onclick="window.open('https://wa.me/972503690284?text=שלום, מעוניין ב-${product.name}')">לנציג</button>
                    <div class="filmstrip-container"></div>
                `;
                const filmstrip = lightboxContent.querySelector('.filmstrip-container');
                product.images.forEach((imgSrc) => {
                    const thumb = document.createElement('img');
                    thumb.src = imgSrc;
                    thumb.className = 'thumb';
                    thumb.onclick = (e) => {
                        e.stopPropagation();
                        lightboxContent.querySelector('.main-zoomed-img').src = imgSrc;
                    };
                    filmstrip.appendChild(thumb);
                });
            };

            card.querySelector('.buy-btn').onclick = () => window.open(`https://wa.me/972503690284?text=שלום, מעוניין ב-${product.name}`);
            grid.appendChild(card);
        });
    }

    // إغلاق الـ Lightbox
    const closeModal = () => {
        if (lightbox) { lightbox.style.display = "none"; document.body.style.overflow = ''; }
    };
    document.querySelector('.close-lightbox')?.addEventListener('click', closeModal);
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // --- 4. الشهادات ---
    window.toggleTestimonials = () => {
        const hiddenCards = document.querySelectorAll('.hidden-card');
        const btn = document.getElementById('toggleBtn');
        if (hiddenCards.length > 0 && btn) {
            const isHidden = hiddenCards[0].style.display === 'none' || hiddenCards[0].style.display === '';
            hiddenCards.forEach(card => card.style.display = isHidden ? 'flex' : 'none');
            btn.innerText = isHidden ? 'הצג פחות' : 'הצג עוד';
        }
    };
});

// زر العودة للأعلى
window.onscroll = () => {
    const btn = document.getElementById("backToTopBtn");
    if (btn) btn.style.display = (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) ? "block" : "none";
};