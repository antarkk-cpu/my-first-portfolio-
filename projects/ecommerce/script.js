(function(){
    'use strict';

    const products = [
        {id:1,name:'Leather Chronograph Watch',brand:'LUXE',price:349,oldPrice:449,tag:'sale',bg:'linear-gradient(135deg,#1a1a2e,#16213e)',icon:'&#128336;',category:'popular',rating:4.9,reviews:128},
        {id:2,name:'Minimalist Canvas Backpack',brand:'MODERN',price:89,oldPrice:null,tag:'new',bg:'linear-gradient(135deg,#1a2332,#0f1923)',icon:'&#128092;',category:'new',rating:4.7,reviews:86},
        {id:3,name:'Wireless Noise-Cancel Buds',brand:'SOUND',price:129,oldPrice:179,tag:'sale',bg:'linear-gradient(135deg,#1f1525,#2a1a35)',icon:'&#127911;',category:'popular',rating:4.8,reviews:234},
        {id:4,name:'Premium Sunglasses',brand:'VISION',price:199,oldPrice:null,tag:'new',bg:'linear-gradient(135deg,#1a2020,#152525)',icon:'&#128083;',category:'new',rating:4.6,reviews:67},
        {id:5,name:'Italian Leather Belt',brand:'CRAFT',price:75,oldPrice:95,tag:'sale',bg:'linear-gradient(135deg,#2a1f15,#1f1a10)',icon:'&#128094;',category:'sale',rating:4.5,reviews:93},
        {id:6,name:'Ceramic Pour-Over Set',brand:'BREW',price:64,oldPrice:null,tag:'new',bg:'linear-gradient(135deg,#1a1a1a,#252525)',icon:'&#9749;',category:'new',rating:4.9,reviews:156},
        {id:7,name:'Merino Wool Scarf',brand:'WARM',price:55,oldPrice:null,tag:null,bg:'linear-gradient(135deg,#1a1520,#251a30)',icon:'&#129524;',category:'popular',rating:4.4,reviews:42},
        {id:8,name:'Smart Fitness Tracker',brand:'PULSE',price:159,oldPrice:219,tag:'sale',bg:'linear-gradient(135deg,#0f1a20,#152530)',icon:'&#9201;',category:'sale',rating:4.7,reviews:312}
    ];

    let cart = [];
    const grid = document.getElementById('productsGrid');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItems = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadge');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartFooter = document.getElementById('cartFooter');

    function renderProducts(filter){
        const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
        grid.innerHTML = filtered.map(p => `
            <div class="product-card" data-category="${p.category}">
                <div class="product-thumb">
                    <div class="product-thumb-bg" style="background:${p.bg};color:var(--accent);font-size:48px">${p.icon}</div>
                    ${p.tag ? `<span class="product-tag tag-${p.tag}">${p.tag}</span>` : ''}
                    <div class="product-quick">
                        <button class="quick-add" onclick="addToCart(${p.id})">Add to Cart</button>
                        <button class="quick-view">View</button>
                    </div>
                </div>
                <div class="product-body">
                    <span class="product-brand">${p.brand}</span>
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-price">$${p.price}${p.oldPrice ? `<span class="old">$${p.oldPrice}</span>` : ''}</div>
                    <div class="product-rating"><span class="stars">${'&#9733;'.repeat(Math.floor(p.rating))}</span> ${p.rating} (${p.reviews})</div>
                </div>
            </div>
        `).join('');
    }

    window.addToCart = function(id){
        const product = products.find(p => p.id === id);
        if(!product) return;
        const existing = cart.find(c => c.id === id);
        if(existing){ existing.qty++; } else { cart.push({...product, qty:1}); }
        updateCart();
        openCart();
    };

    function updateCart(){
        const total = cart.reduce((s,c) => s + c.price * c.qty, 0);
        const count = cart.reduce((s,c) => s + c.qty, 0);

        cartBadge.textContent = count;
        cartBadge.classList.toggle('show', count > 0);
        cartCount.textContent = count;
        cartTotal.textContent = '$' + total.toFixed(2);
        cartFooter.style.display = cart.length ? 'block' : 'none';

        if(cart.length === 0){
            cartItems.innerHTML = '<div class="cart-empty"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:.3"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><p>Your cart is empty</p></div>';
            return;
        }

        cartItems.innerHTML = cart.map(c => `
            <div class="cart-item">
                <div class="cart-item-img" style="background:${c.bg};color:var(--accent)">${c.icon}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${c.name}</div>
                    <div class="cart-item-price">$${(c.price * c.qty).toFixed(2)}</div>
                    <div class="cart-item-qty">
                        <button onclick="changeQty(${c.id},-1)">-</button>
                        <span>${c.qty}</span>
                        <button onclick="changeQty(${c.id},1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${c.id})">&#10005;</button>
            </div>
        `).join('');
    }

    window.changeQty = function(id,delta){
        const item = cart.find(c => c.id === id);
        if(!item) return;
        item.qty += delta;
        if(item.qty <= 0) cart = cart.filter(c => c.id !== id);
        updateCart();
    };

    window.removeFromCart = function(id){
        cart = cart.filter(c => c.id !== id);
        updateCart();
    };

    function openCart(){ cartSidebar.classList.add('open'); cartOverlay.classList.add('open'); document.body.style.overflow='hidden'; }
    function closeCart(){ cartSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); document.body.style.overflow=''; }

    document.getElementById('cartToggle').addEventListener('click', openCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    /* Filter */
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function(){
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProducts(this.dataset.filter);
        });
    });

    /* Search */
    const searchOverlay = document.getElementById('searchOverlay');
    document.querySelector('.search-toggle').addEventListener('click', () => { searchOverlay.classList.add('open'); document.getElementById('searchInput').focus(); });
    document.getElementById('searchClose').addEventListener('click', () => searchOverlay.classList.remove('open'));

    /* Hamburger */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navMenu.classList.toggle('active'); });
    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => { hamburger.classList.remove('active'); navMenu.classList.remove('active'); }));

    /* Navbar scroll */
    window.addEventListener('scroll', () => { document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50); }, {passive:true});

    /* Countdown */
    const end = Date.now() + 2*86400000 + 14*3600000;
    function tick(){
        const d = Math.max(0, end - Date.now());
        document.getElementById('days').textContent = String(Math.floor(d/86400000)).padStart(2,'0');
        document.getElementById('hours').textContent = String(Math.floor((d%86400000)/3600000)).padStart(2,'0');
        document.getElementById('minutes').textContent = String(Math.floor((d%3600000)/60000)).padStart(2,'0');
        document.getElementById('seconds').textContent = String(Math.floor((d%60000)/1000)).padStart(2,'0');
    }
    tick(); setInterval(tick,1000);

    /* Newsletter */
    document.getElementById('newsletterForm').addEventListener('submit', function(e){
        e.preventDefault();
        const btn = this.querySelector('button');
        btn.textContent = 'Subscribed!';
        btn.style.background = 'var(--green)';
        this.querySelector('input').value = '';
        setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
    });

    /* Reveal on scroll */
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }});
    }, {threshold:0.1, rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    /* Init */
    renderProducts('all');

})();
