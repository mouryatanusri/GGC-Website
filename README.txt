Google Genesis Club | HITS

Live demo
https://mouryatanusri.github.io/GGC-Website/

Project overview

A responsive website for Google Genesis Club, a student-led technical community at Hindustan Institute of Technology and Science. The site introduces the club, showcases its workshops and ideathons, and gives students a way to connect with the team.

My role

I designed and built the front end, created the illustrated layouts, implemented the interactive sections, and deployed the site with GitHub Pages. I tested the live site on desktop and mobile and refined the navigation, typography, spacing, and image layouts based on what I saw on each screen.

What I built

- Animated homepage illustration. I layered SVG effects over an illustration of students coding and building a circuit, so the animation scales with the artwork.
- Interactive About section. Five illustrated chapters expand and slide as visitors select a card or use the previous and next buttons. The illustration and description update together.
- Event showcase. Thinkathon 9.0 has a featured card alongside workshops on prompt engineering with Gemini, machine learning, and security operations. Past and Upcoming tabs organize events, and Explore more links open the related Instagram posts.
- Responsive navigation. A color-coded desktop side dock highlights the current section and hides near the footer. On phones, a compact navigation bar sits at the top of the page and scrolls away with it.

Technical decisions

- Used JavaScript to render About chapters from structured data and route card clicks and arrow buttons through the same selection logic.
- Used CSS media queries to adapt the layout for phones, including fitting the full About illustration inside the expanded card.
- Versioned the stylesheet URL after testing revealed that a returning mobile browser was still serving cached styles.

Tech stack

- HTML5 for page structure
- CSS3 for responsive layouts, styling, and transitions
- Vanilla JavaScript for navigation, event tabs, and chapter interactions
- SVG and PNG for illustrations and animation layers
- Git and GitHub for version control
- GitHub Pages for hosting and deployment

Run locally

Clone the repository and open index.html in your browser. No package installation or build step is required.

Deployment

GitHub Pages publishes the site from the main branch. Push changes to main and check the Actions tab for deployment status.
