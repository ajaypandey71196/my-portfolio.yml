// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector(".mobile-nav-toggle");
const menu = document.getElementById("mobileMenu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    toggle.classList.toggle("open");
  });
}

// Close mobile menu on link click
document.querySelectorAll(".mobile-nav-menu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.classList.remove("open");
  });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -60px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll(
  "section, .project-card, .skill-card, .about-card, .timeline-item, .cert-card, .contact-card"
).forEach((el, index) => {
  el.classList.add("fade-in");
  el.style.transitionDelay = `${Math.min(index * 0.05, 0.3)}s`;
  observer.observe(el);
});

// Copy email to clipboard
const emailElement = document.querySelector(".copy-email");
if (emailElement) {
  emailElement.style.cursor = "pointer";
  emailElement.title = "Click to copy email";

  emailElement.addEventListener("click", async () => {
    const email = emailElement.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      const originalText = emailElement.textContent;
      emailElement.textContent = "Copied to clipboard! ✓";
      emailElement.style.color = "var(--accent)";
      setTimeout(() => {
        emailElement.textContent = originalText;
        emailElement.style.color = "";
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback for browsers without clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  });
}

// Form validation and submission
const contactForm = document.querySelector("#contact form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showFormMessage("Please fill in all fields.", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormMessage("Please enter a valid email address.", "error");
      return;
    }

    // Create mailto link
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:ajay.pandey71196@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
    showFormMessage("Opening email client...", "success");
  });
}

function showFormMessage(message, type) {
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageEl = document.createElement("div");
  messageEl.className = `form-message form-message-${type}`;
  messageEl.textContent = message;
  contactForm.appendChild(messageEl);

  setTimeout(() => {
    messageEl.style.opacity = "0";
    setTimeout(() => messageEl.remove(), 300);
  }, 3000);
}

/* ============================================================
   PERFORMANCE: a single rAF-driven scroll handler
   Previously each feature (nav highlight, header shadow,
   scroll-to-top button, hero parallax) had its own "scroll"
   listener, and the nav-highlight one read layout properties
   (offsetTop/offsetHeight) on every single scroll event. That
   combination forces the browser to recompute layout dozens of
   times a second and is the main reason scrolling felt laggy.
   Now: one listener, one requestAnimationFrame per frame, and
   section offsets are measured once (and re-measured only on
   resize) instead of on every scroll tick.
   ============================================================ */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const scrollTopBtn = document.createElement("button");
const header = document.querySelector("header");
const heroCard = document.querySelector(".hero-card");

scrollTopBtn.innerHTML = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="m18 15-6-6-6 6"/>
  </svg>
`;
scrollTopBtn.className = "scroll-top-btn";
scrollTopBtn.setAttribute("aria-label", "Scroll to top");
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Cache each section's top offset so we don't touch layout during scroll
let sectionOffsets = [];
function measureSections() {
  sectionOffsets = Array.from(sections).map((section) => ({
    id: section.getAttribute("id"),
    top: section.offsetTop - 120,
    height: section.offsetHeight,
  }));
}
measureSections();

let resizeTimer;
window.addEventListener(
  "resize",
  () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measureSections, 200);
  },
  { passive: true }
);

let ticking = false;

function onScrollFrame() {
  const scrollY = window.scrollY;

  // Active nav link
  for (const s of sectionOffsets) {
    if (scrollY > s.top && scrollY <= s.top + s.height) {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${s.id}`;
        link.classList.toggle("active", isActive);
      });
      break;
    }
  }

  // Header shadow
  header.style.boxShadow =
    scrollY > 50 ? "0 10px 40px rgba(2, 6, 23, 0.5)" : "none";

  // Scroll-to-top button visibility
  if (scrollY > 400) {
    scrollTopBtn.style.opacity = "1";
    scrollTopBtn.style.visibility = "visible";
  } else {
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.visibility = "hidden";
  }

  // Hero parallax (desktop only, only while hero is on screen)
  if (heroCard && window.innerWidth > 900 && scrollY < 600) {
    heroCard.style.transform = `translateY(${scrollY * 0.04}px)`;
  }

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(onScrollFrame);
      ticking = true;
    }
  },
  { passive: true }
);

onScrollFrame(); // Initial call

// Magnetic tilt effect on hero card (desktop only), throttled with rAF
if (heroCard && window.matchMedia("(pointer: fine)").matches) {
  let tiltTicking = false;
  let lastEvent = null;

  heroCard.addEventListener(
    "mousemove",
    (e) => {
      lastEvent = e;
      if (!tiltTicking) {
        requestAnimationFrame(() => {
          const rect = heroCard.getBoundingClientRect();
          const x = lastEvent.clientX - rect.left;
          const y = lastEvent.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 30;
          const rotateY = (centerX - x) / 30;

          heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${window.scrollY * 0.04}px)`;
          tiltTicking = false;
        });
        tiltTicking = true;
      }
    },
    { passive: true }
  );

  heroCard.addEventListener("mouseleave", () => {
    heroCard.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(${window.scrollY * 0.04}px)`;
  });
}

/* ============================================================
   Profile photo upload
   Click the avatar in the hero card to choose a photo from your
   device. It's resized down and stored in this browser's
   localStorage (as base64), so it will keep showing next time
   you open the site on this device/browser. To swap it later,
   just click the avatar again and pick a new image.
   ============================================================ */
const avatarUpload = document.getElementById("avatarUpload");
const avatarInput = document.getElementById("avatarInput");
const avatarImg = document.getElementById("avatarImg");
const avatarFallback = document.getElementById("avatarFallback");
const AVATAR_STORAGE_KEY = "ajay-portfolio-avatar";

function showAvatar(dataUrl) {
  if (!avatarImg) return;
  avatarImg.src = dataUrl;
  avatarImg.style.display = "block";
  if (avatarFallback) avatarFallback.style.display = "none";
}

// Restore a previously-uploaded photo, if any
try {
  const savedAvatar = localStorage.getItem(AVATAR_STORAGE_KEY);
  if (savedAvatar) showAvatar(savedAvatar);
} catch (err) {
  console.warn("Could not read saved avatar:", err);
}

if (avatarUpload && avatarInput) {
  avatarUpload.addEventListener("click", () => avatarInput.click());

  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files && avatarInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file (JPG, PNG, WEBP, etc.).");
      return;
    }

    // Downscale to keep localStorage small and the page fast
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        const maxSize = 400;
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        showAvatar(dataUrl);

        try {
          localStorage.setItem(AVATAR_STORAGE_KEY, dataUrl);
        } catch (err) {
          console.warn("Could not save avatar (storage full?):", err);
        }
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
}
