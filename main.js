// ----------------------------------------------------
// HYPER-PREMIUM OTT-STYLE PORTFOLIO LOGIC
// ----------------------------------------------------

const categoriesInfo = [
    { name: "3D Animation Videos", ids: ["sxDeMNl_oJE", "YIy6woiYaNA", "qk4YkA6-bqg", "iQSLUFBznn8", "INOr9XGpn6Q", "njrXOlSR_h4", "4kEm-IjPF6U"] },
    { name: "Game Designing & AR/VR Videos", ids: ["BgUkkkDhrn4", "foKjCTH-9ek", "2S-hWKWKCYM", "ZjbUBV7ZNqM"] },
    { name: "AI Film Videos", ids: ["a6wHlKUEAhI", "XdVIl6P6bp8", "2Lvp7mkGQiw", "M1T_dhLSQUc", "GGUliyRDIIU", "EHrXqQiSLz4", "Q1sM7Y1x6vM", "FPhw7cnrx_8", "_eFsn6WP-zQ"] },
    { name: "AI Ads Videos", ids: ["RJLT5ufp-lU", "WyTZQiu2Y_o", "TMzKgQGsejg", "ljHgYPPLmJc", "tzcBh2hcWRs", "YyJIWVX5sg8", "NAzeTtWdRP4"] },
    { name: "AI Kids Cartoon", ids: ["b1mrpeXbUeU", "l-f3laQ-0cQ", "ho8A8rqQ7E8"] },
    { name: "Kuku Boy Videos", ids: ["DVjsIHpehqg", "mmXobB1oyk8", "Bqlppjzd_j0", "G5MPZoakvZc", "9wt2VTkDTs8", "shA5t-tUkd0", "9Bx5Ncix_yc", "3CkwKVI_5tw", "aWzf-atmbxY"] },
    { name: "AI Music Videos", ids: ["4i9OljtxDGI", "9nHYftnVh8w", "fCtlr_sU7dw", "q9rgQJPZut8", "co9CktsgTeA", "HEMJYxUS03A"] },
    { name: "Mahabharat AI Videos", ids: ["ovouArw5GYE", "o8v9Jnxfx6Q", "qJiFp9M8GCE"] }
];

const portfolioItems = [];
let idCounter = 1;

categoriesInfo.forEach((cat, catIdx) => {
    cat.ids.forEach((ytId, idx) => {
        portfolioItems.push({
            id: idCounter++,
            title: `${cat.name} Masterpiece ${String(idx + 1).padStart(2, '0')}`,
            category: cat.name,
            thumbnail: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`,
            youtubeId: ytId,
            featured: (idx === 0 && (catIdx === 0 || catIdx === 2 || catIdx === 3 || catIdx === 5)),
            year: "2026",
            technology: `${cat.name} • AI • Unreal Engine • Houdini`,
            overview: `A cinematic ${cat.name.toLowerCase()} visual experience combining character design, environmental storytelling and next-generation visual production.`
        });
    });
});

window.portfolioItems = portfolioItems; // Export for global usage if needed

// ----------------------------------------------------
// UI INITIALIZATION
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    renderHero();
    renderFeaturedSection();
    renderCategoriesFilter();
    renderShowcase("ALL");
    setupEventListeners();
    initIntersectionObservers();

    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';

            const name = document.getElementById('cf-name').value;
            const email = document.getElementById('cf-email').value;
            const company = document.getElementById('cf-company').value;
            const type = document.getElementById('cf-type').value;
            const message = document.getElementById('cf-message').value;

            // Using country code 91 for India based on number format
            const waText = encodeURIComponent(`*New Project Inquiry!*\n\n*Name:* ${name}\n*Email:* ${email}\n*Company/Brand:* ${company}\n*Project Type:* ${type}\n*Message:* ${message}`);
            const waUrl = `https://wa.me/918219941919?text=${waText}`;

            setTimeout(() => {
                window.open(waUrl, '_blank');
                btn.innerHTML = '<i class="fas fa-check"></i> Redirecting gently...';
                btn.classList.replace('bg-gray-900', 'bg-green-600');
                btn.classList.replace('hover:bg-blue-600', 'hover:bg-green-700');
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('bg-green-600', 'bg-gray-900');
                    btn.classList.replace('hover:bg-green-700', 'hover:bg-blue-600');
                }, 3000);
            }, 600);
        });
    }
});

function renderHero() {
    const heroWrapper = document.getElementById('hero-wrapper');
    if (!heroWrapper) return;

    const featuredItems = portfolioItems.filter(i => i.featured);

    featuredItems.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide relative w-full h-full bg-transparent flex items-center justify-center overflow-hidden';

        slide.innerHTML = `
            <!-- Content -->
            <div class="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end md:justify-center h-full pb-20 md:pb-0">
                <div class="flex items-center gap-4 mb-4 select-none">
                    <span class="text-blue-400 font-bold tracking-widest text-sm md:text-base">0${index + 1} / 0${featuredItems.length}</span>
                    <span class="w-12 h-[2px] bg-white/30"></span>
                    <span class="text-white font-semibold tracking-widest text-xs uppercase bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">${item.category}</span>
                </div>
                
                <h2 class="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 max-w-4xl drop-shadow-2xl select-none" style="letter-spacing: -0.02em;">
                    ${item.title.replace('Masterpiece', '<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Masterpiece</span>')}
                </h2>
                
                <p class="text-gray-200 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10 select-none drop-shadow-md">
                    Experience cinematic worlds created with advanced AI, 3D visualization and modern production techniques designed for global audiences.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 select-none">
                    <button class="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_10px_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 transform hover:-translate-y-1" onclick='window.openVideo("${item.youtubeId}")'>
                        <i class="fas fa-play"></i> Watch Project
                    </button>
                    <button class="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1" onclick='document.getElementById("showcase-section").scrollIntoView({behavior:"smooth"})'>
                        Explore Showcase <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        heroWrapper.appendChild(slide);
    });

    // Init Swiper
    new Swiper('.heroSwiper', {
        loop: true,
        autoplay: { delay: 6000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 1000
    });
}

function renderFeaturedSection() {
    const container = document.getElementById('featured-work-container');
    if (!container) return;

    // Pick first 5 items from different categories
    const items = [
        portfolioItems.find(i => i.category === "3D Animation"),
        portfolioItems.find(i => i.category === "AI Films"),
        portfolioItems.find(i => i.category === "Game Design"),
        portfolioItems.find(i => i.category === "AR / VR"),
        portfolioItems.find(i => i.category === "Visual Effects")
    ].filter(Boolean);

    let html = '';
    items.forEach(item => {
        html += `
        <div class="flex-none w-[85vw] sm:w-[400px] md:w-[480px] aspect-[16/10] relative rounded-3xl overflow-hidden cursor-pointer snap-center group premium-hover-lift bg-transparent border border-white/10" onclick='window.openProjectModal(${item.id})'>
            <img src="${item.thumbnail}" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="w-16 h-16 rounded-full bg-transparent/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-400 text-blue-600 shadow-2xl">
                    <i class="fas fa-play ml-1 text-2xl"></i>
                </div>
            </div>
            
            <div class="absolute bottom-6 left-6 right-6">
                <span class="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">${item.category}</span>
                <div class="flex justify-between items-end">
                    <div>
                        <h3 class="text-2xl font-black text-white leading-tight">${item.title}</h3>
                        <p class="text-gray-300 text-sm font-medium mt-1">${item.year} • Creative Production</p>
                    </div>
                    <div class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-transparent transition-colors">
                        <i class="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-300"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    container.innerHTML = html;
}

function renderCategoriesFilter() {
    const container = document.getElementById('showcase-filters');
    if (!container) return;
    const cats = ["ALL", ...categoriesInfo.map(c => c.name.toUpperCase())];

    let html = '';
    cats.forEach((c, i) => {
        const activeClass = i === 0 ? 'bg-blue-600 text-white shadow-md font-bold border-none' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-transparent font-semibold';
        html += `<button class="px-5 py-2.5 rounded-full text-xs md:text-sm whitespace-nowrap transition-all filter-btn snap-center flex-shrink-0 ${activeClass}" data-filter="${c}">${c}</button>`;
    });
    container.innerHTML = html;

    const btns = container.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btns.forEach(b => {
                b.className = 'px-5 py-2.5 rounded-full text-xs md:text-sm whitespace-nowrap transition-all filter-btn snap-center flex-shrink-0 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-transparent font-semibold';
            });
            e.target.className = 'px-5 py-2.5 rounded-full text-xs md:text-sm whitespace-nowrap transition-all filter-btn snap-center flex-shrink-0 bg-blue-600 text-white shadow-md font-bold px-6 border-none';

            const showcaseGrid = document.getElementById('showcase-grid');
            showcaseGrid.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => {
                renderShowcase(e.target.dataset.filter);
                showcaseGrid.classList.remove('opacity-0', 'translate-y-4');
            }, 300);
        });
    });
}

function renderShowcase(filter) {
    const grid = document.getElementById('showcase-grid');
    if (!grid) return;

    // Function to render an iframe video card
    const createCard = (item) => `
        <div class="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 bg-white">
            <div class="w-full aspect-video relative bg-gray-100">
                <iframe
                    src="https://www.youtube.com/embed/${item.youtubeId}"
                    title="${item.category} Video"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    class="absolute inset-0 w-full h-full border-none">
                </iframe>
            </div>
            <!-- Displaying the title below so the video container looks like a premium card -->
            <div class="p-4 bg-white relative z-0">
                <h4 class="text-sm font-bold text-gray-900 leading-snug line-clamp-1">${item.title}</h4>
            </div>
        </div>
    `;

    let html = '';

    if (filter === "ALL") {
        // Render each category as its own distinct section block
        categoriesInfo.forEach(cat => {
            const catItems = portfolioItems.filter(i => i.category === cat.name);
            if (catItems.length === 0) return;

            html += `
            <div class="mb-16 w-full">
                <div class="flex justify-between items-end mb-6 pr-4 border-b border-gray-100 pb-2">
                    <h3 class="text-2xl font-black text-[#111827] tracking-tight">${cat.name}</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    ${catItems.map(item => createCard(item)).join('')}
                </div>
            </div>
            `;
        });
    } else {
        // Standard grid for specific category filter
        const items = portfolioItems.filter(i => i.category.toUpperCase() === filter);

        if (items.length === 0) {
            grid.innerHTML = `<div class="col-span-full py-12 text-center text-[#64748B] font-medium text-lg">No projects found for this category.</div>`;
            return;
        }

        html += `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10 w-full mb-12">
            ${items.map(item => createCard(item)).join('')}
        </div>
        `;
    }

    grid.innerHTML = html;
}

// ----------------------------------------------------
// GLOBAL MODAL LOGIC (Project & Video)
// ----------------------------------------------------

window.openProjectModal = function (id) {
    const item = portfolioItems.find(i => i.id === Number(id));
    if (!item) return;

    const modal = document.getElementById('project-modal');

    // Populate data
    document.getElementById('pm-image').src = item.thumbnail;
    document.getElementById('pm-title').textContent = item.title;
    document.getElementById('pm-category').textContent = item.category;
    document.getElementById('pm-year').textContent = item.year;
    document.getElementById('pm-overview').textContent = item.overview;
    document.getElementById('pm-tech').textContent = item.technology;

    // Setup Play Button
    const playBtn = document.getElementById('pm-play-btn');
    playBtn.onclick = () => {
        closeProjectModal();
        setTimeout(() => {
            window.openVideo(item.youtubeId);
        }, 400);
    };

    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';

    // Animate inner
    setTimeout(() => {
        document.getElementById('project-modal-content').classList.remove('translate-y-full');
    }, 50);
}

window.closeProjectModal = function () {
    const modal = document.getElementById('project-modal');
    document.getElementById('project-modal-content').classList.add('translate-y-full');

    setTimeout(() => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
    }, 400);
}

window.openVideo = function (youtubeId) {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('youtube-player');

    player.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        document.getElementById('video-modal-content').classList.remove('scale-95', 'opacity-0');
        document.getElementById('video-modal-content').classList.add('scale-100', 'opacity-100');
    }, 50);
};

window.closeVideo = function () {
    const modal = document.getElementById('video-modal');
    const content = document.getElementById('video-modal-content');
    const player = document.getElementById('youtube-player');

    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    modal.classList.add('opacity-0', 'pointer-events-none');

    setTimeout(() => {
        player.src = "";
        document.body.style.overflow = '';
    }, 400);
};

// ----------------------------------------------------
// EVENT LISTENERS & UTILS
// ----------------------------------------------------

function setupEventListeners() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('bg-white/95', 'shadow-sm', 'border-b', 'border-white/15');
            header.classList.remove('bg-transparent', 'border-white/10', 'py-6');
            header.classList.add('py-4');
        } else {
            header.classList.remove('bg-white/95', 'shadow-sm', 'border-b', 'border-white/15');
            header.classList.add('bg-transparent', 'border-white/10', 'py-6');
            header.classList.remove('py-4');
        }
    });

    // Close Modals on background click
    document.getElementById('video-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('video-modal')) window.closeVideo();
    });
    document.getElementById('project-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('project-modal')) window.closeProjectModal();
    });

    // Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            const isMenuOpen = mobileNav.classList.contains('translate-x-0');
            if (isMenuOpen) {
                mobileNav.classList.replace('translate-x-0', 'translate-x-full');
                mobileBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
            } else {
                mobileNav.classList.replace('translate-x-full', 'translate-x-0');
                mobileBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
            }
        });

        mobileNav.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.replace('translate-x-0', 'translate-x-full');
                mobileBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
            });
        });
    }

    // Search Overlay
    const searchBtn = document.getElementById('search-btn');
    const closeSearchBtn = document.getElementById('close-search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('opacity-0', 'pointer-events-none');
            searchInput.focus();
            document.body.style.overflow = 'hidden';
        });

        closeSearchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('opacity-0', 'pointer-events-none');
            searchInput.value = '';
            searchResults.innerHTML = '';
            document.body.style.overflow = '';
        });

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) { searchResults.innerHTML = ''; return; }

            const results = portfolioItems.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            );

            if (results.length === 0) {
                searchResults.innerHTML = '<p class="text-[#64748B] col-span-full font-medium">No results found.</p>';
                return;
            }

            searchResults.innerHTML = results.map(item => `
                <div class="flex gap-4 items-center p-3 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100" onclick='searchOverlay.classList.add("opacity-0", "pointer-events-none"); document.body.style.overflow=""; window.openProjectModal(${item.id});'>
                    <img src="${item.thumbnail}" class="w-24 h-16 object-cover rounded-xl shadow-sm">
                    <div>
                        <h5 class="text-gray-900 font-bold text-sm leading-tight mb-1">${item.title}</h5>
                        <span class="text-[10px] text-blue-600 font-bold uppercase tracking-widest">${item.category}</span>
                    </div>
                </div>
            `).join('');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.getElementById(this.getAttribute('href').substring(1));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function initIntersectionObservers() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(el);
    });
}
