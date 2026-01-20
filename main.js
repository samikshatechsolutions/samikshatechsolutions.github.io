<script>
        
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mainNav = document.getElementById('mainNav');
        
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Auth Modal
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const authModal = document.getElementById('authModal');
        const closeAuth = document.getElementById('closeAuth');
        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const authTitle = document.getElementById('authTitle');
        const switchToSignup = document.getElementById('switchToSignup');
        const switchToLogin = document.getElementById('switchToLogin');
        
        // Open login modal
        loginBtn.addEventListener('click', () => {
            authModal.style.display = 'flex';
            loginTab.click();
        });
        
        // Open signup modal
        signupBtn.addEventListener('click', () => {
            authModal.style.display = 'flex';
            signupTab.click();
        });
        
        // Close modal
        closeAuth.addEventListener('click', () => {
            authModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.style.display = 'none';
            }
        });
        
        // Switch between login and signup tabs
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
            authTitle.textContent = 'Login to Your Account';
        });
        
        signupTab.addEventListener('click', () => {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
            authTitle.textContent = 'Create New Account';
        });
        
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            signupTab.click();
        });
        
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            loginTab.click();
        });
        
        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // In a real application, you would send this to a server
            console.log('Login attempt:', { email, password });
            
            // Show success message
            alert('Login successful! Welcome back.');
            authModal.style.display = 'none';
            document.getElementById('loginForm').reset();
        });
        
        document.getElementById('signupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // In a real application, you would send this to a server
            console.log('Signup attempt:', { name, email, password });
            
            // Show success message
            alert('Account created successfully! Welcome to Samiksha Tech Solutions.');
            authModal.style.display = 'none';
            document.getElementById('signupForm').reset();
        });
        // Initialize EmailJS with your Public Key
        (function() {
            emailjs.init("vA1VW5Jea0vW1bKh3"); // Replace with your EmailJS Public Key
        })();
        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                   phone:document.getElementById('phone').value,
                company: document.getElementById('company').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value,
                to_email: "samikshatechsolutions@email.com" // Replace with your business email
            };
            
            // In a real application, you would send this to a server
            console.log('Contact form submitted:', formData);
            

            // Send email using EmailJS
            emailjs.send(
                "service_re49gop",     // Replace with your EmailJS Service ID
                "template_1thmy54",    // Replace with your EmailJS Template ID
                formData
            )
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                document.getElementById('successAlert').classList.remove('d-none');
                
                // Reset form
                document.getElementById('contactForm').reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                document.getElementById('errorAlert').classList.remove('d-none');
            })
            .finally(function() {
                // Reset button state
                submitBtn.disabled = false;
                buttonText.textContent = "Submit";
                spinner.classList.add('d-none');
            });
            // Show success message
            alert('Thank you for your message! We will contact you within 24 hours.');
            document.getElementById('contactForm').reset();
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add active class to nav links based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    </script>   