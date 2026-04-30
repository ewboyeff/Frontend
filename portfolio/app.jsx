const { useState, useEffect, useRef } = React;

// ---------- Lucide icon helper ----------
const Icon = ({ name, className = "w-5 h-5", strokeWidth = 1.6 }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const svg = window.lucide.createElement(window.lucide.icons[name] || window.lucide.icons.Circle);
      svg.setAttribute("class", className);
      svg.setAttribute("stroke-width", strokeWidth);
      ref.current.appendChild(svg);
    }
  }, [name, className, strokeWidth]);
  return <span ref={ref} className="inline-flex" />;
};

// ---------- Reveal-on-scroll ----------
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// ---------- Navbar ----------
const NAV_ITEMS = [
  { label: "Bosh sahifa", href: "#home" },
  { label: "Men haqimda", href: "#about" },
  { label: "Tajriba", href: "#experience" },
  { label: "Xizmatlar", href: "#services" },
  { label: "Loyihalar", href: "#projects" },
  { label: "Ko‘nikmalar", href: "#skills" },
  { label: "Bog‘lanish", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-7xl px-5 sm:px-8`}>
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3 transition-all duration-500 ${scrolled ? "glass shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]" : "bg-transparent border border-transparent"}`}>
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="relative w-8 h-8 rounded-lg overflow-hidden ring-grad">
              <span className="absolute inset-0 bg-gradient-to-br from-neon-blue via-neon-violet to-neon-cyan opacity-90"></span>
              <span className="absolute inset-[3px] rounded-md bg-ink-950 grid place-items-center font-display font-bold text-[13px] text-white">E</span>
            </span>
            <span className="font-display font-semibold tracking-tight text-white/95">Dilshod<span className="text-gradient-accent"></span></span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((n) => (
              <a key={n.href} href={n.href} className="nav-link text-[13.5px] text-white/70 hover:text-white transition-colors">{n.label}</a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" className="btn-primary px-4 py-2 rounded-xl text-[13.5px] font-medium inline-flex items-center gap-2">
              Loyihani boshlash <Icon name="ArrowUpRight" className="w-4 h-4" />
            </a>
          </div>

          <button onClick={() => setOpen(v => !v)} className="lg:hidden glass rounded-xl p-2.5" aria-label="Menu">
            <Icon name={open ? "X" : "Menu"} className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-[400px] mt-3" : "max-h-0"}`}>
          <div className="glass rounded-2xl p-4 flex flex-col gap-1">
            {NAV_ITEMS.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/5 transition">{n.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 px-4 py-3 rounded-xl text-sm font-medium text-center">Loyihani boshlash</a>
          </div>
        </div>
      </div>
    </header>
  );
};

// ---------- Hero abstract visual ----------
const HeroVisual = () => {
  return (
    <div className="relative w-full aspect-[5/5.4] sm:aspect-[5/5] max-w-[560px] mx-auto select-none">
      {/* Halo */}
      <div className="absolute inset-6 rounded-full" style={{ background: "conic-gradient(from 120deg, rgba(34,211,238,.35), rgba(59,130,255,.45), rgba(139,92,246,.4), rgba(34,211,238,.35))", filter: "blur(40px)", opacity: .55 }}></div>

      {/* Rotating ring */}
      <div className="absolute inset-10 rounded-full border border-white/10 animate-spin-slow" style={{ borderTopColor: "rgba(59,130,255,.6)", borderRightColor: "rgba(139,92,246,.4)" }}></div>
      <div className="absolute inset-20 rounded-full border border-dashed border-white/10 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "40s" }}></div>

      {/* Center core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-3xl ring-grad glass animate-pulse-glow grid place-items-center">
        <div className="text-center">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/50 mb-2">CORE / v3.2</div>
          <div className="font-display text-3xl text-gradient-accent">AI</div>
          <div className="font-mono text-[10px] tracking-[0.25em] text-white/40 mt-2">RUNTIME</div>
        </div>
      </div>

      {/* Floating card 1: dashboard */}
      <div className="absolute -left-2 sm:left-2 top-6 w-56 glass rounded-2xl p-3.5 ring-grad animate-float" style={{ animationDelay: "-2s" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,.7)]"></span>
            <span className="font-mono text-[10px] text-white/60 tracking-wider">LIVE · CONTENT</span>
          </div>
          <Icon name="Activity" className="w-3.5 h-3.5 text-white/50" />
        </div>
        <div className="font-display text-2xl text-white">+248%</div>
        <div className="text-[11px] text-white/50 mb-3">erishish (oy)</div>
        <svg viewBox="0 0 200 50" className="w-full h-10">
          <defs>
            <linearGradient id="sg" x1="0" x2="1">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path d="M0,40 C20,30 30,38 50,28 S90,8 110,18 S160,42 200,12" fill="none" stroke="url(#sg)" strokeWidth="1.6" />
          <path d="M0,40 C20,30 30,38 50,28 S90,8 110,18 S160,42 200,12 L200,50 L0,50 Z" fill="url(#sg)" opacity="0.12" />
        </svg>
      </div>

      {/* Floating card 2: prompt */}
      <div className="absolute right-0 top-2 w-52 glass rounded-2xl p-3.5 ring-grad animate-float-slow">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Sparkles" className="w-3.5 h-3.5 text-neon-cyan" />
          <span className="font-mono text-[10px] text-white/60 tracking-wider">PROMPT · 04</span>
        </div>
        <div className="font-mono text-[11px] leading-relaxed text-white/75">
          <span className="text-neon-cyan">/generate</span> cinematic<br />
          neon brand identity,<br />
          <span className="text-neon-violet">--style</span> editorial 3D
        </div>
      </div>

      {/* Floating card 3: chatbot */}
      <div className="absolute left-4 bottom-2 w-60 glass rounded-2xl p-3.5 ring-grad animate-float" style={{ animationDelay: "-5s" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet grid place-items-center">
            <Icon name="Bot" className="w-3.5 h-3.5 text-white" />
          </span>
          <span className="font-mono text-[10px] text-white/60 tracking-wider">CHATBOT</span>
          <span className="ml-auto text-[10px] text-emerald-400 font-mono">ONLINE</span>
        </div>
        <div className="space-y-1.5">
          <div className="text-[11px] bg-white/5 rounded-lg rounded-tl-sm px-2.5 py-1.5 inline-block max-w-full text-white/80">Salom! Qanday yordam beray?</div>
          <div className="text-[11px] bg-gradient-to-r from-neon-blue/30 to-neon-violet/30 border border-white/10 rounded-lg rounded-tr-sm px-2.5 py-1.5 inline-block ml-auto float-right text-white/90">Buyurtma holati?</div>
        </div>
      </div>

      {/* Floating card 4: stack */}
      <div className="absolute right-2 bottom-8 w-44 glass rounded-2xl p-3 ring-grad animate-float-slow" style={{ animationDelay: "-8s" }}>
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Layers" className="w-3.5 h-3.5 text-white/60" />
          <span className="font-mono text-[10px] text-white/60 tracking-wider">STACK</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["React", "n8n", "GPT", "Make", "API"].map(t => (
            <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/70">{t}</span>
          ))}
        </div>
      </div>

      {/* Particles */}
      {[...Array(14)].map((_, i) => (
        <span key={i} className="absolute rounded-full bg-white/60" style={{
          width: 2, height: 2,
          left: `${(i * 53) % 100}%`,
          top: `${(i * 37) % 100}%`,
          opacity: 0.3 + (i % 3) * 0.15,
          boxShadow: i % 3 === 0 ? "0 0 6px 2px rgba(34,211,238,.6)" : "0 0 4px 1px rgba(139,92,246,.6)",
          animation: `float ${6 + (i % 5)}s ease-in-out ${-i * 0.3}s infinite`,
        }} />
      ))}
    </div>
  );
};

// ---------- Hero Section ----------
const Hero = () => {
  return (
    <section id="home" className="relative pt-36 lg:pt-44 pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="reveal inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6 ring-grad">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,.6)]"></span>
              <span className="font-mono text-[11px] tracking-wider text-white/70">2026 · YANGI LOYIHALAR QABUL QILINMOQDA</span>
            </div>

            <h1 className="reveal font-display font-semibold tracking-[-0.025em] text-[44px] sm:text-6xl lg:text-7xl leading-[1.02] text-white">
              <span className="text-gradient">Backend, AI va<br />Full Stack</span> <span className="text-white/85">yechimlar orqali</span><br />
              <span className="text-white/85">zamonaviy</span> <span className="text-gradient-accent">raqamli mahsulotlar</span><br />
              <span className="text-white/85">yarataman</span>
            </h1>

            <p className="reveal mt-7 max-w-xl text-base sm:text-lg text-white/65 leading-relaxed">
              Men Python, FastAPI, Django, AI chatbotlar, avtomatlashtirish tizimlari va full-stack web ilovalar orqali bizneslar uchun tez, xavfsiz va kengaytiriladigan texnologik yechimlar ishlab chiqaman.
            </p>

            <div className="reveal mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary px-5 py-3.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
                Loyihalarimni ko‘rish <Icon name="ArrowRight" className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-ghost px-5 py-3.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
                Bog‘lanish <Icon name="MessageSquare" className="w-4 h-4" />
              </a>
            </div>

            {/* Inline metrics */}
            <div className="reveal mt-12 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
              {[
                { k: "3+", v: "yil IT tajriba" },
                { k: "10+", v: "loyiha" },
                { k: "AI", v: "engineering" },
              ].map((m, i) => (
                <div key={i}>
                  <div className="font-display text-2xl sm:text-3xl text-white">{m.k}</div>
                  <div className="text-[12px] text-white/55 mt-0.5">{m.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 reveal">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-20 border-y border-white/[0.06] py-5 overflow-hidden relative">
        <div className="flex gap-12 whitespace-nowrap animate-marquee font-mono text-[12px] tracking-[0.3em] text-white/35 uppercase">
          {[...Array(2)].flatMap((_, k) => (
            ["FastAPI", "·", "Django", "·", "PostgreSQL", "·", "Docker", "·", "AI Chatbots", "·", "Aiogram", "·", "n8n / Salebot", "·", "React + TS", "·", "TensorFlow", "·"].map((t, i) => (
              <span key={`${k}-${i}`}>{t}</span>
            ))
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- About ----------
const About = () => {
  const stats = [
    { k: "3+", v: "yil IT tajriba", icon: "Sparkles" },
    { k: "AI", v: "Engineering", icon: "BrainCircuit" },
    { k: "BE", v: "Backend Architecture", icon: "Server" },
    { k: "⚡", v: "FastAPI / Django", icon: "Zap" },
    { k: "24/7", v: "Chatbot & Automation", icon: "Bot" },
    { k: "≡", v: "Docker & Linux", icon: "Container" },
  ];
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 reveal">
            <SectionLabel num="01" text="Men haqimda" />
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight mt-5">
              <span className="text-white">Backend va AI bilan</span><br />
              <span className="text-gradient-accent">aqlli tizimlar.</span>
            </h2>
            <div className="mt-6 glass rounded-2xl p-4 ring-grad space-y-2">
              <div className="flex items-center gap-2 text-[13px] text-white/75"><Icon name="User" className="w-3.5 h-3.5 text-white/55" /> Eshboyev Dilshod</div>
              <div className="flex items-center gap-2 text-[13px] text-white/75"><Icon name="Briefcase" className="w-3.5 h-3.5 text-white/55" /> Backend · AI · Full Stack</div>
              <div className="flex items-center gap-2 text-[13px] text-white/75"><Icon name="MapPin" className="w-3.5 h-3.5 text-white/55" /> Tashkent, Uzbekistan</div>
              <div className="flex items-center gap-2 text-[13px] text-white/75"><Icon name="Github" className="w-3.5 h-3.5 text-white/55" /> github.com/ewboyeff</div>
            </div>
          </div>
          <div className="lg:col-span-7 reveal">
            <p className="text-lg text-white/70 leading-relaxed">
              Men Eshboyev Dilshodman — Backend Developer, AI Engineer va Full Stack Developer. Hozirda PDP University’da Artificial Intelligence yo‘nalishida tahsil olaman. Python, Django, FastAPI, REST API, database design, Docker, Linux serverlar, AI chatbotlar, avtomatlashtirish workflow’lari va machine learning modellar bilan ishlayman. Maqsadim — backend engineering va sun’iy intellektni birlashtirib, bizneslar uchun samarali, xavfsiz va aqlli tizimlar yaratish.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
              {stats.map((s, i) => (
                <div key={i} className="glass glass-hover rounded-2xl p-5 ring-grad">
                  <div className="flex items-center justify-between">
                    <div className="font-display text-2xl text-white">{s.k}</div>
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-blue/30 to-neon-violet/30 grid place-items-center border border-white/10">
                      <Icon name={s.icon} className="w-4 h-4 text-white/85" />
                    </span>
                  </div>
                  <div className="mt-1 text-[13px] text-white/60">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Section helpers ----------
const SectionLabel = ({ num, text }) => (
  <div className="inline-flex items-center gap-3">
    <span className="font-mono text-[11px] text-white/40 tracking-[0.3em]">{num}</span>
    <span className="h-px w-8 bg-white/20"></span>
    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/65">{text}</span>
  </div>
);

const SectionHeader = ({ num, label, title, kicker }) => (
  <div className="reveal max-w-3xl">
    <SectionLabel num={num} text={label} />
    <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight mt-5 text-white">
      {title}
    </h2>
    {kicker && <p className="mt-5 text-white/65 text-lg max-w-2xl">{kicker}</p>}
  </div>
);

// ---------- Services ----------
const SERVICES = [
  { icon: "Server", title: "Backend Development", desc: "FastAPI, Django, PostgreSQL, REST API, JWT authentication, WebSocket va Docker asosida scalable backend tizimlar.", tags: ["FastAPI", "Django", "Docker"] },
  { icon: "Bot", title: "AI Chatbot & Assistant", desc: "Website, Telegram va Instagram uchun AI assistant, LLM chatbot, customer support bot va smart automation.", tags: ["LLM", "Telegram", "Assistant"] },
  { icon: "Layers", title: "Full Stack Web Development", desc: "React frontend, backend API, admin panel, authentication, database va deploy bilan to‘liq web application.", tags: ["React", "API", "Deploy"] },
  { icon: "Workflow", title: "Automation Systems", desc: "n8n, Salebot, Nextbot va custom API integratsiyalar orqali biznes jarayonlarini avtomatlashtirish.", tags: ["n8n", "Salebot", "API"] },
  { icon: "BrainCircuit", title: "Machine Learning Projects", desc: "Classification, recommendation system, CNN model, data preprocessing, model training va evaluation.", tags: ["CNN", "TensorFlow", "ML"] },
  { icon: "Plug", title: "API & Bot Integration", desc: "Telegram bot, webhook, third-party API integration, payment, CRM va notification tizimlari.", tags: ["Webhook", "CRM", "Payment"] },
];

const ServiceCard = ({ s, i }) => (
  <div className="reveal glass glass-hover rounded-3xl p-6 sm:p-7 ring-grad relative overflow-hidden group">
    <div aria-hidden className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
         style={{ background: "radial-gradient(circle, rgba(139,92,246,.35), transparent 70%)" }} />
    <div className="flex items-center justify-between mb-7">
      <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-blue/25 via-neon-violet/25 to-neon-cyan/25 border border-white/10 grid place-items-center">
        <Icon name={s.icon} className="w-5 h-5 text-white" />
      </span>
      <span className="font-mono text-[11px] text-white/35 tracking-widest">0{i + 1}</span>
    </div>
    <h3 className="font-display text-xl text-white">{s.title}</h3>
    <p className="text-[14.5px] text-white/60 mt-2 leading-relaxed">{s.desc}</p>
    <div className="mt-5 flex flex-wrap gap-1.5">
      {s.tags.map(t => (
        <span key={t} className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/65">{t}</span>
      ))}
    </div>
  </div>
);

const Services = () => (
  <section id="services" className="relative py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeader
        num="03"
        label="Xizmatlarim"
        title={<>To‘liq texnologik stack <span className="text-gradient-accent">— bir joyda.</span></>}
        kicker="Backend, AI va avtomatlashtirish — har bir bosqichda professional yondashuv va aniq natija."
      />
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
      </div>
    </div>
  </section>
);

// ---------- Projects ----------
const PROJECTS = [
  { title: "Charity Index Uzbekistan", desc: "O‘zbekistondagi barcha hayriya fondlari haqida ma’lumotlarni jamlaydigan platforma. Loyihada fondlar ro‘yxati, fond profillari, qidiruv, kategoriyalar, admin panel va foydalanuvchilar uchun qulay ma’lumot ko‘rish tizimi mavjud.", tags: ["React", "FastAPI", "PostgreSQL", "Admin Panel"], cat: "Charity Platform", hue: ["#22d3ee", "#3b82ff"] },
  { title: "Museum Souvenirs Shop", desc: "Muzey suvenirlari uchun online do‘kon. Loyihada mahsulotlar katalogi, savatcha, wishlist, ko‘p tilli interfeys va admin panel mavjud.", tags: ["React", "FastAPI", "E-commerce", "Multilingual"], cat: "E-commerce", hue: ["#3b82ff", "#22d3ee"] },
  { title: "Zerona AI Website", desc: "AI xizmatlarini taqdim etuvchi zamonaviy website. Unda service showcase, AI assistant widget va chatbot integratsiyasi mavjud.", tags: ["React", "AI Assistant", "OpenAI API", "Landing"], cat: "AI Product", hue: ["#8b5cf6", "#3b82ff"] },
  { title: "Business Chatbot System", desc: "Bizneslar uchun mijozlar bilan avtomatik muloqot qiluvchi Telegram va Instagram DM chatbot konsepti. Bot mijoz savollariga javob beradi, lead yig‘adi va CRM tizimga yuboradi.", tags: ["Telegram Bot", "Aiogram", "Webhook", "CRM"], cat: "Automation", hue: ["#3b82ff", "#8b5cf6"] },
  { title: "Malaria Detection CNN Model", desc: "TensorFlow yordamida malaria aniqlash uchun CNN model. Image classification, model training va performance evaluation asosida qurilgan.", tags: ["Python", "TensorFlow", "CNN", "ML"], cat: "Machine Learning", hue: ["#22d3ee", "#8b5cf6"] },
  { title: "Movie Recommendation System", desc: "MovieLens dataset asosida film tavsiya qiluvchi recommendation system. Data preprocessing, similarity logic va model evaluation bilan ishlab chiqilgan.", tags: ["Python", "Pandas", "NumPy", "Recommender"], cat: "Data Science", hue: ["#8b5cf6", "#22d3ee"] },
  { title: "Keylogger Detection System", desc: "Security-related data analysis uchun keylogger detection system. Ma’lumotlarni tahlil qilish, preprocessing va model evaluation bosqichlari mavjud.", tags: ["Python", "Security", "ML", "Data Analysis"], cat: "Security", hue: ["#3b82ff", "#22d3ee"] },
];

const ProjectThumb = ({ p }) => (
  <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/10">
    <div className="absolute inset-0 stripe-ph"></div>
    <div className="absolute inset-0" style={{
      background: `radial-gradient(60% 80% at 30% 30%, ${p.hue[0]}55, transparent 60%), radial-gradient(70% 70% at 80% 80%, ${p.hue[1]}55, transparent 60%)`
    }}></div>
    <div className="absolute inset-0 grid place-items-center">
      <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">[ {p.cat} ]</div>
    </div>
    <div className="absolute top-3 left-3 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-white/40"></span>
      <span className="w-2 h-2 rounded-full bg-white/25"></span>
      <span className="w-2 h-2 rounded-full bg-white/15"></span>
    </div>
    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md glass font-mono text-[10px] text-white/70 tracking-wider">PREVIEW</div>
  </div>
);

const Projects = () => (
  <section id="projects" className="relative py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <SectionHeader
          num="04"
          label="Portfolio"
          title={<>Portfolio loyihalarim — <span className="text-gradient-accent">tanlangan ishlar.</span></>}
        />
        <a href="#contact" className="btn-ghost px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 self-start lg:self-auto">
          Barcha loyihalar <Icon name="ArrowUpRight" className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-5 lg:gap-6">
        {PROJECTS.map((p, i) => (
          <article key={p.title} className="reveal glass glass-hover rounded-3xl p-5 sm:p-6 ring-grad group">
            <ProjectThumb p={p} />
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] tracking-widest text-white/40 uppercase mb-1.5">PROJECT 0{i + 1} · {p.cat}</div>
                <h3 className="font-display text-2xl text-white">{p.title}</h3>
              </div>
              <a href="#contact" className="shrink-0 w-10 h-10 rounded-xl glass border border-white/10 grid place-items-center hover:bg-white/10 transition group/arrow">
                <Icon name="ArrowUpRight" className="w-4 h-4 text-white/80 group-hover/arrow:rotate-45 transition-transform" />
              </a>
            </div>
            <p className="mt-3 text-white/60 text-[14.5px] leading-relaxed">{p.desc}</p>
            <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span key={t} className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/65">{t}</span>
                ))}
              </div>
              <a href="#contact" className="text-[13px] text-white/85 inline-flex items-center gap-1.5 hover:text-white">
                Ko‘rish <Icon name="ArrowRight" className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ---------- Skills ----------
const SKILL_GROUPS = [
  { label: "Backend", icon: "Server", items: ["Python", "Django", "FastAPI", "REST API", "GraphQL", "gRPC", "WebSocket", "SOAP", "Webhooks", "JWT Authentication"] },
  { label: "Databases & Tools", icon: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "SQL", "Database Design", "Query Optimization"] },
  { label: "AI & Data", icon: "BrainCircuit", items: ["Pandas", "NumPy", "Data Cleaning", "Data Visualization", "Matplotlib", "Seaborn", "TensorFlow", "Machine Learning"] },
  { label: "DevOps", icon: "Container", items: ["Docker", "Ubuntu", "Linux Server", "Nginx", "CI/CD", "Virtual Machines", "Git", "GitHub"] },
  { label: "Automation & Bots", icon: "Workflow", items: ["Telegram Bot", "Aiogram", "n8n", "NextBot", "SaleBot", "Webhooks", "API Integration"] },
  { label: "Frontend & Other", icon: "Layers", items: ["React", "Node.js", "TypeScript", "Figma", "Postman", "Power BI", "Excel", "Manual Testing"] },
];

const SkillGroupCard = ({ g, i }) => (
  <div className="reveal glass glass-hover rounded-3xl p-6 ring-grad">
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue/30 via-neon-violet/30 to-neon-cyan/30 border border-white/10 grid place-items-center">
          <Icon name={g.icon} className="w-4 h-4 text-white" />
        </span>
        <h3 className="font-display text-lg text-white">{g.label}</h3>
      </div>
      <span className="font-mono text-[11px] text-white/35 tracking-widest">0{i + 1}</span>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {g.items.map(t => (
        <span key={t} className="text-[12px] font-mono px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/75 hover:bg-white/10 hover:text-white transition">{t}</span>
      ))}
    </div>
  </div>
);

const Skills = () => (
  <section id="skills" className="relative py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeader
        num="06"
        label="Ko‘nikmalar"
        title={<>Texnologiyalar va <span className="text-gradient-accent">texnik stack.</span></>}
        kicker="Backend, AI, DevOps va automation — har bir loyiha uchun to‘g‘ri vositalarni tanlayman."
      />
      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILL_GROUPS.map((g, i) => <SkillGroupCard key={g.label} g={g} i={i} />)}
      </div>
    </div>
  </section>
);

// ---------- Experience ----------
const EXPERIENCE = [
  {
    role: "AI Engineer", company: "Zerona AI", location: "Tashkent, Uzbekistan", date: "January 2026 — Present", current: true,
    bullets: [
      "Web platformalar uchun AI-powered yechimlar, chatbotlar va avtomatlashtirish tizimlarini ishlab chiqish",
      "LLM asosidagi chatbot tizimlarini mijozlar bilan avtomatik muloqot qilish uchun yaratish",
      "n8n va Salebot orqali biznes jarayonlarini avtomatlashtirish",
      "AI API’lar, image/video AI va conversational AI funksiyalarini web ilovalarga integratsiya qilish",
      "Nextbot va Salebot orqali marketing va kommunikatsiya pipeline’larini avtomatlashtirish",
    ],
  },
  {
    role: "Backend Developer", company: "PoligraUp Startup", location: "Tashkent, Uzbekistan", date: "November 2025 — March 2026",
    bullets: [
      "Python va FastAPI yordamida backend service’larni ishlab chiqish",
      "Web va Telegram-based ilovalar uchun RESTful API’lar yaratish",
      "Aiogram va Webhook orqali Telegram bot integratsiyalarini ishlab chiqish",
      "OTP authentication va secure authorization tizimlarini joriy qilish",
      "PostgreSQL bilan scalable backend architecture yaratish",
      "Docker va Linux server muhitida backend service’larni deploy qilish",
      "Database schema design, query optimization va data integrity bo‘yicha ishlash",
      "Authentication, API validation va error handling orqali xavfsiz backend yaratish",
    ],
  },
  {
    role: "System Administrator", company: "39 School", location: "Surxandaryo, Uzbekistan", date: "April 2022 — September 2022",
    bullets: [
      "Kompyuter tizimlari va lokal network infratuzilmasini o‘rnatish, sozlash va texnik xizmat ko‘rsatish",
      "Classroom computer’larni central server orqali ulash va boshqarish",
      "1 Million Uzbek Coders dasturi uchun student data registration jarayonini boshqarish",
      "kundalik.com platformasida student profile’larni yaratish va yuritish",
      "System updates, troubleshooting va secure internet access bo‘yicha ishlash",
    ],
  },
];

const Experience = () => (
  <section id="experience" className="relative py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeader
        num="02"
        label="Ish tajribam"
        title={<>Professional <span className="text-gradient-accent">tajriba va loyihalar.</span></>}
      />
      <div className="mt-14 relative">
        <div aria-hidden className="absolute left-4 sm:left-6 top-2 bottom-2 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(139,92,246,.5) 10%, rgba(34,211,238,.4) 90%, transparent)" }}></div>
        <div className="space-y-6">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="reveal relative pl-12 sm:pl-16">
              <span className="absolute left-0 sm:left-1.5 top-6 w-9 h-9 rounded-xl glass ring-grad grid place-items-center">
                <Icon name="Briefcase" className="w-4 h-4 text-white" />
              </span>
              <article className="glass glass-hover rounded-3xl p-6 sm:p-7 ring-grad">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display text-xl text-white">{e.role}</h3>
                      {e.current && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300">CURRENT</span>}
                    </div>
                    <div className="text-[14px] text-gradient-accent mt-1">{e.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[11px] text-white/55 tracking-wider">{e.date}</div>
                    <div className="text-[12px] text-white/45 mt-0.5 flex items-center gap-1 justify-end"><Icon name="MapPin" className="w-3 h-3" /> {e.location}</div>
                  </div>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {e.bullets.map((b, k) => (
                    <li key={k} className="flex gap-3 text-[14px] text-white/70 leading-relaxed">
                      <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet"></span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ---------- Education / Certifications / Languages ----------
const EduCertLang = () => (
  <section id="education" className="relative py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeader
        num="07"
        label="Ta’lim, sertifikatlar va tillar"
        title={<>Akademik fon <span className="text-gradient-accent">va kompetensiyalar.</span></>}
      />
      <div className="mt-14 grid lg:grid-cols-3 gap-5">
        {/* Education */}
        <div className="reveal glass glass-hover rounded-3xl p-6 ring-grad lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue/30 to-neon-violet/30 border border-white/10 grid place-items-center">
                <Icon name="GraduationCap" className="w-4 h-4 text-white" />
              </span>
              <h3 className="font-display text-lg text-white">Ta’lim</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300">PRESENT</span>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-white font-display text-xl">Artificial Intelligence Solutions and Applications</div>
              <div className="text-gradient-accent text-[14px] mt-1">PDP University</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[11px] text-white/55 tracking-wider">October 2023 — Present</div>
              <div className="text-[12px] text-white/45 mt-0.5 flex items-center gap-1 justify-end"><Icon name="MapPin" className="w-3 h-3" /> Tashkent, Uzbekistan</div>
            </div>
          </div>
          <p className="mt-4 text-[14px] text-white/65 leading-relaxed">
            Hozirda Artificial Intelligence yo‘nalishida tahsil olaman. Backend engineering, machine learning, AI systems va software development bo‘yicha amaliy loyihalar ustida ishlayman.
          </p>
        </div>

        {/* Certifications */}
        <div className="reveal glass glass-hover rounded-3xl p-6 ring-grad">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-violet/30 to-neon-cyan/30 border border-white/10 grid place-items-center">
              <Icon name="Award" className="w-4 h-4 text-white" />
            </span>
            <h3 className="font-display text-lg text-white">Sertifikatlar</h3>
          </div>
          <div className="glass rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="BadgeCheck" className="w-4 h-4 text-neon-cyan" />
              <span className="font-mono text-[10px] tracking-widest text-white/50">PEARSON BTEC</span>
            </div>
            <div className="text-[14px] text-white leading-snug">Pearson BTEC International Level 3 Foundation Diploma</div>
          </div>
        </div>

        {/* Languages */}
        <div className="reveal glass glass-hover rounded-3xl p-6 ring-grad lg:col-span-3">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan/30 to-neon-blue/30 border border-white/10 grid place-items-center">
              <Icon name="Languages" className="w-4 h-4 text-white" />
            </span>
            <h3 className="font-display text-lg text-white">Tillar</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { name: "Uzbek", level: "Fluent", pct: 100 },
              { name: "English", level: "B2", pct: 75 },
              { name: "Russian", level: "A2", pct: 35 },
            ].map(l => (
              <div key={l.name} className="glass rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="text-white text-[14px]">{l.name}</div>
                  <div className="font-mono text-[11px] text-white/55">{l.level}</div>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${l.pct}%`, background: "linear-gradient(90deg, #22d3ee, #3b82ff, #8b5cf6)" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------- Process ----------
const STEPS = [
  { n: "01", icon: "Lightbulb", title: "G‘oyani aniqlash", desc: "Avval loyiha maqsadi, auditoriya va kerakli natijani aniqlaymiz." },
  { n: "02", icon: "PenTool", title: "Dizayn va struktura", desc: "Website yoki tizim uchun zamonaviy ko‘rinish va aniq struktura tayyorlanadi." },
  { n: "03", icon: "Code2", title: "Yaratish", desc: "Frontend, AI kontent, bot yoki avtomatlashtirish bosqichma-bosqich ishlab chiqiladi." },
  { n: "04", icon: "Rocket", title: "Ishga tushirish", desc: "Loyiha test qilinadi, deploy qilinadi va foydalanishga tayyor holga keltiriladi." },
];

const Process = () => (
  <section id="process" className="relative py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeader
        num="05"
        label="Ish jarayonim"
        title={<>4 bosqichli aniq <span className="text-gradient-accent">ishlash tartibi.</span></>}
      />

      <div className="mt-14 relative">
        <div aria-hidden className="hidden lg:block absolute left-0 right-0 top-[58px] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,.4) 20%, rgba(34,211,238,.4) 80%, transparent)" }}></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {STEPS.map((st, i) => (
            <div key={st.n} className="reveal">
              <div className="relative mb-5 flex items-center gap-3">
                <span className="relative w-14 h-14 rounded-2xl glass ring-grad grid place-items-center">
                  <Icon name={st.icon} className="w-5 h-5 text-white" />
                </span>
                <span className="font-mono text-[11px] tracking-widest text-white/40">STEP / {st.n}</span>
              </div>
              <h3 className="font-display text-xl text-white">{st.title}</h3>
              <p className="mt-2 text-white/60 text-[14.5px] leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ---------- Testimonials ----------
const TESTIMONIALS = [
  { name: "Aziza Karimova", role: "Brand Manager · Aurum Co.", quote: "Juda tez va sifatli ishlaydi. G‘oyani tushunib, uni chiroyli natijaga aylantirdi. Hamkorlik mukammal kechdi." },
  { name: "Sardor Yusupov", role: "Founder · Nexta Studio", quote: "Avtomatlashtirish tizimi biznesimizdagi qo‘l mehnatini sezilarli darajada qisqartirdi. Professional yondashuv." },
  { name: "Madina Tojiyeva", role: "Marketing Lead", quote: "AI kontent va dizayn yondashuvi mutlaqo zamonaviy. Auditoriyamiz reaksiyasi darrov o‘zgardi." },
];

const Avatar = ({ name }) => {
  const initials = name.split(" ").map(s => s[0]).slice(0, 2).join("");
  return (
    <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-neon-blue/40 via-neon-violet/40 to-neon-cyan/40 border border-white/15 grid place-items-center font-display text-sm text-white">
      {initials}
    </span>
  );
};

const Testimonials = () => (
  <section id="testimonials" className="relative py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeader
        num="08"
        label="Mijozlar fikri"
        title={<>Birga ishlagan <span className="text-gradient-accent">odamlar nima deydi.</span></>}
      />
      <div className="mt-14 grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <figure key={i} className="reveal glass glass-hover rounded-3xl p-6 ring-grad relative">
            <Icon name="Quote" className="w-7 h-7 text-white/15 mb-4" />
            <blockquote className="text-white/85 text-[15px] leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-white/[0.07]">
              <Avatar name={t.name} />
              <div>
                <div className="text-white text-[14px]">{t.name}</div>
                <div className="text-white/50 text-[12px]">{t.role}</div>
              </div>
              <div className="ml-auto flex items-center gap-0.5">
                {[...Array(5)].map((_, k) => <Icon key={k} name="Star" className="w-3.5 h-3.5 text-yellow-300" />)}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

// ---------- Contact ----------
const Contact = () => {
  const [sent, setSent] = useState(false);
  const channels = [
    { icon: "Mail", label: "Email", value: "davlatovismat19@gmail.com", href: "mailto:davlatovismat19@gmail.com" },
    { icon: "Phone", label: "Phone", value: "+998 91 231 0680", href: "tel:+998912310680" },
    { icon: "Github", label: "GitHub", value: "github.com/ewboyeff", href: "https://github.com/ewboyeff" },
    { icon: "MapPin", label: "Location", value: "Tashkent, Uzbekistan", href: "#" },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          num="09"
          label="Bog‘lanish"
          title={<>Keling, loyihangizni <span className="text-gradient-accent">boshlaymiz.</span></>}
          kicker="Agar sizga backend tizim, AI chatbot, full-stack website, automation yoki machine learning yechim kerak bo‘lsa, men bilan bog‘laning."
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-6">
          {/* Channels */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4 self-start">
            {channels.map((c) => (
              <a key={c.label} href={c.href} className="reveal glass glass-hover rounded-2xl p-5 ring-grad group">
                <div className="flex items-center justify-between mb-6">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue/30 to-neon-violet/30 border border-white/10 grid place-items-center">
                    <Icon name={c.icon} className="w-4 h-4 text-white" />
                  </span>
                  <Icon name="ArrowUpRight" className="w-4 h-4 text-white/40 group-hover:text-white group-hover:rotate-45 transition" />
                </div>
                <div className="font-mono text-[11px] text-white/40 tracking-widest uppercase">{c.label}</div>
                <div className="text-white text-[14.5px] mt-1">{c.value}</div>
              </a>
            ))}
            <div className="sm:col-span-2 reveal glass rounded-2xl p-5 ring-grad flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,.6)]"></span>
              <div>
                <div className="text-[13.5px] text-white">Bo‘sh joy mavjud</div>
                <div className="text-[12px] text-white/55">Odatda 24 soat ichida javob beraman.</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3500); }}
            className="reveal lg:col-span-7 glass rounded-3xl p-6 sm:p-8 ring-grad relative overflow-hidden"
          >
            <div aria-hidden className="absolute -top-32 -right-32 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,246,.25), transparent 70%)" }}></div>

            <div className="grid sm:grid-cols-2 gap-4 relative">
              <div>
                <label className="font-mono text-[11px] text-white/50 tracking-widest">ISM</label>
                <input required type="text" placeholder="Ismingiz"
                  className="mt-2 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[14.5px] text-white placeholder-white/30 focus:outline-none focus:border-neon-blue/60 focus:bg-white/[0.05] transition" />
              </div>
              <div>
                <label className="font-mono text-[11px] text-white/50 tracking-widest">EMAIL YOKI TELEFON</label>
                <input required type="text" placeholder="email@domain.uz"
                  className="mt-2 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[14.5px] text-white placeholder-white/30 focus:outline-none focus:border-neon-blue/60 focus:bg-white/[0.05] transition" />
              </div>
            </div>
            <div className="mt-4 relative">
              <label className="font-mono text-[11px] text-white/50 tracking-widest">XABAR</label>
              <textarea required rows={5} placeholder="Loyihangiz haqida qisqacha yozing..."
                className="mt-2 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[14.5px] text-white placeholder-white/30 focus:outline-none focus:border-neon-blue/60 focus:bg-white/[0.05] transition resize-none"></textarea>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Backend", "AI Chatbot", "Full Stack", "Automation", "ML"].map(t => (                <button type="button" key={t} className="text-[12px] font-mono px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-white/65 hover:bg-white/10 hover:text-white transition">
                  + {t}
                </button>
              ))}
            </div>

            <div className="mt-7 flex items-center justify-between gap-4 flex-wrap relative">
              <div className="text-[12px] text-white/45 flex items-center gap-2">
                <Icon name="ShieldCheck" className="w-3.5 h-3.5" /> Ma’lumotlaringiz xavfsiz saqlanadi.
              </div>
              <button type="submit" className="btn-primary px-5 py-3 rounded-xl text-sm font-medium inline-flex items-center gap-2">
                {sent ? <>Yuborildi <Icon name="Check" className="w-4 h-4" /></> : <>Yuborish <Icon name="Send" className="w-4 h-4" /></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// ---------- Footer ----------
const Footer = () => (
  <footer className="relative pt-16 pb-10">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="divider mb-10"></div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="relative w-8 h-8 rounded-lg overflow-hidden ring-grad">
            <span className="absolute inset-0 bg-gradient-to-br from-neon-blue via-neon-violet to-neon-cyan opacity-90"></span>
            <span className="absolute inset-[3px] rounded-md bg-ink-950 grid place-items-center font-display font-bold text-[13px] text-white">E</span>
          </span>
          <span className="font-display font-semibold tracking-tight text-white/95">eshboyev<span className="text-gradient-accent">.dev</span></span>
        </div>
        <div className="text-[13px] text-white/45">© 2026 Eshboyev Dilshod. Barcha huquqlar himoyalangan.</div>
        <div className="flex items-center gap-3">
          {[
            { n: "Github", href: "https://github.com/ewboyeff" },
            { n: "Mail", href: "mailto:davlatovismat19@gmail.com" },
            { n: "Phone", href: "tel:+998912310680" },
          ].map(s => (
            <a key={s.n} href={s.href} className="w-9 h-9 grid place-items-center rounded-lg glass border border-white/10 hover:bg-white/10 transition">
              <Icon name={s.n} className="w-4 h-4 text-white/75" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ---------- App ----------
const App = () => {
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Services />
        <Projects />
        <Process />
        <Skills />
        <EduCertLang />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
