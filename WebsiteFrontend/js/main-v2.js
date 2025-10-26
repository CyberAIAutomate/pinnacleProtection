/* ================================================
   PINNACLE PROTECTION SERVICES V2 - JAVASCRIPT
   Modern Interactive Features
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(11px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-11px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== SCROLL INDICATOR =====
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('.stats-bar');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ===== NAVBAR BACKGROUND ON SCROLL =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 14, 39, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
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
    const animatedElements = document.querySelectorAll(
        '.service-card, .why-card, .stat-item, .feature-box'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===== FORM HANDLING =====
    const quoteForm = document.getElementById('quoteForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', async function(e) {
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
            
            // Validate
            if (!validateForm(formData)) {
                return;
            }
            
            // Disable submit button
            const submitButton = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                // Simulate API call
                await simulateAPICall(formData);
                
                // Show success
                quoteForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                console.log('Form submitted:', formData);
                
                // Reset after 5 seconds
                setTimeout(() => {
                    quoteForm.reset();
                    quoteForm.style.display = 'flex';
                    formSuccess.style.display = 'none';
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }, 5000);
                
            } catch (error) {
                console.error('Form error:', error);
                
                // Show error
                quoteForm.style.display = 'none';
                formError.style.display = 'block';
                
                // Reset after 5 seconds
                setTimeout(() => {
                    quoteForm.style.display = 'flex';
                    formError.style.display = 'none';
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }, 5000);
            }
        });
    }
    
    // ===== FORM VALIDATION =====
    function validateForm(data) {
        // Required fields
        if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.service || !data.location || !data.message) {
            alert('Please fill in all required fields.');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        // Phone validation
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(data.phone)) {
            alert('Please enter a valid phone number.');
            return false;
        }
        
        return true;
    }
    
    // ===== SIMULATE API CALL =====
    function simulateAPICall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.05) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }
    
    // ===== PHONE FORMATTING =====
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
    
    // ===== STAT COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let countStarted = false;
    
    function animateCounter(element) {
        const target = element.textContent;
        const isPercent = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (target.includes('.')) {
                displayValue = current.toFixed(1);
            }
            
            element.textContent = displayValue + (isPlus ? '+' : '') + (isPercent ? '%' : '');
        }, 40);
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countStarted) {
                countStarted = true;
                statNumbers.forEach(num => {
                    animateCounter(num);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        statsObserver.observe(statsBar);
    }
    
    // ===== PARALLAX EFFECT =====
    const parallaxSections = document.querySelectorAll('.hero, .cta-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.5;
                section.style.backgroundPositionY = (scrolled * speed) + 'px';
            }
        });
    });
    
    // ===== SERVICE CARDS HOVER EFFECT =====
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 60px rgba(255, 107, 53, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // ===== ANALYTICS TRACKING (PLACEHOLDER) =====
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href');
            
            console.log('CTA Click:', {
                text: buttonText,
                href: buttonHref,
                timestamp: new Date().toISOString()
            });
        });
    });
    
    // ===== PHONE CLICK TRACKING =====
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone Click:', {
                number: this.getAttribute('href'),
                timestamp: new Date().toISOString()
            });
        });
    });
    
    // ===== CONSOLE WELCOME =====
    console.log('%c🛡️ PINNACLE PROTECTION SERVICES', 'font-size: 24px; font-weight: bold; color: #ff6b35;');
    console.log('%c24/7 Active Security - We Stop Offenders, Not Just Observe & Report', 'font-size: 14px; color: #b0b8c4;');
    console.log('%cWebsite Version 2.0 - Modern Dark Theme', 'font-size: 12px; color: #ffa31a;');
    
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #10b981; font-weight: bold;');
        
        if (pageLoadTime > 3000) {
            console.warn('Page load time exceeds 3 seconds.');
        }
    }
});
