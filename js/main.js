/**
 * Down Fattna Eco Villa - Deniyaya, Sri Lanka
 * Main Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or clicking any link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // 2. Sticky Glassmorphism Header & Scrollspy
  const siteHeader = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    const sectionNavMap = {
      'home': '#home',
      'about': '#about',
      'amenities': '#about',
      'rooms': '#rooms',
      'dining': '#dining',
      'experiences': '#dining',
      'gallery': '#gallery',
      'booking': '#contact',
      'reviews': '#about',
      'location': '#contact',
      'faq': '#contact',
      'contact': '#contact'
    };

    if (currentSection) {
      const targetNavHref = sectionNavMap[currentSection] || `#${currentSection}`;
      allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetNavHref) {
          link.classList.add('active');
        }
      });
    }
  });

  // Dining Pavilion Thumbnail switcher
  const diningThumbs = document.querySelectorAll('.dining-thumb');
  const diningMainImg = document.getElementById('diningMainImg');
  if (diningThumbs.length && diningMainImg) {
    diningThumbs[0].classList.add('active');
    diningThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        diningThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const img = thumb.querySelector('img');
        if (img) diningMainImg.src = img.src;
      });
    });
  }

  // 3. Set Default Booking Dates (Tomorrow to +3 days)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const departure = new Date(tomorrow);
  departure.setDate(departure.getDate() + 2);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const checkinInput = document.getElementById('calcCheckin');
  const checkoutInput = document.getElementById('calcCheckout');
  const heroCheckin = document.getElementById('heroCheckin');
  const heroCheckout = document.getElementById('heroCheckout');

  if (checkinInput && checkoutInput) {
    const tomorrowStr = formatDate(tomorrow);
    const departureStr = formatDate(departure);

    checkinInput.min = formatDate(today);
    checkinInput.value = tomorrowStr;
    checkoutInput.min = tomorrowStr;
    checkoutInput.value = departureStr;

    if (heroCheckin && heroCheckout) {
      heroCheckin.min = formatDate(today);
      heroCheckin.value = tomorrowStr;
      heroCheckout.min = tomorrowStr;
      heroCheckout.value = departureStr;
    }
  }

  // Sync Hero Booking Bar to Calculator
  const heroBookingBtn = document.getElementById('heroBookingBtn');
  if (heroBookingBtn) {
    heroBookingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (heroCheckin && checkinInput) checkinInput.value = heroCheckin.value;
      if (heroCheckout && checkoutInput) checkoutInput.value = heroCheckout.value;

      const heroRoom = document.getElementById('heroRoomType');
      const calcRoom = document.getElementById('calcRoomType');
      if (heroRoom && calcRoom) calcRoom.value = heroRoom.value;

      const heroGuests = document.getElementById('heroGuests');
      const calcGuests = document.getElementById('calcGuests');
      if (heroGuests && calcGuests) calcGuests.value = heroGuests.value;

      updateBookingCalculator();

      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 4. Live Booking Price Calculator & WhatsApp Link Generator
  const roomRates = {
    'cabana':  { name: 'Cabana', price: 18 },
    'house-1': { name: 'House 1', price: 25 },
    'house-2': { name: 'House 2', price: 25 }
  };

  const calcRoomType = document.getElementById('calcRoomType');
  const calcGuests = document.getElementById('calcGuests');
  const addonTrek = document.getElementById('addonTrek');
  const addonRock = document.getElementById('addonRock');
  const addonBbq = document.getElementById('addonBbq');
  const addonJbl = document.getElementById('addonJbl');
  const addonTransfer = document.getElementById('addonTransfer');

  // Summary Elements
  const summaryRoomName = document.getElementById('summaryRoomName');
  const summaryNights = document.getElementById('summaryNights');
  const summaryRoomRate = document.getElementById('summaryRoomRate');
  const summaryAddonsTotal = document.getElementById('summaryAddonsTotal');
  const summaryTotal = document.getElementById('summaryTotal');
  const whatsappReserveBtn = document.getElementById('whatsappReserveBtn');

  function calculateNights(start, end) {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diffTime = d2 - d1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }

  function updateBookingCalculator() {
    if (!calcRoomType || !checkinInput || !checkoutInput) return;

    const selectedRoomKey = calcRoomType.value;
    const room = roomRates[selectedRoomKey] || roomRates['cabana'];

    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const nights = calculateNights(checkin, checkout);

    const roomSubtotal = room.price * nights;

    // Addons calculation
    let addonsTotal = 0;
    const selectedAddonNames = [];

    if (addonTrek && addonTrek.checked) {
      addonsTotal += 25;
      selectedAddonNames.push('Sinharaja Rainforest Trek ($25)');
    }
    if (addonRock && addonRock.checked) {
      addonsTotal += 15;
      selectedAddonNames.push('Patna Rock Adventure ($15)');
    }
    if (addonBbq && addonBbq.checked) {
      addonsTotal += 20;
      selectedAddonNames.push('Outdoor BBQ Grill Setup ($20)');
    }
    if (addonJbl && addonJbl.checked) {
      addonsTotal += 15;
      selectedAddonNames.push('JBL PartyBox Sound System ($15)');
    }
    if (addonTransfer && addonTransfer.checked) {
      addonsTotal += 60;
      selectedAddonNames.push('Airport Transfer ($60)');
    }

    const grandTotal = roomSubtotal + addonsTotal;

    // Update UI text
    if (summaryRoomName) summaryRoomName.textContent = room.name;
    if (summaryNights) summaryNights.textContent = `${nights} night${nights > 1 ? 's' : ''}`;
    if (summaryRoomRate) summaryRoomRate.textContent = `$${roomSubtotal} ($${room.price}/night)`;
    if (summaryAddonsTotal) summaryAddonsTotal.textContent = `$${addonsTotal}`;
    if (summaryTotal) summaryTotal.textContent = `$${grandTotal} USD`;

    // Generate Direct WhatsApp Pre-filled message
    if (whatsappReserveBtn) {
      const guestsCount = calcGuests ? calcGuests.value : '2';
      const guestName = document.getElementById('calcName') ? document.getElementById('calcName').value : '';

      let message = `🌿 *Reservation Inquiry - Down Fattna Eco Villa* 🌿\n\n`;
      if (guestName) message += `*Guest Name:* ${guestName}\n`;
      message += `*Selected Room:* ${room.name}\n`;
      message += `*Dates:* ${checkin} to ${checkout} (${nights} night${nights > 1 ? 's' : ''})\n`;
      message += `*Guests:* ${guestsCount} person(s)\n`;

      if (selectedAddonNames.length > 0) {
        message += `*Add-ons requested:*\n- ${selectedAddonNames.join('\n- ')}\n`;
      }
      message += `*Estimated Total:* $${grandTotal} USD\n\n`;
      message += `Please confirm availability and booking procedure. Thank you!`;

      // Down Fattna Official WhatsApp number
      const phoneNumber = '94769103981'; // Host: +94 76 910 3981 / +94 76 095 1659
      whatsappReserveBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    }
  }

  // Add event listeners to all calculator inputs
  const calcInputs = [
    calcRoomType,
    checkinInput,
    checkoutInput,
    calcGuests,
    addonTrek,
    addonRock,
    addonBbq,
    addonJbl,
    addonTransfer
  ];

  calcInputs.forEach(input => {
    if (input) {
      input.addEventListener('change', updateBookingCalculator);
      input.addEventListener('input', updateBookingCalculator);
    }
  });

  const calcName = document.getElementById('calcName');
  if (calcName) calcName.addEventListener('input', updateBookingCalculator);

  // Initialize Calculator on load
  updateBookingCalculator();

  // "Select Room" button handler from Rooms section
  document.querySelectorAll('.select-room-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetRoom = btn.getAttribute('data-room');
      if (targetRoom && calcRoomType) {
        calcRoomType.value = targetRoom;
        updateBookingCalculator();
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 5. Gallery Filter & Lightbox Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  const activeImages = [];

  function collectVisibleImages() {
    activeImages.length = 0;
    galleryItems.forEach(item => {
      if (item.style.display !== 'none') {
        const img = item.querySelector('img');
        if (img) {
          activeImages.push({
            src: img.src,
            alt: img.alt || 'Down Fattna Eco Villa'
          });
        }
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      collectVisibleImages();
    });
  });

  collectVisibleImages();

  // Open Lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        currentGalleryIndex = activeImages.findIndex(i => i.src === img.src);
        if (currentGalleryIndex === -1) currentGalleryIndex = 0;
        lightboxImg.src = activeImages[currentGalleryIndex].src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function showLightboxImage(index) {
    if (activeImages.length === 0) return;
    if (index < 0) index = activeImages.length - 1;
    if (index >= activeImages.length) index = 0;
    currentGalleryIndex = index;
    lightboxImg.src = activeImages[currentGalleryIndex].src;
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentGalleryIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentGalleryIndex + 1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Keyboard controls for lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      } else if (e.key === 'ArrowLeft') {
        showLightboxImage(currentGalleryIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showLightboxImage(currentGalleryIndex + 1);
      }
    }
  });

  // 6. Testimonials Slider
  const testimonials = [
    {
      quote: "Staying at Down Fattna was the highlight of our Sri Lanka trip! Waking up to the mist rising above the tea hills and the sounds of Sinharaja rainforest was magical. The staff made us feel like family.",
      author: "Oliver & Sophie van der Meer",
      country: "Amsterdam, Netherlands",
      stars: "★★★★★"
    },
    {
      quote: "Patna Sliding Rock is just minutes away and was so much fun! The villa is exceptionally clean, peaceful, and the fresh organic Sri Lankan curries were simply unmatched.",
      author: "Ruwan Senanayake",
      country: "Colombo, Sri Lanka",
      stars: "★★★★★"
    },
    {
      quote: "If you want true eco-luxury away from crowded tourist spots, this is the hidden gem. Quiet verandas, pristine streams, and unforgettable hospitality.",
      author: "Elena Rostova",
      country: "Zurich, Switzerland",
      stars: "★★★★★"
    }
  ];

  let currentTestimonial = 0;
  const quoteElem = document.getElementById('testimonialQuote');
  const authorElem = document.getElementById('testimonialAuthor');
  const countryElem = document.getElementById('testimonialCountry');
  const dotsContainer = document.getElementById('testimonialDots');

  function renderTestimonial(index) {
    if (!quoteElem || !authorElem || !countryElem) return;
    const item = testimonials[index];
    quoteElem.textContent = `"${item.quote}"`;
    authorElem.textContent = item.author;
    countryElem.textContent = item.country;

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.control-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  }

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    testimonials.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `control-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Testimonial ${idx + 1}`);
      dot.addEventListener('click', () => {
        currentTestimonial = idx;
        renderTestimonial(currentTestimonial);
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Auto-advance testimonials every 6 seconds
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    renderTestimonial(currentTestimonial);
  }, 6500);

  // 7. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerBox = item.querySelector('.faq-answer');

    if (questionBtn && answerBox) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        });

        // Toggle clicked
        if (!isActive) {
          item.classList.add('active');
          answerBox.style.maxHeight = answerBox.scrollHeight + 'px';
        }
      });
    }
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    const firstAns = faqItems[0].querySelector('.faq-answer');
    faqItems[0].classList.add('active');
    if (firstAns) firstAns.style.maxHeight = firstAns.scrollHeight + 'px';
  }

  // 8. Animated Counter On Scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const animateCounters = () => {
    if (counted) return;
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      statNumbers.forEach(elem => {
        const target = parseInt(elem.getAttribute('data-target') || '0', 10);
        const suffix = elem.getAttribute('data-suffix') || '';
        let current = 0;
        const step = Math.ceil(target / 40);

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          elem.textContent = current + suffix;
        }, 30);
      });
      counted = true;
    }
  };

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // 9. Toast Notification Helper
  function showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // 10. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent. We will respond shortly.');
      contactForm.reset();
    });
  }

  // 11. Newsletter Form Submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Subscribed! Thank you for joining Down Fattna news.');
      newsletterForm.reset();
    });
  }

  // 12. Room Photo Slideshows
  document.querySelectorAll('.room-slideshow').forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slide');
    const dots   = slideshow.querySelectorAll('.dot');
    const prevBtn = slideshow.querySelector('.slide-prev');
    const nextBtn = slideshow.querySelector('.slide-next');

    if (slides.length <= 1) return; // single photo — nothing to slide

    let current = 0;
    let autoTimer = null;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 3500);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); resetAuto(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); resetAuto(); });
    });

    startAuto();
  });
});
