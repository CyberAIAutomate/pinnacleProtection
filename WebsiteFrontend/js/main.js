/* ===================================
   Pinnacle Protection Services - JS
   Interactive Features & Form Handling
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ===================================
    // Smooth Scrolling
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 120; // Account for sticky navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Back to Top Button
    // ===================================
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===================================
    // Navbar Background on Scroll
    // ===================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // ===================================
    // Scroll Animations (Intersection Observer)
    // ===================================
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
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.service-card, .why-card, .industry-card, .testimonial-card, .about-content, .about-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===================================
    // Form Handling
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                company: document.getElementById('company').value.trim(),
                service: document.getElementById('service').value,
                location: document.getElementById('location').value,
                message: document.getElementById('message').value.trim(),
                urgency: document.getElementById('urgency').checked,
                timestamp: new Date().toISOString()
            };
            
            // Validate form
            if (!validateForm(formData)) {
                return;
            }
            
            // Disable submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                // Simulate API call (in production, this would send to your backend)
                await simulateAPICall(formData);
                
                // Show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Log to console for demonstration
                console.log('Form submitted successfully:', formData);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'flex';
                    formSuccess.style.display = 'none';
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }, 5000);
                
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show error message
                contactForm.style.display = 'none';
                formError.style.display = 'block';
                
                // Reset after 5 seconds
                setTimeout(() => {
                    contactForm.style.display = 'flex';
                    formError.style.display = 'none';
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }, 5000);
            }
        });
    }
    
    // ===================================
    // Form Validation
    // ===================================
    function validateForm(data) {
        // Check required fields
        if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.service || !data.location || !data.message) {
            alert('Please fill in all required fields.');
            return false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        // Validate phone (basic check)
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(data.phone)) {
            alert('Please enter a valid phone number.');
            return false;
        }
        
        return true;
    }
    
    // ===================================
    // Simulate API Call
    // ===================================
    function simulateAPICall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() > 0.05) {
                    resolve({ success: true, message: 'Form submitted successfully' });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }
    
    // ===================================
    // Phone Number Formatting
    // ===================================
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            
            e.target.value = value;
        });
    }
    
    // ===================================
    // Hero Scroll Indicator
    // ===================================
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                const offsetTop = servicesSection.offsetTop - 120;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ===================================
    // Dynamic Year in Footer
    // ===================================
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear && footerYear.textContent.includes('2025')) {
        footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
    }
    
    // ===================================
    // Service Card Hover Effects
    // ===================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // ===================================
    // Real-time Form Character Counter (for textarea)
    // ===================================
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const maxLength = 1000;
        const counterDiv = document.createElement('div');
        counterDiv.style.cssText = 'text-align: right; font-size: 0.85rem; color: #64748b; margin-top: 5px;';
        messageTextarea.parentElement.appendChild(counterDiv);
        
        function updateCounter() {
            const remaining = maxLength - messageTextarea.value.length;
            counterDiv.textContent = `${messageTextarea.value.length} / ${maxLength} characters`;
            
            if (remaining < 100) {
                counterDiv.style.color = '#f59e0b';
            } else {
                counterDiv.style.color = '#64748b';
            }
        }
        
        messageTextarea.setAttribute('maxlength', maxLength);
        messageTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }
    
    // ===================================
    // CTA Button Analytics Tracking (placeholder)
    // ===================================
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonLocation = this.closest('section')?.className || 'unknown';
            
            // In production, send to analytics service
            console.log('CTA Click:', {
                text: buttonText,
                location: buttonLocation,
                timestamp: new Date().toISOString()
            });
        });
    });
    
    // ===================================
    // Emergency Phone Click Tracking
    // ===================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone click:', {
                number: this.getAttribute('href'),
                timestamp: new Date().toISOString()
            });
        });
    });
    
    // ===================================
    // Lazy Loading Images (if needed in future)
    // ===================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ===================================
    // Prevent Form Double Submission
    // ===================================
    if (contactForm) {
        let isSubmitting = false;
        
        contactForm.addEventListener('submit', function(e) {
            if (isSubmitting) {
                e.preventDefault();
                return false;
            }
            isSubmitting = true;
            
            // Reset after 3 seconds as a safety measure
            setTimeout(() => {
                isSubmitting = false;
            }, 3000);
        });
    }
    
    // ===================================
    // Console Message
    // ===================================
    console.log('%c🛡️ Pinnacle Protection Services', 'font-size: 20px; font-weight: bold; color: #0a2463;');
    console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #3b82f6;');
    console.log('%c24/7 Active Security - We Stop Offenders, Not Just Observe & Report', 'font-size: 12px; color: #64748b;');
    
});

// ===================================
// Performance Monitoring
// ===================================
window.addEventListener('load', function() {
    // Check if Performance API is available
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`Page Load Time: ${pageLoadTime}ms`);
        
        // Log warning if page loads slowly
        if (pageLoadTime > 3000) {
            console.warn('Page load time exceeds 3 seconds. Consider optimization.');
        }
    }
});

// ===================================
// Service Worker Registration (for future PWA capability)
// ===================================
if ('serviceWorker' in navigator) {
    // Uncomment when service worker is ready
    // window.addEventListener('load', function() {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(reg => console.log('Service Worker registered'))
    //         .catch(err => console.log('Service Worker registration failed'));
    // });
}
