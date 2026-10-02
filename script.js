document.addEventListener('DOMContentLoaded', () => {
  const projectsData = {
    finvault: {
      title: "FinVault - Crypto & Asset Analytics Platform",
      category: "Web Application / FinTech",
      image: "assets/images/project-fintech.svg",
      description: "FinVault adalah platform dashboard analitik keuangan mutakhir yang menggabungkan pelacakan portofolio multi-aset dan visualisasi yield kripto secara real-time. Dirancang dengan UI gelap futuristik yang mengutamakan kecepatan akses data dan kejernihan grafik visual.",
      features: [
        "Visualisasi grafik interaktif dengan canvas kustom dan interpolasi Bezier",
        "Pemantauan transaksi multi-protokol dengan status instan",
        "Kalkulator imbal hasil persentase bulanan & tahunan secara dinamis",
        "Layout modular berbasis CSS Grid yang responsif di segala ukuran layar"
      ],
      technologies: ["JavaScript ES6+", "HTML5 Semantik", "Vanilla CSS3", "Chart Engine", "Local Storage API"],
      demoUrl: "https://example.com/demo/finvault",
      githubUrl: "https://github.com/chevanaura/finvault"
    },
    kickz: {
      title: "KICKZ Store - Modern Sneaker E-Commerce",
      category: "E-Commerce Experience",
      image: "assets/images/project-ecommerce.svg",
      description: "Platform toko daring generasi terbaru untuk produk sneakers edisi terbatas dan streetwear. Fokus utama diarahkan pada transisi interaksi yang mulus, feedback instan saat memilih ukuran, dan alur checkout yang bersih tanpa friksi.",
      features: [
        "Sistem pemilihan ukuran (size selector) dengan validasi stok instan",
        "Interaksi keranjang belanja dinamis berbasis DOM manipulation tanpa reload",
        "Aksen pencahayaan produk dengan efek hover elevasi 3D",
        "Tampilan adaptif ramah smartphone dengan sentuhan gesture alami"
      ],
      technologies: ["HTML5", "CSS Flexbox & Variables", "JavaScript DOM", "Micro-Animations"],
      demoUrl: "https://example.com/demo/kickz",
      githubUrl: "https://github.com/chevanaura/kickz-store"
    },
    synapse: {
      title: "Synapse - Generative AI Studio Platform",
      category: "SaaS / Artificial Intelligence",
      image: "assets/images/project-ai-platform.svg",
      description: "Synapse adalah konsep dashboard studio kecerdasan buatan terpadu yang memungkinkan kreator merangkai prompt pipeline, menguji model inferensi dengan latensi rendah, serta memvisualisasikan bobot neural network secara langsung di browser.",
      features: [
        "Prompt workflow pipeline berbasis node dengan preview real-time",
        "Simulasi output terminal cerdas dengan streaming teks asinkron",
        "Mode visualizer bobot neural network interaktif",
        "Tema antarmuka modern yang estetik dengan glassmorphism interaktif"
      ],
      technologies: ["Async JavaScript", "REST API Integration", "CSS Glassmorphism", "SVG Animation"],
      demoUrl: "https://example.com/demo/synapse",
      githubUrl: "https://github.com/chevanaura/synapse-ai"
    },
    zenpulse: {
      title: "ZenPulse - Health & Activity Mobile Tracker",
      category: "Mobile UI / Health Tech",
      image: "assets/images/project-mobile.svg",
      description: "Desain dan prototipe aplikasi kesehatan modern yang berfokus pada kesejahteraan holistik: pelacakan langkah kaki, hidrasi cairan harian, serta ringkasan aktivitas olahraga pagi dengan indikator lingkaran progres SVG dinamis.",
      features: [
        "Animasi cincin progres melingkar menggunakan kalkulasi stroke-dashoffset SVG",
        "Checklist aktivitas harian interaktif dengan feedback status selesai",
        "Kartu metrik kesehatan dengan palet warna teal dan cyan yang menyegarkan",
        "Navigasi ergonomis satu tangan yang dioptimalkan untuk mobile browser"
      ],
      technologies: ["Mobile-First CSS", "SVG Dashoffset Math", "Touch Interactions", "Clean Architecture"],
      demoUrl: "https://example.com/demo/zenpulse",
      githubUrl: "https://github.com/chevanaura/zenpulse"
    }
  };

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('site-theme');
  const initialTheme = savedTheme ? savedTheme : 'light';
  htmlElement.setAttribute('data-theme', initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('site-theme', newTheme);
    showToast(`Mode tema diubah ke: ${newTheme === 'dark' ? '🌙 Gelap' : '☀️ Terang'}`, 'info', 2500);
  });

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('status') === 'success') {
    showToast('🎉 Pesan berhasil terkirim kepada Admin, Terima kasih.', 'success', 6000);
    window.history.replaceState({}, document.title, window.location.pathname + '#kontak');
  }

  const typewriterElement = document.getElementById('typewriterText');
  const roles = [
    "Frontend Developer",
    "BackEnd Developer",
    "CyberSecurity Enthusiast",
    "Creative Problem Solver"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeWriter() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeWriter, typingSpeed);
  }

  typeWriter();
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const mainNavbar = document.querySelector('.navbar-wrapper');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (docHeight > 0) {
      const progressPercent = (scrollY / docHeight) * 100;
      scrollProgressBar.style.width = `${progressPercent}%`;
    }

    if (scrollY > 30) {
      mainNavbar.classList.add('scrolled');
    } else {
      mainNavbar.classList.remove('scrolled');
    }

    if (scrollY > 380) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    let currentSectionId = '';
    const isMobile = window.innerWidth <= 768;
    const headerOffset = isMobile ? 160 : 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerOffset;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (!currentSectionId && sections.length > 0 && scrollY < 200) {
      currentSectionId = sections[0].getAttribute('id');
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    const mobileNavItems = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item');
    mobileNavItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSectionId}` || item.getAttribute('data-section') === currentSectionId) {
        item.classList.add('active');
      }
    });
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Mobile Bottom Navigation Click Handling with Smooth Scroll
  const mobileNavItems = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item');
  mobileNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetHref = item.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        const targetSection = document.getElementById(targetHref.substring(1));
        if (targetSection) {
          e.preventDefault();
          mobileNavItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          const isMobile = window.innerWidth <= 768;
          const topGap = isMobile ? 65 : 85;
          const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - topGap;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Mobile Quick Action Sheet / Drawer Logic
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinksList = document.getElementById('navLinks');
  const mobileSheet = document.getElementById('mobileSheet');
  const mobileSheetBackdrop = document.getElementById('mobileSheetBackdrop');
  const mobileSheetCloseBtn = document.getElementById('mobileSheetCloseBtn');
  const sheetThemeToggleBtn = document.getElementById('sheetThemeToggleBtn');

  function openMobileSheet() {
    if (!mobileSheet) return;
    mobileSheet.classList.add('open');
    if (mobileSheetBackdrop) mobileSheetBackdrop.classList.add('open');
    mobileMenuToggle.classList.add('active');
    mobileSheet.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileSheet() {
    if (!mobileSheet) return;
    mobileSheet.classList.remove('open');
    if (mobileSheetBackdrop) mobileSheetBackdrop.classList.remove('open');
    mobileMenuToggle.classList.remove('active');
    mobileSheet.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  mobileMenuToggle.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      if (mobileSheet && mobileSheet.classList.contains('open')) {
        closeMobileSheet();
      } else {
        openMobileSheet();
      }
    } else {
      mobileMenuToggle.classList.toggle('active');
      navLinksList.classList.toggle('open');
    }
  });

  if (mobileSheetCloseBtn) mobileSheetCloseBtn.addEventListener('click', closeMobileSheet);
  if (mobileSheetBackdrop) mobileSheetBackdrop.addEventListener('click', closeMobileSheet);

  if (sheetThemeToggleBtn) {
    sheetThemeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('site-theme', newTheme);
      showToast(`Mode tema diubah ke: ${newTheme === 'dark' ? '🌙 Gelap' : '☀️ Terang'}`, 'info', 2500);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navLinksList.classList.remove('open');
      closeMobileSheet();
    });
  });

  document.addEventListener('click', (e) => {
    if (!mainNavbar.contains(e.target) && navLinksList.classList.contains('open')) {
      mobileMenuToggle.classList.remove('active');
      navLinksList.classList.remove('open');
    }
  });

  // Desktop Spotlight Glow & 3D Tilt Micro-interactions
  const cursorGlow = document.getElementById('desktopCursorGlow');
  if (cursorGlow && window.matchMedia('(hover: hover) and (min-width: 769px)').matches) {
    let mouseX = -500, mouseY = -500;
    let currentX = -500, currentY = -500;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });

    function animateCursorGlow() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateCursorGlow);
    }
    animateCursorGlow();

    // 3D Avatar Tilt on Desktop
    const avatarCard = document.querySelector('.avatar-card');
    const heroVisual = document.querySelector('.hero-visual');
    if (avatarCard && heroVisual) {
      heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 14;
        const rotateY = (x / rect.width) * 14;
        avatarCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      heroVisual.addEventListener('mouseleave', () => {
        avatarCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    }
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  const modalBackdrop = document.getElementById('projectModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');
  const viewProjectButtons = document.querySelectorAll('.view-project-btn');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-preview-img">
      <div class="modal-header-meta">
        <span class="category-badge">${data.category}</span>
      </div>
      <h2 id="modalTitle" style="font-size: 1.8rem; margin-bottom: 0.8rem;">${data.title}</h2>
      <p style="color: var(--text-secondary); margin-bottom: 1.4rem;">${data.description}</p>
      
      <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem; color: var(--text-primary);">Fitur Utama &amp; Arsitektur:</h4>
      <ul style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.4rem;">
        ${data.features.map(feat => `
          <li style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.92rem; color: var(--text-secondary);">
            <span style="color: #10b981; font-weight: bold;">✓</span> ${feat}
          </li>
        `).join('')}
      </ul>

      <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem; color: var(--text-primary);">Teknologi yang Digunakan:</h4>
      <div class="modal-tech-list">
        ${data.technologies.map(tech => `<span class="p-tag">${tech}</span>`).join('')}
      </div>

      <div class="modal-actions">
        <button class="btn btn-primary" onclick="showDemoToast('Demo Langsung: ${data.title}')">
          <span>Kunjungi Live Demo</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </button>
        <button class="btn btn-outline" onclick="showDemoToast('Repositori GitHub: ${data.title}')">
          <span>Kode Sumber</span>
        </button>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  viewProjectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  modalCloseBtn.addEventListener('click', closeProjectModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeProjectModal();
    }
  });

  const statCards = document.querySelectorAll('.stat-card');
  let countersAnimated = false;

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;

        statCards.forEach(card => {
          const target = parseInt(card.getAttribute('data-target'), 10);
          const counterEl = card.querySelector('.counter');
          let current = 0;
          const duration = 1600; // ms
          const stepTime = Math.max(15, Math.floor(duration / target));

          const timer = setInterval(() => {
            const increment = Math.ceil(target / (duration / 25));
            current += increment;

            if (current >= target) {
              counterEl.textContent = target.toLocaleString('id-ID');
              clearInterval(timer);
            } else {
              counterEl.textContent = current.toLocaleString('id-ID');
            }
          }, stepTime);
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const aboutSection = document.getElementById('tentang');
  if (aboutSection) {
    statsObserver.observe(aboutSection);
  }

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

  userNameInput.addEventListener('input', () => {
    userNameInput.classList.remove('input-error');
    nameError.classList.remove('visible');
  });

  userEmailInput.addEventListener('input', () => {
    userEmailInput.classList.remove('input-error');
    emailError.classList.remove('visible');
  });

  userMessageInput.addEventListener('input', () => {
    userMessageInput.classList.remove('input-error');
    messageError.classList.remove('visible');
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    const name = userNameInput.value.trim();
    const email = userEmailInput.value.trim();
    const subject = userSubjectInput && userSubjectInput.value.trim()
      ? userSubjectInput.value.trim()
      : `Pesan Portofolio dari ${name}`;
    const message = userMessageInput.value.trim();

    if (!name) {
      userNameInput.classList.add('input-error');
      nameError.classList.add('visible');
      isValid = false;
    }

    if (!email || !validateEmail(email)) {
      userEmailInput.classList.add('input-error');
      emailError.classList.add('visible');
      isValid = false;
    }

    if (!message || message.length < 10) {
      userMessageInput.classList.add('input-error');
      messageError.classList.add('visible');
      isValid = false;
    }

    if (!isValid) {
      showToast('Mohon lengkapi formulir dengan data yang valid.', 'info', 3000);
      return;
    }

    if (window.location.protocol === 'file:') {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      showToast('⚠️ FormSubmit mewajibkan web server (bukan file:///). Mengalihkan ke http://localhost:3000...', 'info', 6000);
      setTimeout(() => {
        window.location.href = 'http://localhost:3000/#kontak';
      }, 1500);
      return;
    }

    // Atur URL pengalihan kembali ke portofolio jika menggunakan http/https
    const nextUrlInput = document.getElementById('formNextUrl');
    if (nextUrlInput && window.location.href.startsWith('http')) {
      nextUrlInput.value = window.location.origin + window.location.pathname + '?status=success#kontak';
    }

    // Jika berjalan via HTTP/HTTPS, coba kirim via AJAX FormSubmit terlebih dahulu
    if (window.location.protocol.startsWith('http')) {
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
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          showToast('🎉 Pesan berhasil terkirim kepada Admin, Terima kasih.', 'success', 6000);
          return;
        } else if (result.message && result.message.toLowerCase().includes('activation')) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          showToast('📩 FormSubmit telah mengirim email aktivasi ke u.coba1108@gmail.com. Silakan buka Gmail (cek Inbox/Spam) dan klik tombol "Activate Form" sekali saja!', 'info', 10000);
          return;
        }
      } catch (err) {
        console.warn('AJAX FormSubmit mengalami kendala, meneruskan ke native submit FormSubmit:', err);
      }
    }

    // Jika native fallback diperlukan:
    showToast('Meneruskan pesan ke FormSubmit...', 'info', 2500);
    contactForm.submit();
  });

  const directEmailCard = document.getElementById('directEmailCard');
  if (directEmailCard) {
    directEmailCard.addEventListener('click', () => {
      showToast('📬 Membuka tab Gmail ke chestamahardikafadillasitorus@gmail.com...', 'info', 3000);
    });
  }

});

function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `
    <span style="font-weight: bold; color: ${type === 'success' ? '#10b981' : '#06b6d4'};">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, duration);
}

function showDemoToast(projectName) {
  showToast(`Simulasi navigasi: Membuka link untuk "${projectName}".`, 'info', 3000);
}
