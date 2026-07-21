/* ============================================
   Antar Karmaker - Portfolio Website
   Interactive Features & Animations
   ============================================ */

(function () {
    'use strict';

    /* ---------- DOM Elements ---------- */
    const loader = document.getElementById('loader');
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');
    const themeToggle = document.getElementById('themeToggle');
    const typingText = document.getElementById('typingText');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const revealElements = document.querySelectorAll('.reveal');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const statNumbers = document.querySelectorAll('.stat-number');

    /* ---------- Reduced Motion Check ---------- */
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Loader ---------- */
    window.addEventListener('load', function () {
        var delay = prefersReducedMotion ? 100 : 800;
        setTimeout(function () {
            loader.classList.add('hidden');
            loader.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            initRevealAnimations();
        }, delay);
    });

    /* ---------- Typing Effect ---------- */
    var typingStrings = [
        'WordPress & Theme Developer',
        'Custom Theme Specialist',
        'Responsive Web Designer',
        'Pixel-Perfect Developer',
        'WordPress Expert'
    ];
    var stringIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 80;

    function typeEffect() {
        if (prefersReducedMotion) {
            typingText.textContent = typingStrings[0];
            return;
        }

        var currentString = typingStrings[stringIndex];

        if (isDeleting) {
            typingText.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingText.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentString.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % typingStrings.length;
            typingSpeed = 300;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1200);

    /* ---------- Navbar Scroll ---------- */
    function handleNavbarScroll() {
        var scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* ---------- Back to Top ---------- */
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    /* ---------- Active Nav Link ---------- */
    function updateActiveNavLink() {
        var sections = document.querySelectorAll('section[id]');
        var scrollPosition = window.scrollY + 150;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinkItems.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ---------- Mobile Menu ---------- */
    function toggleMobileMenu() {
        var isOpen = navLinks.classList.contains('active');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    document.querySelector('.nav-cta').addEventListener('click', closeMobileMenu);

    /* ---------- Theme Toggle ---------- */
    var currentTheme = localStorage.getItem('theme') || 'dark';

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        var icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    setTheme(currentTheme);

    themeToggle.addEventListener('click', function () {
        var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(theme);
    });

    /* ---------- Scroll Reveal ---------- */
    function initRevealAnimations() {
        if (prefersReducedMotion) {
            revealElements.forEach(function (el) {
                el.classList.add('revealed');
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var delay = entry.target.dataset.delay || 0;
                        setTimeout(function () {
                            entry.target.classList.add('revealed');
                        }, parseInt(delay));
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        revealElements.forEach(function (el, index) {
            el.dataset.delay = (index % 4) * 100;
            observer.observe(el);
        });
    }

    /* ---------- Skill Progress Bars ---------- */
    var skillsAnimated = false;

    function animateSkillBars() {
        if (skillsAnimated) return;

        var skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        var rect = skillsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.8) {
            skillsAnimated = true;

            skillProgressBars.forEach(function (bar) {
                var progress = bar.getAttribute('data-progress');
                if (prefersReducedMotion) {
                    bar.style.width = progress + '%';
                    bar.classList.add('animated');
                } else {
                    setTimeout(function () {
                        bar.style.width = progress + '%';
                        bar.classList.add('animated');
                    }, 200);
                }
            });
        }
    }

    /* ---------- Counter Animation ---------- */
    var countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        var statsSection = document.getElementById('stats');
        if (!statsSection) return;

        var rect = statsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.8) {
            countersAnimated = true;

            statNumbers.forEach(function (counter) {
                var target = parseInt(counter.getAttribute('data-target'));

                if (prefersReducedMotion) {
                    counter.textContent = target + (target === 24 ? '/7' : '+');
                    return;
                }

                var duration = 2000;
                var startTime = null;

                function updateCounter(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    var current = Math.floor(eased * target);

                    counter.textContent = current + (target === 24 ? '/7' : '+');

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }

    /* ---------- Portfolio Filter ---------- */
    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');

            portfolioCards.forEach(function (card) {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ---------- Contact Form ---------- */
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var submitBtn = contactForm.querySelector('.btn-submit');
        var btnText = submitBtn.querySelector('.btn-text');
        var originalText = btnText.textContent;

        btnText.textContent = 'Sending...';
        submitBtn.style.pointerEvents = 'none';

        setTimeout(function () {
            btnText.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            submitBtn.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.4)';

            formStatus.textContent = 'Your message has been sent successfully!';
            formStatus.className = 'form-status success';

            contactForm.reset();

            setTimeout(function () {
                btnText.textContent = originalText;
                submitBtn.style.pointerEvents = '';
                submitBtn.style.background = '';
                submitBtn.style.boxShadow = '';
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 3000);
        }, 1500);
    });

    /* ---------- Smooth Scroll for Anchor Links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;

            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offset = 80;
                var targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });

                /* Update URL without scrolling */
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });

    /* ---------- Keyboard: Close menu on Escape ---------- */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
            hamburger.focus();
        }
    });

    /* ---------- Scroll Event Handler (Throttled) ---------- */
    var ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                handleNavbarScroll();
                handleBackToTop();
                updateActiveNavLink();
                animateSkillBars();
                animateCounters();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    /* ---------- CV Download ---------- */
    document.getElementById('downloadCV').addEventListener('click', function (e) {
        e.preventDefault();
        formStatus.textContent = 'Please add your CV/Resume file to enable download.';
        formStatus.className = 'form-status error';
        setTimeout(function () {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 3000);
    });

    /* ---------- FadeInUp Keyframes (CSS, not inline) ---------- */
    var style = document.createElement('style');
    style.textContent = '@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }';
    document.head.appendChild(style);

    /* ---------- Initialize ---------- */
    handleNavbarScroll();
    handleBackToTop();
    updateActiveNavLink();

})();
