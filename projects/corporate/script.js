(function(){
    'use strict';

    /* Hamburger */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }));

    /* Navbar scroll */
    window.addEventListener('scroll', () => {
        document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
    }, {passive:true});

    /* Smooth scroll */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e){
            const t = document.querySelector(this.getAttribute('href'));
            if(t){
                e.preventDefault();
                t.scrollIntoView({behavior:'smooth', block:'start'});
            }
        });
    });

    /* Reveal on scroll */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(prefersReduced){
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    } else {
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }});
        }, {threshold:0.1, rootMargin:'0px 0px -40px 0px'});
        document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    }

})();
