document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     SLIDER
  ========================= */
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const hero = document.querySelector(".hero");

  let currentIndex = 0;
  let sliderInterval = null;
  const sliderDelay = 4000;

  if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");

      if (i === 0) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        showSlide(i);
        restartSlider();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function showSlide(newIndex) {
      slides[currentIndex].classList.remove("active");
      dots[currentIndex].classList.remove("active");

      currentIndex = newIndex;

      slides[currentIndex].classList.add("active");
      dots[currentIndex].classList.add("active");
    }

    function nextSlide() {
      const newIndex = (currentIndex + 1) % slides.length;
      showSlide(newIndex);
    }

    function prevSlide() {
      const newIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    }

    function startSlider() {
      stopSlider();
      sliderInterval = setInterval(nextSlide, sliderDelay);
    }

    function stopSlider() {
      if (sliderInterval) {
        clearInterval(sliderInterval);
        sliderInterval = null;
      }
    }

    function restartSlider() {
      startSlider();
    }

    if (next) {
      next.addEventListener("click", () => {
        nextSlide();
        restartSlider();
      });
    }

    if (prev) {
      prev.addEventListener("click", () => {
        prevSlide();
        restartSlider();
      });
    }

    if (hero) {
      hero.addEventListener("mouseenter", stopSlider);
      hero.addEventListener("mouseleave", startSlider);
    }

    startSlider();
  }

  /* =========================
     IMAGE MODAL
  ========================= */
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".close");

 const clickableImages = document.querySelectorAll(
  ".gallery img, .service-gallery img, .equip-gallery img, .mao-card img, .parafusos-gallery img, .tanques-gallery img, .certificado-float, .clientes-grid img"
);

  function openModal(src, alt = "Imagem ampliada") {
    if (!modal || !modalImg) return;

    modal.style.display = "flex";
    modalImg.src = src;
    modalImg.alt = alt;
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
  }

  if (clickableImages.length > 0 && modal && modalImg) {
    clickableImages.forEach((img) => {
      img.addEventListener("click", () => {
        openModal(img.src, img.alt || "Imagem ampliada");
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") {
        closeModal();
      }
    });
  }

  /* =========================
     REVEAL SECTION
  ========================= */
  const revealElements = document.querySelectorAll(".reveal");

  function revealSections() {
    if (revealElements.length === 0) return;

    const windowHeight = window.innerHeight;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealSections);
  revealSections();

  /* =========================
     COUNTERS
  ========================= */
  const counters = document.querySelectorAll(".counter");
  const countersSection = document.querySelector(".sobre-numeros");
  let countersStarted = false;

  function startCounters() {
    if (countersStarted || counters.length === 0 || !countersSection) return;

    const sectionTop = countersSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 80) {
      counters.forEach((counter) => {
        counter.innerText = "0";

        const target = Number(counter.getAttribute("data-target")) || 0;
        const duration = 1800;
        const stepTime = 20;
        const totalSteps = Math.max(1, Math.floor(duration / stepTime));
        const increment = target / totalSteps;

        function updateCounter() {
          const current = Number(counter.innerText);

          if (current < target) {
            const nextValue = Math.ceil(current + increment);
            counter.innerText = String(nextValue > target ? target : nextValue);
            setTimeout(updateCounter, stepTime);
          } else {
            counter.innerText = `${target}+`;
          }
        }

        updateCounter();
      });

      countersStarted = true;
    }
  }

  window.addEventListener("scroll", startCounters);
  startCounters();

  /* =========================
     SCROLL SUAVE PARA MENU
  ========================= */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});


/*politicas modal*/
document.addEventListener("DOMContentLoaded", () => {
  const mvvCards = document.querySelectorAll(".mvv-card");
  const mvvModal = document.getElementById("mvvModal");
  const mvvModalImg = document.getElementById("mvvModalImg");
  const mvvModalBg = document.getElementById("mvvModalBg");
  const mvvModalTitle = document.getElementById("mvvModalTitle");
  const mvvModalText = document.getElementById("mvvModalText");
  const mvvModalClose = document.querySelector(".mvv-modal-close");

  if (mvvCards.length && mvvModal && mvvModalImg && mvvModalBg && mvvModalTitle && mvvModalText && mvvModalClose) {
    mvvCards.forEach(card => {
      card.addEventListener("click", () => {
        const title = card.getAttribute("data-title");
        const image = card.getAttribute("data-image");
        const text = card.getAttribute("data-text");

        mvvModalTitle.textContent = title;
        mvvModalImg.src = image;
        mvvModalImg.alt = title;
        mvvModalBg.style.backgroundImage = `url('${image}')`;
        mvvModalText.textContent = text;

        mvvModal.classList.add("active");
      });
    });

    mvvModalClose.addEventListener("click", () => {
      mvvModal.classList.remove("active");
    });

    mvvModal.addEventListener("click", (e) => {
      if (e.target === mvvModal) {
        mvvModal.classList.remove("active");
      }
    });
  }
});
