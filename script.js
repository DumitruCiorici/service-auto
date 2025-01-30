document.body.classList.remove('loading');

window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const heroContent = document.querySelector('.hero-content');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroFeatures = document.querySelector('.hero-features');
    const features = document.querySelectorAll('.feature');
    
    loadingScreen.classList.add('fade-out');
    
    heroContent.style.opacity = '1';
    heroButtons.style.opacity = '1';
    heroFeatures.style.opacity = '1';
    features.forEach(feature => {
        feature.style.opacity = '1';
        feature.style.transform = 'translateY(0)';
    });
    
    setTimeout(() => {
        loadingScreen.remove();
    }, 700);

    axe.run().then(results => {
        console.log(results);
    }).catch(err => {
        console.error(err);
    });
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

const galleryImages = [
    'https://images.unsplash.com/photo-1486006920555-c77dcf18193c',
    'https://images.unsplash.com/photo-1487754180451-c456f719a1fc',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
    'https://images.unsplash.com/photo-1493238792000-8113da705763',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    'https://images.unsplash.com/photo-1504222490345-c075b6008014'
];

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

const map = L.map('mapContainer').setView([45.7640, 4.8357], 13); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

L.marker([45.7640, 4.8357]).addTo(map)
    .bindPopup('Locația noastră!')
    .openPopup(); 