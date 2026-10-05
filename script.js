/* ==========================================================================
   CHESTA SITORUS : PERSONAL PORTFOLIO INTERACTIVITY
   Functional Architecture: Theme Engine, Scroll Observation, Navigation, Contact Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Defaults to White / Light Mode)
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const sheetThemeToggleBtn = document.getElementById('sheetThemeToggleBtn');
  
  // Set default theme to light (per user preference for white theme)
  const savedTheme = localStorage.getItem('site-theme');
  const initialTheme = savedTheme ? savedTheme : (htmlElement.getAttribute('data-theme') || 'light');
  htmlElement.setAttribute('data-theme', initialTheme);

  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('site-theme', newTheme);
    showToast(`Mode tema diubah ke: ${newTheme === 'dark' ? 'Mode Gelap' : 'Mode Terang (Putih)'}`, 'info', 2500);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (sheetThemeToggleBtn) {
    sheetThemeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Check URL query parameters for FormSubmit success redirect
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('status') === 'success') {
    showToast('Pesan berhasil terkirim. Terima kasih atas pesan Anda!', 'success', 6000);
    window.history.replaceState({}, document.title, window.location.pathname + '#kontak');
  }

  // 2. Scroll Progress Bar & Navbar Scroll State
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const mainNavbar = document.querySelector('.navbar-wrapper');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');
  const mobileNavItems = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Reading progress bar
    if (scrollProgressBar && docHeight > 0) {
      const progressPercent = (scrollY / docHeight) * 100;
      scrollProgressBar.style.width = `${progressPercent}%`;
    }

    // Navbar shadow on scroll
    if (mainNavbar) {
      if (scrollY > 20) {
        mainNavbar.classList.add('scrolled');
      } else {
        mainNavbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy for Active Section
    let activeSectionId = '';
    const isMobile = window.innerWidth <= 768;
    const offset = isMobile ? 120 : 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        activeSectionId = section.getAttribute('id');
      }
    });

    if (!activeSectionId && sections.length > 0 && scrollY < 200) {
      activeSectionId = sections[0].getAttribute('id');
    }

    if (activeSectionId) {
      desktopNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSectionId}`) {
          link.classList.add('active');
        }
      });

      mobileNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${activeSectionId}` || item.getAttribute('data-section') === activeSectionId) {
          item.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Back to Top Action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Drawer / Sheet Logic
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileSheet = document.getElementById('mobileSheet');
  const mobileSheetBackdrop = document.getElementById('mobileSheetBackdrop');
  const mobileSheetCloseBtn = document.getElementById('mobileSheetCloseBtn');

  function openMobileSheet() {
    if (!mobileSheet) return;
    mobileSheet.classList.add('open');
    if (mobileSheetBackdrop) mobileSheetBackdrop.classList.add('open');
    if (mobileMenuToggle) {
      mobileMenuToggle.classList.add('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileSheet() {
    if (!mobileSheet) return;
    mobileSheet.classList.remove('open');
    if (mobileSheetBackdrop) mobileSheetBackdrop.classList.remove('open');
    if (mobileMenuToggle) {
      mobileMenuToggle.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      if (mobileSheet && mobileSheet.classList.contains('open')) {
        closeMobileSheet();
      } else {
        openMobileSheet();
      }
    });
  }

  if (mobileSheetCloseBtn) mobileSheetCloseBtn.addEventListener('click', closeMobileSheet);
  if (mobileSheetBackdrop) mobileSheetBackdrop.addEventListener('click', closeMobileSheet);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileSheet && mobileSheet.classList.contains('open')) {
      closeMobileSheet();
    }
  });

  // Mobile Bottom Nav Smooth Scroll
  mobileNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetHref = item.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        const targetSection = document.getElementById(targetHref.substring(1));
        if (targetSection) {
          e.preventDefault();
          const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
          closeMobileSheet();
        }
      }
    });
  });

  // 4. Contact Form Validation & Submission
  const contactForm = document.getElementById('contactForm');
  const userNameInput = document.getElementById('userName');
  const userEmailInput = document.getElementById('userEmail');
  const userSubjectInput = document.getElementById('userSubject');
  const userMessageInput = document.getElementById('userMessage');
  const submitBtn = document.getElementById('submitFormBtn');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (userNameInput) {
    userNameInput.addEventListener('input', () => {
      userNameInput.classList.remove('input-error');
      if (nameError) nameError.classList.remove('visible');
    });
  }

  if (userEmailInput) {
    userEmailInput.addEventListener('input', () => {
      userEmailInput.classList.remove('input-error');
      if (emailError) emailError.classList.remove('visible');
    });
  }

  if (userMessageInput) {
    userMessageInput.addEventListener('input', () => {
      userMessageInput.classList.remove('input-error');
      if (messageError) messageError.classList.remove('visible');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      const name = userNameInput ? userNameInput.value.trim() : '';
      const email = userEmailInput ? userEmailInput.value.trim() : '';
      const subject = userSubjectInput && userSubjectInput.value.trim()
        ? userSubjectInput.value.trim()
        : `Pesan Portofolio dari ${name}`;
      const message = userMessageInput ? userMessageInput.value.trim() : '';

      if (!name) {
        if (userNameInput) userNameInput.classList.add('input-error');
        if (nameError) nameError.classList.add('visible');
        isValid = false;
      }

      if (!email || !validateEmail(email)) {
        if (userEmailInput) userEmailInput.classList.add('input-error');
        if (emailError) emailError.classList.add('visible');
        isValid = false;
      }

      if (!message || message.length < 10) {
        if (userMessageInput) userMessageInput.classList.add('input-error');
        if (messageError) messageError.classList.add('visible');
        isValid = false;
      }

      if (!isValid) {
        showToast('Mohon lengkapi formulir dengan informasi yang valid.', 'info', 3000);
        return;
      }

      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      // Check protocol: if file://, guide to web server
      if (window.location.protocol === 'file:') {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
        showToast('FormSubmit membutuhkan web server lokal (http://localhost:3000).', 'info', 5000);
        return;
      }

      // Configure redirect URL if native submit occurs
      const nextUrlInput = document.getElementById('formNextUrl');
      if (nextUrlInput && window.location.href.startsWith('http')) {
        nextUrlInput.value = window.location.origin + window.location.pathname + '?status=success#kontak';
      }

      // Try AJAX FormSubmit first
      try {
        const response = await fetch('https://formsubmit.co/ajax/u.coba1108@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: subject,
            message: message,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const result = await response.json();

        if (response.ok && (result.success === true || result.success === 'true')) {
          contactForm.reset();
          if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
          }
          showToast('Pesan Anda berhasil dikirim. Terima kasih!', 'success', 6000);
          return;
        } else if (result.message && result.message.toLowerCase().includes('activation')) {
          if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
          }
          showToast('Email aktivasi form telah dikirim oleh FormSubmit. Silakan cek inbox/spam email tujuan.', 'info', 8000);
          return;
        }
      } catch (err) {
        console.warn('Pengiriman AJAX menemui kendala, melanjutkan via submit standar:', err);
      }

      // Native fallback
      contactForm.submit();
    });
  }

  // Direct Email Card Click Notification
  const directEmailCard = document.getElementById('directEmailCard');
  if (directEmailCard) {
    directEmailCard.addEventListener('click', () => {
      showToast('Membuka tautan email ke chestamahardikafadillasitorus@gmail.com', 'info', 2500);
    });
  }
});

// Toast notification helper
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');

  const iconText = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `
    <span style="font-weight: 700; color: ${type === 'success' ? '#10b981' : 'var(--accent-primary)'};">${iconText}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 350);
  }, duration);
}
