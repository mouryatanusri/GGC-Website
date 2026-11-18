# Google Genesis Club | HITS

**A responsive, illustrated website for the Google Genesis Club at Hindustan Institute of Technology and Science.**

[Visit the live website](https://mouryatanusri.github.io/GGC-Website/) · [View the source code](https://github.com/mouryatanusri/GGC-Website)

## Project Overview

Google Genesis Club is a student-led technical community. The website introduces the club and its team, showcases workshops and ideathons, and helps students find ways to get involved.

## My Role

I designed the interface, built the front end, integrated the illustrations and animations, and deployed the site on GitHub Pages. I tested the deployed site on desktop and mobile, then refined the navigation, typography, spacing, and image framing across screen sizes.

## Key Features

- **Animated homepage illustration.** SVG effects are layered over an illustration of students coding and building a circuit. The effects scale alongside the artwork.
- **Interactive About section.** Five illustrated chapters expand as visitors select a panel or use the previous and next buttons. The card and its description update together.
- **Event showcase.** Thinkathon 9.0 has a featured layout alongside workshops on prompt engineering with Gemini, machine learning, and security operations. Past and Upcoming tabs organize the listings, and event links lead to the club’s Instagram posts.
- **Responsive navigation.** A color-coded desktop side dock highlights the active section and hides near the footer. On mobile, a compact navigation bar sits at the top and scrolls away with the page.

## Technical Decisions

- **Shared chapter controls.** Panel clicks and previous/next buttons call the same JavaScript selection function, keeping the active card and its description in sync.
- **Mobile image framing.** I widened the expanded About card and adjusted how the artwork fits so visitors can see the full illustration on narrower screens.
- **Stylesheet cache versioning.** A regular mobile tab was showing older styles while a private tab showed the update. I versioned the stylesheet URL so returning browsers would fetch the updated CSS.

## Tech Stack

| Technology | How it’s used |
| --- | --- |
| HTML5 | Page structure and content |
| CSS3 | Responsive layouts, styling, and transitions |
| Vanilla JavaScript | Navigation state, About chapter controls, and event filtering |
| SVG and PNG | Animation layers and illustrations |
| Git and GitHub | Version control and source hosting |
| GitHub Pages | Website hosting and deployment |

## Architecture

This is a **static front-end website**. GitHub Pages serves the HTML, CSS, JavaScript, and images, and interactions run in the visitor’s browser. The project requires no custom backend, database, package installation, or build step.

## Run Locally

```bash
git clone https://github.com/mouryatanusri/GGC-Website.git
cd GGC-Website
```

Open `index.html` in your browser.

## Deployment

GitHub Pages publishes the site from the root of the `main` branch. Pushing changes to `main` triggers a deployment. Check the repository’s **Actions** tab for its status.
