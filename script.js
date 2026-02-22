
lucide.createIcons();


const mobileBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('translate-x-full');
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('overflow-hidden');
}

mobileBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});


async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        const grid = document.getElementById('gallery-grid');

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card group relative bg-gray-900 aspect-[4/3] cursor-pointer rounded-sm overflow-hidden';
            
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover opacity-90 group-hover:opacity-100">
                <div class="project-overlay absolute inset-0 flex flex-col justify-end p-6">
                    <span class="text-gold-400 text-xs font-bold tracking-wider uppercase mb-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">${project.category}</span>
                    <h3 class="text-white font-serif text-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-200">${project.title}</h3>
                    <p class="text-gray-300 text-sm mt-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-300">${project.description}</p>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

loadProjects();


document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);


    gsap.to("#hero-content", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
    });


    ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
            const nav = document.getElementById('navbar');
            if (self.direction === 1) { // scrolling down
               nav.classList.add('shadow-md');
               nav.classList.remove('py-4');
               nav.classList.add('py-2');
            } else if (self.scroll() < 50) { // at top
               nav.classList.remove('shadow-md');
               nav.classList.add('py-4');
               nav.classList.remove('py-2');
            }
        }
    });


    gsap.to(".about-img-container", {
        scrollTrigger: {
            trigger: "#sobre",
            start: "top 80%",
        },
        opacity: 1,
        duration: 1,
        x: 0,
        ease: "power2.out"
    });

    gsap.to(".about-text-container", {
        scrollTrigger: {
            trigger: "#sobre",
            start: "top 80%",
        },
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power2.out"
    });


    gsap.utils.toArray(".service-card").forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: "#servicos",
                start: "top 75%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "back.out(1.7)"
        });
    });


    gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: "#depoimentos",
                start: "top 80%",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power2.out"
        });
    });

});
