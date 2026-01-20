const carousel = document.querySelector(".carousel");
const cards = [...document.querySelectorAll(".card")];
const dots = [...document.querySelectorAll(".dot")];

let activeIndex = 2;

/* -----------------------------
   CORE UPDATE
----------------------------- */
function update() {
  cards.forEach((card, i) => {
    let offset = i - activeIndex;

    if (offset < -2) offset += cards.length;
    if (offset > 2) offset -= cards.length;

    card.classList.remove("pos0", "pos1", "pos2", "pos3", "pos4", "active");

    if (offset === -2) card.classList.add("pos0");
    if (offset === -1) card.classList.add("pos1");
    if (offset === 0) card.classList.add("pos2", "active");
    if (offset === 1) card.classList.add("pos3");
    if (offset === 2) card.classList.add("pos4");
  });

  dots.forEach((d, i) => d.classList.toggle("active", i === activeIndex));
  dots.forEach((dot, i) => {
    let d = i - activeIndex;
    if (d < -2) d += dots.length;
    if (d > 2) d -= dots.length;

    dot.classList.remove("d0", "d1", "d2");

    if (Math.abs(d) === 2) dot.classList.add("d0");
    if (Math.abs(d) === 1) dot.classList.add("d1");
    if (d === 0) dot.classList.add("d2");
  });

  updateVideos();
}
update();

/* -----------------------------
   CARD & DOT CLICK
----------------------------- */
cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    activeIndex = i;
    update();
  });
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    activeIndex = i;
    update();
  });
});

// ------------------- SELECT CARDS FROM SIDE PANEL -------------------
const panelCards = document.querySelectorAll(".panel-card");

panelCards.forEach((panelCard) => {
  panelCard.addEventListener("click", () => {
    const index = parseInt(panelCard.dataset.index);
    if (!isNaN(index)) {
      activeIndex = index;
      update();

      // Scroll page to projects section smoothly
      const projectsSection = document.querySelector("#projects");
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* -----------------------------
   VIDEO PREVIEWS
----------------------------- */
function updateVideos() {
  cards.forEach((card, i) => {
    const video = card.querySelector("video");
    if (!video) return;

    if (i === activeIndex) {
      video.play();
      video.style.opacity = 1;
    } else {
      video.pause();
      video.style.opacity = 0.3;
    }
  });
}

/* -----------------------------
   MOUSE PARALLAX
----------------------------- */
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / innerWidth - 0.5) * 20;
  const y = (e.clientY / innerHeight - 0.5) * 14;
  carousel.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});

// ------------------- ALL SECTIONS FADE -------------------
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    const distance = scrollY + viewportHeight - sectionTop;
    const fadeStart = sectionHeight * 0.3;
    const fadeEnd = sectionHeight * 0.9;

    let opacity = (distance - fadeStart) / (fadeEnd - fadeStart);
    opacity = Math.max(0, Math.min(1, opacity));

    section.style.opacity = opacity;
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const boot = document.getElementById("booting");
  const linesContainer = document.getElementById("contact-lines");
  const lines = Array.from(linesContainer.children);

  boot.addEventListener("animationend", () => {
    boot.classList.add("finished");
  });

  function revealLines() {
    boot.style.display = "none";
    linesContainer.style.display = "block";

    lines.forEach((line, idx) => {
      setTimeout(() => {
        line.classList.add("fade-in");
      }, idx * 300);
    });
  }

  setTimeout(revealLines, 1400);
});
