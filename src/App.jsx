import { useState, useEffect, useRef } from "react";

// ── Brand tokens from EHUB International Knights logo ──
// Deep navy: #0B1929 | Mid navy: #0F2744 | Sky blue: #4DB8D8 | Gold: #F5C842
const C = {
  navyDark:  "#0B1929",
  navyMid:   "#0F2744",
  navyLight: "#162F50",
  sky:       "#4DB8D8",
  skyLight:  "#7ECFE3",
  skyPale:   "#C8EDF6",
  gold:      "#F5C842",
  white:     "#FFFFFF",
  offWhite:  "#F0F8FC",
  cream:     "#E8F4F8",
};

const LOGO = "/website-demo-ehubbasketball/EHUB_logo_2.jpg";

// New logo is rectangular — render as a horizontal lockup, no circular crop
const LogoImg = ({ size = 48, style = {} }) => (
  <img src={LOGO} alt="EHUB International" style={{ height: size, width: "auto", objectFit: "contain", ...style }} />
);

const Ball = ({ size = 80, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style}>
    <circle cx="40" cy="40" r="38" fill={C.sky} stroke={C.skyLight} strokeWidth="2"/>
    <path d="M40 2 Q55 20 55 40 Q55 60 40 78" stroke={C.navyMid} strokeWidth="2.5" fill="none"/>
    <path d="M40 2 Q25 20 25 40 Q25 60 40 78" stroke={C.navyMid} strokeWidth="2.5" fill="none"/>
    <path d="M2 40 Q20 30 40 30 Q60 30 78 40" stroke={C.navyMid} strokeWidth="2.5" fill="none"/>
    <path d="M2 40 Q20 50 40 50 Q60 50 78 40" stroke={C.navyMid} strokeWidth="2.5" fill="none"/>
  </svg>
);

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeUp = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const FadeIn = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transition: `opacity 0.9s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const NavBar = ({ onJoin }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About", "Programs", "Community", "Events"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(11,25,41,0.97)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(77,184,216,0.15)" : "none", transition: "all 0.4s ease", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LogoImg size={40} style={{ filter: "brightness(0) invert(1)" }} />
          <div style={{ width: 1, height: 28, background: "rgba(77,184,216,0.3)", margin: "0 4px" }} />
          <div style={{ fontSize: 10, color: C.sky, letterSpacing: 3, fontWeight: 700, textTransform: "uppercase", lineHeight: 1.4 }}>
            Knights<br />
            <span style={{ color: "rgba(200,237,246,0.5)", letterSpacing: 2 }}>Basketball</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color: C.sky, fontSize: 14, fontWeight: 500, textDecoration: "none", letterSpacing: 0.5, opacity: 0.85, transition: "opacity 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.color = C.white; }}
              onMouseLeave={e => { e.target.style.opacity = 0.85; e.target.style.color = C.sky; }}
            >{l}</a>
          ))}
          <button onClick={onJoin}
            style={{ background: `linear-gradient(135deg, ${C.sky}, ${C.skyLight})`, color: C.navyDark, padding: "10px 26px", borderRadius: 50, fontSize: 14, fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(77,184,216,0.35)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(77,184,216,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(77,184,216,0.35)"; }}
          >Join the Knights</button>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@400;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.navyDark}; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        @keyframes float0 { from{transform:rotate(20deg) translateY(0)} to{transform:rotate(20deg) translateY(-22px)} }
        @keyframes float1 { from{transform:rotate(-15deg) translateY(0)} to{transform:rotate(-15deg) translateY(-15px)} }
        @keyframes float2 { from{transform:rotate(40deg) translateY(0)} to{transform:rotate(40deg) translateY(-18px)} }
        @keyframes slideWord { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        @keyframes spinRing { to{transform:rotate(360deg)} }
        @keyframes orbitDot { to{transform:rotate(360deg)} }
      `}</style>
    </nav>
  );
};

const Hero = ({ onJoin }) => {
  const words = ["RISE.", "PLAY.", "BELONG."];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <section style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${C.navyDark} 0%, ${C.navyMid} 55%, #0D2035 100%)`, display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "100px clamp(1.5rem, 5vw, 4rem) 60px" }}>
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 700, height: 700, borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%", background: "rgba(77,184,216,0.07)", filter: "blur(80px)" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-10%", width: 500, height: 500, borderRadius: "40% 60% 30% 70% / 60% 40% 70% 30%", background: "rgba(245,200,66,0.05)", filter: "blur(60px)" }} />
      {[
        { top: "12%", right: "6%", size: 130, opacity: 0.15, rotate: 20, anim: "float0", dur: "4s" },
        { top: "62%", right: "18%", size: 65, opacity: 0.1, rotate: -15, anim: "float1", dur: "5s" },
        { bottom: "18%", left: "4%", size: 85, opacity: 0.09, rotate: 40, anim: "float2", dur: "6s" },
      ].map((b, i) => (
        <div key={i} style={{ position: "absolute", top: b.top, bottom: b.bottom, left: b.left, right: b.right, opacity: b.opacity, transform: `rotate(${b.rotate}deg)`, animation: `${b.anim} ${b.dur} ease-in-out infinite alternate` }}>
          <Ball size={b.size} />
        </div>
      ))}

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(77,184,216,0.1)", border: "1px solid rgba(77,184,216,0.25)", borderRadius: 50, padding: "7px 20px", marginBottom: 36 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.sky, animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ color: C.skyLight, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Central Coast, NSW · Est. 2020</span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(3.8rem, 9vw, 8rem)", lineHeight: 0.92, color: C.white, letterSpacing: 2, marginBottom: 10 }}>
            WHERE<br />FILIPINOS
          </h1>
          <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "clamp(3.8rem, 9vw, 8rem)", lineHeight: 0.92, color: C.sky, letterSpacing: 2, marginBottom: 36, minHeight: "1.1em" }}>
            <span key={wordIdx} style={{ display: "inline-block", animation: "slideWord 0.4s ease forwards" }}>{words[wordIdx]}</span>
          </div>
          <p style={{ color: "rgba(200,237,246,0.72)", fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.78, maxWidth: 520, marginBottom: 44, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Bringing together Filipino basketball players of all ages on the Central Coast. Find your community, sharpen your game, and compete with pride.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={onJoin}
              style={{ background: `linear-gradient(135deg, ${C.sky}, ${C.skyLight})`, color: C.navyDark, padding: "16px 38px", borderRadius: 50, fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(77,184,216,0.45)", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(77,184,216,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(77,184,216,0.45)"; }}
            >Join the Knights →</button>
            <a href="#events"
              style={{ color: C.white, padding: "16px 36px", borderRadius: 50, fontSize: 16, fontWeight: 500, textDecoration: "none", border: "1px solid rgba(77,184,216,0.3)", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(77,184,216,0.1)"; e.currentTarget.style.borderColor = "rgba(77,184,216,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(77,184,216,0.3)"; }}
            >View Events</a>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(77,184,216,0.1)", flexWrap: "wrap" }}>
            {[["200+", "Active Players"], ["12+", "Monthly Events"], ["All Ages", "Welcome"], ["Free", "to Join"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: C.sky, letterSpacing: 2 }}>{n}</div>
                <div style={{ fontSize: 11, color: "rgba(200,237,246,0.4)", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Logo orbit panel */}
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", width: 320, height: 320 }}>
              {/* Spinning conic ring */}
              <div style={{ position: "absolute", inset: -22, borderRadius: "50%", background: `conic-gradient(from 0deg, rgba(77,184,216,0.25), rgba(245,200,66,0.15), rgba(77,184,216,0.25), transparent, rgba(77,184,216,0.25))`, animation: "spinRing 14s linear infinite" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid rgba(77,184,216,0.2)" }} />
              {/* Logo circle */}
              <div style={{ position: "absolute", inset: 18, borderRadius: "50%", background: `linear-gradient(145deg, ${C.navyLight}, ${C.navyDark})`, border: "3px solid rgba(77,184,216,0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: 28 }}>
                <img src={LOGO} alt="EHUB International Knights Logo" style={{ width: "100%", height: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </div>
              {/* Orbiting dot */}
              <div style={{ position: "absolute", inset: 0, animation: "orbitDot 8s linear infinite" }}>
                <div style={{ position: "absolute", top: -6, left: "50%", width: 12, height: 12, borderRadius: "50%", background: C.sky, boxShadow: `0 0 16px ${C.sky}`, transform: "translateX(-50%)" }} />
              </div>
              {/* Second slower dot */}
              <div style={{ position: "absolute", inset: 0, animation: "orbitDot 14s linear infinite reverse" }}>
                <div style={{ position: "absolute", top: -4, left: "50%", width: 8, height: 8, borderRadius: "50%", background: C.gold, boxShadow: `0 0 12px ${C.gold}`, transform: "translateX(-50%)" }} />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
      <style>{`.hero-grid { } @media(max-width:900px){.hero-grid{grid-template-columns:1fr!important;} .hero-grid > div:last-child{display:none;}}`}</style>
    </section>
  );
};

const Pain = () => (
  <section style={{ background: C.offWhite, padding: "100px clamp(1.5rem, 5vw, 4rem)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FadeUp>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ color: C.sky, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Sound Familiar?</span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: C.navyDark, marginTop: 14, lineHeight: 1.15 }}>
            You love the game.<br />But something's missing.
          </h2>
        </div>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 24 }}>
        {[
          { emoji: "🤝", title: "No one to play with", body: "You're surrounded by people but can't find other Filipinos who share your love for the game — that deep cultural bond over basketball." },
          { emoji: "📍", title: "Scattered and disconnected", body: "Filipino ballers exist all over the Central Coast but there's no central place to find each other, organise runs, or stay in the loop." },
          { emoji: "🏆", title: "Missing real competition", body: "Pick-up games are fun, but you crave structured games with teammates who push you — community competition that actually means something." },
          { emoji: "👶", title: "No pathway for the next gen", body: "Your kids or younger cousins love basketball but there's no Filipino-led training environment that nurtures their development with cultural pride." },
        ].map(({ emoji, title, body }, i) => (
          <FadeUp key={title} delay={i * 0.1}>
            <div style={{ background: C.white, borderRadius: 24, padding: 32, border: "1px solid rgba(77,184,216,0.15)", transition: "transform 0.3s, box-shadow 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(77,184,216,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: 40, marginBottom: 20 }}>{emoji}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.navyDark, marginBottom: 12 }}>{title}</h3>
              <p style={{ color: "#4A6070", lineHeight: 1.78, fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>{body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

const Solution = () => (
  <section id="programs" style={{ background: `linear-gradient(170deg, ${C.navyDark} 0%, ${C.navyMid} 100%)`, padding: "100px clamp(1.5rem, 5vw, 4rem)", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: "20%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(77,184,216,0.06)", filter: "blur(80px)" }} />
    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
      <FadeUp>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{ color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>The EHUB Knights Difference</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: C.white, marginTop: 14, lineHeight: 1.15 }}>
            Your home court,<br />your community.
          </h2>
          <p style={{ color: "rgba(200,237,246,0.6)", fontSize: 17, lineHeight: 1.78, maxWidth: 540, margin: "24px auto 0", fontFamily: "'DM Sans', sans-serif" }}>
            EHUB Knights is the Central Coast's Filipino basketball community — where the love of the game meets cultural pride.
          </p>
        </div>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {[
          { icon: "🏀", color: C.sky, title: "Competitive Games", body: "Regular scheduled games and tournaments where you compete at the level you want — social, competitive, or elite. Real games, real stakes." },
          { icon: "💪", color: C.gold, title: "Skills Training", body: "Structured training sessions for all ages. From fundamentals for the young ones to advanced drills for experienced players looking to level up." },
          { icon: "🇵🇭", color: C.skyLight, title: "Filipino Brotherhood", body: "A space built by Filipinos, for Filipinos. Share the culture, speak the language, and celebrate the unique bond we have through basketball." },
          { icon: "📅", color: "#5CB85C", title: "Organised Events", body: "Know exactly when and where. Clear schedules, regular fixtures, and community events — no more chasing people for last-minute games." },
          { icon: "👨‍👩‍👧‍👦", color: "#A78BFA", title: "Family Friendly", body: "Bring the whole family. Kids, adults, parents watching on the sideline — everyone is welcome in the EHUB Knights community." },
          { icon: "📣", color: C.sky, title: "Stay Connected", body: "Active group chats, social media updates, and community announcements so you're always in the loop and never miss a game." },
        ].map(({ icon, color, title, body }, i) => (
          <FadeUp key={title} delay={i * 0.08}>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 24, padding: 32, border: "1px solid rgba(77,184,216,0.1)", backdropFilter: "blur(8px)", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = `${color}50`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(77,184,216,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 24, border: `1px solid ${color}35` }}>{icon}</div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 12 }}>{title}</h3>
              <p style={{ color: "rgba(200,237,246,0.52)", lineHeight: 1.78, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>{body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section style={{ background: C.cream, padding: "100px clamp(1.5rem, 5vw, 4rem)" }}>
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <FadeUp>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{ color: C.sky, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Simple Process</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: C.navyDark, marginTop: 14, lineHeight: 1.2 }}>
            Get on the court in three steps
          </h2>
        </div>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40 }}>
        {[
          { step: "01", title: "Connect with us", body: "Follow our socials or reach out directly. Let us know you're keen and we'll add you to the community group — no fees, no forms, no fuss.", icon: "📲", hi: false },
          { step: "02", title: "Show up & play", body: "Join a training session or game. We welcome all skill levels. Just bring your sneakers, your best attitude, and your love for the game.", icon: "👟", hi: true },
          { step: "03", title: "Become a Knight", body: "Once you're in, you're family. Represent the team, invite your mates, and help grow the Filipino basketball community on the Central Coast.", icon: "🏆", hi: false },
        ].map(({ step, title, body, icon, hi }, i) => (
          <FadeUp key={step} delay={i * 0.15}>
            <div style={{ textAlign: "center", padding: "0 12px" }}>
              <div style={{ width: 90, height: 90, borderRadius: "50%", background: hi ? `linear-gradient(135deg, ${C.sky}, ${C.skyLight})` : C.white, border: hi ? "none" : "2px dashed rgba(77,184,216,0.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 34, boxShadow: hi ? "0 16px 40px rgba(77,184,216,0.4)" : "none", transition: "transform 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >{icon}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: 4, color: C.sky, marginBottom: 10 }}>{step}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.navyDark, marginBottom: 14 }}>{title}</h3>
              <p style={{ color: "#4A6070", lineHeight: 1.78, fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>{body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section style={{ background: C.offWhite, padding: "100px clamp(1.5rem, 5vw, 4rem)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FadeUp>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ color: C.sky, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>From the Community</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: C.navyDark, marginTop: 14 }}>
            Real Knights, real stories
          </h2>
        </div>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {[
          { name: "Marco S.", role: "Player, 24", quote: "Before EHUB Knights I hadn't played with other Filipinos in years. Now I look forward to every Friday night like it's a reunion. The vibes are unmatched.", initials: "MS", color: C.sky },
          { name: "Joy & Rey T.", role: "Parents", quote: "Our son joined the juniors program and his confidence has gone through the roof. He's found teammates who are like his cousins. We couldn't be happier.", initials: "JR", color: C.gold },
          { name: "Dante A.", role: "Player, 38", quote: "I thought my competitive days were done. EHUB gave me a reason to lace up again — real games, good people, and pure Filipino energy on the court.", initials: "DA", color: "#5CB85C" },
          { name: "Nica R.", role: "Player, 19", quote: "As a Filipina I always felt out of place in mainstream comps. Here I belong. The Knights community is genuinely welcoming, zero toxicity.", initials: "NR", color: "#A78BFA" },
        ].map(({ name, role, quote, initials, color }, i) => (
          <FadeUp key={name} delay={i * 0.1}>
            <div style={{ background: C.white, borderRadius: 28, padding: 32, border: "1px solid rgba(77,184,216,0.12)", height: "100%", display: "flex", flexDirection: "column", gap: 20, transition: "transform 0.3s, box-shadow 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(77,184,216,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: 36, color: C.sky, fontFamily: "Georgia, serif", lineHeight: 1 }}>"</div>
              <p style={{ color: "#2A3F50", lineHeight: 1.82, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontStyle: "italic", flex: 1 }}>{quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 16, borderTop: "1px solid rgba(77,184,216,0.1)" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: color === C.gold ? C.navyDark : "#fff", flexShrink: 0 }}>{initials}</div>
                <div>
                  <div style={{ fontWeight: 700, color: C.navyDark, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{name}</div>
                  <div style={{ fontSize: 12, color: "#7A9BAE" }}>{role}</div>
                </div>
                <div style={{ marginLeft: "auto", color: C.gold, fontSize: 14 }}>★★★★★</div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" style={{ background: C.white, padding: "100px clamp(1.5rem, 5vw, 4rem)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">
      <FadeIn delay={0}>
        <div style={{ position: "relative" }}>
          <div style={{ background: `linear-gradient(135deg, ${C.navyDark}, ${C.navyMid})`, borderRadius: "45% 55% 60% 40% / 40% 45% 55% 60%", aspectRatio: "4/5", maxWidth: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, padding: 52, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", background: "rgba(77,184,216,0.1)", filter: "blur(50px)" }} />
            <img src={LOGO} alt="EHUB International Knights" style={{ width: "80%", height: "auto", objectFit: "contain", position: "relative", zIndex: 1, filter: "brightness(0) invert(1)" }} />
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 4, color: C.sky }}>KNIGHTS BASKETBALL</div>
              <div style={{ color: "rgba(200,237,246,0.5)", fontSize: 10, letterSpacing: 3, fontWeight: 700, textTransform: "uppercase", marginTop: 4 }}>Central Coast · NSW</div>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: -16, right: 0, background: `linear-gradient(135deg, ${C.sky}, ${C.skyLight})`, borderRadius: "50%", width: 96, height: 96, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", boxShadow: "0 10px 30px rgba(77,184,216,0.45)" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.navyDark, lineHeight: 1 }}>NSW</div>
            <div style={{ fontSize: 8, color: C.navyMid, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>Cent. Coast</div>
          </div>
        </div>
      </FadeIn>
      <FadeUp delay={0.2}>
        <div>
          <span style={{ color: C.sky, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>About EHUB Knights</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: C.navyDark, marginTop: 16, marginBottom: 24, lineHeight: 1.2 }}>
            Built by Filipinos,<br />for the love of the game
          </h2>
          <p style={{ color: "#4A6070", lineHeight: 1.88, fontFamily: "'DM Sans', sans-serif", fontSize: 16, marginBottom: 20 }}>
            EHUB Knights was born from a simple truth: Filipinos have an unparalleled passion for basketball. It's woven into our culture, our family get-togethers, our very identity. But on the Central Coast, that passion had no organised home.
          </p>
          <p style={{ color: "#4A6070", lineHeight: 1.88, fontFamily: "'DM Sans', sans-serif", fontSize: 16, marginBottom: 36 }}>
            We created EHUB Knights to change that — to build a community where Filipino ballers of all ages, skill levels, and backgrounds can come together, compete, grow, and belong. Whether you're a seasoned competitor or just getting started, the Knights is your team.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["All skill levels", "All ages welcome", "Filipino-led", "Inclusive community"].map(tag => (
              <span key={tag} style={{ background: "rgba(77,184,216,0.1)", border: "1px solid rgba(77,184,216,0.25)", color: C.sky, padding: "8px 18px", borderRadius: 50, fontSize: 13, fontWeight: 600 }}>{tag}</span>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
    <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
  </section>
);

const Events = () => (
  <section id="events" style={{ background: `linear-gradient(160deg, ${C.navyMid}, ${C.navyDark})`, padding: "100px clamp(1.5rem, 5vw, 4rem)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <FadeUp>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>Upcoming</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: C.white, marginTop: 14 }}>Mark your calendar</h2>
        </div>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {[
          { date: "Every Friday", time: "7:00 PM – 10:00 PM", name: "Friday Night Run", type: "Social", location: "Gosford Indoor Sports", desc: "The weekly staple. Come down for competitive pick-up games with the Knights community.", color: C.sky },
          { date: "Every Sunday", time: "9:00 AM – 11:00 AM", name: "Junior Training", type: "Training", location: "Central Coast Sports Hub", desc: "Structured skills development for players aged 8–17. Fun, focused, and Filipino-led.", color: C.gold },
          { date: "Last Sat of Month", time: "All Day", name: "EHUB Knights Cup", type: "Tournament", location: "Venue TBC", desc: "Monthly in-house tournament. Teams of 5, round robin format. Bring your A-game.", color: "#A78BFA" },
        ].map(({ date, time, name, type, location, desc, color }, i) => (
          <FadeUp key={name} delay={i * 0.1}>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(77,184,216,0.1)", transition: "transform 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ borderBottom: `3px solid ${color}`, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: `rgba(255,255,255,0.03)` }}>
                <span style={{ color: color, fontWeight: 800, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>{type}</span>
                <span style={{ color: "rgba(200,237,246,0.55)", fontSize: 13 }}>{time}</span>
              </div>
              <div style={{ padding: 28 }}>
                <div style={{ color: "rgba(200,237,246,0.4)", fontSize: 12, marginBottom: 8, letterSpacing: 1 }}>{date}</div>
                <h3 style={{ color: C.white, fontSize: 22, fontFamily: "'Playfair Display', serif", marginBottom: 10 }}>{name}</h3>
                <div style={{ color: color, fontSize: 13, marginBottom: 16 }}>📍 {location}</div>
                <p style={{ color: "rgba(200,237,246,0.48)", fontSize: 14, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ── INPUT FIELD ───────────────────────────────────────────────────────────────
const Field = ({ label, type = "text", name, value, onChange, placeholder, required, hint, half }) => {
  const [focused, setFocused] = useState(false);
  const base = {
    width: "100%", padding: "14px 18px", borderRadius: 14,
    background: "rgba(255,255,255,0.06)",
    border: `1.5px solid ${focused ? C.sky : "rgba(77,184,216,0.2)"}`,
    color: C.white, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
    outline: "none", transition: "border 0.25s, box-shadow 0.25s",
    boxShadow: focused ? `0 0 0 3px rgba(77,184,216,0.15)` : "none",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: half ? "1 1 calc(50% - 8px)" : "1 1 100%", minWidth: half ? 180 : "auto" }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(200,237,246,0.75)", letterSpacing: 0.4 }}>
        {label}{required && <span style={{ color: C.sky, marginLeft: 3 }}>*</span>}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        required={required} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...base, colorScheme: "dark" }}
      />
      {hint && <span style={{ fontSize: 11.5, color: "rgba(200,237,246,0.38)", marginTop: 2 }}>{hint}</span>}
    </div>
  );
};

const SelectField = ({ label, name, value, onChange, options, required, half }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: half ? "1 1 calc(50% - 8px)" : "1 1 100%", minWidth: half ? 180 : "auto" }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(200,237,246,0.75)", letterSpacing: 0.4 }}>
        {label}{required && <span style={{ color: C.sky, marginLeft: 3 }}>*</span>}
      </label>
      <select name={name} value={value} onChange={onChange} required={required}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", padding: "14px 18px", borderRadius: 14, background: "#0F2744", border: `1.5px solid ${focused ? C.sky : "rgba(77,184,216,0.2)"}`, color: value ? C.white : "rgba(200,237,246,0.4)", fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border 0.25s", appearance: "none", cursor: "pointer", boxShadow: focused ? `0 0 0 3px rgba(77,184,216,0.15)` : "none" }}
      >
        <option value="" disabled style={{ color: "rgba(200,237,246,0.4)", background: "#0F2744" }}>Select…</option>
        {options.map(o => <option key={o} value={o} style={{ color: C.white, background: "#0F2744" }}>{o}</option>)}
      </select>
    </div>
  );
};

const TextAreaField = ({ label, name, value, onChange, placeholder, required, rows = 4 }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 100%" }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(200,237,246,0.75)", letterSpacing: 0.4 }}>
        {label}{required && <span style={{ color: C.sky, marginLeft: 3 }}>*</span>}
      </label>
      <textarea name={name} value={value} onChange={onChange} placeholder={placeholder}
        required={required} rows={rows} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", padding: "14px 18px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: `1.5px solid ${focused ? C.sky : "rgba(77,184,216,0.2)"}`, color: C.white, fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "vertical", transition: "border 0.25s", boxShadow: focused ? `0 0 0 3px rgba(77,184,216,0.15)` : "none", colorScheme: "dark" }}
      />
    </div>
  );
};

const CheckboxGroup = ({ label, options, selected, onChange }) => (
  <div style={{ flex: "1 1 100%", display: "flex", flexDirection: "column", gap: 10 }}>
    <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(200,237,246,0.75)", letterSpacing: 0.4 }}>{label}</label>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {options.map(opt => {
        const checked = selected.includes(opt);
        return (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            style={{ padding: "9px 18px", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", border: `1.5px solid ${checked ? C.sky : "rgba(77,184,216,0.2)"}`, background: checked ? `rgba(77,184,216,0.18)` : "rgba(255,255,255,0.04)", color: checked ? C.sky : "rgba(200,237,246,0.55)", transition: "all 0.2s" }}
          >{checked ? "✓ " : ""}{opt}</button>
        );
      })}
    </div>
  </div>
);

// ── JOIN US PAGE ──────────────────────────────────────────────────────────────
const JoinUsPage = ({ onBack }) => {
  const EMPTY = { firstName: "", lastName: "", email: "", phone: "", dob: "", suburb: "", postcode: "", gender: "", skillLevel: "", position: "", shirtSize: "", emergencyName: "", emergencyPhone: "", emergencyRelation: "", howHeard: "", notes: "" };
  const [form, setForm] = useState(EMPTY);
  const [interests, setInterests] = useState([]);
  const [ageGroup, setAgeGroup] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const toggleInterest = (v) => setInterests(i => i.includes(v) ? i.filter(x => x !== v) : [...i, v]);

  const requiredStep1 = ["firstName", "lastName", "email", "phone", "dob", "suburb"];
  const requiredStep2 = ["skillLevel"];

  const validate = () => {
    const e = {};
    if (step === 1) requiredStep1.forEach(k => { if (!form[k]) e[k] = "Required"; });
    if (step === 2) requiredStep2.forEach(k => { if (!form[k]) e[k] = "Required"; });
    if (step === 3 && !agreed) e.agreed = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) { setStep(s => Math.min(s + 1, totalSteps)); window.scrollTo({ top: 0, behavior: "smooth" }); } };
  const back = () => { setStep(s => Math.max(s - 1, 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const submit = () => { if (validate()) setSubmitted(true); };

  const progress = (step / totalSteps) * 100;

  // ── SUCCESS SCREEN ──
  if (submitted) return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${C.navyDark}, ${C.navyMid})`, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px clamp(1.5rem, 5vw, 4rem)" }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div style={{ width: 100, height: 100, borderRadius: "50%", background: `linear-gradient(135deg, ${C.sky}, ${C.skyLight})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 44, boxShadow: `0 20px 50px rgba(77,184,216,0.4)`, animation: "popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275)" }}>✓</div>
        <style>{`@keyframes popIn { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }`}</style>
        <div style={{ maxWidth: 160, margin: "0 auto 24px" }}>
          <img src={LOGO} alt="EHUB" style={{ width: "100%", filter: "brightness(0) invert(1)" }} />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: C.white, marginBottom: 16, lineHeight: 1.2 }}>Welcome to the Knights, {form.firstName}!</h2>
        <p style={{ color: "rgba(200,237,246,0.65)", fontSize: 16, lineHeight: 1.78, marginBottom: 36, fontFamily: "'DM Sans', sans-serif" }}>
          Your registration has been received. We'll be in touch within 48 hours with everything you need to get on the court. Lace up — your community is waiting.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onBack}
            style={{ background: `linear-gradient(135deg, ${C.sky}, ${C.skyLight})`, color: C.navyDark, padding: "14px 32px", borderRadius: 50, fontSize: 15, fontWeight: 800, border: "none", cursor: "pointer", boxShadow: `0 8px 28px rgba(77,184,216,0.4)` }}
          >← Back to Home</button>
        </div>
      </div>
    </div>
  );

  const sectionHead = (title, sub) => (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.white, marginBottom: 6 }}>{title}</h3>
      {sub && <p style={{ color: "rgba(200,237,246,0.5)", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{sub}</p>}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${C.navyDark} 0%, ${C.navyMid} 55%, #0D2035 100%)`, position: "relative", overflow: "hidden" }}>
      {/* Background orbs */}
      <div style={{ position: "fixed", top: "-10%", right: "-8%", width: 600, height: 600, borderRadius: "50%", background: "rgba(77,184,216,0.05)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "5%", left: "-8%", width: 500, height: 500, borderRadius: "50%", background: "rgba(245,200,66,0.04)", filter: "blur(70px)", pointerEvents: "none" }} />

      {/* Sticky top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(11,25,41,0.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(77,184,216,0.12)", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "rgba(200,237,246,0.6)", fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, padding: 0, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.sky}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(200,237,246,0.6)"}
          >← Back to Site</button>
          <div style={{ maxWidth: 120 }}>
            <img src={LOGO} alt="EHUB" style={{ width: "100%", filter: "brightness(0) invert(1)" }} />
          </div>
          <div style={{ fontSize: 13, color: "rgba(200,237,246,0.45)", fontFamily: "'DM Sans', sans-serif" }}>Step {step} of {totalSteps}</div>
        </div>
        {/* Progress bar */}
        <div style={{ height: 3, background: "rgba(77,184,216,0.12)" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${C.sky}, ${C.skyLight})`, transition: "width 0.5s ease", borderRadius: 99 }} />
        </div>
      </div>

      {/* Page hero */}
      <div style={{ padding: "60px clamp(1.5rem, 5vw, 4rem) 0", textAlign: "center", maxWidth: 860, margin: "0 auto" }}>
        <span style={{ color: C.gold, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>Registration</span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", color: C.white, marginTop: 10, marginBottom: 14, lineHeight: 1.15 }}>Join the EHUB Knights</h1>
        <p style={{ color: "rgba(200,237,246,0.6)", fontSize: 16, lineHeight: 1.75, maxWidth: 500, margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
          Complete the form below to become part of the Central Coast's Filipino basketball community. Free to join — always.
        </p>

        {/* Step pills */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, margin: "36px auto 0", maxWidth: 440 }}>
          {[["1", "Your Details"], ["2", "Basketball Info"], ["3", "Final Step"]].map(([n, label], i) => {
            const active = step === i + 1;
            const done = step > i + 1;
            return (
              <div key={n} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: done ? C.sky : active ? `linear-gradient(135deg, ${C.sky}, ${C.skyLight})` : "rgba(77,184,216,0.12)", border: `2px solid ${active || done ? C.sky : "rgba(77,184,216,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: done || active ? C.navyDark : "rgba(200,237,246,0.4)", transition: "all 0.3s", boxShadow: active ? `0 0 18px rgba(77,184,216,0.4)` : "none" }}>
                    {done ? "✓" : n}
                  </div>
                  <span style={{ fontSize: 11, color: active ? C.sky : "rgba(200,237,246,0.35)", fontWeight: active ? 700 : 400, letterSpacing: 0.3 }}>{label}</span>
                </div>
                {i < 2 && <div style={{ width: 60, height: 2, background: step > i + 1 ? C.sky : "rgba(77,184,216,0.15)", margin: "0 4px", marginBottom: 22, transition: "background 0.4s" }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form card */}
      <div style={{ maxWidth: 860, margin: "40px auto 80px", padding: "0 clamp(1.5rem, 5vw, 2rem)" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 32, border: "1px solid rgba(77,184,216,0.12)", backdropFilter: "blur(10px)", padding: "clamp(28px, 5vw, 56px)", boxShadow: "0 40px 80px rgba(0,0,0,0.3)" }}>

          {/* ── STEP 1: Personal Details ── */}
          {step === 1 && (
            <div>
              {sectionHead("Personal Details", "Tell us a bit about yourself so we can get you set up.")}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                <Field label="First Name" name="firstName" value={form.firstName} onChange={set("firstName")} placeholder="e.g. Juan" required half />
                <Field label="Last Name" name="lastName" value={form.lastName} onChange={set("lastName")} placeholder="e.g. dela Cruz" required half />
                <Field label="Email Address" type="email" name="email" value={form.email} onChange={set("email")} placeholder="you@example.com" required hint="We'll send confirmation and updates here." />
                <Field label="Mobile Number" type="tel" name="phone" value={form.phone} onChange={set("phone")} placeholder="04XX XXX XXX" required hint="For urgent game-day communication." />
                <Field label="Date of Birth" type="date" name="dob" value={form.dob} onChange={set("dob")} required half hint="Used to place you in the right age group." />
                <SelectField label="Gender" name="gender" value={form.gender} onChange={set("gender")} options={["Male", "Female", "Non-binary", "Prefer not to say"]} half />
                <Field label="Suburb" name="suburb" value={form.suburb} onChange={set("suburb")} placeholder="e.g. Gosford" required half />
                <Field label="Postcode" name="postcode" value={form.postcode} onChange={set("postcode")} placeholder="e.g. 2250" half />
              </div>
              {Object.keys(errors).length > 0 && (
                <p style={{ color: "#F87171", fontSize: 13, marginTop: 18, fontFamily: "'DM Sans', sans-serif" }}>⚠ Please fill in all required fields before continuing.</p>
              )}
            </div>
          )}

          {/* ── STEP 2: Basketball Info ── */}
          {step === 2 && (
            <div>
              {sectionHead("Basketball Info", "Help us understand your game so we can match you with the right program.")}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                <SelectField label="Age Group" name="ageGroup" value={ageGroup} onChange={e => setAgeGroup(e.target.value)} options={["Junior (Under 12)", "Youth (12–17)", "Adult (18–35)", "Masters (35+)", "Family / Multiple"]} required />
                <SelectField label="Skill Level" name="skillLevel" value={form.skillLevel} onChange={set("skillLevel")} options={["Beginner – just getting started", "Recreational – play for fun", "Intermediate – some experience", "Competitive – play regularly", "Elite – high-level experience"]} required />
                <SelectField label="Preferred Position" name="position" value={form.position} onChange={set("position")} options={["Point Guard (PG)", "Shooting Guard (SG)", "Small Forward (SF)", "Power Forward (PF)", "Centre (C)", "No Preference / Flexible"]} half />
                <SelectField label="Shirt Size" name="shirtSize" value={form.shirtSize} onChange={set("shirtSize")} options={["XS", "S", "M", "L", "XL", "XXL", "3XL"]} half />
                <CheckboxGroup
                  label="What are you interested in? (select all that apply)"
                  options={["Friday Night Runs", "Junior Training", "Monthly Tournaments", "Skills Clinics", "Social Events", "Volunteer / Help Out"]}
                  selected={interests}
                  onChange={toggleInterest}
                />
                <TextAreaField label="Anything else we should know?" name="notes" value={form.notes} onChange={set("notes")} placeholder="Previous injuries, availability, questions… anything at all." rows={3} />
              </div>
              {Object.keys(errors).length > 0 && (
                <p style={{ color: "#F87171", fontSize: 13, marginTop: 18, fontFamily: "'DM Sans', sans-serif" }}>⚠ Please fill in all required fields before continuing.</p>
              )}
            </div>
          )}

          {/* ── STEP 3: Emergency Contact + Confirm ── */}
          {step === 3 && (
            <div>
              {sectionHead("Emergency Contact & Confirmation", "Almost there! We need an emergency contact for all participants.")}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
                <Field label="Emergency Contact Name" name="emergencyName" value={form.emergencyName} onChange={set("emergencyName")} placeholder="Full name" required />
                <Field label="Emergency Contact Phone" type="tel" name="emergencyPhone" value={form.emergencyPhone} onChange={set("emergencyPhone")} placeholder="04XX XXX XXX" required half />
                <SelectField label="Relationship" name="emergencyRelation" value={form.emergencyRelation} onChange={set("emergencyRelation")} options={["Parent / Guardian", "Spouse / Partner", "Sibling", "Friend", "Other"]} required half />
                <SelectField label="How did you hear about us?" name="howHeard" value={form.howHeard} onChange={set("howHeard")} options={["Facebook", "Instagram", "TikTok", "Friend / Family", "Google Search", "Community Event", "Other"]} />
              </div>

              {/* Review summary */}
              <div style={{ background: "rgba(77,184,216,0.06)", border: "1px solid rgba(77,184,216,0.15)", borderRadius: 20, padding: "24px 28px", marginBottom: 28 }}>
                <h4 style={{ color: C.sky, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Registration Summary</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }} className="summary-grid">
                  {[
                    ["Name", `${form.firstName} ${form.lastName}`],
                    ["Email", form.email],
                    ["Phone", form.phone],
                    ["Suburb", `${form.suburb} ${form.postcode}`],
                    ["Age Group", ageGroup],
                    ["Skill Level", form.skillLevel],
                    ["Interests", interests.length > 0 ? interests.join(", ") : "—"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: 11, color: "rgba(200,237,246,0.4)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>{k}</div>
                      <div style={{ fontSize: 14, color: C.white, fontFamily: "'DM Sans', sans-serif" }}>{v || "—"}</div>
                    </div>
                  ))}
                </div>
                <style>{`@media(max-width:520px){.summary-grid{grid-template-columns:1fr!important;}}`}</style>
              </div>

              {/* Terms */}
              <div style={{ marginBottom: 8 }}>
                <button type="button" onClick={() => setAgreed(a => !a)}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
                >
                  <div style={{ width: 22, height: 22, borderRadius: 7, border: `2px solid ${agreed ? C.sky : "rgba(77,184,216,0.3)"}`, background: agreed ? C.sky : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, transition: "all 0.2s" }}>
                    {agreed && <span style={{ color: C.navyDark, fontSize: 13, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 14, color: "rgba(200,237,246,0.65)", lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>
                    I agree to the EHUB Knights <span style={{ color: C.sky, textDecoration: "underline" }}>Participant Code of Conduct</span> and confirm that all information provided is accurate. I understand this community is free to join and inclusive of all ages and skill levels.
                  </span>
                </button>
                {errors.agreed && <p style={{ color: "#F87171", fontSize: 12.5, marginTop: 8 }}>⚠ You must agree to continue.</p>}
              </div>
            </div>
          )}

          {/* ── Navigation buttons ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(77,184,216,0.1)", flexWrap: "wrap", gap: 12 }}>
            {step > 1
              ? <button onClick={back} style={{ color: "rgba(200,237,246,0.6)", background: "none", border: "1px solid rgba(77,184,216,0.2)", padding: "14px 28px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.sky; e.currentTarget.style.color = C.sky; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(77,184,216,0.2)"; e.currentTarget.style.color = "rgba(200,237,246,0.6)"; }}
                >← Back</button>
              : <div />
            }
            {step < totalSteps
              ? <button onClick={next}
                  style={{ background: `linear-gradient(135deg, ${C.sky}, ${C.skyLight})`, color: C.navyDark, padding: "14px 36px", borderRadius: 50, fontSize: 15, fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(77,184,216,0.35)", transition: "all 0.25s", letterSpacing: 0.3 }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(77,184,216,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(77,184,216,0.35)"; }}
                >Continue →</button>
              : <button onClick={submit}
                  style={{ background: `linear-gradient(135deg, ${C.sky}, ${C.skyLight})`, color: C.navyDark, padding: "14px 40px", borderRadius: 50, fontSize: 15, fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(77,184,216,0.35)", transition: "all 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(77,184,216,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(77,184,216,0.35)"; }}
                >🏀 Submit Registration</button>
            }
          </div>
        </div>

        <p style={{ textAlign: "center", color: "rgba(200,237,246,0.25)", fontSize: 13, marginTop: 24, fontFamily: "'DM Sans', sans-serif" }}>
          Free to join · All ages welcome · Filipino-led community
        </p>
      </div>
    </div>
  );
};

const Footer = ({ onJoin }) => (
  <footer style={{ background: "#070E16", padding: "60px clamp(1.5rem, 5vw, 4rem) 32px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 60, marginBottom: 48 }} className="footer-grid">
        <div>
          <div style={{ marginBottom: 20, maxWidth: 180 }}>
            <img src={LOGO} alt="EHUB International Knights" style={{ width: "100%", height: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </div>
          <p style={{ color: "rgba(200,237,246,0.32)", lineHeight: 1.78, fontFamily: "'DM Sans', sans-serif", fontSize: 14, maxWidth: 320 }}>
            Presenting the Philippines Basketball Community on the Central Coast of NSW, Australia. Filipino pride. Central Coast home.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            {["📘", "📸", "🐦"].map((icon, i) => (
              <a key={i} href="#" style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(77,184,216,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, textDecoration: "none", border: "1px solid rgba(77,184,216,0.13)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(77,184,216,0.2)"; e.currentTarget.style.borderColor = "rgba(77,184,216,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(77,184,216,0.07)"; e.currentTarget.style.borderColor = "rgba(77,184,216,0.13)"; }}
              >{icon}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ color: C.white, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Quick Links</h4>
          {["About Us", "Programs", "Events", "Community"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{ display: "block", color: "rgba(200,237,246,0.38)", fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", marginBottom: 12, transition: "color 0.2s" }}
              onMouseEnter={e => { e.target.style.color = C.sky; }}
              onMouseLeave={e => { e.target.style.color = "rgba(200,237,246,0.38)"; }}
            >{l}</a>
          ))}
          <button onClick={onJoin} style={{ display: "block", color: C.sky, fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", marginBottom: 12, background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 700, transition: "color 0.2s" }}
            onMouseEnter={e => { e.target.style.color = C.skyLight; }}
            onMouseLeave={e => { e.target.style.color = C.sky; }}
          >Join Now →</button>
        </div>
        <div>
          <h4 style={{ color: C.white, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Contact</h4>
          <p style={{ color: "rgba(200,237,246,0.38)", fontSize: 14, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.9 }}>
            Central Coast, NSW<br />Australia<br /><br />
            <a href="mailto:info@ehubknights.com" style={{ color: C.sky, textDecoration: "none" }}>info@ehubknights.com</a>
          </p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(77,184,216,0.07)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <p style={{ color: "rgba(200,237,246,0.2)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>© 2025 EHUB International Knights Basketball. Central Coast Filipino Basketball Community.</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 16 }}>🇵🇭</span>
          <span style={{ color: "rgba(200,237,246,0.2)", fontSize: 13 }}>Filipino Pride · Central Coast Strong</span>
          <span style={{ fontSize: 16 }}>🏀</span>
        </div>
      </div>
    </div>
    <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important;gap:32px!important;}}`}</style>
  </footer>
);

const MainSite = ({ onJoin }) => (
  <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
    <NavBar onJoin={onJoin} />
    <Hero onJoin={onJoin} />
    <Pain />
    <Solution />
    <HowItWorks />
    <Testimonials />
    <About />
    <Events />
    {/* Inline CTA teaser before footer */}
    <section id="join-us" style={{ background: C.offWhite, padding: "100px clamp(1.5rem, 5vw, 4rem)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <FadeUp>
          <div style={{ background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navyMid} 100%)`, borderRadius: 40, padding: "clamp(40px, 7vw, 72px)", textAlign: "center", position: "relative", overflow: "hidden", border: "1px solid rgba(77,184,216,0.15)" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.04, pointerEvents: "none" }}>
              <img src={LOGO} alt="" style={{ width: 480, height: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </div>
            <div style={{ position: "absolute", top: -60, right: -40, opacity: 0.06 }}><Ball size={280} /></div>
            <div style={{ position: "absolute", bottom: -80, left: -40, opacity: 0.05 }}><Ball size={240} /></div>
            <div style={{ position: "relative" }}>
              <div style={{ margin: "0 auto 28px", maxWidth: 190 }}>
                <img src={LOGO} alt="EHUB Knights" style={{ width: "100%", height: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </div>
              <span style={{ color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>Ready to run?</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: C.white, margin: "16px 0 20px", lineHeight: 1.2 }}>
                Your court is waiting,<br />Knight.
              </h2>
              <p style={{ color: "rgba(200,237,246,0.62)", fontSize: 17, lineHeight: 1.78, maxWidth: 480, margin: "0 auto 44px", fontFamily: "'DM Sans', sans-serif" }}>
                Join hundreds of Filipino basketball players already part of the EHUB Knights community. It's free. It's welcoming. And it's yours.
              </p>
              <button onClick={onJoin}
                style={{ background: `linear-gradient(135deg, ${C.sky}, ${C.skyLight})`, color: C.navyDark, padding: "18px 48px", borderRadius: 50, fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 10px 36px rgba(77,184,216,0.45)", transition: "all 0.3s", letterSpacing: 0.3 }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 44px rgba(77,184,216,0.6)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(77,184,216,0.45)"; }}
              >Register Now — It's Free →</button>
              <p style={{ color: "rgba(200,237,246,0.28)", fontSize: 13, marginTop: 24, fontFamily: "'DM Sans', sans-serif" }}>Free to join · All ages · All skill levels</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
    <Footer onJoin={onJoin} />
  </div>
);

export default function App() {
  const [page, setPage] = useState("home");
  const goJoin = () => { setPage("join"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goHome = () => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  if (page === "join") return <JoinUsPage onBack={goHome} />;
  return <MainSite onJoin={goJoin} />;
}
