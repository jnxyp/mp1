const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Navbar shrink on scroll

const navbar = $('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('shrink');
    } else {
        navbar.classList.remove('shrink');
    }
});

// Modal for portfolio items

const portfolioModal = $('#modal-portfolio');
const modalImage = $('#modal-portfolio-image');
const closeButton = $('#modal-portfolio-close-button');

closeButton.onclick = () => {
    portfolioModal.close();
};

$$('.portfolio-item').forEach(item => {
    item.onclick = () => {
        const imgSrc = item.querySelector('img').src;
        modalImage.src = imgSrc;
        portfolioModal.showModal();
    };
});

window.onclick = (event) => {
    if (event.target === portfolioModal) {
        portfolioModal.close();
    }
};

// Reviews carousel auto-switch while not hovered

let reviewsCarouselAutoSwitch = true;

const reviewsCarousel = $('#reviews-carousel');
const carouselItems = $$('#reviews-carousel .carousel-item');

reviewsCarousel.addEventListener('mouseenter', () => {
    reviewsCarouselAutoSwitch = false;
});

reviewsCarousel.addEventListener('mouseleave', () => {
    reviewsCarouselAutoSwitch = true;
});

let currentReviewIndex = 0;

setInterval(() => {
    if (reviewsCarouselAutoSwitch) {
        currentReviewIndex = (currentReviewIndex + 1) % carouselItems.length;
        carouselItems[currentReviewIndex].scrollIntoView({ container: 'nearest'});
    }
}, 5000);

// Navbar active link highlighting

const navLinks = $$('.nav-item');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY;

    let activeIndex = 0;
    const sections = ['home', 'about', 'portfolio', 'join', 'reviews'];
    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section && scrollPosition >= section.offsetTop) {
            activeIndex = index;
        }
    });

    if ((window.innerHeight + window.scrollY) + 20 >= document.body.offsetHeight) {
        activeIndex = sections.length - 1;
    }

    navLinks.forEach((link, index) => {
        if (index === activeIndex) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);