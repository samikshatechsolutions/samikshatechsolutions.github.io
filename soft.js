document.addEventListener('DOMContentLoaded', function() {
    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target + (target === 40 ? '%' : target === 99 ? '%' : '+');
        }
    };
    
    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    if (counter.innerText === '0') {
                        animateCounter(counter);
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.dev-stats'));
    
    // Tech stack navigation
    const stackNavs = document.querySelectorAll('.stack-nav');
    const stackContents = document.querySelectorAll('.stack-content');
    
    stackNavs.forEach(nav => {
        nav.addEventListener('click', () => {
            // Remove active class from all
            stackNavs.forEach(n => n.classList.remove('active'));
            stackContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked
            nav.classList.add('active');
            
            // Show corresponding content
            const stackId = nav.getAttribute('data-stack');
            document.getElementById(stackId).classList.add('active');
        });
    });
    
    // Typewriter effect
    const typewriterText = document.querySelector('.typewriter-text');
    const texts = [
        'Build Digital Experiences',
        'Create Scalable Solutions',
        'Develop Innovative Software',
        'Engineer Future Technology'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typewriter effect
    setTimeout(typeWriter, 1000);
    
    // Animate elements on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements for animation
    document.querySelectorAll('.tech-item, .case-card, .process-step').forEach(el => {
        animateOnScroll.observe(el);
    });
});