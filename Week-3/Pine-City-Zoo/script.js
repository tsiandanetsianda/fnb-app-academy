// Pine City Zoo Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Navigation handling
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Animal and place data
    const animalData = {
        elephant: {
            name: 'African Elephant',
            image: 'images/elephant.jpg',
            description: 'Elephants are large mammals of the family Elephantidae and the order Proboscidea. Two species are traditionally recognised, the African elephant (Loxodonta africana) and the Asian elephant (Elephas maximus), although some evidence suggests that African bush elephants and African forest elephants are separate species (L. africana and L. cyclotis respectively). Elephants are scattered throughout sub-Saharan Africa, South Asia, and Southeast Asia. Elephantidae is the only surviving family of the order Proboscidea; other, now extinct, members of the order include deinotheres, gomphotheres, mammoths, and mastodons. Male African elephants are the largest extant terrestrial animals and can reach a height of 4 m (13 ft) and weigh 7,000 kg (15,000 lb). You will find the elephants at pen E32, right next to the ampitheatre.'
        },
        giraffe: {
            name: 'Giraffe',
            image: 'images/giraffe-large.jpg',
            description: 'Our giraffe loves company and is one of the most beloved animals at Pine City Zoo. These magnificent creatures are the tallest mammals on Earth, known for their distinctive long necks and beautiful spotted patterns.'
        },
        gemsbok: {
            name: 'Gemsbok',
            image: 'images/gemsbok.jpg',
            description: 'Come and see the majestic gemsbok, also known as the South African oryx. These beautiful antelopes are perfectly adapted to arid environments and are known for their impressive straight horns.'
        },
        lion: {
            name: 'Lion',
            image: 'images/lion.jpg',
            description: 'The king of beasts! Our lions are magnificent predators known for their strength, courage, and distinctive manes (in males). They are social animals that live in groups called prides.'
        },
        panda: {
            name: 'Giant Panda',
            image: 'images/panda.jpg',
            description: 'Our adorable giant pandas are a crowd favorite. These endangered bears are known for their distinctive black and white fur and their love of bamboo. They spend most of their day eating and playing.'
        },
        tiger: {
            name: 'Tiger',
            image: 'images/tiger-tn.png',
            description: 'Majestic and powerful, tigers are the largest wild cats in the world. Known for their beautiful orange coat with black stripes, each tiger has a unique pattern of stripes.'
        }
    };

    const placeData = {
        amphitheatre: {
            name: 'Garden Amphitheatre',
            image: 'images/garden-amphitheater.jpg',
            description: 'Come and catch an educational and entertaining event at our beautiful garden amphitheatre. We host daily shows featuring wildlife demonstrations and educational talks.'
        },
        'coffee-shop': {
            name: 'Coffee Shop',
            image: 'images/coffee-shop.jpg',
            description: 'Take a break at our cozy coffee shop. Enjoy freshly brewed coffee, light snacks, and a peaceful atmosphere surrounded by nature.'
        },
        restaurant: {
            name: 'Outdoor Restaurant',
            image: 'images/outdoor_restaurant.jpg',
            description: 'Dine in style at our outdoor restaurant with a view of the beautiful zoo landscape. We serve fresh, locally-sourced meals in a unique setting.'
        },
        'lost-forest': {
            name: 'Lost Forest Trail',
            image: 'images/lost-forest.jpg',
            description: 'Embark on an adventure through our mysterious Lost Forest Trail. This immersive experience will take you through different habitats and ecosystems.'
        }
    };

    // Initialize the app
    init();

    function init() {
        setupNavigation();
        setupModals();
        setupMapControls();
        setupAnimalCards();
        setupPlaceCards();
        setupForms();
    }

    // Navigation functionality
    function setupNavigation() {
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetSection = this.dataset.section;
                switchSection(targetSection);
                
                // Update active nav button
                navButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    function switchSection(sectionName) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    // Modal functionality
    function setupModals() {
        const weatherBtn = document.getElementById('weatherBtn');
        const feedbackBtn = document.getElementById('feedbackBtn');
        const weatherModal = document.getElementById('weatherModal');
        const feedbackModal = document.getElementById('feedbackModal');
        const animalModal = document.getElementById('animalModal');
        
        const closeButtons = document.querySelectorAll('.modal-close');

        // Open modals
        weatherBtn.addEventListener('click', () => openModal(weatherModal));
        feedbackBtn.addEventListener('click', () => openModal(feedbackModal));

        // Close modals
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                closeModal(modal);
            });
        });

        // Close modal when clicking outside
        [weatherModal, feedbackModal, animalModal].forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this);
                }
            });
        });

        // Close modals with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    closeModal(openModal);
                }
            }
        });
    }

    function openModal(modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const firstFocusableElement = modal.querySelector('button, input, textarea, select');
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Map controls
    function setupMapControls() {
        const zoomInBtn = document.getElementById('zoomIn');
        const zoomOutBtn = document.getElementById('zoomOut');
        const resetZoomBtn = document.getElementById('resetZoom');
        const mapImg = document.getElementById('zooMap');
        
        let currentScale = 1;
        let isPanning = false;
        let startX, startY, currentX = 0, currentY = 0;

        zoomInBtn.addEventListener('click', () => {
            currentScale = Math.min(currentScale * 1.2, 3);
            updateMapTransform();
        });

        zoomOutBtn.addEventListener('click', () => {
            currentScale = Math.max(currentScale / 1.2, 1);
            if (currentScale === 1) {
                currentX = 0;
                currentY = 0;
            }
            updateMapTransform();
        });

        resetZoomBtn.addEventListener('click', () => {
            currentScale = 1;
            currentX = 0;
            currentY = 0;
            updateMapTransform();
        });

        // Pan functionality
        mapImg.addEventListener('mousedown', startPan);
        mapImg.addEventListener('touchstart', startPan);
        
        document.addEventListener('mousemove', pan);
        document.addEventListener('touchmove', pan);
        
        document.addEventListener('mouseup', endPan);
        document.addEventListener('touchend', endPan);

        function startPan(e) {
            if (currentScale <= 1) return;
            
            isPanning = true;
            mapImg.style.cursor = 'grabbing';
            
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            startX = clientX - currentX;
            startY = clientY - currentY;
        }

        function pan(e) {
            if (!isPanning || currentScale <= 1) return;
            
            e.preventDefault();
            
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            currentX = clientX - startX;
            currentY = clientY - startY;
            
            updateMapTransform();
        }

        function endPan() {
            isPanning = false;
            mapImg.style.cursor = 'grab';
        }

        function updateMapTransform() {
            mapImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
        }
    }

    // Animal cards
    function setupAnimalCards() {
        const animalCards = document.querySelectorAll('.animal-card');
        
        animalCards.forEach(card => {
            card.addEventListener('click', function() {
                const animalType = this.dataset.animal;
                showAnimalDetail(animalType);
            });
        });
    }

    // Place cards  
    function setupPlaceCards() {
        const placeCards = document.querySelectorAll('.place-card');
        
        placeCards.forEach(card => {
            card.addEventListener('click', function() {
                const placeType = this.dataset.place;
                showPlaceDetail(placeType);
            });
        });
    }

    function showAnimalDetail(animalType) {
        const animal = animalData[animalType];
        if (!animal) return;

        const animalDetail = document.getElementById('animalDetail');
        const animalModal = document.getElementById('animalModal');
        
        animalDetail.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" onerror="this.src='images/${animalType}-tn.png'">
            <h2>${animal.name}</h2>
            <p>${animal.description}</p>
        `;
        
        openModal(animalModal);
    }

    function showPlaceDetail(placeType) {
        const place = placeData[placeType];
        if (!place) return;

        const animalDetail = document.getElementById('animalDetail');
        const animalModal = document.getElementById('animalModal');
        
        animalDetail.innerHTML = `
            <img src="${place.image}" alt="${place.name}" onerror="this.src='images/${placeType}-tn.png'">
            <h2>${place.name}</h2>
            <p>${place.description}</p>
        `;
        
        openModal(animalModal);
    }

    // Form handling
    function setupForms() {
        const feedbackForm = document.querySelector('.feedback-form');
        
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = '✓ Sent Successfully!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    // Reset form and close modal
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    
                    const feedbackModal = document.getElementById('feedbackModal');
                    closeModal(feedbackModal);
                }, 1500);
            }, 1000);
        });
    }

    // Touch gestures for mobile
    function setupTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', function(e) {
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const deltaX = touchStartX - touchEndX;
            const deltaY = touchStartY - touchEndY;
            
            const minSwipeDistance = 50;
            
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe left - next section
                    switchToNextSection();
                } else {
                    // Swipe right - previous section
                    switchToPreviousSection();
                }
            }
        });
    }

    function switchToNextSection() {
        const activeNav = document.querySelector('.nav-btn.active');
        const nextNav = activeNav.nextElementSibling || document.querySelector('.nav-btn');
        if (nextNav) {
            nextNav.click();
        }
    }

    function switchToPreviousSection() {
        const activeNav = document.querySelector('.nav-btn.active');
        const prevNav = activeNav.previousElementSibling || document.querySelectorAll('.nav-btn')[document.querySelectorAll('.nav-btn').length - 1];
        if (prevNav) {
            prevNav.click();
        }
    }

    // Initialize touch gestures
    setupTouchGestures();

    // Smooth scrolling for better UX
    function smoothScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add scroll to top when switching sections
    navButtons.forEach(button => {
        button.addEventListener('click', smoothScrollToTop);
    });

    // Performance optimization: Lazy load images
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        setupLazyLoading();
    }

    // Add loading states for better perceived performance
    function showLoadingState(element) {
        element.classList.add('loading');
    }

    function hideLoadingState(element) {
        element.classList.remove('loading');
    }

    // Error handling for missing images (simplified)
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('Image failed to load:', e.target.src);
            // Only hide if it's actually broken, not replace
            e.target.style.opacity = '0.5';
            e.target.alt = 'Image not available';
        }
    }, true);

    // Add service worker registration for PWA capabilities (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }
});