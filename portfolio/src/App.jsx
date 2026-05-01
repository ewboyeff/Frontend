import { useState, useEffect, useRef } from 'react';

// ---------- Language Content ----------
const CONTENT = {
  uz: {
    nav: [
      { label: "Bosh sahifa", href: "#home" },
      { label: "Men haqimda", href: "#about" },
      { label: "Tajriba", href: "#experience" },
      { label: "Xizmatlar", href: "#services" },
      { label: "Loyihalar", href: "#projects" },
      { label: "Ko'nikmalar", href: "#skills" },
      { label: "Bog'lanish", href: "#contact" },
    ],
    hero: {
      badge: "2026 · YANGI LOYIHALAR QABUL QILINMOQDA",
      title: "Backend, AI va Full Stack yechimlar orqali zamonaviy raqamli mahsulotlar yarataman",
      desc: "Men Python, FastAPI, Django, AI chatbotlar, avtomatlashtirish tizimlari va full-stack web ilovalar orqali bizneslar uchun tez, xavfsiz va kengaytiriladigan texnologik yechimlar ishlab chiqaman.",
      btn1: "Loyihalarimni ko'rish",
      btn2: "Bog'lanish",
      metrics: [
        { k: "3+", v: "yil IT tajriba" },
        { k: "10+", v: "loyiha" },
        { k: "AI", v: "engineering" },
      ],
    },
    about: {
      label: "Men haqimda",
      title: "Backend va AI bilan aqlli tizimlar.",
      name: "Eshboyev Dilshod",
      role: "Backend · AI · Full Stack",
      location: "Tashkent, Uzbekistan",
      github: "github.com/ewboyeff",
      desc: "Men Eshboyev Dilshodman — Backend Developer, AI Engineer va Full Stack Developer. Hozirda PDP University'da Artificial Intelligence yo'nalishida tahsil olaman. Python, Django, FastAPI, REST API, database design, Docker, Linux serverlar, AI chatbotlar, avtomatlashtirish workflow'lari va machine learning modellar bilan ishlayman. Maqsadim — backend engineering va sun'iy intellektni birlashtirib, bizneslar uchun samarali, xavfsiz va aqlli tizimlar yaratish.",
      stats: [
        { k: "3+", v: "yil IT tajriba", icon: "Sparkles" },
        { k: "AI", v: "Engineering", icon: "BrainCircuit" },
        { k: "BE", v: "Backend Architecture", icon: "Server" },
        { k: "⚡", v: "FastAPI / Django", icon: "Zap" },
        { k: "24/7", v: "Chatbot & Automation", icon: "Bot" },
        { k: "≡", v: "Docker & Linux", icon: "Container" },
      ],
    },
    services: {
      label: "Xizmatlarim",
      title: "To'liq texnologik stack — bir joyda.",
      desc: "Backend, AI va avtomatlashtirish — har bir bosqichda professional yondashuv va aniq natija.",
      items: [
        { icon: "Server", title: "Backend Development", desc: "FastAPI, Django, PostgreSQL, REST API, JWT authentication, WebSocket va Docker asosida scalable backend tizimlar.", tags: ["FastAPI", "Django", "Docker"] },
        { icon: "Bot", title: "AI Chatbot & Assistant", desc: "Website, Telegram va Instagram uchun AI assistant, LLM chatbot, customer support bot va smart automation.", tags: ["LLM", "Telegram", "Assistant"] },
        { icon: "Layers", title: "Full Stack Web Development", desc: "React frontend, backend API, admin panel, authentication, database va deploy bilan to'liq web application.", tags: ["React", "API", "Deploy"] },
        { icon: "Workflow", title: "Automation Systems", desc: "n8n, Salebot, Nextbot va custom API integratsiyalar orqali biznes jarayonlarini avtomatlashtirish.", tags: ["n8n", "Salebot", "API"] },
        { icon: "BrainCircuit", title: "Machine Learning Projects", desc: "Classification, recommendation system, CNN model, data preprocessing, model training va evaluation.", tags: ["CNN", "TensorFlow", "ML"] },
        { icon: "Plug", title: "API & Bot Integration", desc: "Telegram bot, webhook, third-party API integration, payment, CRM va notification tizimlari.", tags: ["Webhook", "CRM", "Payment"] },
      ],
    },
    projects: {
      label: "Portfolio",
      title: "Portfolio loyihalarim — tanlangan ishlar.",
      more: "Barcha loyihalar",
    },
    skills: {
      label: "Ko'nikmalar",
      title: "Texnologiyalar va texnik stack.",
      desc: "Backend, AI, DevOps va automation — har bir loyiha uchun to'g'ri vositalarni tanlayman.",
      groups: [
        { label: "Backend", icon: "Server", items: ["Python", "Django", "FastAPI", "REST API", "GraphQL", "gRPC", "WebSocket", "SOAP", "Webhooks", "JWT Authentication"] },
        { label: "Databases & Tools", icon: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "SQL", "Database Design", "Query Optimization"] },
        { label: "AI & Data", icon: "BrainCircuit", items: ["Pandas", "NumPy", "Data Cleaning", "Data Visualization", "Matplotlib", "Seaborn", "TensorFlow", "Machine Learning"] },
        { label: "DevOps", icon: "Container", items: ["Docker", "Ubuntu", "Linux Server", "Nginx", "CI/CD", "Virtual Machines", "Git", "GitHub"] },
        { label: "Automation & Bots", icon: "Workflow", items: ["Telegram Bot", "Aiogram", "n8n", "NextBot", "SaleBot", "Webhooks", "API Integration"] },
        { label: "Frontend & Other", icon: "Layers", items: ["React", "Node.js", "TypeScript", "Figma", "Postman", "Power BI", "Excel", "Manual Testing"] },
      ],
    },
    contact: {
      label: "Bog'lanish",
      title: "Yangi loyiha boshlashga tayyormisiz?",
      desc: "Backend, AI, Full Stack yoki avtomatlashtirish uchun yordam kerak bo'lsa, men bilan bog'laning. Loyihangizni batafsil ko'rib, eng yaxshi yechimni taklif qilaman.",
      btn1: "Email jo'natish",
      btn2: "Telegram",
    },
    footer: {
      copyright: "© 2026 Eshboyev Dilshod. Barcha huquqlar himoyalangan.",
      privacy: "Maxfiylik siyosati",
      terms: "Foydalanish shartlari",
    },
  },
  en: {
    nav: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      badge: "2026 · ACCEPTING NEW PROJECTS",
      title: "Building modern digital products through Backend, AI & Full Stack solutions",
      desc: "I create fast, secure, and scalable technology solutions for businesses using Python, FastAPI, Django, AI chatbots, automation systems, and full-stack web applications.",
      btn1: "View My Projects",
      btn2: "Get In Touch",
      metrics: [
        { k: "3+", v: "years IT experience" },
        { k: "10+", v: "projects completed" },
        { k: "AI", v: "engineering" },
      ],
    },
    about: {
      label: "About Me",
      title: "Smart systems with Backend and AI.",
      name: "Eshboyev Dilshod",
      role: "Backend · AI · Full Stack Developer",
      location: "Tashkent, Uzbekistan",
      github: "github.com/ewboyeff",
      desc: "I'm Eshboyev Dilshod — Backend Developer, AI Engineer, and Full Stack Developer. Currently studying Artificial Intelligence at PDP University. I work with Python, Django, FastAPI, REST APIs, database design, Docker, Linux servers, AI chatbots, automation workflows, and machine learning models. My goal is to combine backend engineering and artificial intelligence to create efficient, secure, and intelligent systems for businesses.",
      stats: [
        { k: "3+", v: "years IT experience", icon: "Sparkles" },
        { k: "AI", v: "Engineering", icon: "BrainCircuit" },
        { k: "BE", v: "Backend Architecture", icon: "Server" },
        { k: "⚡", v: "FastAPI / Django", icon: "Zap" },
        { k: "24/7", v: "Chatbot & Automation", icon: "Bot" },
        { k: "≡", v: "Docker & Linux", icon: "Container" },
      ],
    },
    services: {
      label: "Services",
      title: "Complete technology stack — all in one place.",
      desc: "Backend, AI, and automation — professional approach and precise results at every step.",
      items: [
        { icon: "Server", title: "Backend Development", desc: "Scalable backend systems built with FastAPI, Django, PostgreSQL, REST APIs, JWT authentication, WebSocket, and Docker.", tags: ["FastAPI", "Django", "Docker"] },
        { icon: "Bot", title: "AI Chatbot & Assistant", desc: "AI assistants, LLM chatbots, customer support bots, and smart automation for websites, Telegram, and Instagram.", tags: ["LLM", "Telegram", "Assistant"] },
        { icon: "Layers", title: "Full Stack Web Development", desc: "Complete web applications with React frontend, backend APIs, admin panels, authentication, databases, and deployment.", tags: ["React", "API", "Deploy"] },
        { icon: "Workflow", title: "Automation Systems", desc: "Business process automation through n8n, Salebot, Nextbot, and custom API integrations.", tags: ["n8n", "Salebot", "API"] },
        { icon: "BrainCircuit", title: "Machine Learning Projects", desc: "Classification, recommendation systems, CNN models, data preprocessing, training, and evaluation.", tags: ["CNN", "TensorFlow", "ML"] },
        { icon: "Plug", title: "API & Bot Integration", desc: "Telegram bots, webhooks, third-party API integrations, payments, CRM, and notification systems.", tags: ["Webhook", "CRM", "Payment"] },
      ],
    },
    projects: {
      label: "Portfolio",
      title: "My portfolio projects — selected works.",
      more: "All Projects",
    },
    skills: {
      label: "Skills",
      title: "Technologies & technical stack.",
      desc: "Backend, AI, DevOps, and automation — I choose the right tools for every project.",
      groups: [
        { label: "Backend", icon: "Server", items: ["Python", "Django", "FastAPI", "REST API", "GraphQL", "gRPC", "WebSocket", "SOAP", "Webhooks", "JWT Authentication"] },
        { label: "Databases & Tools", icon: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "SQL", "Database Design", "Query Optimization"] },
        { label: "AI & Data", icon: "BrainCircuit", items: ["Pandas", "NumPy", "Data Cleaning", "Data Visualization", "Matplotlib", "Seaborn", "TensorFlow", "Machine Learning"] },
        { label: "DevOps", icon: "Container", items: ["Docker", "Ubuntu", "Linux Server", "Nginx", "CI/CD", "Virtual Machines", "Git", "GitHub"] },
        { label: "Automation & Bots", icon: "Workflow", items: ["Telegram Bot", "Aiogram", "n8n", "NextBot", "SaleBot", "Webhooks", "API Integration"] },
        { label: "Frontend & Other", icon: "Layers", items: ["React", "Node.js", "TypeScript", "Figma", "Postman", "Power BI", "Excel", "Manual Testing"] },
      ],
    },
    contact: {
      label: "Contact",
      title: "Ready to start a new project?",
      desc: "Need help with backend, AI, full stack, or automation? Get in touch with me. I'll review your project and suggest the best solution.",
      btn1: "Send Email",
      btn2: "Telegram",
    },
    footer: {
      copyright: "© 2026 Eshboyev Dilshod. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
};

const PROJECTS = {
  uz: [
    { title: "Charity Index Uzbekistan", desc: "O'zbekistondagi barcha hayriya fondlari haqida ma'lumotlarni jamlaydigan platforma. Loyihada fondlar ro'yxati, fond profillari, qidiruv, kategoriyalar, admin panel va foydalanuvchilar uchun qulay ma'lumot ko'rish tizimi mavjud.", tags: ["React", "FastAPI", "PostgreSQL", "Admin Panel"], cat: "Charity Platform", hue: ["#22d3ee", "#3b82ff"] },
    { title: "Museum Souvenirs Shop", desc: "Muzey suvenirlari uchun online do'kon. Loyihada mahsulotlar katalogi, savatcha, wishlist, ko'p tilli interfeys va admin panel mavjud.", tags: ["React", "FastAPI", "E-commerce", "Multilingual"], cat: "E-commerce", hue: ["#3b82ff", "#22d3ee"] },
    { title: "Zerona AI Website", desc: "AI xizmatlarini taqdim etuvchi zamonaviy website. Unda service showcase, AI assistant widget va chatbot integratsiyasi mavjud.", tags: ["React", "AI Assistant", "OpenAI API", "Landing"], cat: "AI Product", hue: ["#8b5cf6", "#3b82ff"] },
    { title: "Business Chatbot System", desc: "Bizneslar uchun mijozlar bilan avtomatik muloqot qiluvchi Telegram va Instagram DM chatbot konsepti. Bot mijoz savollariga javob beradi, lead yig'adi va CRM tizimga yuboradi.", tags: ["Telegram Bot", "Aiogram", "Webhook", "CRM"], cat: "Automation", hue: ["#3b82ff", "#8b5cf6"] },
    { title: "Malaria Detection CNN Model", desc: "TensorFlow yordamida malaria aniqlash uchun CNN model. Image classification, model training va performance evaluation asosida qurilgan.", tags: ["Python", "TensorFlow", "CNN", "ML"], cat: "Machine Learning", hue: ["#22d3ee", "#8b5cf6"] },
    { title: "Movie Recommendation System", desc: "MovieLens dataset asosida film tavsiya qiluvchi recommendation system. Data preprocessing, similarity logic va model evaluation bilan ishlab chiqilgan.", tags: ["Python", "Pandas", "NumPy", "Recommender"], cat: "Data Science", hue: ["#8b5cf6", "#22d3ee"] },
  ],
  en: [
    { title: "Charity Index Uzbekistan", desc: "A platform that aggregates information about all charity foundations in Uzbekistan. Features foundation listings, profiles, search, categories, admin panel, and user-friendly information viewing system.", tags: ["React", "FastAPI", "PostgreSQL", "Admin Panel"], cat: "Charity Platform", hue: ["#22d3ee", "#3b82ff"] },
    { title: "Museum Souvenirs Shop", desc: "Online store for museum souvenirs. Includes product catalog, shopping cart, wishlist, multilingual interface, and admin panel.", tags: ["React", "FastAPI", "E-commerce", "Multilingual"], cat: "E-commerce", hue: ["#3b82ff", "#22d3ee"] },
    { title: "Zerona AI Website", desc: "Modern website showcasing AI services. Features service showcase, AI assistant widget, and chatbot integration.", tags: ["React", "AI Assistant", "OpenAI API", "Landing"], cat: "AI Product", hue: ["#8b5cf6", "#3b82ff"] },
    { title: "Business Chatbot System", desc: "Telegram and Instagram DM chatbot for automatic customer communication. The bot answers questions, collects leads, and sends them to CRM systems.", tags: ["Telegram Bot", "Aiogram", "Webhook", "CRM"], cat: "Automation", hue: ["#3b82ff", "#8b5cf6"] },
    { title: "Malaria Detection CNN Model", desc: "CNN model for malaria detection using TensorFlow. Built on image classification, model training, and performance evaluation.", tags: ["Python", "TensorFlow", "CNN", "ML"], cat: "Machine Learning", hue: ["#22d3ee", "#8b5cf6"] },
    { title: "Movie Recommendation System", desc: "Recommendation system based on MovieLens dataset. Developed with data preprocessing, similarity logic, and model evaluation.", tags: ["Python", "Pandas", "NumPy", "Recommender"], cat: "Data Science", hue: ["#8b5cf6", "#22d3ee"] },
  ],
};
const Icon = ({ name, className = "w-5 h-5", strokeWidth = 1.6 }) => {
  const icons = {
    'ArrowUpRight': () => <svg className={className} stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth}><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>,
    'Menu': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><path d="M3 5h18M3 12h18M3 19h18"/></svg>,
    'X': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><path d="M6 6l12 12M18 6l-12 12"/></svg>,
    'MessageSquare': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    'ArrowRight': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
    'Activity': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><path d="M22 12h-4l-3 9H9l-3-9H2"/></svg>,
    'Sparkles': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><path d="M12 3v6m0 6v6M9 6l4-4 4 4M9 18l4 4 4-4"/></svg>,
    'Bot': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="8" r="1"/><circle cx="12" cy="16" r="1"/></svg>,
    'Layers': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><polygon points="12 2 20 6 20 18 12 22 4 18 4 6 12 2"/><polyline points="12 22 12 12"/><polyline points="20 6 12 12 4 6"/></svg>,
    'User': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    'Briefcase': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    'MapPin': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    'Github': () => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
    'Server': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6" y2="6.01"/><line x1="6" y1="18" x2="6" y2="18.01"/></svg>,
    'BrainCircuit': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="12" y1="12" x2="15" y2="15"/></svg>,
    'Zap': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    'Container': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M16 4L8 7"/><path d="M8 4l-6 3v10"/></svg>,
    'Database': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><ellipse cx="12" cy="5" rx="10" ry="3"/><path d="M2 5v14c0 1.66 4.48 3 10 3s10-1.34 10-3V5"/><path d="M2 12c0 1.66 4.48 3 10 3s10-1.34 10-3"/></svg>,
    'Workflow': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><line x1="9" y1="8" x2="9" y2="10"/><line x1="15" y1="8" x2="15" y2="15"/></svg>,
    'Plug': () => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth}><circle cx="9" cy="3" r="1"/><circle cx="15" cy="3" r="1"/><path d="M12 9v6M9 15h6M9 21h6"/></svg>,
  };

  return icons[name] ? <span>{icons[name]()}</span> : <span className={className}>●</span>;
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
const Navbar = ({ lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const content = CONTENT[lang];
  
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
            <span className="font-display font-semibold tracking-tight text-white/95">Dilshod</span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href} className="nav-link text-[13.5px] text-white/70 hover:text-white transition-colors">{n.label}</a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => setLang(lang === 'uz' ? 'en' : 'uz')} className="px-3 py-1.5 rounded-lg text-[12px] font-mono text-white/70 hover:text-white border border-white/20 transition">
              {lang === 'uz' ? 'EN' : 'UZ'}
            </button>
            <a href="#contact" className="btn-primary px-4 py-2 rounded-xl text-[13.5px] font-medium inline-flex items-center gap-2">
              {lang === 'uz' ? 'Loyihani boshlash' : 'Start Project'} <Icon name="ArrowUpRight" className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setLang(lang === 'uz' ? 'en' : 'uz')} className="px-2 py-1 rounded text-[11px] font-mono text-white/70 hover:text-white">
              {lang === 'uz' ? 'EN' : 'UZ'}
            </button>
            <button onClick={() => setOpen(v => !v)} className="glass rounded-xl p-2.5" aria-label="Menu">
              <Icon name={open ? "X" : "Menu"} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-[400px] mt-3" : "max-h-0"}`}>
          <div className="glass rounded-2xl p-4 flex flex-col gap-1">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/5 transition">{n.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 px-4 py-3 rounded-xl text-sm font-medium text-center">{lang === 'uz' ? 'Loyihani boshlash' : 'Start Project'}</a>
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
const Hero = ({ lang }) => {
  const content = CONTENT[lang].hero;
  
  return (
    <section id="home" className="relative pt-36 lg:pt-44 pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="reveal inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6 ring-grad">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,.6)]"></span>
              <span className="font-mono text-[11px] tracking-wider text-white/70">{content.badge}</span>
            </div>

            <h1 className="reveal font-display font-semibold tracking-[-0.025em] text-[44px] sm:text-6xl lg:text-7xl leading-[1.02] text-white">
              <span className="text-gradient">{content.title}</span>
            </h1>

            <p className="reveal mt-7 max-w-xl text-base sm:text-lg text-white/65 leading-relaxed">
              {content.desc}
            </p>

            <div className="reveal mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary px-5 py-3.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
                {content.btn1} <Icon name="ArrowRight" className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-ghost px-5 py-3.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
                {content.btn2} <Icon name="MessageSquare" className="w-4 h-4" />
              </a>
            </div>

            {/* Inline metrics */}
            <div className="reveal mt-12 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
              {content.metrics.map((m, i) => (
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
const About = ({ lang }) => {
  const content = CONTENT[lang].about;
  
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 reveal">
            <SectionLabel num="01" text={content.label} />
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight mt-5">
              {content.title}
            </h2>
            <div className="mt-6 glass rounded-2xl p-4 ring-grad space-y-2">
              <div className="flex items-center gap-2 text-[13px] text-white/75"><Icon name="User" className="w-3.5 h-3.5 text-white/55" /> {content.name}</div>
              <div className="flex items-center gap-2 text-[13px] text-white/75"><Icon name="Briefcase" className="w-3.5 h-3.5 text-white/55" /> {content.role}</div>
              <div className="flex items-center gap-2 text-[13px] text-white/75"><Icon name="MapPin" className="w-3.5 h-3.5 text-white/55" /> {content.location}</div>
              <div className="flex items-center gap-2 text-[13px] text-white/75"><Icon name="Github" className="w-3.5 h-3.5 text-white/55" /> {content.github}</div>
            </div>
          </div>
          <div className="lg:col-span-7 reveal">
            <p className="text-lg text-white/70 leading-relaxed">
              {content.desc}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
              {content.stats.map((s, i) => (
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

// ---------- Service Card ----------
const ServiceCard = ({ s, i }) => (
  <div className="reveal glass glass-hover rounded-2xl p-5 sm:p-6 ring-grad group">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/30 to-neon-violet/30 grid place-items-center border border-white/10 group-hover:border-white/20 transition">
      <Icon name={s.icon} className="w-6 h-6 text-white/85" />
    </div>
    <h3 className="mt-4 font-display text-xl text-white">{s.title}</h3>
    <p className="mt-2.5 text-white/65 text-[14.5px] leading-relaxed">{s.desc}</p>
    <div className="mt-4 flex flex-wrap gap-1.5">
      {s.tags.map(t => (
        <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/65">{t}</span>
      ))}
    </div>
  </div>
);

// ---------- Project Thumb ----------
const ProjectThumb = ({ p }) => {
  const isPython = p.cat?.includes('Python') || p.cat?.includes('Backend');
  const bgColor = isPython ? "from-blue-600 to-blue-500" : "from-purple-600 to-purple-500";
  
  return (
    <div className={`w-full h-48 rounded-2xl bg-gradient-to-br ${bgColor} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
      <Icon name={p.icon || "Code"} className="w-16 h-16 text-white/60" />
    </div>
  );
};

// ---------- Skill Group Card ----------
const SkillGroupCard = ({ g, i }) => (
  <div className="reveal glass glass-hover rounded-2xl p-5 sm:p-6 ring-grad">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue/30 to-neon-cyan/30 grid place-items-center border border-white/10">
        <Icon name={g.icon} className="w-5 h-5 text-white/85" />
      </div>
      <h3 className="font-display text-lg text-white">{g.label}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {g.items.map(item => (
        <span key={item} className="text-[12px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 hover:text-white/90 hover:border-white/20 transition">
          {item}
        </span>
      ))}
    </div>
  </div>
);

// ---------- Services ----------
const Services = ({ lang }) => {
  const content = CONTENT[lang].services;
  
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          num="03"
          label={content.label}
          title={content.title}
          kicker={content.desc}
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.items.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
};

// ---------- Projects ----------
const Projects = ({ lang }) => {
  const content = CONTENT[lang].projects;
  const projectList = PROJECTS[lang];
  
  return (
    <section id="projects" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeader
            num="04"
            label={content.label}
            title={content.title}
          />
          <a href="#contact" className="btn-ghost px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 self-start lg:self-auto">
            {content.more} <Icon name="ArrowUpRight" className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5 lg:gap-6">
          {projectList.map((p, i) => (
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
                  {lang === 'uz' ? 'Ko\'rish' : 'View'} <Icon name="ArrowRight" className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Skills ----------
const Skills = ({ lang }) => {
  const content = CONTENT[lang].skills;
  
  return (
    <section id="skills" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          num="06"
          label={content.label}
          title={content.title}
          kicker={content.desc}
        />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.groups.map((g, i) => <SkillGroupCard key={g.label} g={g} i={i} />)}
        </div>
      </div>
    </section>
  );
};

// ---------- Contact CTA ----------
const Contact = ({ lang }) => {
  const content = CONTENT[lang].contact;
  
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-3xl mx-auto text-center">
          <SectionLabel num="07" text={content.label} />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight mt-5 text-white">
            {content.title}
          </h2>
          <p className="mt-7 text-lg text-white/65 max-w-2xl mx-auto leading-relaxed">
            {content.desc}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:dilshod@example.com" className="btn-primary px-6 py-3.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
              {content.btn1} <Icon name="ArrowUpRight" className="w-4 h-4" />
            </a>
            <a href="https://t.me/dilshod_uz" target="_blank" rel="noopener noreferrer" className="btn-ghost px-6 py-3.5 rounded-xl text-sm font-medium">
              {content.btn2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Footer ----------
const Footer = ({ lang }) => {
  const content = CONTENT[lang];
  const navContent = content.nav;
  const footerContent = content.footer;
  
  return (
    <footer className="border-t border-white/[0.06] py-12 bg-ink-900/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Dilshod</h4>
            <p className="text-[13px] text-white/55 leading-relaxed">{lang === 'uz' ? 'Backend, AI va Full Stack yechimlar orqali zamonaviy mahsulotlar.' : 'Modern products through Backend, AI and Full Stack solutions.'}</p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white mb-4">{lang === 'uz' ? 'Havolalar' : 'Links'}</h4>
            <ul className="space-y-2 text-[13px]">
              {navContent.slice(0, 4).map(n => (
                <li key={n.href}><a href={n.href} className="text-white/60 hover:text-white transition">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white mb-4">{lang === 'uz' ? 'Ijtimoiy' : 'Social'}</h4>
            <ul className="space-y-2 text-[13px]">
              <li><a href="https://github.com/ewboyeff" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition">GitHub</a></li>
              <li><a href="https://t.me/ewboyeff" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition">Telegram</a></li>
              <li><a href="https://www.linkedin.com/in/ewboyeff/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white mb-4">{lang === 'uz' ? 'Kontakt' : 'Contact'}</h4>
            <ul className="space-y-2 text-[13px]">
              <li><a href="mailto:dilshod@example.com" className="text-white/60 hover:text-white transition">davlatovismat19@gmail.com</a></li>
              <li className="text-white/60">+998 (91) 231 0680</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/50">
            <p>{footerContent.copyright}</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white/80 transition">{footerContent.privacy}</a>
              <span>·</span>
              <a href="#" className="hover:text-white/80 transition">{footerContent.terms}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ---------- App ----------
export default function App() {
  const [lang, setLang] = useState('uz');
  useReveal();

  return (
    <div className="min-h-screen bg-ink-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(1200px 700px at 80% -10%, rgba(59,130,255,.18), transparent 60%), radial-gradient(900px 600px at 0% 20%, rgba(139,92,246,.16), transparent 60%), radial-gradient(800px 600px at 50% 110%, rgba(34,211,238,.12), transparent 60%), #06070d" }}></div>
        <div className="absolute inset-0 grid-bg opacity-70"></div>
        <div className="orb animate-aurora" style={{ width: "520px", height: "520px", left: "-120px", top: "-80px", background: "radial-gradient(circle, #3b82ff 0%, transparent 60%)" }}></div>
        <div className="orb animate-aurora" style={{ width: "620px", height: "620px", right: "-160px", top: "10%", background: "radial-gradient(circle, #8b5cf6 0%, transparent 60%)", animationDelay: "-6s" }}></div>
        <div className="orb animate-aurora" style={{ width: "480px", height: "480px", left: "30%", bottom: "-160px", background: "radial-gradient(circle, #22d3ee 0%, transparent 60%)", animationDelay: "-10s" }}></div>
      </div>

      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Services lang={lang} />
        <Projects lang={lang} />
        <Skills lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
