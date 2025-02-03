document.addEventListener('DOMContentLoaded', () => {
    // Așteaptă încărcarea completă a resurselor
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
    });

    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('loaded');
    }
});

document.body.classList.remove('loading');

window.addEventListener('load', () => {
    document.body.classList.remove('hidden');
    
    const loadingScreen = document.querySelector('.loading-screen');
    const heroContent = document.querySelector('.hero-content');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroFeatures = document.querySelector('.hero-features');
    const features = document.querySelectorAll('.feature');
    
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.remove();
        }, 700);
    }
    
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
    if (heroButtons) {
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
    }
    if (heroFeatures) {
        heroFeatures.style.opacity = '1';
        heroFeatures.style.transform = 'translateY(0)';
    }
    features.forEach(feature => {
        feature.style.opacity = '1';
        feature.style.transform = 'translateY(0)';
    });
    
    if (typeof axe !== 'undefined') {
        axe.run().then(results => {
            console.log(results);
        }).catch(err => {
            console.error('Eroare axe-core:', err);
        });
    } else {
        console.error('axe-core nu este definit.');
    }

    initializeMap();
});

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navMenu.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const galleryData = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c',
        category: 'repairs',
        title: 'Reparații Motor',
        description: 'Servicii complete de reparații motor'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc',
        category: 'diagnostic',
        title: 'Diagnostic Computerizat',
        description: 'Echipamente moderne de diagnosticare'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
        category: 'maintenance',
        title: 'Întreținere Periodică',
        description: 'Servicii complete de întreținere auto'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1493238792000-8113da705763',
        category: 'repairs',
        title: 'Reparații Caroserie',
        description: 'Reparații profesionale de caroserie'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
        category: 'diagnostic',
        title: 'Testare Sisteme',
        description: 'Verificare completă a sistemelor auto'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1504222490345-c075b6008014',
        category: 'maintenance',
        title: 'Schimb Ulei',
        description: 'Servicii profesionale de schimb ulei'
    }
];

function initializeGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';
    let currentImageIndex = 0;

    // Populate gallery
    function renderGallery(filter = 'all') {
        galleryGrid.innerHTML = '';
        const filteredImages = filter === 'all' 
            ? galleryData 
            : galleryData.filter(item => item.category === filter);

        filteredImages.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.title}">
                <div class="gallery-item-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            galleryGrid.appendChild(galleryItem);

            // Add animation
            setTimeout(() => {
                galleryItem.classList.add('show');
            }, index * 100);

            // Add click event for lightbox
            galleryItem.addEventListener('click', () => openLightbox(item.id));
        });
    }

    // Initialize lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    function openLightbox(imageId) {
        const imageIndex = galleryData.findIndex(item => item.id === imageId);
        if (imageIndex === -1) return;

        currentImageIndex = imageIndex;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateLightboxImage() {
        const currentImage = galleryData[currentImageIndex];
        lightboxImage.src = currentImage.src;
        lightboxCaption.textContent = `${currentImage.title} - ${currentImage.description}`;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for lightbox
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
        updateLightboxImage();
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryData.length;
        updateLightboxImage();
    });

    closeBtn.addEventListener('click', closeLightbox);

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = filter;
            renderGallery(filter);
        });
    });

    // Initial render
    renderGallery();
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGallery);

const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    if (input && label) {
        input.addEventListener('focus', () => {
            label.style.top = '0';
            label.style.fontSize = '0.8rem';
            label.style.background = 'white';
            label.style.padding = '0 0.5rem';
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.top = '50%';
                label.style.fontSize = '1rem';
                label.style.background = 'transparent';
                label.style.padding = '0';
            }
        });
    }
});

const appointmentForm = document.getElementById('appointmentForm');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    alert('Mulțumim pentru mesaj! Vă vom contacta în curând.');
    appointmentForm.reset();
});

const serviceBoxes = document.querySelectorAll('.service-box');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

serviceBoxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(50px)';
    box.style.transition = 'all 0.6s ease-out';
    observer.observe(box);
});

function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; 
        const step = target / (duration / 16); 
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && current === 0) {
                    updateNumber();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

document.addEventListener('DOMContentLoaded', animateNumbers);

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) { 
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    otherAnswer.style.maxHeight = null;
                    otherToggle.textContent = '+';
                }
            });
            
            if (isOpen) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
                toggle.textContent = '+';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
                toggle.textContent = '-';
            }
        });
    });
});

function initializeMap() {
    const map = L.map('mapContainer').setView([45.7640, 4.8357], 13); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    L.marker([45.7640, 4.8357]).addTo(map)
        .bindPopup('Locația noastră!')
        .openPopup(); 
} 