/**
 * IRON PULSE - Premium Gym Website JavaScript
 * Beginner-friendly code with comprehensive comments for each feature.
 */

document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       1. LOADING SCREEN
       ========================================================================== */
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 500); // Slight delay to ensure smooth transition
        });
    }

    /* ==========================================================================
       2. NAVBAR SCROLL EFFECT
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* ==========================================================================
       3. MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            if (navActions) {
                navActions.classList.toggle('mobile-active');
            }
            // Toggle hamburger icon between bars and times
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when clicking a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (navActions) {
                    navActions.classList.remove('mobile-active');
                }
                const icon = mobileToggle.querySelector('i');
                if (icon && icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* ==========================================================================
       4. LOGIN MODAL FUNCTIONALITY
       ========================================================================== */
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const loginBtns = document.querySelectorAll('.btn-login');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const modalForms = document.querySelectorAll('.modal-form');

    // Open Modal
    loginBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modalOverlay) {
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
    });

    // Close Modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            if (modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close Modal on clicking outside the box
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Tab switching between Login and Register
    if (modalTabs.length > 0) {
        modalTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetForm = tab.getAttribute('data-target');

                // Remove active class from all tabs & forms
                modalTabs.forEach(t => t.classList.remove('active'));
                modalForms.forEach(f => f.classList.remove('active'));

                // Add active class to clicked tab & corresponding form
                tab.classList.add('active');
                const formToShow = document.getElementById(targetForm);
                if (formToShow) {
                    formToShow.classList.add('active');
                }
            });
        });
    }

    /* ==========================================================================
       5. SCROLL REVEAL ANIMATION
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Initial check on load

    /* ==========================================================================
       6. ANIMATED COUNTERS
       ========================================================================== */
    const counterElements = document.querySelectorAll('.stat-num');
    let countersAnimated = false;

    const animateCounters = () => {
        counterElements.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const increment = target / 50; // Adjust speed here

            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    };

    const checkCounterScroll = () => {
        if (counterElements.length === 0 || countersAnimated) return;

        const firstCounter = counterElements[0];
        const triggerBottom = window.innerHeight * 0.9;
        const elTop = firstCounter.getBoundingClientRect().top;

        if (elTop < triggerBottom) {
            animateCounters();
            countersAnimated = true;
            window.removeEventListener('scroll', checkCounterScroll);
        }
    };

    window.addEventListener('scroll', checkCounterScroll);
    checkCounterScroll(); // Initial check on load

    /* ==========================================================================
       7. TESTIMONIAL SLIDER / CAROUSEL
       ========================================================================== */
    const slides = document.querySelectorAll('.testimonial-slide');
    const nextBtn = document.querySelector('.slider-next');
    const prevBtn = document.querySelector('.slider-prev');
    let currentSlide = 0;

    if (slides.length > 0 && nextBtn && prevBtn) {
        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        };

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        // Auto slide every 6 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 6000);
    }

    /* ==========================================================================
       8. BACK TO TOP BUTTON
       ========================================================================== */
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
