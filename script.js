
// GOOGLE GENESIS CLUB - JAVASCRIPT

// Select all navigation links
const navLinks = document.querySelectorAll(".nav-link");

// Function to update the active link
function setActiveLink(activeLink) {

    navLinks.forEach((link) => {
        link.classList.remove("active");

        link.removeAttribute("aria-current");
    });

    activeLink.classList.add("active");
    activeLink.setAttribute("aria-current", "page");
}

// Add click events
navLinks.forEach((link) => {

    link.addEventListener("click", () => {
        setActiveLink(link);
    });

});

// Highlight the correct link when opening a URL
const currentHash = window.location.hash;

const matchingLink = Array.from(navLinks).find(
    (link) => link.getAttribute("href") === currentHash
);

if (matchingLink) {
    setActiveLink(matchingLink);
} else {
    setActiveLink(navLinks[0]);
}

// Confirmation message
console.log("GGC Website Loaded Successfully!");

/* =========================================
   GGC - CONTINUOUS SHALLOW WATER CAUSTICS
   ========================================= */

(() => {
    const canvas = document.getElementById("google-liquid");
    const hero = document.querySelector(".hero");

    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let width = 0;
    let height = 0;
    let animationId = null;
    let startTime = null;

    function resize() {
        const rect = hero.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = rect.width;
        height = rect.height;

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function render(timestamp) {
        if (startTime === null) startTime = timestamp;

        const time = (timestamp - startTime) * 0.00018;

        ctx.clearRect(0, 0, width, height);

        // Soft silver water base
        const base = ctx.createLinearGradient(
            0, 0, width, height
        );

        base.addColorStop(0, "#ffffff");
        base.addColorStop(0.5, "#f3f5f7");
        base.addColorStop(1, "#ffffff");

        ctx.fillStyle = base;
        ctx.fillRect(0, 0, width, height);

        // Layered flowing water reflections
        const spacing = 24;
        const layers = 3;

        for (let layer = 0; layer < layers; layer++) {
            const offset = layer * 9;

            for (
                let y = -40;
                y < height + 40;
                y += spacing
            ) {
                ctx.beginPath();

                for (let x = -20; x <= width + 20; x += 5) {
                    const wave1 = Math.sin(
                        x * 0.012 +
                        y * 0.016 +
                        time * (1.1 + layer * 0.2)
                    );

                    const wave2 = Math.sin(
                        x * 0.026 -
                        y * 0.011 -
                        time * 0.8
                    );

                    const wave3 = Math.cos(
                        x * 0.007 +
                        y * 0.024 +
                        time * 0.65
                    );

                    const displacement =
                        wave1 * 9 +
                        wave2 * 5 +
                        wave3 * 6;

                    const newY =
                        y + displacement + offset;

                    if (x === -20) {
                        ctx.moveTo(x, newY);
                    } else {
                        ctx.lineTo(x, newY);
                    }
                }

                ctx.strokeStyle =
                    layer === 0
                        ? "rgba(145,155,170,0.12)"
                        : layer === 1
                        ? "rgba(190,198,210,0.16)"
                        : "rgba(255,255,255,0.55)";

                ctx.lineWidth =
                    layer === 2 ? 2.5 : 1.5;

                ctx.stroke();
            }
        }

        animationId = requestAnimationFrame(render);
    }

    resize();

    if (!reducedMotion.matches) {
        animationId = requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize);

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden && animationId !== null) {
                cancelAnimationFrame(animationId);
                animationId = null;
            } else if (
                !document.hidden &&
                animationId === null &&
                !reducedMotion.matches
            ) {
                animationId = requestAnimationFrame(render);
            }
        }
    );
})();

document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll(
        ".nav-link[href^='#']"
    );

    const sections = [...navLinks]
        .map(link => document.querySelector(
            link.getAttribute("href")
        ))
        .filter(Boolean);

    function setActiveSection(id) {
        navLinks.forEach(link => {
            const isActive =
                link.getAttribute("href") === `#${id}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    // Update immediately when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const id = link.getAttribute("href").slice(1);
            setActiveSection(id);
        });
    });

    // Update when About Us or Explore Events is clicked
    document.querySelectorAll(
        'a[href="#about"], a[href="#events"]'
    ).forEach(link => {
        link.addEventListener("click", () => {
            const id = link.getAttribute("href").slice(1);
            setActiveSection(id);
        });
    });

    // Update navigation automatically while scrolling
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach(section => observer.observe(section));

    // Highlight current section on page load
    const initialId = window.location.hash.slice(1) || "home";

    if (sections.some(section => section.id === initialId)) {
        setActiveSection(initialId);
    }
});

/* GGC INTRO — NAVBAR APPEARS WITH HOME (NO EXTRA WAIT) */
document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("ggc-intro");
    const logo = intro?.querySelector(".intro-logo");

    const finishIntro = () => {
        document.body.classList.add("intro-finished");
        intro?.remove();
    };

    if (!intro || !logo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finishIntro();
        return;
    }

    const animations = logo.getAnimations();
    if (animations.length === 0) {
        finishIntro();
        return;
    }

    logo.addEventListener("animationend", (event) => {
        if (event.animationName === "ggcFade") finishIntro();
    });
    logo.addEventListener("animationcancel", (event) => {
        if (event.animationName === "ggcFade") finishIntro();
    });
});

/* =====================================
   GGC — iOS SMOOTH SECTION REVEALS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const elements = document.querySelectorAll(
        "#about, #events, #team"
    );

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("ios-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    elements.forEach((element) => {
        element.classList.add("ios-reveal");
        observer.observe(element);
    });

});


/* GGC — REPLAY MEMBER PEEK ON SCROLL */

document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about-section");

    if (!aboutSection) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                aboutSection.classList.toggle(
                    "peek-active",
                    entry.isIntersecting
                );
            });
        },
        {
            threshold: 0.2
        }
    );

    observer.observe(aboutSection);
});

/* GGC — Smooth scroll reveal */

const revealSections = document.querySelectorAll(
    "#about, #events, #team"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px 40px 0px"
        }
    );

    revealSections.forEach((section) => {
        section.classList.add("scroll-reveal");
        revealObserver.observe(section);
    });
}

/* ===================================
   GGC — BUTTERY SMOOTH SCROLL
=================================== */

if (
    typeof Lenis !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    const lenis = new Lenis({
        
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.0,
        prevent: (node) => Boolean(node.closest?.(".ggc-exp-dialog")),
        anchors: {
            offset: -100
        }
    });

    window.ggcLenis = lenis;

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

/* GGC — SMOOTH NAVBAR SECTION SCROLL */

document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        const target = document.querySelector(
            link.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        if (typeof lenis !== "undefined") {
            lenis.scrollTo(target, {
                duration: 2.0,
                offset: 0,
                easing: (t) =>
                    1 - Math.pow(1 - t, 4)
            });
        } else {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});




/* ==========================================
   GGC EVENTS — 3-CARD CAROUSEL
   ========================================== */

(() => {
    const stage = document.getElementById("eventsStage");
    if (!stage) return;

    const cards = Array.from(
        stage.querySelectorAll(".event-frame")
    );

    if (cards.length !== 3) return;

    const prevButton = document.getElementById("eventPrev");
    const nextButton = document.getElementById("eventNext");
    const counter = document.getElementById("eventsCounter");

    const dots = Array.from(
        document.querySelectorAll(
            "#events .event-progress-dot"
        )
    );

    // Start with SOC Operations Workshop in center.
    let activeIndex = 2;

    function renderCarousel() {
        cards.forEach((card, index) => {
            card.classList.remove(
                "left",
                "center",
                "right"
            );

            if (index === activeIndex) {
                card.classList.add("center");
            } else if (
                index === (activeIndex + 1) % cards.length
            ) {
                card.classList.add("right");
            } else {
                card.classList.add("left");
            }

            card.setAttribute(
                "aria-label",
                index === activeIndex
                    ? "Selected event"
                    : "Select this event"
            );
        });

        if (counter) {
            counter.textContent =
                String(activeIndex + 1).padStart(2, "0") +
                " / " +
                String(cards.length).padStart(2, "0");
        }

        dots.forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === activeIndex
            );
        });
    }

    function goTo(index) {
        activeIndex =
            (index + cards.length) % cards.length;

        renderCarousel();
    }

    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            if (index !== activeIndex) {
                goTo(index);
            }
        });

        card.addEventListener("keydown", (event) => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                if (index !== activeIndex) {
                    event.preventDefault();
                    goTo(index);
                }
            }
        });
    });

    prevButton?.addEventListener("click", () => {
        goTo(activeIndex - 1);
    });

    nextButton?.addEventListener("click", () => {
        goTo(activeIndex + 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            goTo(index);
        });
    });

    renderCarousel();
})();

/* GOOGLE GENESIS CLUB — LETTER-BY-LETTER GLIDE */

document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector("#home .hero-title");
    if (!title || title.dataset.lettersReady === "true") return;

    title.dataset.lettersReady = "true";

    const googleLetters = title.querySelectorAll(".google-letter");

    // Animate existing colored Google letters
    googleLetters.forEach((letter, index) => {
        letter.classList.add("glide-letter");
        letter.style.setProperty(
            "--letter-delay",
            `${index * 85}ms`
        );
    });

    // Split "Genesis Club" into individual letters
    const genesis = title.querySelector(".genesis-title");

    if (genesis) {
        const text = genesis.textContent.trim();
        genesis.textContent = "";

        const fragment = document.createDocumentFragment();

        [...text].forEach((character, index) => {
            if (character === " ") {
                fragment.appendChild(
                    document.createTextNode("\u00A0")
                );
                return;
            }

            const span = document.createElement("span");
            span.className = "glide-letter";
            span.textContent = character;

            span.style.setProperty(
                "--letter-delay",
                `${(index + googleLetters.length) * 85}ms`
            );

            fragment.appendChild(span);
        });

        genesis.appendChild(fragment);
    }
});

/* GOOGLE GENESIS CLUB — LETTER REVEAL */

document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector("#home .hero-title");
    if (!title) return;

    const googleLetters = title.querySelectorAll(".google-letter");
    const genesis = title.querySelector(".genesis-title");

    let delayIndex = 0;

    // Animate the colored Google letters
    googleLetters.forEach(letter => {
        letter.classList.add("glide-letter");

        letter.style.setProperty(
            "--letter-delay",
            `${delayIndex * 90}ms`
        );

        delayIndex++;
    });

    // Split Genesis Club into individual letters
    if (genesis && !genesis.dataset.split) {
        const text = genesis.textContent.trim();
        genesis.textContent = "";

        for (const char of text) {
            if (char === " ") {
                const space = document.createElement("span");
                space.textContent = "\u00A0";
                genesis.appendChild(space);
                continue;
            }

            const span = document.createElement("span");
            span.className = "glide-letter";
            span.textContent = char;

            span.style.setProperty(
                "--letter-delay",
                `${delayIndex * 90}ms`
            );

            genesis.appendChild(span);
            delayIndex++;
        }

        genesis.dataset.split = "true";
    }
});

/* =========================================
   GGC TITLE — SEQUENTIAL LETTER ANIMATION
   ========================================= */

(function () {
    function initTitleAnimation() {
        const title = document.querySelector(
            "#home .hero-title"
        );

        if (!title) return;

        const letters = title.querySelectorAll(
            ".google-letter, " +
            ".genesis-title > span:not(.title-space)"
        );

        letters.forEach((letter, index) => {
            letter.style.setProperty(
                "--delay",
                `${index * 100}ms`
            );
        });

        // Allow the intro screen to finish first.
        const intro = document.getElementById("ggc-intro");

        function start() {
            if (title.classList.contains("start-letters")) {
                return;
            }

            title.classList.add("start-letters");
        }

        if (!intro) {
            start();
            return;
        }

        // Wait for the intro to disappear.
        const observer = new MutationObserver(() => {
            const style = getComputedStyle(intro);

            if (
                style.display === "none" ||
                style.visibility === "hidden" ||
                Number(style.opacity) === 0
            ) {
                observer.disconnect();
                start();
            }
        });

        observer.observe(intro, {
            attributes: true,
            attributeFilter: ["class", "style"]
        });

        // Fallback if intro code uses a different hiding method.
        setTimeout(() => {
            observer.disconnect();
            start();
        }, 3000);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initTitleAnimation
        );
    } else {
        initTitleAnimation();
    }
})();

/* GGC — THREE EVENT STACKED CAROUSEL */

(function () {
    function init() {
        const stage = document.getElementById("eventsStage");
        if (!stage) return;

        const cards = [...stage.querySelectorAll(".event-frame")];

        if (cards.length !== 3) {
            console.warn("Expected 3 event cards, found:", cards.length);
            return;
        }

        let active = 2; // SOC Operations starts in front

        function render() {
            cards.forEach((card, index) => {
                const relative =
                    (index - active + cards.length) % cards.length;

                card.dataset.position =
                    relative === 0 ? "center" :
                    relative === 1 ? "right" : "left";

                card.setAttribute(
                    "aria-current",
                    index === active ? "true" : "false"
                );
            });

            const dots = document.querySelectorAll(
                "#events .event-progress-dot"
            );

            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === active);
            });
        }

        cards.forEach((card, index) => {
            card.addEventListener("click", () => {
                if (index === active) return;

                active = index;
                render();
            });

            card.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    active = index;
                    render();
                }
            });
        });

        render();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

/* ==========================================
   GGC EVENTS — SMOOTH CENTER SLIDING
   ========================================== */

(() => {
    function initSlidingEvents() {
        const stage = document.getElementById("eventsStage");
        if (!stage) return;

        if (stage.dataset.slidingReady === "true") return;

        const cards = [
            ...stage.querySelectorAll(".event-frame")
        ];

        if (cards.length !== 3) return;

        stage.dataset.slidingReady = "true";

        const dots = [
            ...document.querySelectorAll(
                "#events .event-progress-dot"
            )
        ];

        // SOC Operations starts in the center
        let active = 2;

        function render() {
            cards.forEach((card, index) => {
                const offset =
                    (index - active + cards.length) % cards.length;

                card.dataset.position =
                    offset === 0 ? "center" :
                    offset === 1 ? "right" : "left";

                card.setAttribute(
                    "aria-current",
                    index === active ? "true" : "false"
                );
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle(
                    "active",
                    index === active
                );
            });
        }

        function select(index) {
            if (index === active) return;

            active = index;
            render();
        }

        cards.forEach((card, index) => {
            card.addEventListener("click", event => {
                if (index !== active) {
                    event.preventDefault();
                    select(index);
                }
            });

            card.addEventListener("keydown", event => {
                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();
                    select(index);
                }
            });
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => select(index));
        });

        render();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initSlidingEvents
        );
    } else {
        initSlidingEvents();
    }
})();


/* ============================================
   GGC EVENTS — CAROUSEL AND INSTAGRAM WINDOWS
   ============================================ */

(() => {
  function initGGCExperiences() {
    const section = document.querySelector(".ggc-experiences");
    const stage = document.getElementById("ggcExpStage");

    if (!section || !stage || stage.dataset.ready) return;
    stage.dataset.ready = "true";

    const cards = [...stage.querySelectorAll(".ggc-exp-card")];
    const dots = [
      ...section.querySelectorAll(".ggc-exp-pagination button")
    ];

    const carousel = document.getElementById("ggcExpCarousel");
    const upcoming = section.querySelector(".ggc-exp-upcoming");
    const toggleButtons = [
      ...section.querySelectorAll("[data-exp-view]")
    ];

    let active = 1;

    // Add the real Instagram post URL to each event.
    const eventInfo = [
      {
        title: "Prompt Engineering with Gemini",
        category: "MASTERCLASS",
        date: "10 December 2025",
        location: "Virtual Session",
        instagram: [
          "https://www.instagram.com/p/DOyDgYMkohC/",
          "https://www.instagram.com/reel/DPJLCefEhqh/"
        ],
        description:
          "Mastering the art of communication with Large Language Models using Google's Gemini. This masterclass explored effective prompt engineering techniques and how to interact with generative AI tools."
      },
      {
        title: "Machine Learning Essentials",
        category: "TECHNICAL SESSION",
        date: "25 November 2025",
        location: "Main Hall",
        instagram: [
          "https://www.instagram.com/p/DSMdg-wEkwt/",
          "https://www.instagram.com/reel/DTx3LFxksl4/?utm_source=ig_web_copy_link&dlrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA=="
        ],
        description:
          "An interactive session covering Machine Learning fundamentals, Exploratory Data Analysis (EDA), supervised and unsupervised learning, model evaluation, hyperparameter tuning, and hands-on model deployment."
      },
      {
        title: "Student Skills Enrichment Workshop on SOC Operations",
        category: "CYBERSECURITY WORKSHOP",
        date: "27 August 2026",
        location: "Data Science Lab",
        instagram: [
          "https://www.instagram.com/p/DfoTcnDy1Ax/",
          "https://www.instagram.com/p/DfoUJ85krwi/"
        ],
        description:
          "An immersive cybersecurity workshop featuring SOC job simulation, cybersecurity career exploration, cyber certification guidance, hands-on security tools demonstrations, and security alert investigation. Speakers: Kaushik Srinivasan and Siva Sagar."
      }
    ];

    function render() {
      cards.forEach((card, index) => {
        const offset =
          (index - active + cards.length) % cards.length;

        card.dataset.expPosition =
          offset === 0 ? "center" :
          offset === 1 ? "right" : "left";

        card.setAttribute(
          "aria-current",
          index === active ? "true" : "false"
        );
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === active);

        if (eventInfo[index]) {
          dot.setAttribute(
            "aria-label",
            `Show ${eventInfo[index].title}`
          );
        }
      });
    }

    function select(index) {
      active = (index + cards.length) % cards.length;
      render();
    }

    // Create one reusable popup.
    const dialog = document.createElement("dialog");
    dialog.className = "ggc-exp-dialog";
    dialog.setAttribute("aria-label", "Event details");
    document.body.appendChild(dialog);

    // Convert a normal Instagram link to an embed URL.
    function instagramEmbedUrl(url) {
      if (!url) return null;

      try {
        const parsed = new URL(url);

        if (
          !["www.instagram.com", "instagram.com"].includes(
            parsed.hostname
          )
        ) {
          return null;
        }

        const match = parsed.pathname.match(
          /^\/(p|reel)\/([A-Za-z0-9_-]+)/
        );

        return match
          ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/`
          : null;
      } catch {
        return null;
      }
    }

    function openEvent(index) {
      const info = eventInfo[index];
      if (!info) return;

      dialog.replaceChildren();
      dialog.classList.toggle("ggc-exp-dialog--two-posts", Array.isArray(info.instagram) && info.instagram.length === 2);

      // Close button
      const close = document.createElement("button");
      close.className = "ggc-exp-dialog-close";
      close.type = "button";
      close.textContent = "×";
      close.setAttribute("aria-label", "Close event details");

      // Instagram post section
      const hero = document.createElement("div");
      hero.className = "ggc-exp-dialog-hero";

      const posts = (Array.isArray(info.instagram)
        ? info.instagram
        : [info.instagram])
        .map(instagramEmbedUrl)
        .filter(Boolean);

      if (posts.length > 0) {
        const grid = document.createElement("div");
        grid.className = "ggc-instagram-grid";

        posts.forEach((embedUrl, postIndex) => {
          const tile = document.createElement("div");
          tile.className = "ggc-instagram-grid-item";

          const iframe = document.createElement("iframe");
          iframe.src = embedUrl;
          iframe.title = `${info.title} Instagram ${embedUrl.includes("/reel/") ? "reel" : "post"} ${postIndex + 1} of ${posts.length}`;
          iframe.loading = "lazy";
          iframe.setAttribute("scrolling", "no");
          iframe.setAttribute("tabindex", "-1");
          iframe.setAttribute("allowtransparency", "true");
          // Embedded Instagram pages have their own scrollbars. Disable
          // interaction and scale the WHOLE iframe, not merely crop it.
          iframe.style.pointerEvents = "none";

          tile.appendChild(iframe);

          // Transparent, keyboard-accessible link above the non-interactive
          // Instagram embed. Opens the original post or reel in a new tab.
          const instagramLink = document.createElement("a");
          instagramLink.className = "ggc-instagram-clickable";
          instagramLink.href = embedUrl.replace(/\/embed\/?$/, "/");
          instagramLink.target = "_blank";
          instagramLink.rel = "noopener noreferrer";
          instagramLink.setAttribute("aria-label", `Open ${info.title} Instagram ${embedUrl.includes("/reel/") ? "reel" : "post"} ${postIndex + 1} in a new tab`);
          tile.appendChild(instagramLink);
          grid.appendChild(tile);
        });
        hero.appendChild(grid);
      } else {
        const placeholder = document.createElement("div");
        placeholder.className = "ggc-instagram-placeholder";
        const name = document.createElement("span");
        name.textContent = "Instagram";
        const message = document.createElement("p");
        message.textContent = "Event post coming soon";
        placeholder.append(name, message);
        hero.appendChild(placeholder);
      }

      // Event information
      const body = document.createElement("div");
      body.className = "ggc-exp-dialog-body";

      const category = document.createElement("p");
      category.className = "ggc-exp-dialog-category";
      category.textContent = info.category;

      const heading = document.createElement("h2");
      heading.id = "ggc-exp-dialog-title";
      heading.textContent = info.title;

      dialog.setAttribute("aria-labelledby", heading.id);

      const meta = document.createElement("div");
      meta.className = "ggc-exp-dialog-meta";

      const date = document.createElement("span");
      date.textContent = "🗓️  " + info.date;

      const location = document.createElement("span");
      location.textContent = "📍  " + info.location;

      meta.append(date, location);

      const divider = document.createElement("div");
      divider.className = "ggc-exp-dialog-divider";
      divider.setAttribute("aria-hidden", "true");

      const about = document.createElement("h3");
      about.className = "ggc-exp-dialog-about";
      about.textContent = "ABOUT THE EVENT";

      const description = document.createElement("p");
      description.className = "ggc-exp-dialog-description";
      description.textContent = info.description;

      const status = document.createElement("span");
      status.className = "ggc-exp-dialog-status";
      status.textContent = "• EVENT COMPLETED";

      body.append(
        category,
        heading,
        meta,
        divider,
        about,
        description,
        status
      );

      dialog.append(close, hero, body);

      close.addEventListener("click", () => dialog.close());

      
if (!dialog.open) {
  dialog.showModal();
}

document.body.classList.add("ggc-modal-open");
      window.ggcLenis?.stop();
      dialog.scrollTop = 0;

    }

    // Keep wheel/touch scrolling inside the dialog, not the page.
    dialog.addEventListener("wheel", (event) => {
      event.stopPropagation();
    }, { passive: true });

    dialog.addEventListener("touchmove", (event) => {
      event.stopPropagation();
    }, { passive: true });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("ggc-modal-open");
      window.ggcLenis?.start();
    });

    // Click outside the popup to close it.
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog && !event.target.closest(".ggc-exp-dialog-body, .ggc-exp-dialog-hero")) {
        // Close only when the actual dialog surface is clicked.
        // The close button remains the reliable way to dismiss.
        dialog.close();
      }
    });

    // Event card interactions
    cards.forEach((card, index) => {
      card.addEventListener("click", (event) => {
        if (event.target.closest(".ggc-exp-explore")) {
          return;
        }

        if (index !== active) {
          select(index);
        }
      });

      card.addEventListener("keydown", (event) => {
        if (
          (event.key === "Enter" || event.key === " ") &&
          event.target === card
        ) {
          event.preventDefault();

          if (index !== active) {
            select(index);
          } else {
            openEvent(Number(card.dataset.expIndex));
          }
        }
      });

      card.querySelector(".ggc-exp-explore")
        ?.addEventListener("click", (event) => {
          event.stopPropagation();

          if (index !== active) {
            select(index);
          }

          openEvent(Number(card.dataset.expIndex));
        });
    });

    // Carousel arrows
    section.querySelector(".ggc-exp-prev")
      ?.addEventListener("click", () => {
        select(active - 1);
      });

    section.querySelector(".ggc-exp-next")
      ?.addEventListener("click", () => {
        select(active + 1);
      });

    // Pagination dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        select(index);
      });
    });

    // Past / Upcoming toggle
    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const isPast = button.dataset.expView === "past";

        toggleButtons.forEach((btn) => {
          const selected = btn === button;

          btn.classList.toggle("active", selected);
          btn.setAttribute(
            "aria-pressed",
            String(selected)
          );
        });

        if (carousel) carousel.hidden = !isPast;
        const ticket = section.querySelector(".ggc-ticket-section");
        if (ticket) ticket.hidden = !isPast;
        if (upcoming) upcoming.hidden = isPast;
      });
    });

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initGGCExperiences
    );
  } else {
    initGGCExperiences();
  }
})();

/* GGC — SWITCH NAVIGATION BY SECTION */

(() => {
  function initMovingNavigation() {
    const home = document.getElementById("home");
    const dock = document.getElementById("ggcSideDock");

    if (!home || !dock) return;

    const links = [
      ...dock.querySelectorAll(".dock-link")
    ];

    const sections = ["home", "about", "events", "team"]
      .map(id => document.getElementById(id))
      .filter(Boolean);

    let ticking = false;

    function updateNavigation() {
      ticking = false;

      // Switch after scrolling beyond the Home section
      const homeBottom =
        home.getBoundingClientRect().bottom;

      const showDock = homeBottom <= 140;

      document.body.classList.toggle(
        "ggc-dock-mode",
        showDock
      );

      // Highlight the section nearest the viewport top
      let current = "home";

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 180) {
          current = section.id;
        }
      }

      links.forEach(link => {
        const active = link.dataset.section === current;
        link.classList.toggle("active", active);

        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateNavigation);
    }

    window.addEventListener("scroll", requestUpdate, {
      passive: true
    });

    window.addEventListener("resize", requestUpdate);

    updateNavigation();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initMovingNavigation
    );
  } else {
    initMovingNavigation();
  }
})();

/* HOME: horizontal navbar
   ABOUT / EVENTS / TEAM: vertical dock */

(() => {
  const home = document.getElementById("home");
  const about = document.getElementById("about");

  if (!home || !about) return;

  function updateNavbar() {
    const aboutTop = about.getBoundingClientRect().top;

    // Switch as soon as About reaches the middle
    // of the screen.
    const onOtherSection =
      aboutTop <= window.innerHeight * 0.5;

    document.body.classList.toggle(
      "ggc-dock-mode",
      onOtherSection
    );
  }

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  window.addEventListener("resize", updateNavbar);
  window.addEventListener("load", updateNavbar);

  updateNavbar();
})();

/* THINKATHON TICKET: fast, accessible modal */
(() => {
 const dialog=document.getElementById('ggcThinkathonDialog');
 const open=document.getElementById('ggcThinkathonOpen');
 const close=document.getElementById('ggcThinkathonClose');
 if(!dialog||!open||!close)return;
 open.addEventListener('click',()=>{
   // Load real Instagram embeds on demand, only when the event is opened.
   dialog.querySelectorAll('iframe[data-instagram-src]').forEach(frame=>{
     if(!frame.src)frame.src=frame.dataset.instagramSrc;
   });
   if(!dialog.open)dialog.showModal();
   window.ggcLenis?.stop();
 });
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 // Keep the dialog scrollable even when the page uses a smooth-scroll library.
 // Capture wheel input over the iframe cards, which otherwise consume wheel events.
 dialog.addEventListener('wheel', event => {
   if (!dialog.open || event.ctrlKey) return;
   const maxScroll = dialog.scrollHeight - dialog.clientHeight;
   if (maxScroll <= 0) return;
   event.preventDefault();
   dialog.scrollTop += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? dialog.clientHeight : 1);
 }, { passive: false });
 dialog.addEventListener('close',()=>window.ggcLenis?.start());
})();

/* Creative portfolio: accessible scroll-reveal for new sections */
(() => {
 const nodes=document.querySelectorAll('.ggc-team-tile,.ggc-portfolio-join h2');
 if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('ggc-in-view');observer.unobserve(e.target)}}),{threshold:.15});
 nodes.forEach((n,i)=>{n.classList.add('ggc-animate-in');n.style.setProperty('--ggc-delay',`${(i%3)*110}ms`);observer.observe(n)});
})();

/* GGC Events — category/year filters and Thinkathon summary arrow */
(() => {
  const section=document.querySelector('#events.ggc-events-redesign');
  if(!section)return;
  const filters=[...section.querySelectorAll('[data-event-filter]')];
  const years=[...section.querySelectorAll('[data-event-year]')];
  const cards=[...section.querySelectorAll('[data-event-kind]')];
  const empty=section.querySelector('.ggc-events-empty');
  let category='all',year='all';
  function update(){
    let visible=0;
    cards.forEach(card=>{
      const show=(category==='all'||card.dataset.eventKind===category)
        &&(year==='all'||card.dataset.eventYear===year);
      card.hidden=!show;
      if(show)visible++;
    });
    empty.hidden=visible>0;
  }
  filters.forEach(button=>button.addEventListener('click',()=>{
    category=button.dataset.eventFilter;
    filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
    update();
  }));
  years.forEach(button=>button.addEventListener('click',()=>{
    year=button.dataset.eventYear;
    years.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
    update();
  }));
  section.querySelector('.ggc-think-feature-arrow')?.addEventListener('click',()=>document.getElementById('ggcThinkathonOpen')?.click());
  update();
})();


// Hide the vertical dock while the final Connect section is on screen; keep the top navigation visible.
(() => {
  const footer = document.querySelector('#join.ggc-connect-footer');
  if (!footer) return;
  const update = () => {
    const r = footer.getBoundingClientRect();
    document.body.classList.toggle('ggc-footer-visible', r.top < window.innerHeight && r.bottom > 0);
  };
  window.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update, {passive:true});
  window.addEventListener('pageshow', update);
  update();
})();
