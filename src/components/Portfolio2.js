import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./portfolio.css";

gsap.registerPlugin(ScrollTrigger);

/* ---------- content ---------- */
const THEMES = {
  night: ["#0A1224", "#EDEBE4"],
  deep: ["#12213F", "#EDEBE4"],
  dusk: ["#3B2D5E", "#F1E9F5"],
  dawn: ["#F2A66E", "#1A1220"],
  day: ["#F3EFE6", "#0A1224"],
};

const STOPS = [
  { when: "Early 2023", name: "iSystematic Inc.", role: "Intern", text: "My first real codebase. I built features, debugged backend APIs and learned how a team ships software." },
  { when: "Then", name: "Monster Hub", role: "MERN Stack Engineer", text: "Joined as an engineer working across React, Node, Express and MongoDB." },
  { when: "Now", name: "Devtronics", role: "Still growing", text: "Pairing full-stack work with a deeper pull into DevOps." },
  { when: "Also now", name: "EnvDock", role: "Founder and builder", text: "My own company: a secure environment variable manager for teams. Next chapter." },
];

const TOOLS = [
  ["Interfaces", "React Next.js TypeScript JavaScript Tailwind SCSS Redux Vite Webpack Figma"],
  ["Servers", "Node.js Express MongoDB Firebase REST Docker AWS"],
  ["Delivery", "AWS Terraform Docker Jenkins Kubernetes NGINX Apache Linux Bash"],
  ["Everyday", "Git GitHub Postman npm Yarn HTML5 CSS3"],
];

const CERTS = [
  { name: "Responsive Web Design", org: "freeCodeCamp", text: "A 300-hour program on front-end fundamentals: HTML5, CSS3 and responsive design that adapts to any screen.", href: "https://www.freecodecamp.org/certification/shahmeer-hussain/responsive-web-design" },
  { name: "Introduction to Cybersecurity", org: "Cisco", text: "Core concepts of threats, attacks and vulnerabilities, plus data protection and security best practices.", href: "https://www.credly.com/badges/6a465e03-b48a-4fe9-b6cd-e1d82d5b31f8/linked_in_profile" },
  { name: "Networking Basics", org: "Cisco", text: "IP addressing, network protocols and how data moves, the groundwork for deeper networking and security.", href: "https://media.licdn.com/dms/image/v2/D562DAQE6uBuyAJyuhg/profile-treasury-document-images_800/B56ZT.Rs.qHoAk-/1/1739432843048?e=1757548800&v=beta&t=KBgLme88V9jq2zw4ZzCjMCpi8xY0s_EiHAz1i1zD7uM" },
  { name: "Introduction to MongoDB", org: "MongoDB", text: "NoSQL fundamentals: CRUD operations, data modeling and querying in document databases.", href: "https://learn.mongodb.com/c/1yO4wTMyS0ObOCJctXJqiA" },
  { name: "NDG Linux Unhatched", org: "Cisco", text: "Essential Linux commands, file system navigation and basic shell scripting.", href: "https://media.licdn.com/dms/image/v2/D4D2DAQHkVc73kpM2lA/profile-treasury-document-images_800/profile-treasury-document-images_800/1/1714919673755?e=1757548800&v=beta&t=VHLKzm4Qb7UFI5e9kWCou0Xueje-AyR5tEfbpUcaipY" },
  { name: "Getting Started with MongoDB Atlas", org: "MongoDB", text: "Deploying clusters, connecting apps, managing security and monitoring cloud-hosted databases.", href: "https://learn.mongodb.com/c/SC3-cZHKQU-1OuuFiOhLOg" },
  { name: "MongoDB Node.js Developer Path", org: "MongoDB", text: "Integrating MongoDB with Node.js: schema design, aggregation pipelines, indexing and performance.", href: "https://learn.mongodb.com/c/kPmNiBVaTGyCMWaPRfImMw" },
];

const STORY =
  "It started with that question, then turned into late-night sessions and online certificates. I didn't wait for graduation. While studying Computer Science at Iqra University I was already interning, freelancing and shipping. In early 2023 I landed my first internship at iSystematic Inc. Within months I was building features and debugging backend APIs with a team. Age doesn't define ability. Passion, persistence and practice do.";

const AHEAD =
  "I'm not here only to write code. I'm here to solve problems, learn relentlessly and build things people enjoy using. A startup that needs a developer, a team that needs MERN depth, a mentor who sees potential, or someone curious about EnvDock: I'm ready to grow, contribute and build.";

const FOUNDER =
  "I'm the founder and builder of EnvDock, a secure environment variable manager. Teams sync their .env files and secrets in one place, so nobody pastes them into Slack or email again.";

// Fake values, only here to show the idea.
const VAULT = [
  ["DATABASE_URL", "postgres://admin:s3cr3t@db"],
  ["STRIPE_SECRET", "sk_live_51Hx9fake"],
  ["JWT_SECRET", "kT9vQ2nL8wExample"],
];

/* ---------- small pieces ---------- */
// Heading where every character sits in a clipped mask so it can rise into place.
const Split = ({ lines, as: Tag = "h2", className = "" }) => (
  <Tag className={`pf-display ${className}`} aria-label={lines.join(" ")}>
    {lines.map((line, i) => (
      <span className="pf-ln" aria-hidden="true" key={i}>
        {line.split(" ").map((word, j) => (
          <Fragment key={j}>
            {j > 0 && " "}
            <span className="pf-w">
              {[...word].map((ch, k) => (
                <span className="pf-c" key={k}>{ch}</span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    ))}
  </Tag>
);

// Paragraph whose words light up with scroll.
const Words = ({ text, className = "" }) => (
  <p className={`pf-story ${className}`} data-words>
    {text.split(" ").map((w, i) => (
      <span className="pf-wd" key={i}>{w} </span>
    ))}
  </p>
);

const Clock = () => {
  const get = () =>
    new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit" });
  const [t, setT] = useState(get);
  useEffect(() => {
    const id = setInterval(() => setT(get()), 15000);
    return () => clearInterval(id);
  }, []);
  return <>{t}</>;
};

// Own component with own state so opening a cert never re-renders the pinned sections.
const Certs = () => {
  const [open, setOpen] = useState(-1);
  return (
    <div>
      {CERTS.map((c, i) => (
        <div className={`pf-cert ${open === i ? "is-open" : ""}`} key={c.name}>
          <button aria-expanded={open === i} aria-controls={`pf-cb-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="pf-cn">{c.name}</span>
            <span className="pf-co">{c.org}</span>
            <i aria-hidden="true">+</i>
          </button>
          <div className="pf-cb" id={`pf-cb-${i}`} onTransitionEnd={() => ScrollTrigger.refresh()}>
            <div className="pf-cbi">
              <div>
                <p>{c.text}</p>
                <a href={c.href} target="_blank" rel="noopener noreferrer">View certificate</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------- page ---------- */
export default function Portfolio() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const lineRef = useRef(null);
  const lenisRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = (s) => gsap.utils.toArray(s, root);
    const chap = root.querySelector(".pf-chap");
    let dead = false;
    let lenis = null;
    let boost = 0;
    const cleanups = [];

    gsap.set(document.body, { backgroundColor: THEMES.night[0], color: THEMES.night[1] });

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.085 });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
      cleanups.push(() => gsap.ticker.remove(raf));
    }

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.set(q(".pf-c"), { yPercent: 112 });

        /* sideways path on desktop. Created first so everything below measures correctly. */
        mm.add("(min-width: 900px)", () => {
          const track = trackRef.current;
          const dist = () => track.scrollWidth - window.innerWidth;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root.querySelector(".pf-path"),
                start: "top top",
                end: () => "+=" + dist(),
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            })
            .to(track, { x: () => -dist(), ease: "none" }, 0)
            .to(lineRef.current, { scaleX: 1, ease: "none" }, 0);
        });
        mm.add("(max-width: 899px)", () => {
          q(".pf-panel:not(.pf-intro)").forEach((p) =>
            gsap.from(p.children, {
              y: 50, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: p, start: "top 80%" },
            })
          );
        });

        /* progress bar and the rising sun */
        gsap.to(".pf-bar", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
        gsap.fromTo(
          ".pf-sun",
          { y: "46vh", x: "-12vw", scale: 0.9 },
          { y: "-62vh", x: "58vw", scale: 1.15, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 1.4 } }
        );

        /* headings rise per character */
        q("[data-split]").forEach((el) => {
          if (el.closest(".pf-hero")) return;
          gsap.to(el.querySelectorAll(".pf-c"), {
            yPercent: 0, stagger: 0.025, duration: 1.1, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        /* words light up with scroll */
        q("[data-words]").forEach((p) =>
          gsap.to(p.querySelectorAll(".pf-wd"), {
            opacity: 1, stagger: 0.12, ease: "none",
            scrollTrigger: { trigger: p, start: "top 80%", end: "bottom 55%", scrub: true },
          })
        );

        /* secrets get masked one by one as the vault comes into view */
        gsap.fromTo(
          q(".pf-mask"),
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)", stagger: 0.4, duration: 0.9, ease: "power3.inOut",
            scrollTrigger: { trigger: root.querySelector(".pf-vault"), start: "top 70%" },
          }
        );

        /* tool marquees speed up with scroll velocity */
        const tweens = q(".pf-mq").map((r, i) =>
          gsap.fromTo(r, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, ease: "none", duration: 26 + i * 5, repeat: -1 })
        );
        ScrollTrigger.create({
          onUpdate: (s) => { boost = Math.max(boost, Math.min(Math.abs(s.getVelocity()) / 260, 7)); },
        });
        const spin = () => { boost *= 0.94; tweens.forEach((t) => t.timeScale(1 + boost)); };
        gsap.ticker.add(spin);
        cleanups.push(() => gsap.ticker.remove(spin));

        /* custom cursor and magnetic buttons (mouse only) */
        if (window.matchMedia("(pointer: fine)").matches) {
          const cur = root.querySelector(".pf-cur");
          document.documentElement.classList.add("pf-hascur");
          const qx = gsap.quickTo(cur, "x", { duration: 0.4, ease: "power3" });
          const qy = gsap.quickTo(cur, "y", { duration: 0.4, ease: "power3" });
          const move = (e) => { qx(e.clientX); qy(e.clientY); };
          window.addEventListener("mousemove", move);
          cleanups.push(() => {
            window.removeEventListener("mousemove", move);
            document.documentElement.classList.remove("pf-hascur");
          });
          q("a, button").forEach((el) => {
            el.addEventListener("mouseenter", () => cur.classList.add("pf-curbig"));
            el.addEventListener("mouseleave", () => cur.classList.remove("pf-curbig"));
          });
          q(".pf-mag").forEach((el) => {
            el.addEventListener("mousemove", (e) => {
              const r = el.getBoundingClientRect();
              gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4 });
            });
            el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.4)" }));
          });
        }
      }

      /* sky: background and text colour change per chapter */
      q("[data-theme]").forEach((s) =>
        ScrollTrigger.create({
          trigger: s, start: "top 55%", end: "bottom 55%",
          onToggle: (self) => {
            if (!self.isActive) return;
            const [bg, fg] = THEMES[s.dataset.theme];
            gsap.to(document.body, { backgroundColor: bg, color: fg, duration: reduce ? 0 : 1.4, ease: "power2.out", overwrite: "auto" });
            if (chap.textContent !== s.dataset.ch) {
              chap.textContent = s.dataset.ch;
              if (!reduce) gsap.fromTo(chap, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
            }
          },
        })
      );

      /* the opening: counter, curtain, name */
      if (!reduce) {
        const cnt = root.querySelector(".pf-cnt");
        const n = { v: 0 };
        let started = false;
        const go = () => {
          if (started || dead) return;
          started = true;
          ctx.add(() => {
            gsap.to(n, {
              v: 100, duration: 2, ease: "power2.inOut",
              onUpdate: () => { cnt.textContent = Math.round(n.v); },
              onComplete: () => {
                gsap
                  .timeline({ defaults: { ease: "power4.out" } })
                  .to(".pf-loader", { yPercent: -100, duration: 1.2, ease: "power4.inOut" })
                  .set(".pf-loader", { display: "none" })
                  .to(".pf-hero .pf-c", { yPercent: 0, duration: 1.4, stagger: 0.04 }, "-=0.5")
                  .from(".pf-hero .pf-fade", { opacity: 0, y: 24, stagger: 0.15, duration: 1 }, "-=0.9")
                  .add(() => lenis && lenis.start(), "-=0.6");
              },
            });
          });
        };
        const t = setTimeout(go, 1200); // failsafe if fonts take too long
        cleanups.push(() => clearTimeout(t));
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
        else go();
      }
    }, root);

    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    const late = setTimeout(() => ScrollTrigger.refresh(), 900);

    return () => {
      dead = true;
      clearTimeout(late);
      cleanups.forEach((fn) => fn());
      mm.revert();
      ctx.revert();
      if (lenis) lenis.destroy();
      lenisRef.current = null;
      gsap.set(document.body, { clearProps: "backgroundColor,color" });
    };
  }, []);

  const toTop = (e) => {
    e.preventDefault();
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 2.2 });
    else window.scrollTo(0, 0);
  };

  return (
    <div className="pf" ref={rootRef}>
      <div className="pf-loader" aria-hidden="true">
        <span>Warming up the servers</span>
        <b className="pf-cnt">0</b>
      </div>
      <div className="pf-cur" aria-hidden="true" />
      <div className="pf-bar" aria-hidden="true" />
      <div className="pf-sun" aria-hidden="true" />
      <div className="pf-grain" aria-hidden="true" />

      <nav className="pf-nav">
        <a href="#top" onClick={toTop}>Shahmeer Hussain</a>
        <span>
          <span className="pf-chap">Hello</span> &nbsp;/&nbsp; Karachi <Clock />
        </span>
      </nav>

      <main className="pf-main" id="top">
        <section className="pf-hero" data-theme="night" data-ch="Hello">
          <Split as="h1" lines={["Shahmeer", "Hussain"]} className="pf-huge" />
          <div className="pf-row">
            <p className="pf-fade">Full-stack developer and founder of EnvDock, in Karachi. I build MERN products and care about what happens after deploy.</p>
            <div className="pf-hint pf-fade"><i />Scroll, the sun is rising</div>
          </div>
        </section>

        <section className="pf-curious" data-theme="deep" data-ch="Curiosity">
          <Split lines={["How do", "websites", "actually work?"]} className="pf-mid" />
          <Words text={STORY} />
        </section>

        <section className="pf-path" data-theme="dusk" data-ch="The path">
          <div className="pf-track" ref={trackRef}>
            <div className="pf-panel pf-intro">
              <Split lines={["Three stops,", "one direction."]} className="pf-mid" />
              <p className="pf-it">Keep scrolling, the road runs sideways.</p>
            </div>
            {STOPS.map((s) => (
              <div className="pf-panel" key={s.name}>
                <span className="pf-when">{s.when}</span>
                <h3 className="pf-display pf-stop">{s.name}</h3>
                <span className="pf-role">{s.role}</span>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="pf-pl" ref={lineRef} />
        </section>

        <section className="pf-founder" data-theme="dusk" data-ch="Founder">
          <div className="pf-fcol">
            <Split lines={["I also build", "my own."]} className="pf-mid" />
            <p className="pf-fp">{FOUNDER}</p>
            <div className="pf-links">
              <a className="pf-mag" href="https://envdock.cloud" target="_blank" rel="noopener noreferrer">Visit envdock.cloud</a>
            </div>
          </div>
          <div className="pf-vault" role="img" aria-label="Example .env file with secret values hidden">
            <div className="pf-vhead"><span>EnvDock</span><span>.env, shared safely</span></div>
            {VAULT.map(([k, v]) => (
              <div className="pf-vline" key={k}>
                <span className="pf-key">{k}</span>
                <span className="pf-val">
                  {v}
                  <span className="pf-mask">••••••••••••</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="pf-tools" data-theme="dusk" data-ch="Toolkit">
          <div className="pf-head">
            <Split lines={["MERN by trade,", "DevOps by habit."]} className="pf-mid" />
            <p>I think about performance, user experience and how systems fit together, not only whether the code runs.</p>
          </div>
          {TOOLS.map(([label, list]) => {
            const items = list.split(" ");
            return (
              <div className="pf-mqw" key={label}>
                <small>{label}</small>
                <div className="pf-mq pf-display" aria-label={items.join(", ")}>
                  {[...items, ...items].map((t, i) => (
                    <span key={i} aria-hidden="true">{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <section className="pf-learn" data-theme="dawn" data-ch="Learning">
          <div className="pf-lhead">
            <Split lines={["Still a", "student."]} className="pf-mid" />
            <p>I'm completing my Bachelor's in Computer Science and keep collecting certificates because the field keeps moving. Open one to read more.</p>
          </div>
          <Certs />
        </section>

        <section className="pf-ahead" data-theme="day" data-ch="Ahead">
          <Words text={AHEAD} />
        </section>

        <section className="pf-contact" data-theme="day" data-ch="Say hello">
          <div>
            <Split lines={["Let's build", "what's next."]} className="pf-huge" />
            <a className="pf-mail pf-display pf-mag" href="mailto:hussainshahmeer99@gmail.com">hussainshahmeer99@gmail.com</a>
            <div className="pf-links">
              <a className="pf-mag" href="https://wa.me/923202186570" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a className="pf-mag" href="https://linkedin.com/in/shah-meer-hussain" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="pf-mag" href="https://github.com/shahmeerhussain1" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="pf-mag" href="https://envdock.cloud" target="_blank" rel="noopener noreferrer">EnvDock</a>
            </div>
          </div>
          <footer>
            <span>Karachi, <Clock /> now</span>
            <button onClick={toTop}>Back to the night sky</button>
          </footer>
        </section>
      </main>
    </div>
  );
}
