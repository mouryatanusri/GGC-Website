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
        anchors: {
            offset: -100
        }
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}


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
        const text = genesis.textContent.trim().replaceAll(" ", "\u00A0");
        genesis.textContent = "";

        for (const char of text) {
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

/* Update the side dock as the visitor moves through the page. */
document.addEventListener("DOMContentLoaded", () => {
  const home = document.getElementById("home");
  const dock = document.getElementById("ggcSideDock");
  const footer = document.getElementById("join");
  if (!home || !dock) return;

  const links = [...dock.querySelectorAll(".dock-link[data-section]")];
  const sections = links
    .map(link => document.getElementById(link.dataset.section))
    .filter(Boolean);

  let updateQueued = false;

  function updateNavigation() {
    updateQueued = false;

    const readingLine = window.innerHeight * 0.35;
    let current = home;

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= readingLine) {
        current = section;
      }
    }

    const dockBottom = dock.getBoundingClientRect().bottom;
    const footerBoundary = dockBottom > 0 ? dockBottom + 12 : readingLine;
    const atFooter = Boolean(
      footer && footer.getBoundingClientRect().top <= footerBoundary
    );

    const showDock =
      current !== home || home.getBoundingClientRect().bottom <= 140;

    document.body.classList.toggle("ggc-dock-mode", showDock);
    document.body.classList.toggle("ggc-footer-mode", atFooter);

    for (const link of links) {
      const active = !atFooter && link.dataset.section === current.id;
      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }

  function queueUpdate() {
    if (updateQueued) return;
    updateQueued = true;
    requestAnimationFrame(updateNavigation);
  }

  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  window.addEventListener("pageshow", queueUpdate);
  updateNavigation();
});
document.addEventListener("DOMContentLoaded", () => {
  const artwork = document.querySelector("#home .hero-artwork");
  if (!artwork?.querySelector(".hero-artwork-effects")) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;

  function playArtwork() {
    artwork.classList.remove("is-playing");
    void artwork.offsetWidth;
    artwork.classList.add("is-playing");
  }

  function startWhenVisible() {
    artwork.addEventListener("pointerenter", playArtwork);

    if (!("IntersectionObserver" in window)) {
      playArtwork();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      playArtwork();
    }, { threshold: 0.25 });

    observer.observe(artwork);
  }

  if (document.body.classList.contains("intro-finished")) {
    startWhenVisible();
  } else {
    const introObserver = new MutationObserver(() => {
      if (!document.body.classList.contains("intro-finished")) return;
      introObserver.disconnect();
      startWhenVisible();
    });

    introObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const stage = document.querySelector("#home .hero-artwork-stage");
  const monitor = stage?.querySelector(".hero-monitor-trigger");

  monitor?.addEventListener("click", () => {
    const complete = stage.classList.toggle("is-monitor-complete");
    monitor.setAttribute("aria-pressed", String(complete));
  });

});

/* About chapter wheel */
document.addEventListener("DOMContentLoaded", () => {
  const chapters = [
    {
      title: "Who We Are",
      content: [
        ["Genesis Collaboration", "Google Genesis Club is a student-led developer initiative dedicated to fostering a culture of innovation and technical excellence. As a community of aspiring engineers and tech enthusiasts, we serve as a bridge between foundational knowledge and cutting-edge industry standards."],
        ["Our Goal", "Our goal is to create a space where curiosity meets capability, empowering students to take charge of their professional journey and develop the confidence to lead in the digital age."],

      ],
    },
    {
      title: "The Foundations",
      content: [
        ["Innovation", "Pushing limits with cutting-edge tech."],
        ["Community", "A home for every developer."],
        ["Learning", "Knowledge sharing is our core."],
        ["Excellence", "Quality in every single line of code."],
      ],
    },
    {
      title: "Our Committee",
      content: [
        ["26+", "Community of dedicated members"],
        ["200+", "Students influenced & empowered"],
        ["2+", "Chapters established across our college"],
      ],
    },
    {
      title: "Our Purpose",
      content: [
        ["Skill Empowerment", "To provide students with hands-on exposure to emerging technologies and industry-standard tools through expert-led sessions."],
        ["Bridging the Gap", 'To align academic learning with practical industry requirements, ensuring members are "day-one" ready for their careers.'],
        ["Actionable Innovation", 'To transform theoretical knowledge into tangible solutions by encouraging a "build-first" mindset.'],
        ["Competitive Excellence", "To foster growth through high-stakes hackathons and challenges that test logic, creativity, and technical stamina."],
        ["Community Building", "To create a collaborative ecosystem where developers can share knowledge, find mentors, and work together on future-defining ideas."],
      ],
    },
    {
      title: "Mission & Vision",
      content: [
        ["Mission · Empowering the Minds", "To democratize access to cutting-edge technology and foster a culture of perpetual innovation within the student community."],
        ["Vision · A World Built Differently", "To lead the transformation of young developers into global tech leaders who solve complex challenges using Google's ecosystem."],
      ],
    },
  ];

  const strip = document.querySelector("#about .about-chapter-strip");
  const content = document.querySelector("#about .about-chapter-content");
  if (!strip || !content) return;

  const accents = ["#185abc", "#c5221f", "#137333", "#8a5900", "#185abc"];

  function element(tag, text) {
    const node = document.createElement(tag);
    node.textContent = text;
    return node;
  }

  const buttons = chapters.map((chapter, index) => {
    const button = element("button", "");
    button.type = "button";
    button.className = "about-chapter-panel";
    button.dataset.chapter = String(index + 1);
    button.style.setProperty("--chapter-accent", accents[index]);
    button.setAttribute("aria-label", chapter.title);
    button.setAttribute("aria-controls", "about-chapter-content");

    const number = element("span", String(index + 1).padStart(2, "0"));
    number.className = "about-chapter-number";
    number.setAttribute("aria-hidden", "true");

    const title = element("span", chapter.title);
    title.className = "about-chapter-label";

    button.append(number, title);
    button.addEventListener("click", () => selectChapter(index));
    strip.append(button);
    return button;
  });

  function selectChapter(index) {
    const previousChapter = buttons.findIndex(
  (button) => button.getAttribute("aria-pressed") === "true"
);
    buttons.forEach((button, position) => {
      button.setAttribute("aria-pressed", String(position === index));
    });

    const chapter = chapters[index];
    const heading = element("h3", chapter.title);
    const details = document.createElement("div");
    details.className = "about-chapter-details";

    for (const [title, copy] of chapter.content) {
      const item = document.createElement("div");
      item.append(element("h4", title));
      if (copy) item.append(element("p", copy));
      details.append(item);
    }

    content.style.setProperty("--chapter-accent", accents[index]);
    content.replaceChildren(heading, details);
    if (
  previousChapter !== -1 &&
  previousChapter !== index &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const offset = index > previousChapter ? 14 : -14;

  for (const part of [heading, details]) {
    part.animate(
      [
        { transform: `translateX(${offset}px)`, opacity: 0.65 },
        { transform: "translateX(0)", opacity: 1 },
      ],
      {
        duration: 360,
        easing: "cubic-bezier(.25, 1, .35, 1)",
      }
    );
  }
}
  }
function moveChapter(direction) {
  const current = buttons.findIndex(
    button => button.getAttribute("aria-pressed") === "true"
  );

  if (current < 0 || buttons.length < 2) return;

  const next = (current + direction + buttons.length) % buttons.length;
  selectChapter(next);
}

document.querySelector("#about .about-chapter-prev")
  ?.addEventListener("click", () => moveChapter(-1));

document.querySelector("#about .about-chapter-next")
  ?.addEventListener("click", () => moveChapter(1));
  selectChapter(0);
});

document.addEventListener("DOMContentLoaded", () => {
  const panel = document.querySelector(
    '#about .about-chapter-panel[data-chapter="1"]'
  );
  if (!panel) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const width = 1672;
  const height = 941;

  const artwork = new Image();
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.className = "who-we-are-motion";
  canvas.setAttribute("aria-hidden", "true");

  const ctx = canvas.getContext("2d");
  const source = document.createElement("canvas");
  source.width = width;
  source.height = height;
  const sourceCtx = source.getContext("2d");
  if (!ctx || !sourceCtx) return;

  let original;
  let frame = null;
  let previousFrame = -Infinity;

  // Coordinates match the transparent illustration with the GGC laptop logo.
  const people = [
    { head: [546, 299, 109, 91], eyes: [[575, 293], [615, 305]] },
    { head: [819, 394, 119, 123], eyes: [[815, 405], [865, 411]], pivot: [814, 493] },
    { head: [1074, 235, 132, 124], eyes: [[1047, 271], [1095, 250]], pivot: [1122, 310] },
  ];

  function influence(x, y, cx, cy, rx, ry) {
    const distance = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
    return Math.max(0, 1 - distance) ** 2;
  }

  // A quick movement followed by a short rest.
  function pulse(time, period, duration, offset = 0) {
    const phase = (time + offset) % period;
    return phase < duration ? Math.sin(Math.PI * phase / duration) : 0;
  }

  // Redraw a small patch from the original art with feathered edges.
  function patch(cx, cy, rx, ry, mapPixel) {
    const left = Math.max(0, Math.floor(cx - rx));
    const top = Math.max(0, Math.floor(cy - ry));
    const right = Math.min(width, Math.ceil(cx + rx));
    const bottom = Math.min(height, Math.ceil(cy + ry));
    const patchWidth = right - left;
    const patchHeight = bottom - top;
    const pixels = ctx.createImageData(patchWidth, patchHeight);

    let target = 0;
    for (let y = top; y < bottom; y++) {
      for (let x = left; x < right; x++) {
        const [sx, sy] = mapPixel(x, y);
        const ix = Math.max(0, Math.min(width - 1, Math.round(sx)));
        const iy = Math.max(0, Math.min(height - 1, Math.round(sy)));
        const sample = (iy * width + ix) * 4;

        pixels.data[target++] = original[sample];
        pixels.data[target++] = original[sample + 1];
        pixels.data[target++] = original[sample + 2];
        pixels.data[target++] = original[sample + 3];
      }
    }

    ctx.putImageData(pixels, left, top);
  }

  function drawHead(person, index, time) {
    const [cx, cy, rx, ry] = person.head;
    const blink = pulse(time, 1.7, 0.2, index * 0.48);
    const nod = person.pivot
      ? pulse(time, 2.2, 0.65, index * 0.51) * 0.055
      : 0;
    const speech = index === 0 && time % 1.8 < 1.05
      ? (1 + Math.sin(time * 35)) / 2
      : 0;

    if (!blink && !nod && !speech) return;

    patch(cx, cy, rx, ry, (x, y) => {
      let sx = x;
      let sy = y;

      if (nod) {
        const [px, py] = person.pivot;
        const angle = -nod * influence(x, y, cx, cy, rx, ry);
        sx = px + (x - px) * Math.cos(angle) - (y - py) * Math.sin(angle);
        sy = py + (x - px) * Math.sin(angle) + (y - py) * Math.cos(angle);
      }

      for (const [ex, ey] of person.eyes) {
        sy += (sy - ey) * blink * 3 *
          influence(sx, sy, ex, ey, 10, 13);
      }

      if (speech) {
        sy -= speech * 3.5 * influence(sx, sy, 574, 339, 24, 14);
      }

      return [sx, sy];
    });
  }

  function drawSteam(time) {
    ctx.save();
    ctx.strokeStyle = "#7a8696";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";

    for (let i = 0; i < 3; i++) {
      const progress = (time / 1.55 + i / 3) % 1;
      const x = 1322 + (i - 1) * 12 + Math.sin(progress * Math.PI * 2) * 5;
      const y = 682 - progress * 60;

      ctx.globalAlpha = Math.sin(progress * Math.PI) * 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - 10, y - 9, x + 10, y - 16, x + 2, y - 26);
      ctx.stroke();
    }

    ctx.restore();
  }

  function render(now) {
    const time = now / 1000;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(source, 0, 0);

    const typing = pulse(time, 0.38, 0.22) * 4;
    patch(775, 726, 47, 43, (x, y) => [
      x,
      y - typing * influence(x, y, 775, 726, 47, 43),
    ]);

    const gesture = pulse(time, 1.8, 0.85) * 5;
    patch(622, 551, 88, 45, (x, y) => [
      x + gesture * 0.5 * influence(x, y, 622, 551, 88, 45),
      y - gesture * influence(x, y, 622, 551, 88, 45),
    ]);

    people.forEach((person, index) => drawHead(person, index, time));
    drawSteam(time);
  }

  function shouldPlay() {
    return original &&
      panel.getAttribute("aria-pressed") === "true" &&
      !reducedMotion.matches &&
      !document.hidden;
  }

  function animate(now) {
    frame = null;
    if (!shouldPlay()) return;

    if (now - previousFrame >= 1000 / 24) {
      render(now);
      previousFrame = now;
    }

    frame = requestAnimationFrame(animate);
  }

  function syncAnimation() {
    if (shouldPlay()) {
      if (frame === null) {
        render(performance.now());
        panel.classList.add("has-chapter-motion");
        frame = requestAnimationFrame(animate);
      }
    } else {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      panel.classList.remove("has-chapter-motion");
    }
  }

  artwork.addEventListener("load", () => {
    sourceCtx.drawImage(artwork, 0, 0, width, height);

    try {
      original = sourceCtx.getImageData(0, 0, width, height).data;
    } catch {
      return; // Keep the static PNG if pixel access is unavailable.
    }

    panel.prepend(canvas);
    syncAnimation();
  });

  new MutationObserver(syncAnimation).observe(panel, {
    attributes: true,
    attributeFilter: ["aria-pressed"],
  });
  reducedMotion.addEventListener("change", syncAnimation);
  document.addEventListener("visibilitychange", syncAnimation);

  artwork.src = "assets/who-we-are.png";
});
document.addEventListener("DOMContentLoaded", () => {
  const chapterEffects = {
    // 02 · The Foundations — bulb, blue wire, puzzle, checkmark
    2: `
      <circle class="chapter-glow" cx="388" cy="395" r="43"
              fill="#ffce45"/>

      <path class="chapter-signal" pathLength="100"
            d="M234 520 C232 419 316 406 330 478"
            stroke="#b9dbff" style="--delay: -.25s"/>

      <path class="chapter-spark" fill="none"
            d="M699 351 L701 392 M653 369 L678 403 M740 373 L725 405"
            stroke="#ea4335" style="--delay: -.65s"/>

      <path class="chapter-signal" pathLength="100"
            d="M1348 624 L1376 648 L1444 578"
            stroke="#b6ffd2" style="--delay: -.9s"/>
    `,

    // 03 · Our Committee — calendar, org chart, blue tab, lanyard
    3: `
      <path class="chapter-glow"
            d="M515 520 L559 512 L571 555 L527 566 Z"
            fill="#b7dbff"/>

      <path class="chapter-signal" pathLength="100"
            d="M935 368 L922 416 L1023 420 L1017 453"
            stroke="#4285f4" style="--delay: -.25s"/>

      <path class="chapter-glow"
            d="M1176 301 Q1220 286 1252 302 L1244 339
               Q1211 329 1168 346 Z"
            fill="#a8d8ff" style="--delay: -.6s"/>

      <path class="chapter-signal" pathLength="100"
            d="M1027 605 Q1125 571 1227 551 Q1359 511 1436 547"
            stroke="#ffd2cd" style="--delay: -.85s"/>
    `,

    // 04 · Our Purpose — star, orbit, telescope lens, bookmark
    4: `
      <path class="chapter-spark"
            d="M1144 147 Q1149 171 1172 177
               Q1149 184 1144 207 Q1138 185 1115 177
               Q1138 172 1144 147 Z"
            fill="#ffe69d" stroke="#fbbc05"/>

      <path class="chapter-signal" pathLength="100"
            d="M328 530 C570 338 827 207 1096 179"
            stroke="#aee9b9" style="--delay: -.3s"/>

      <ellipse class="chapter-glow" cx="1357" cy="280" rx="15" ry="26"
               transform="rotate(-28 1357 280)"
               fill="#c5dbff" style="--delay: -.65s"/>

      <path class="chapter-signal" pathLength="100"
            d="M888 674 L917 754 L927 736 L945 746"
            stroke="#a1ccff" style="--delay: -.95s"/>
    `,

    // 05 · Mission & Vision — LED, red wire, notebook, target
    5: `
      <circle class="chapter-glow" cx="433" cy="352" r="45"
              fill="#ffce45"/>

      <path class="chapter-signal" pathLength="100"
            d="M482 470 C474 360 573 341 591 492"
            stroke="#ffc0b6" style="--delay: -.2s"/>

      <circle class="chapter-glow" cx="1258" cy="244" r="24"
              fill="#fbbc05" style="--delay: -.55s"/>

      <circle class="chapter-ripple" cx="1078" cy="710" r="26"
              fill="none" stroke="#34a853" style="--delay: -.8s"/>
    `
  };

  for (const [chapter, drawing] of Object.entries(chapterEffects)) {
    const panel = document.querySelector(
      `#about .about-chapter-panel[data-chapter="${chapter}"]`
    );

    if (!panel || panel.querySelector(".chapter-art-effects")) continue;

    const overlay = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    overlay.setAttribute("class", "chapter-art-effects");
    overlay.setAttribute("viewBox", "0 0 1672 941");
    overlay.setAttribute("preserveAspectRatio", "xMidYMid slice");
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = drawing;
    panel.prepend(overlay);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".ggc-events");
  const grid = section?.querySelector(".ggc-event-grid");
  const featureSlot = section?.querySelector(".ggc-event-feature-slot");
  const dialog = section?.querySelector(".ggc-event-dialog");
  if (!grid || !dialog || !featureSlot) return;

  const workshops = section.querySelector(".ggc-workshops");
  const empty = section.querySelector(".ggc-events-empty");
  const filters = [...section.querySelectorAll("[data-event-filter]")];

  for (const filter of filters) {
    filter.addEventListener("click", () => {
      const upcoming = filter.dataset.eventFilter === "upcoming";
      for (const button of filters) {
        button.setAttribute("aria-pressed", String(button === filter));
      }
      featureSlot.hidden = upcoming;
      if (workshops) workshops.hidden = upcoming;
      if (empty) empty.hidden = !upcoming;
    });
  }

  const events = [
    {
      title: "Prompt Engineering with Gemini",
      category: "Workshop",
      date: "22 September 2025",
      venue: "Data Science Lab",
      description: "A hands-on introduction to writing and refining prompts with Gemini. The workshop covered role prompting, step-by-step reasoning, and formatting outputs. Students practiced improving responses through iterative prompting.",
      extra: [["Registration", "Free"], ["Certificates", "E-certificates offered"]],
      image: "assets/gemini-workshop.png",
      instagram: "https://www.instagram.com/reel/DPJLCefEhqh/",
      colors: ["#185abc", "#e8f0fe", "#adc9fc"]
    },
    {
      title: "Machine Learning Essentials",
      category: "Workshop",
      date: "15 December 2025",
      venue: "Data Science Lab",
      description: "An introductory workshop on machine learning theory and practical implementation. It covered exploratory data analysis, supervised and unsupervised models, evaluation, and deployment, with hands-on practice.",
      extra: [["Certificates", "Offered"]],
      image: "assets/machine-learning.png",
      instagram: "https://www.instagram.com/p/DSTpW6GEnzh/",
      colors: ["#c5221f", "#fce8e6", "#f3b3ae"]
    },
    {
      title: "SOC Operations Workshop",
      category: "Workshop",
      date: "27 August 2026",
      venue: "Data Science Lab",
      description: "A student skills workshop introducing Security Operations Center work. Participants explored cybersecurity careers through SOC job simulations, security alert investigations, and demonstrations of security tools.",
      extra: [["Speakers", "Kaushik Srinivasan and Siva Sagar"]],
      image: "assets/soc-workshop.png",
      instagram: "https://www.instagram.com/p/DfoUJ85krwi/",
      colors: ["#137333", "#e6f4ea", "#a8dab5"]
    },
    {
      title: "Thinkathon 9.0",
      featured: true,
      category: "Ideathon",
      date: "6 March 2026",
      venue: "HITS Campus",
      description: "An international-level ideathon at Hindustan Institute of Technology and Science, in association with Google. Teams of three to five could participate, including teams from different institutions.",
      extra: [
        ["Advertised prize pool", "₹1 lakh"],
        ["Opportunities", "Internship opportunities for top participants"]
      ],
      image: "assets/thinkathon.png",
      instagram: "https://www.instagram.com/p/DUyPk7KEhKP/?utm_source=ig_web_copy_link",
      colors: ["#805500", "#fef3d3", "#edc96b"]
    }
  ];

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  const embed = dialog.querySelector(".ggc-event-embed");
  const instagramLink = dialog.querySelector(".ggc-event-instagram-link");
  const socialPlaceholder = dialog.querySelector(".ggc-event-social-placeholder");

  function openEvent(event) {
    dialog.querySelector("h3").textContent = event.title;
    dialog.querySelector(".ggc-event-description").textContent = event.description;

    const facts = dialog.querySelector(".ggc-event-facts");
    facts.replaceChildren();
    for (const [label, value] of [
      ["Date", event.date], ["Venue", event.venue], ...event.extra
    ]) {
      facts.append(element("dt", label), element("dd", value));
    }

    // Match direct Instagram post or reel URLs and omit tracking parameters.
    const post = event.instagram.match(
      /^https:\/\/(?:www\.)?instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)\/?(?:[?#].*)?$/
    );

    embed.replaceChildren();
    embed.hidden = !post;
    socialPlaceholder.hidden = Boolean(post);
    instagramLink.hidden = !post;
    instagramLink.removeAttribute("href");

    if (post) {
      const postUrl = `https://www.instagram.com/${post[1]}/${post[2]}/`;
      instagramLink.href = postUrl;

      const frame = element("iframe");
      frame.src = `${postUrl}embed/`;
      frame.title = `Instagram post for ${event.title}`;
      embed.append(frame);
    }

    if (!dialog.open) dialog.showModal();
  }

  dialog.addEventListener("close", () => embed.replaceChildren());

  for (const event of events) {
  const card = element("article", "", "ggc-event-card");
  const [accent, tint, border] = event.colors;

  card.style.setProperty("--event-accent", accent);
  card.style.setProperty("--event-tint", tint);
  card.style.setProperty("--event-border", border);
  card.classList.toggle("ggc-event-featured", Boolean(event.featured));

  const poster = element("div", "", "ggc-event-poster");

  if (event.image) {
    const image = element("img");
    image.src = event.image;
    image.alt = "";
    image.loading = "lazy";
    poster.append(image);
  } else {
    poster.classList.add("ggc-event-poster-placeholder");
    poster.textContent = "Event illustration coming soon";
  }

  const copy = element("div", "", "ggc-event-card-copy");
  const category = element("span", event.category, "ggc-event-category");
  const title = element(event.featured ? "h3" : "h4", event.title, "ggc-event-card-title");
  const meta = element("p", "", "ggc-event-card-meta");

function addMeta(icon, text) {
  const item = element("span", "", "ggc-event-meta-item");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  const path = document.createElementNS(svg.namespaceURI, "path");
  path.setAttribute("d", icon);
  svg.append(path);
  item.append(svg, element("span", text));
  meta.append(item);
}

addMeta(
  "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM7 3v4m10-4v4M3 10h18",
  event.date
);

if (event.featured) {
  addMeta(
    "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Zm-5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z",
    event.venue
  );
}

  const button = element("button", "Explore more ", "ggc-event-explore");
  button.type = "button";
  button.setAttribute("aria-label", `Explore more about ${event.title}`);
  button.setAttribute("aria-haspopup", "dialog");
  button.addEventListener("click", () => openEvent(event));

  copy.append(category, title, meta);

  if (event.featured) {
    copy.append(element(
      "p",
      "An international ideathon where student teams turn ideas into practical solutions.",
      "ggc-event-feature-summary"
    ));
  }

  copy.append(button);

  if (event.featured) {
    card.append(copy, poster);
    featureSlot.append(card);
  } else {
    card.append(poster, copy);
    grid.append(card);
  }
}
});