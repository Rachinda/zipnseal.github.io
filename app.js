/* ==========================================================================
   ZIP & SEAL - STREAMLINED INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Sticky Navbar & Mobile Navigation Drawer --- */
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const openMobileMenu = () => {
    if (navMenu) navMenu.classList.add('open');
    if (navOverlay) navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (navMenu) navMenu.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }

  document.querySelectorAll('.nav-link, .nav-phone-btn').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* --- 2. Multi-Image Full-Screen Hero Banner Carousel --- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.carousel-dots .dot');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');
  let currentHeroSlide = 0;
  let heroAutoPlayTimer;

  const showHeroSlide = (index) => {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentHeroSlide = index;
  };

  const nextHeroSlide = () => {
    const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(nextIndex);
  };

  const prevHeroSlide = () => {
    const prevIndex = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(prevIndex);
  };

  if (heroSlides.length > 0) {
    if (heroNext) heroNext.addEventListener('click', () => {
      nextHeroSlide();
      resetHeroAutoPlay();
    });

    if (heroPrev) heroPrev.addEventListener('click', () => {
      prevHeroSlide();
      resetHeroAutoPlay();
    });

    heroDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showHeroSlide(index);
        resetHeroAutoPlay();
      });
    });

    const startHeroAutoPlay = () => {
      heroAutoPlayTimer = setInterval(nextHeroSlide, 5000);
    };

    const resetHeroAutoPlay = () => {
      clearInterval(heroAutoPlayTimer);
      startHeroAutoPlay();
    };

    startHeroAutoPlay();
  }

  /* --- 3. Products Carousel / Slider --- */
  const productTrack = document.getElementById('productTrack');
  const prodPrev = document.getElementById('prodPrev');
  const prodNext = document.getElementById('prodNext');
  let currentProdIndex = 0;

  if (productTrack && prodPrev && prodNext) {
    const productCards = productTrack.querySelectorAll('.product-card');

    const updateProductSlider = () => {
      const cardWidth = productCards[0].offsetWidth + 32; // 32px is gap (2rem)
      const maxIndex = productCards.length - Math.floor(productTrack.parentElement.offsetWidth / cardWidth);
      const safeIndex = Math.max(0, Math.min(currentProdIndex, Math.max(0, maxIndex)));

      productTrack.style.transform = `translateX(-${safeIndex * cardWidth}px)`;
      currentProdIndex = safeIndex;
    };

    prodNext.addEventListener('click', () => {
      currentProdIndex++;
      updateProductSlider();
    });

    prodPrev.addEventListener('click', () => {
      if (currentProdIndex > 0) {
        currentProdIndex--;
        updateProductSlider();
      }
    });

    window.addEventListener('resize', updateProductSlider);
  }

  /* --- 4. Floating Scroll To Top Button --- */
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --- 5. Contact Form Submission Handler --- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="ri-loader-4-line spin"></i> Sending...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="ri-checkbox-circle-line"></i> Message Sent!`;
        submitBtn.style.background = 'linear-gradient(135deg, #06D6A0, #00F5D4)';

        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalHtml;
          submitBtn.style.background = '';
          alert('Thank you for contacting Zip & Seal! We have received your message and will respond within 2 hours.');
        }, 1500);
      }, 1200);
    });
  }

});
