document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabLinks.forEach(tab => tab.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab
            link.classList.add('active');
            
            // Show corresponding pane
            const tabId = link.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animate metrics
    const metrics = document.querySelectorAll('.metric-value');
    const metricValues = [35, 5, 100];
    
    const animateMetrics = () => {
        metrics.forEach((metric, index) => {
            let current = 0;
            const target = metricValues[index];
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    metric.textContent = target + (index === 0 ? '%' : index === 1 ? 'x' : '+');
                } else {
                    metric.textContent = Math.floor(current) + (index === 0 ? '%' : index === 1 ? 'x' : '+');
                }
            }, 20);
        });
    };
    
    // Intersection Observer for metrics animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetrics();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.hero-metrics'));
    
    // Framework nodes animation
    const frameworkNodes = document.querySelectorAll('.framework-node');
    frameworkNodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.2}s`;
        node.classList.add('animate__animated', 'animate__fadeInUp');
    });
    
    // Form submission
    const assessmentForm = document.getElementById('assessmentInquiry');
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const industry = document.getElementById('industry').value;
            const employees = document.getElementById('employees').value;
            const email = document.getElementById('email').value;
            
            if (!industry || !employees || !email) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would typically send the data to your backend
            // For now, we'll just show a success message
            alert('Thank you for your inquiry! We will contact you within 24 hours to schedule your free assessment.');
            assessmentForm.reset();
        });
    }
    
    // Add hover effects to stage cards
    const stages = document.querySelectorAll('.stage');
    stages.forEach(stage => {
        stage.addEventListener('mouseenter', () => {
            stage.style.boxShadow = '0 15px 40px rgba(26, 35, 126, 0.15)';
        });
        
        stage.addEventListener('mouseleave', () => {
            stage.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});