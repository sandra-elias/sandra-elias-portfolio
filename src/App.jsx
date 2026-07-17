import { useState, useEffect } from "react";
import { FiMail, FiMoon, FiSun } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Personal site — React single-file component.
// Edit the SITE object below to make it yours. The <style> block holds the
// visual design; --accent near the top is the reddish-pink color.

const NAV = ["Home", "Experience", "Projects"];

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
  about:
    "I've led projects in health-tech and industrial automation, shipping products that solved problems for users.",
  current: {
    before: "Incoming Program Manager Intern at ",
    link: { label: "Tesla", href: "https://www.tesla.com/" },
    after: ", working across product and fleet data for Semi Engineering.",
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
      role: "Program Management Intern",
      dates: "Sep 2026 - Dec 2026",
      description: "Incoming Fall 2026.",
    },
    {
      company: "League",
      companyUrl: "https://league.com/",
      logo: "/logos/league_logo.jpeg",
      role: "Technical Project Management Intern",
      location: "Toronto, ON",
      dates: "Jan 2026 - Apr 2026",
      description: "Managed end-to-end delivery of digital health programs.",
    },
    {
      company: "Eclipse Automation",
      companyUrl: "https://www.eclipseautomation.com/",
      logo: "/logos/eclipse_logo.jpeg",
      role: "Business Development Analyst Intern",
      location: "Cambridge, ON",
      dates: "May 2025 - Aug 2025",
      description: "Led client strategy and nuclear business development.",
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

      <p>{SITE.about}</p>

      <p>
        {SITE.current.before}
        <a href={SITE.current.link.href} target="_blank" rel="noopener noreferrer">
          {SITE.current.link.label}
        </a>
        {SITE.current.after}
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
            <div className="experience-row">
              <img className="experience-logo" src={e.logo} alt={`${e.company} logo`} />
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
          </li>
        ))}
      </ul>
    </>
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

export default function App() {
  const [page, setPage] = useState("Home");
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.body.style.background = isDark ? "#121212" : "#fff";
  }, [isDark]);

  return (
    <div className={`site${isDark ? " dark" : ""}`}>
      <style>{css}</style>
      <button
        type="button"
        className="theme-toggle"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setIsDark((d) => !d)}
      >
        {isDark ? <FiSun /> : <FiMoon />}
      </button>

      <div className="wrap">
        <nav>
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              aria-current={page === item ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                setPage(item);
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        {page === "Home" ? (
          <Home />
        ) : page === "Experience" ? (
          <Experience />
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
    --serif: Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif;
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

  .site .wrap {
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
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.1;
    color: var(--ink);
    margin: 0 0 1.9rem;
  }
  .site h1 .dot { color: var(--accent); }

  .site h2 {
    font-family: var(--sans);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--ink);
    margin: 3rem 0 1.1rem;
  }

  .site p { margin: 0 0 1.3rem; }
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
  .site ul.socials a { border-bottom: none; }
  .site ul.socials a:hover { border-bottom: 1px solid var(--accent-dk); }

  .site a:focus-visible,
  .site button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 2px;
  }

  .site ul.experience { list-style: none; padding: 0; margin: 0; }
  .site ul.experience li + li { margin-top: 2.4rem; }

  .site .experience-row {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  .site .experience-logo {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    object-fit: cover;
    flex: 0 0 auto;
  }
  .site .experience-main {
    flex: 1 1 auto;
    min-width: 0;
    padding-top: 0.15rem;
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
    margin-left: calc(52px + 1rem);
  }
  .site .experience-meta {
    flex: 0 0 auto;
    text-align: right;
    color: var(--muted);
    font-size: 0.85rem;
  }
  .site .experience-meta p { margin: 0; }
  .site .experience-meta p + p { margin-top: 0.15rem; }

  @media (prefers-reduced-motion: reduce) {
    .site * { transition: none !important; }
  }
  @media (max-width: 480px) {
    .site h1 { font-size: 2rem; }
    .site nav { gap: 1.1rem; }
  }
`;
