import { useState, useEffect, useRef } from "react";
import { FiMail, FiMoon, FiSun } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Personal site — React single-file component.

const NAV = ["Home", "Experience", "Projects"];

function pathFor(item) {
  return item === "Home" ? "/" : `/${item.toLowerCase()}`;
}

// A route is { page, slug }: slug is set when viewing a single project.
function getRouteFromPath() {
  // Old #section links still work: rewrite them to the clean path.
  const hash = window.location.hash.slice(1).toLowerCase();
  if (hash) window.history.replaceState(null, "", hash === "home" ? "/" : `/${hash}`);

  const [first = "", second] = window.location.pathname
    .replace(/^\/|\/$/g, "")
    .toLowerCase()
    .split("/");
  const page = NAV.find((item) => item.toLowerCase() === first) ?? "Home";
  const slug =
    page === "Projects" && SITE.projects.some((p) => p.slug === second) ? second : null;
  return { page, slug };
}

const ICONS = {
  mail: <FiMail />,
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
};

const SITE = {
  name: "Sandra Elias",
  intro: {
    before: "I'm a ",
    link: {
      label: "Management Engineering",
      href: "https://uwaterloo.ca/future-students/programs/management-engineering",
    },
    after:
      " student at the University of Waterloo interested in product, operations, & data.",
  },
  current: {
    before: "Technical Program Manager Intern at ",
    link: { label: "Tesla", href: "https://www.tesla.com/" },
    after: ", working across product and fleet data for Semi Engineering.",
  },
  personal: {
    before:
      "Outside of school and work, I love trying new restaurants, grabbing matcha, staying active, and hanging out with my dog ",
    after: ".",
  },
  socials: [
    { label: "Email", href: "mailto:sm2elias@uwaterloo.ca", icon: "mail" },
    { label: "GitHub", href: "https://github.com/sandra-elias", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sandraelias", icon: "linkedin" },
  ],
  experience: [
    {
      company: "Tesla",
      companyUrl: "https://www.tesla.com/",
      logo: "/logos/tesla_logo.jpeg",
      role: "Technical Program Management Intern",
      dates: "Sep 2026 - Dec 2026",
      description: "Building programs and products for Tesla Semi Engineering.",
    },
    {
      company: "League",
      companyUrl: "https://league.com/",
      logo: "/logos/league_logo.jpeg",
      role: "Technical Project Management Intern",
      location: "Toronto, ON",
      dates: "Jan 2026 - Apr 2026",
      description: "Delivered digital health products for Canada’s largest insurer.",
    },
    {
      company: "Eclipse Automation",
      companyUrl: "https://www.eclipseautomation.com/",
      logo: "/logos/eclipse_logo.jpeg",
      role: "Business Development Analyst Intern",
      location: "Cambridge, ON",
      dates: "May 2025 - Aug 2025",
      description: "Led business development for industrial automation.",
    },
  ],
  projects: [
    {
      slug: "forkcast",
      name: "Forkcast",
      summary:
        "A restaurant roulette web app for when nobody can decide what's for dinner.",
      links: [
        { label: "Live site", href: "https://forkcast-whats-for-dinner.vercel.app" },
        { label: "GitHub", href: "https://github.com/sandra-elias/forkcast" },
      ],
      // Screenshots in the app's light and dark themes. The gallery shows
      // the opposite of the portfolio's current theme so they stand out.
      images: {
        light: [
          { src: "/projects/forkcast/landing-light.png", alt: "Forkcast landing page, with a zip or postal code field and a Use my location button" },
          { src: "/projects/forkcast/map.jpg", alt: "Map of Toronto with the search radius drawn as a circle, a radius slider and a SPIN button" },
          { src: "/projects/forkcast/filters.jpg", alt: "Filters panel open, with an Open now switch and cuisines to exclude" },
          { src: "/projects/forkcast/result.jpg", alt: "Spin result card for Touhenboku Ramen, a Japanese restaurant, with distance, address, phone, website and a Get directions button" },
        ],
        dark: [
          { src: "/projects/forkcast/landing-dark.png", alt: "Forkcast landing page in dark mode, with a zip or postal code field and a Use my location button" },
          { src: "/projects/forkcast/map-dark.jpg", alt: "Dark mode map of Toronto with the search radius drawn as a circle, a radius slider and a SPIN button" },
          { src: "/projects/forkcast/filters-dark.jpg", alt: "Dark mode filters panel open, with an Open now switch and cuisines to exclude" },
          { src: "/projects/forkcast/result-dark.jpg", alt: "Dark mode spin result card for Sumaq Iraqi Charcoal Grill, with distance, address and a Get directions button" },
        ],
      },
      overview:
        "Enter a US zip code or Canadian postal code (or share your location), pick how far you’re willing to travel, and hit Spin. Forkcast picks a random nearby restaurant and gives you a Google Maps link to get there.",
      sections: [
        {
          title: "The problem",
          body: "Picking a place to eat with friends often takes longer than the meal. Everyone says “I don’t care, you pick,” then turns down every suggestion. Review apps don’t help, because they add hundreds of options to compare. People don’t need more choices. They need something to make the call.",
        },
        {
          title: "Who it’s for",
          items: [
            "Friends, roommates and families stuck on “where should we eat?”",
            "Anyone eating alone who’s tired of scrolling through reviews",
          ],
        },
        {
          title: "How it works",
          items: [
            "Type a zip or postal code, or use your location.",
            "A map shows your search radius. Adjust the distance, keep “Open now” on, and exclude cuisines you’re not in the mood for.",
            "Spin. Restaurant names cycle like a wheel and land on one, with its cuisine, distance, address and hours.",
            "Not feeling it? “Spin again” never repeats a restaurant.",
          ],
        },
        {
          title: "Decisions",
          items: [
            { lead: "One input box, no country picker.", text: "US and Canadian codes look different, so the app works out the country from the format. That’s one less step before the first spin." },
            { lead: "No ratings, on purpose.", text: "The goal is to stop comparing options, so I chose free open data over a paid source with ratings." },
            { lead: "Privacy by default.", text: "Your location is rounded to about 100 m before it leaves your device." },
          ],
        },
      ],
    },
  ],
};

function Home() {
  return (
    <>
      <h1>
        {SITE.name}
        <span className="dot">.</span>
      </h1>

      <p>
        {SITE.intro.before}
        <a href={SITE.intro.link.href} target="_blank" rel="noopener noreferrer">
          {SITE.intro.link.label}
        </a>
        {SITE.intro.after}
      </p>

      <p>
        {SITE.current.before}
        <a href={SITE.current.link.href} target="_blank" rel="noopener noreferrer">
          {SITE.current.link.label}
        </a>
        {SITE.current.after}
      </p>

      <p>
        {SITE.personal.before}
        <span className="cooper">
          Cooper
          <img src="/logos/Cooper.png" alt="Cooper" />
        </span>
        {SITE.personal.after}
      </p>

      <h2>Contact</h2>
      <ul className="socials">
        {SITE.socials.map((s) => {
          const isMailto = s.href.startsWith("mailto:");
          return (
            <li key={s.label}>
              <a
                href={s.href}
                {...(!isMailto && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <span className="icon" aria-hidden="true">
                  {ICONS[s.icon]}
                </span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Experience() {
  return (
    <>
      <h1>
        Experience
        <span className="dot">.</span>
      </h1>

      <ul className="experience">
        {SITE.experience.map((e) => (
          <li key={e.company}>
            <img className="experience-logo" src={e.logo} alt={`${e.company} logo`} />
            <div className="experience-body">
              <div className="experience-row">
                <div className="experience-main">
                  <p className="experience-title">{e.role}</p>
                  <p className="experience-company">
                    {e.companyUrl ? (
                      <a href={e.companyUrl} target="_blank" rel="noopener noreferrer">
                        {e.company}
                      </a>
                    ) : (
                      e.company
                    )}
                  </p>
                </div>
                <div className="experience-meta">
                  <p>{e.dates}</p>
                </div>
              </div>
              <p className="experience-description">{e.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function Projects({ onOpen }) {
  return (
    <>
      <h1>
        Projects
        <span className="dot">.</span>
      </h1>

      <ul className="projects">
        {SITE.projects.map((p) => (
          <li key={p.slug}>
            <a
              className="project-link"
              href={`/projects/${p.slug}`}
              onClick={(e) => onOpen(e, p.slug)}
            >
              <span className="project-name">{p.name}</span>
              <span className="project-summary">{p.summary}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

function Gallery({ images }) {
  // Both sets have the same screens in the same order.
  const [current, setCurrent] = useState(0);
  const image = images[current];
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div className="gallery">
      <div className="gallery-frame">
        <div className="gallery-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <button
          type="button"
          className="gallery-main"
          onClick={next}
          aria-label={`Screenshot ${current + 1} of ${images.length}. Show next screenshot`}
        >
          <img src={image.src} alt={image.alt} />
        </button>
      </div>

      <div className="gallery-thumbs">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            className="gallery-thumb"
            onClick={() => setCurrent(i)}
            aria-label={`Show screenshot ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
          >
            <img src={img.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack, isDark }) {
  return (
    <article className="project">
      <a className="back" href="/projects" onClick={onBack}>
        ← All projects
      </a>

      <h1>{project.name}</h1>
      <p>{project.summary}</p>

      <ul className="project-links">
        {project.links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          </li>
        ))}
      </ul>

      <p>{project.overview}</p>

      <Gallery images={isDark ? project.images.light : project.images.dark} />

      {project.sections.map((sec) => (
        <section key={sec.title}>
          <h2>{sec.title}</h2>
          {sec.body && <p>{sec.body}</p>}
          {sec.items && (
            <ul className="project-list">
              {sec.items.map((item) =>
                typeof item === "string" ? (
                  <li key={item}>{item}</li>
                ) : (
                  <li key={item.lead}>
                    <strong>{item.lead}</strong> {item.text}
                  </li>
                )
              )}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}

function Placeholder({ title }) {
  return (
    <>
      <h1>
        {title}
        <span className="dot">.</span>
      </h1>
      <p>Nothing here yet — this is where your {title.toLowerCase()} will go.</p>
    </>
  );
}

const TRAIL_LIFE = 450; // ms a point of the trail stays visible

function CursorTrail() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canvas || !canHover || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    let points = [];
    let frame = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = () => {
      const now = performance.now();
      points = points.filter((p) => now - p.t < TRAIL_LIFE);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.lineCap = "butt";
      ctx.shadowColor = "rgba(211, 60, 102, 0.6)";
      ctx.shadowBlur = 8;

      // Each segment runs midpoint to midpoint so the curve stays smooth
      // while its width and opacity taper with age.
      for (let i = 1; i < points.length - 1; i++) {
        const prev = points[i - 1];
        const cur = points[i];
        const next = points[i + 1];
        const life = 1 - (now - cur.t) / TRAIL_LIFE;
        ctx.beginPath();
        ctx.moveTo((prev.x + cur.x) / 2, (prev.y + cur.y) / 2);
        ctx.quadraticCurveTo(cur.x, cur.y, (cur.x + next.x) / 2, (cur.y + next.y) / 2);
        ctx.lineWidth = 0.5 + life * 2.5;
        ctx.strokeStyle = `rgba(211, 60, 102, ${life * 0.75})`;
        ctx.stroke();
      }

      frame = points.length ? requestAnimationFrame(draw) : 0;
    };

    const handleMove = (e) => {
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (!frame) frame = requestAnimationFrame(draw);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={ref} className="cursor-trail" aria-hidden="true" />;
}

export default function App() {
  const [route, setRoute] = useState(getRouteFromPath);
  const { page, slug } = route;
  const project = slug ? SITE.projects.find((p) => p.slug === slug) : null;
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.body.style.background = isDark ? "#121212" : "#fff";
  }, [isDark]);

  // Follow system theme changes until the visitor picks one with the toggle.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) setIsDark(e.matches);
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDark((d) => {
      localStorage.setItem("theme", d ? "light" : "dark");
      return !d;
    });
  };

  useEffect(() => {
    const handlePopState = () => setRoute(getRouteFromPath());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const go = (e, next) => {
    // Let cmd/ctrl-click open the page in a new tab as usual.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const path = next.slug ? `/projects/${next.slug}` : pathFor(next.page);
    if (path !== window.location.pathname) window.history.pushState(null, "", path);
    setRoute(next);
    window.scrollTo(0, 0);
  };
  const navigate = (e, item) => go(e, { page: item, slug: null });

  return (
    <div className={`site${isDark ? " dark" : ""}`}>
      <style>{css}</style>
      <CursorTrail />
      <button
        type="button"
        className="theme-toggle"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggleTheme}
      >
        {isDark ? <FiSun /> : <FiMoon />}
      </button>

      <div className="wrap">
        <nav>
          {NAV.map((item) => (
            <a
              key={item}
              href={pathFor(item)}
              onClick={(e) => navigate(e, item)}
              aria-current={page === item ? "page" : undefined}
            >
              {item}
            </a>
          ))}
        </nav>

        {page === "Home" ? (
          <Home />
        ) : page === "Experience" ? (
          <Experience />
        ) : page === "Projects" && project ? (
          <ProjectDetail
            project={project}
            onBack={(e) => navigate(e, "Projects")}
            isDark={isDark}
          />
        ) : page === "Projects" ? (
          <Projects onOpen={(e, s) => go(e, { page: "Projects", slug: s })} />
        ) : (
          <Placeholder title={page} />
        )}
      </div>
    </div>
  );
}

const css = `
  html, body, #root {
    margin: 0;
    min-height: 100%;
  }

  .site {
    --ink: #171717;
    --muted: #565656;
    --accent: #d33c66;      /* reddish pink */
    --accent-dk: #ac2a4f;
    --measure: 38rem;
    --serif: "Gelasio", Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif;
    --sans: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

    font-family: var(--sans);
    color: var(--muted);
    background: #fff;
    line-height: 1.6;
    font-size: 17px;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    transition: background-color .15s ease, color .15s ease;
  }
  .site * { box-sizing: border-box; }

  .site.dark {
    --ink: #f2f2f2;
    --muted: #a3a3a3;
    background: #121212;
  }

  .site .cursor-trail {
    position: fixed;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .site .wrap {
    position: relative;
    z-index: 1;
    max-width: var(--measure);
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  .site nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1.4rem;
    margin-bottom: 3.25rem;
  }
  .site nav a {
    font-size: 0.72rem;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    padding-bottom: 2px;
    border-bottom: 1.5px solid transparent;
    cursor: pointer;
    transition: color .15s ease, border-color .15s ease;
  }
  .site nav a:hover { color: var(--ink); }
  .site nav a[aria-current="page"] {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .site .theme-toggle {
    position: fixed;
    top: 1.75rem;
    right: 1.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    z-index: 10;
    transition: color .15s ease;
  }
  .site .theme-toggle:hover { color: var(--ink); }
  .site .theme-toggle svg { width: 100%; height: 100%; }

  .site h1 {
    font-family: var(--serif);
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: 1.1;
    color: var(--ink);
    margin: 0 0 1.9rem;
  }
  .site h1 .dot { color: var(--accent); }

  .site h2 {
    font-family: var(--sans);
    font-size: 1rem;
    font-weight: 400;
    color: var(--ink);
    margin: 3rem 0 1.1rem;
  }

  .site p { margin: 0 0 1.3rem; text-wrap: pretty; }
  .site p:last-of-type { margin-bottom: 0; }

  .site a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color .15s ease, color .15s ease;
  }
  .site a:hover {
    color: var(--accent-dk);
    border-bottom-color: var(--accent-dk);
  }

  .site ul.socials { list-style: none; padding: 0; margin: 0; }
  .site ul.socials li {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin: 0.6rem 0;
  }
  .site ul.socials li::before {
    content: "";
    flex: 0 0 auto;
    width: 14px;
    height: 1px;
    background: var(--accent);
  }
  .site ul.socials a {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
  }
  .site ul.socials .icon {
    display: inline-flex;
    flex: 0 0 auto;
    width: 16px;
    height: 16px;
  }
  .site ul.socials .icon svg {
    width: 100%;
    height: 100%;
  }
  .site ul.socials a { border-bottom: 1px solid transparent; }
  .site ul.socials a:hover { border-bottom-color: var(--accent-dk); }

  .site a:focus-visible,
  .site button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 2px;
  }

  .site .cooper {
    position: relative;
    color: var(--accent);
    cursor: default;
    border-bottom: 1px solid transparent;
    transition: border-color 0.15s ease;
  }
  .site .cooper:hover {
    border-bottom-color: var(--accent-dk);
  }
  .site .cooper img {
    position: absolute;
    left: 100%;
    top: 50%;
    width: 110px;
    height: 110px;
    margin-left: 50px;
    object-fit: cover;
    border-radius: 18px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(calc(-50% - 4px)) translateX(6px) scale(0.96);
    transition: opacity 0.15s ease, transform 0.15s ease;
    z-index: 20;
  }
  .site .cooper:hover img {
    opacity: 1;
    visibility: visible;
    transform: translateY(calc(-50% - 4px)) translateX(0) scale(1);
  }

  .site ul.experience { list-style: none; padding: 0; margin: 0; }
  .site ul.experience li {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .site ul.experience li + li { margin-top: 2.4rem; }
  .site .experience-body {
    flex: 1 1 auto;
    min-width: 0;
  }

  .site .experience-row {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  .site .experience-logo {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    object-fit: cover;
    flex: 0 0 auto;
  }
  .site .experience-main {
    flex: 1 1 auto;
    min-width: 0;
    padding-top: 0.15rem;
    align-self: baseline;
  }
  .site .experience-title {
    margin: 0;
    color: var(--ink);
    font-weight: 600;
    font-size: 1.08rem;
    line-height: 1.3;
  }
  .site .experience-company {
    margin: 0.3rem 0 0;
    color: var(--muted);
    font-size: 0.92rem;
    line-height: 1.3;
  }
  .site .experience-description {
    margin: 0.55rem 0 0;
    line-height: 1.5;
  }
  .site .experience-meta {
    flex: 0 0 auto;
    align-self: baseline;
    text-align: right;
    color: var(--muted);
    font-size: 0.85rem;
  }
  .site .experience-meta p { margin: 0; }
  .site .experience-meta p + p { margin-top: 0.15rem; }

  /* Projects list */
  .site ul.projects { list-style: none; padding: 0; margin: 0; }
  .site ul.projects li + li { margin-top: 1.8rem; }
  .site a.project-link {
    display: block;
    border-bottom: none;
  }
  .site .project-name {
    display: inline-block;
    color: var(--accent);
    font-weight: 400;
    line-height: 1.3;
    border-bottom: 1px solid transparent;
    transition: border-color .15s ease, color .15s ease;
  }
  .site a.project-link:hover .project-name {
    color: var(--accent-dk);
    border-bottom-color: var(--accent-dk);
  }
  .site .project-summary {
    display: block;
    margin-top: 0.3rem;
    color: var(--muted);
    text-wrap: pretty; /* same line breaks as the summary on the project page */
  }

  /* Project detail */
  .site .back {
    display: inline-block;
    margin-bottom: 1.4rem;
  }
  .site .project h1 {
    font-family: var(--sans);
    /* Lines the summary up with where it sits on the Projects list */
    margin-bottom: calc(0.9rem - 2.6px);
  }
  .site .project h2 {
    font-size: 1.05rem;
    font-weight: 600;
  }
  .site ul.project-links {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    padding: 0;
    margin: 0 0 1.9rem;
  }
  /* Screenshot gallery: one big shot in a browser frame, thumbnails below */
  .site .gallery {
    --frame-bg: #f7f7f7;
    --frame-line: #ececec;
    --bar-bg: #2a2a2a;
    margin: 2rem 0 0.5rem;
  }
  .site.dark .gallery {
    --frame-bg: #1d1d1d;
    --frame-line: #2c2c2c;
    --bar-bg: #2c2c2c;
  }
  .site .gallery-frame {
    padding: 1.25rem;
    background: var(--frame-bg);
    border: 1px solid var(--frame-line);
    border-radius: 6px;
  }
  .site .gallery-bar {
    display: flex;
    gap: 6px;
    padding: 9px 12px;
    background: var(--bar-bg);
    border-radius: 6px 6px 0 0;
  }
  .site .gallery-bar span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
  }
  .site .gallery-main {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }
  .site .gallery-main img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top;
    border-radius: 0 0 6px 6px;
  }
  .site .gallery-thumbs {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.9rem;
    overflow-x: auto;
    padding: 3px;
  }
  .site .gallery-thumb {
    flex: 1 1 0;
    min-width: 84px;
    padding: 0;
    border: 2px solid transparent;
    border-radius: 8px;
    background: none;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity .15s ease, border-color .15s ease;
  }
  .site .gallery-thumb:hover { opacity: 0.85; }
  .site .gallery-thumb[aria-current="true"] {
    opacity: 1;
    border-color: var(--accent);
  }
  .site .gallery-thumb img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top;
    border-radius: 6px;
  }
  .site ul.project-list {
    margin: 0;
    padding-left: 1.1rem;
  }
  .site ul.project-list li { margin: 0.45rem 0; line-height: 1.55; }
  .site ul.project-list li::marker { color: var(--accent); }
  .site ul.project-list strong { color: inherit; font-weight: 400; }

  @media (prefers-reduced-motion: reduce) {
    .site * { transition: none !important; }
  }
  @media (max-width: 480px) {
    .site h1 { font-size: 1.75rem; }
    .site nav { gap: 1.1rem; }

    /* Stack dates under the company so the title gets the full width. */
    .site .experience-row {
      flex-direction: column;
      gap: 0.3rem;
    }
    .site .experience-meta {
      align-self: auto;
      text-align: left;
    }
  }
`;
