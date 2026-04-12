// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector(".mobile-nav-toggle");
const menu = document.getElementById("mobileMenu");

if (toggle) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

// Close mobile menu on link click
document.querySelectorAll(".mobile-nav-menu .nav-link").forEach((link) => {
  link.addEventListener("click", () => menu.classList.remove("open"));
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
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-visible");
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll("section, .project-card, .skill-card, .about-card, .timeline-item").forEach((el) => {
  el.classList.add("fade-in");
  observer.observe(el);
});

// Copy email to clipboard
const emailElement = document.querySelector(".contact-row .value");
if (emailElement && emailElement.textContent.includes("@")) {
  emailElement.style.cursor = "pointer";
  emailElement.title = "Click to copy email";
  emailElement.addEventListener("click", async () => {
    const email = emailElement.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      const originalText = emailElement.textContent;
      emailElement.textContent = "Email copied! ✓";
      emailElement.style.color = "var(--accent)";
      setTimeout(() => {
        emailElement.textContent = originalText;
        emailElement.style.color = "";
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
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

// Add active nav link highlighting on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function highlightNav() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNav);
highlightNav(); // Initial call

// Scroll to top button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerHTML = "↑";
scrollTopBtn.className = "scroll-top-btn";
scrollTopBtn.setAttribute("aria-label", "Scroll to top");
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  border: 1px solid rgba(56, 189, 248, 0.5);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.2s ease;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
`;
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.opacity = "1";
    scrollTopBtn.style.visibility = "visible";
  } else {
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.visibility = "hidden";
  }
});

scrollTopBtn.addEventListener("mouseenter", () => {
  scrollTopBtn.style.transform = "translateY(-2px) scale(1.05)";
});

scrollTopBtn.addEventListener("mouseleave", () => {
  scrollTopBtn.style.transform = "translateY(0) scale(1)";
});

// Add subtle parallax effect to hero card (only on desktop)
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const heroCard = document.querySelector(".hero-card");
  if (heroCard && window.innerWidth > 900) {
    const scrolled = window.pageYOffset;
    if (scrolled < 500) {
      const rate = scrolled * 0.05;
      heroCard.style.transform = `translateY(${rate}px)`;
    }
  }
}, { passive: true });

// Add hover effect to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-4px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});
