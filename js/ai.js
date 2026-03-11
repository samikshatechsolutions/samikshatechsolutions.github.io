document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // TAB FUNCTIONALITY
    // ============================================
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabLinks.length > 0 && tabPanes.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all
                tabLinks.forEach(tab => tab.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked tab
                link.classList.add('active');
                
                // Show corresponding pane
                const tabId = link.getAttribute('data-tab');
                const targetPane = document.getElementById(tabId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
    
    // ============================================
    // ANIMATED METRICS
    // ============================================
    const metrics = document.querySelectorAll('.metric-value');
    const metricValues = [99.9, 200, 50, 100];
    
    const animateMetrics = () => {
        metrics.forEach((metric, index) => {
            let current = 0;
            const target = metricValues[index];
            const duration = 1500;
            const increment = target / (duration / 20);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    metric.textContent = target + (index === 1 ? 'ms' : index === 2 ? '+' : '%');
                    metric.classList.add('animated');
                } else {
                    metric.textContent = Math.floor(current) + (index === 1 ? 'ms' : '');
                }
            }, 20);
        });
    };
    
    // Intersection Observer for metrics
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetrics();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroMetrics = document.querySelector('.hero-metrics');
    if (heroMetrics) {
        observer.observe(heroMetrics);
    }
    
    // ============================================
    // AI ORCHESTRATION ANIMATION
    // ============================================
    const nodes = document.querySelectorAll('.orchestration-node');
    nodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.2}s`;
    });
    
    // ============================================
    // FORM SUBMISSION (if you add a form)
    // ============================================
    const consultationForm = document.getElementById('aiConsultation');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const service = document.getElementById('service')?.value;
            
            if (!name || !email || !service) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Show success message
            alert('Thank you for your interest! Our AI team will contact you within 24 hours.');
            consultationForm.reset();
        });
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header')?.offsetHeight || 100;
                const targetPosition = targetElement.getBoundingClientRect().top + 
                                      window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // MOBILE VIEW ADAPTATIONS
    // ============================================
    function checkMobileView() {
        if (window.innerWidth <= 768) {
            // Mobile adjustments
            document.querySelectorAll('.service-card').forEach(card => {
                card.classList.add('mobile-card');
            });
            
            document.querySelectorAll('.tech-grid').forEach(grid => {
                grid.style.gridTemplateColumns = '1fr';
            });
        } else {
            document.querySelectorAll('.service-card').forEach(card => {
                card.classList.remove('mobile-card');
            });
        }
    }
    
    // Initial check
    checkMobileView();
    
    // Check on resize
    window.addEventListener('resize', checkMobileView);
});