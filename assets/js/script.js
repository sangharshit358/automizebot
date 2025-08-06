// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        if (otherToggle) {
                            otherToggle.textContent = '+';
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    toggle.textContent = '+';
                } else {
                    item.classList.add('active');
                    toggle.textContent = '-';
                }
                
                // Update ARIA attributes for accessibility
                const expanded = !isActive;
                question.setAttribute('aria-expanded', expanded);
                answer.setAttribute('aria-hidden', !expanded);
            });
            
            // Initialize ARIA attributes
            question.setAttribute('aria-expanded', item.classList.contains('active'));
            answer.setAttribute('aria-hidden', !item.classList.contains('active'));
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            
            // Handle keyboard navigation for FAQ
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        }
    });
    
    // Header Background on Scroll
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });
    }
    
    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.feature-card, .benefit-card, .stat-card, .testimonial-card, .step-card, .benefit-item');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Testimonials Slider (Simple Auto-rotation)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function rotateTestimonials() {
        if (testimonialCards.length > 0) {
            testimonialCards.forEach((card, index) => {
                card.style.opacity = index === currentTestimonial ? '1' : '0.7';
                card.style.transform = index === currentTestimonial ? 'scale(1.02)' : 'scale(1)';
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        }
    }
    
    // Start testimonial rotation
    if (testimonialCards.length > 0) {
        setInterval(rotateTestimonials, 4000);
        rotateTestimonials(); // Initial call
    }
    
    // Form Validation (if contact forms are added later)
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Utility function for smooth reveal animations
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        revealOnScroll();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // Error handling for external resources
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            this.style.display = 'none';
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Preload critical images
    const criticalImages = [
        'https://automizebot.com/wp-content/uploads/2025/04/Untitled-design-3.gif',
        'https://automizebot.com/wp-content/uploads/2025/04/Untitled-design-4.gif'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Add loading states for buttons
    const ctaButtons = document.querySelectorAll('.btn-cta, .btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state if it's an external link
            if (this.href && this.href.includes('cal.com')) {
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                }, 2000);
            }
        });
    });
    
    // Console welcome message
    console.log('%c🤖 Welcome to Automizebot!', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
    console.log('%cYour AI Partner in Business Growth', 'color: #ffffff; font-size: 14px;');
    
    // Analytics tracking (placeholder for future implementation)
    function trackEvent(eventName, eventData = {}) {
        // This would integrate with analytics services like Google Analytics
        console.log('Event tracked:', eventName, eventData);
    }
    
    // Track CTA clicks
    const ctaLinks = document.querySelectorAll('a[href*="cal.com"]');
    ctaLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('CTA_Click', {
                button_text: this.textContent.trim(),
                section: this.closest('section')?.className || 'unknown'
            });
        });
    });
    
    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('Section_View', {
                    section_id: entry.target.id,
                    section_name: entry.target.className
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Accessibility improvements
    function improveAccessibility() {
        // Add skip link for keyboard navigation
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #00d4ff;
            color: #0a0a0a;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content landmark
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.id = 'main-content';
            heroSection.setAttribute('role', 'main');
        }
    }
    
    improveAccessibility();
    
    // Error boundary for JavaScript errors
    window.addEventListener('error', function(event) {
        console.error('JavaScript error:', event.error);
        // In production, this would send error reports to a logging service
    });
    
    // Graceful degradation check
    if (!window.IntersectionObserver) {
        // Fallback for older browsers
        console.warn('IntersectionObserver not supported, using fallback animations');
        animateElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
    
    console.log('✅ Automizebot website initialized successfully!');
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
