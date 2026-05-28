import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

/* ── Images ── */
const IMG_ANGEL    = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/62c90c4f-6273-496a-843a-68829a58a291.jpg";
const IMG_CATALOG  = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/60f175a8-2d1d-4b86-95be-01dcfcdbd100.jpg";
const IMG_WORKSHOP = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/8867b041-866e-4df9-ac15-8e82c9fa4067.jpg";
const IMG_PORTFOLIO= "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/a074d7f9-4b5a-4159-a62d-361ae4cff99c.jpg";

/* ── Nav ── */
const TOP_NAV = [
  { label: "Памятники",              sub: true },
  { label: "Металлические изделия",  sub: true },
  { label: "Дополнительные элементы",sub: true },
  { label: "Услуги",                 sub: true },
  { label: "Оплаченные",             sub: true },
  { label: "Портрет и надписи",      sub: true },
  { label: "Изделия из камня",       sub: true },
];

/* ── Catalog tabs ── */
const TABS = ["Гранитные памятники","Памятники животных","Мраморные памятники","Детские памятники","Мемориальные доски"];

/* ── Products ── */
const PRODUCTS = [
  { id:1, name:"Вертикальный памятник", price:"25 000,00 ₽", img: IMG_CATALOG },
  { id:2, name:"Вертикальный памятник", price:"27 000,00 ₽", img: IMG_CATALOG },
  { id:3, name:"Вертикальный памятник", price:"27 000,00 ₽", img: IMG_CATALOG },
  { id:4, name:"Вертикальный памятник", price:"27 000,00 ₽", img: IMG_CATALOG },
];

/* ── Badges ── */
const BADGES = [
  { icon:"ShieldCheck", label:"Гарантия",   desc:"на установку от 5 лет" },
  { icon:"Zap",         label:"Скорость",   desc:"выполнения за 3 дня" },
  { icon:"CreditCard",  label:"Рассрочка",  desc:"без переплат и %%" },
  { icon:"Award",       label:"Ответственность", desc:"качество гарантировано" },
  { icon:"Star",        label:"Доверие",    desc:"тысячи довольных клиентов" },
];

/* ── Steps ── */
const STEPS = [
  { n:1, label:"Проектирую сооружения" },
  { n:2, label:"Подготавливаю договор и вношу предоплату (всего 2000₽)" },
  { n:3, label:"Принимаю готовую работу" },
  { n:4, label:"Расчёт и гарантия" },
];

/* ── Reviews ── */
const REVIEWS = [
  { name:"Майкл Слоун", src:"Яндекс", text:"Добрый день! Мы долго искали кто сделает по нашему эскизу памятник, и обратились к ним по совету ближайшего знакомого, и он..." },
  { name:"Майкл Слоун", src:"Яндекс", text:"Добрый день! Мы долго искали кто сделает по нашему эскизу памятник, и обратились к ним по совету ближайшего знакомого, и он..." },
  { name:"Майкл Слоун", src:"Яндекс", text:"Добрый день! Мы долго искали кто сделает по нашему эскизу памятник, и обратились к ним по совету ближайшего знакомого, и он..." },
];

/* ── About checklist ── */
const ABOUT_LIST = [
  "Проектирование и монтаж мемориальных сооружений. Зп+дзот и памятники",
  "Гарантийное реализация отсутствующих товаров гарантийный и абонентское обслуживание",
  "на рынке с 2003 года, опытные специалисты",
  "Оптимальная цена за счет прямых поставок от производителей сырья",
  "Полное официализация сделок. Наличный и безналичный расчет. Работа с организациями, справки для Военкоматов.",
];

/* ── Addresses ── */
const ADDRESSES = [
  "г. Самолетово, Воздушная улица, 42м",
  "ул. Плавная, 118",
  "ул. Морозкина, 54",
];

/* ── Calculator ── */
const MATERIALS = [
  { id:"gb", name:"Гранит чёрный",    base:28000 },
  { id:"gg", name:"Гранит серый",     base:22000 },
  { id:"mw", name:"Мрамор белый",     base:20000 },
  { id:"gk", name:"Гранит карельский",base:36000 },
];
const SIZES = [
  { id:"s", name:"80×40 см",  mult:1 },
  { id:"m", name:"100×50 см", mult:1.45 },
  { id:"l", name:"120×60 см", mult:1.9 },
  { id:"xl",name:"150×70 см", mult:2.55 },
];
const ENGRAVINGS = [
  { id:"none",  name:"Без гравировки",    price:0 },
  { id:"text",  name:"Текст и даты",      price:3500 },
  { id:"laser", name:"Портрет лазерный",  price:8500 },
  { id:"hand",  name:"Портрет ручной",    price:16000 },
];

/* ── Helpers ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ══════════════════════════════════════════════════ */
export default function Index() {
  const [activeTab, setActiveTab]     = useState(0);
  const [mobileMenu, setMobileMenu]   = useState(false);
  const [calcMat,   setCalcMat]       = useState(MATERIALS[0].id);
  const [calcSize,  setCalcSize]      = useState(SIZES[0].id);
  const [calcEngr,  setCalcEngr]      = useState(ENGRAVINGS[0].id);
  const [install,   setInstall]       = useState(false);

  const hero    = useInView(0.05);
  const catalog = useInView(0.1);
  const badges  = useInView(0.1);
  const steps   = useInView(0.1);
  const about   = useInView(0.1);
  const reviews = useInView(0.1);
  const calc    = useInView(0.1);
  const footer  = useInView(0.1);

  const mat  = MATERIALS.find(m => m.id === calcMat)!;
  const sz   = SIZES.find(s => s.id === calcSize)!;
  const engr = ENGRAVINGS.find(e => e.id === calcEngr)!;
  const total = Math.round(mat.base * sz.mult) + engr.price + (install ? 7000 : 0);

  const scroll = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior:"smooth" });
    setMobileMenu(false);
  };

  /* ── NAV colors ── */
  const NAVY = "hsl(214,52%,28%)";
  const NAVY_BG = "#2b4a7a";

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#1e2d42]">

      {/* ══ TOP BAR ══ */}
      <div style={{ background: NAVY_BG }} className="hidden md:flex items-center justify-between px-6 py-1.5 text-xs text-white/70">
        <span>Мастерская камня «Хранители» — Самара</span>
        <div className="flex items-center gap-5">
          <a href="tel:+78463001234" className="flex items-center gap-1.5 text-white hover:text-white/80">
            <Icon name="Phone" size={12} /> +7 (846) 300-12-34
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white/90"><Icon name="User" size={12} /> Войти</a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white/90"><Icon name="Heart" size={12} /> Избранное</a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white/90"><Icon name="ShoppingCart" size={12} /> Корзина</a>
        </div>
      </div>

      {/* ══ MAIN NAV ══ */}
      <nav style={{ background: NAVY_BG }} className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-6 h-14">

          {/* Logo */}
          <button onClick={() => scroll("#hero")} className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center justify-center rounded-full w-9 h-9 bg-white/15 border border-white/30">
              <Icon name="Gem" size={18} style={{ color: "#7ec8e3" }} />
            </div>
            <div className="leading-tight text-left">
              <div className="text-white font-bold text-sm tracking-wide leading-none">ХРАНИТЕЛЬ</div>
              <div className="text-white/60 text-[9px] tracking-widest leading-none mt-0.5">МАСТЕРСКАЯ КАМНЯ</div>
            </div>
          </button>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1 flex-1 overflow-x-auto scrollbar-hide">
            {TOP_NAV.map(item => (
              <button key={item.label} className="nav-link flex items-center gap-0.5 px-2 py-1 rounded hover:bg-white/10 transition-colors">
                {item.label}
                {item.sub && <Icon name="ChevronDown" size={12} style={{ opacity: 0.6 }} />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a href="tel:+78463001234" className="hidden lg:flex items-center gap-1.5 text-white text-sm font-medium">
              <Icon name="Phone" size={14} style={{ color: "#7ec8e3" }} />
              +7 (846) 300-12-34
            </a>
            <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
              <Icon name={mobileMenu ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-[#243f68] px-4 pb-4 flex flex-col gap-1">
            {TOP_NAV.map(item => (
              <button key={item.label} className="nav-link text-left py-2 border-b border-white/10 w-full">
                {item.label}
              </button>
            ))}
            <a href="tel:+78463001234" className="flex items-center gap-2 text-white py-2 text-sm">
              <Icon name="Phone" size={14} /> +7 (846) 300-12-34
            </a>
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" ref={hero.ref}
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2b5797 60%, #3d7ab5 100%)", minHeight: 420 }}>

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)" }} />

        <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center relative z-10" style={{ minHeight: 420 }}>
          {/* Text */}
          <div className={`flex-1 py-12 ${hero.inView ? "animate-fade-up" : "opacity-0"}`}>
            <h1 className="text-white font-bold leading-tight mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
              Изготовление<br />
              <span style={{ color:"#7ec8e3" }}>памятников</span> в Самаре
            </h1>
            <p className="text-white/70 text-sm mb-7 max-w-md leading-relaxed">
              Мы есть то, о чём есть память
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="btn-white" onClick={() => scroll("#catalog")}>
                Смотреть каталог
              </button>
              <button className="btn-ghost-white" onClick={() => scroll("#calculator")}>
                <Icon name="Calculator" size={14} /> Рассчитать цену
              </button>
            </div>
            <div className="flex flex-wrap gap-6 mt-8">
              {[["15+","лет на рынке"],["3 000+","выполненных работ"],["100%","гарантия"]].map(([n,l]) => (
                <div key={l}>
                  <div className="text-white font-bold text-xl">{n}</div>
                  <div className="text-white/60 text-xs">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Angel image */}
          <div className={`hidden md:block relative flex-shrink-0 ${hero.inView ? "animate-fade-in delay-300" : "opacity-0"}`}
            style={{ width: 320, height: 400 }}>
            <img src={IMG_ANGEL} alt="Памятник" className="w-full h-full object-contain object-bottom drop-shadow-2xl"
              style={{ filter: "brightness(1.05) contrast(1.05)" }} />
          </div>
        </div>
      </section>

      {/* ══ CATALOG ══ */}
      <section id="catalog" ref={catalog.ref} className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className={catalog.inView ? "animate-fade-up" : "opacity-0"}>
          <h2 className="section-title mb-4">КАТАЛОГ</h2>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-6">
            {TABS.map((t,i) => (
              <button key={t} onClick={() => setActiveTab(i)}
                className={`tab-btn ${activeTab===i?"active":""}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRODUCTS.map(p => (
                <div key={p.id} className="product-card">
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover"
                      style={{ filter:"grayscale(0.3) brightness(0.9)" }} />
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-500 mb-0.5">Вертикальный памятник</div>
                    <div className="font-semibold text-sm text-[#1e2d42] mb-2">{p.name}</div>
                    <div className="font-bold text-base mb-3" style={{ color: NAVY }}>{p.price}</div>
                    <div className="flex gap-2">
                      <button className="btn-primary text-xs py-1.5 px-3 flex-1">Подробнее</button>
                      <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Icon name="Heart" size={14} style={{ color:"#888" }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Arrow nav */}
            <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50">
              <Icon name="ChevronLeft" size={16} style={{ color: NAVY }} />
            </button>
            <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50">
              <Icon name="ChevronRight" size={16} style={{ color: NAVY }} />
            </button>
          </div>
        </div>
      </section>

      {/* ══ BADGES ══ */}
      <div ref={badges.ref} style={{ background: NAVY_BG }} className="py-6 px-4">
        <div className={`max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 ${badges.inView ? "animate-fade-up" : "opacity-0"}`}>
          {BADGES.map((b,i) => (
            <div key={b.label} className={`flex flex-col items-center text-center gap-2 ${badges.inView ? `animate-fade-up delay-${(i+1)*100}` : ""}`}>
              <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
                <Icon name={b.icon} size={20} style={{ color:"#7ec8e3" }} />
              </div>
              <div className="text-white font-semibold text-sm">{b.label}</div>
              <div className="text-white/60 text-xs leading-tight">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PROMO BANNERS ══ */}
      <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-5">
        {/* Custom order */}
        <div className="rounded-xl overflow-hidden relative flex flex-col justify-end p-6" style={{ minHeight:200 }}>
          <img src={IMG_WORKSHOP} alt="Мастерская" className="absolute inset-0 w-full h-full object-cover" style={{ filter:"brightness(0.45)" }} />
          <div className="relative z-10">
            <div className="text-white font-bold text-lg mb-1">НЕ НАШЛИ ТО ЧТО ИСКАЛИ?</div>
            <div className="text-white/80 text-sm mb-4">Изготовим памятник под заказ</div>
            <div className="flex gap-3">
              <button className="btn-white text-xs py-2">
                <Icon name="Phone" size={13} /> Позвонить
              </button>
              <button className="btn-ghost-white text-xs py-2">
                <Icon name="MapPin" size={13} /> На карте
              </button>
            </div>
          </div>
        </div>
        {/* Promo */}
        <div className="rounded-xl overflow-hidden relative flex flex-col justify-between p-6" style={{ minHeight:200, background: NAVY_BG }}>
          <div>
            <div className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-3">Акция</div>
            <div className="text-white font-bold text-lg mb-1">При заказе от 1000 ваз — в подарок!</div>
          </div>
          <button className="btn-white self-start text-xs py-2">Подробнее</button>
        </div>
      </section>

      {/* ══ STEPS ══ */}
      <section id="steps" ref={steps.ref} className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className={steps.inView ? "animate-fade-up" : "opacity-0"}>
          <h2 className="section-title text-center mb-10">ПОРЯДОК РАБОТЫ</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-[#2b4a7a]/20 z-0" />
            {STEPS.map((s,i) => (
              <div key={s.n} className={`flex flex-col items-center text-center gap-3 relative z-10 ${steps.inView ? `animate-fade-up delay-${(i+1)*100}` : ""}`}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                  style={{ background: NAVY_BG }}>
                  {s.n}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed max-w-[180px]">{s.label}</p>
              </div>
            ))}
          </div>
          {/* Gear icon center */}
          <div className="flex justify-center mt-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: NAVY_BG }}>
              <Icon name="Settings" size={28} style={{ color:"#7ec8e3" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" ref={about.ref} className="py-12 px-4 md:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className={about.inView ? "animate-fade-up" : "opacity-0"}>
          <img src={IMG_WORKSHOP} alt="Мастерская" className="w-full rounded-xl object-cover shadow-xl"
            style={{ height:340, filter:"brightness(0.9)" }} />
        </div>
        <div className={about.inView ? "animate-fade-up delay-200" : "opacity-0"}>
          <div className="rounded-xl p-6 md:p-8" style={{ background: NAVY_BG }}>
            <div className="text-white/60 text-xs tracking-widest uppercase mb-2">О НАС</div>
            <h3 className="text-white font-bold text-xl mb-1">Мастерская камня</h3>
            <p className="text-white/70 text-sm mb-5 leading-relaxed">
              Собственный цех по художественной обработке камня. Работаем с гранитом и мрамором.
            </p>
            <ul className="space-y-3">
              {ABOUT_LIST.map((item,i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={16} style={{ color:"#7ec8e3", flexShrink:0, marginTop:2 }} />
                  <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ CALCULATOR ══ */}
      <section id="calculator" ref={calc.ref} className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
        <div className={calc.inView ? "animate-fade-up" : "opacity-0"}>
          <h2 className="section-title text-center mb-2">КАЛЬКУЛЯТОР СТОИМОСТИ</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Выберите параметры — получите предварительную цену</p>

          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
            {/* Material */}
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: NAVY }}>1. Материал</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {MATERIALS.map(m => (
                  <button key={m.id} onClick={() => setCalcMat(m.id)}
                    className="text-left p-3 rounded-lg border text-sm transition-all"
                    style={{
                      borderColor: calcMat===m.id ? NAVY : "#e2e8f0",
                      background:  calcMat===m.id ? "hsl(214,52%,28%,0.07)" : "#fff",
                      color:       calcMat===m.id ? NAVY : "#4a5568",
                      fontWeight:  calcMat===m.id ? 600 : 400,
                    }}>
                    <div className="text-xs font-semibold">{m.name}</div>
                    <div className="text-xs opacity-60 mt-0.5">от {m.base.toLocaleString("ru")} ₽</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: NAVY }}>2. Размер</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {SIZES.map(s => (
                  <button key={s.id} onClick={() => setCalcSize(s.id)}
                    className="text-center p-3 rounded-lg border text-sm transition-all"
                    style={{
                      borderColor: calcSize===s.id ? NAVY : "#e2e8f0",
                      background:  calcSize===s.id ? "hsl(214,52%,28%,0.07)" : "#fff",
                      color:       calcSize===s.id ? NAVY : "#4a5568",
                      fontWeight:  calcSize===s.id ? 600 : 400,
                    }}>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Engraving */}
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: NAVY }}>3. Гравировка</div>
              <div className="grid grid-cols-2 gap-2">
                {ENGRAVINGS.map(e => (
                  <button key={e.id} onClick={() => setCalcEngr(e.id)}
                    className="text-left p-3 rounded-lg border text-sm flex justify-between items-center transition-all"
                    style={{
                      borderColor: calcEngr===e.id ? NAVY : "#e2e8f0",
                      background:  calcEngr===e.id ? "hsl(214,52%,28%,0.07)" : "#fff",
                      color:       calcEngr===e.id ? NAVY : "#4a5568",
                      fontWeight:  calcEngr===e.id ? 600 : 400,
                    }}>
                    <span>{e.name}</span>
                    <span className="text-xs opacity-60">{e.price > 0 ? `+${e.price.toLocaleString("ru")} ₽` : "—"}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Installation checkbox */}
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: NAVY }}>4. Дополнительно</div>
              <button onClick={() => setInstall(!install)}
                className="flex items-center gap-3 p-3 rounded-lg border w-full text-left transition-all"
                style={{
                  borderColor: install ? NAVY : "#e2e8f0",
                  background: install ? "hsl(214,52%,28%,0.07)" : "#fff",
                }}>
                <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ borderColor: install ? NAVY : "#cbd5e0", background: install ? NAVY : "transparent" }}>
                  {install && <Icon name="Check" size={12} style={{ color:"#fff" }} />}
                </div>
                <span className="text-sm text-gray-700">Установка на месте</span>
                <span className="ml-auto text-xs text-gray-400">+7 000 ₽</span>
              </button>
            </div>

            {/* Result */}
            <div className="rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              style={{ background: "linear-gradient(135deg, #1e3a5f, #2b5797)" }}>
              <div>
                <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Итоговая стоимость</div>
                <div className="text-white font-bold text-3xl">{total.toLocaleString("ru")} ₽</div>
                <div className="text-white/50 text-xs mt-1">Рассрочка 0% · Уточните у менеджера</div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <button className="btn-white whitespace-nowrap">Получить расчёт</button>
                <button className="btn-ghost-white text-xs py-2 whitespace-nowrap">
                  <Icon name="Phone" size={13} /> Позвонить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section id="reviews" ref={reviews.ref} className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className={reviews.inView ? "animate-fade-up" : "opacity-0"}>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="section-title mb-0">ОТЗЫВЫ ПОКУПАТЕЛЕЙ</h2>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">Все отзывы 4.5</span>
              <span className="flex items-center gap-1 bg-[#fc3f1d] text-white text-xs px-2 py-1 rounded font-bold">
                <Icon name="Star" size={11} /> 4.2
              </span>
              <span className="flex items-center gap-1 bg-[#4285f4] text-white text-xs px-2 py-1 rounded font-bold">
                <Icon name="Star" size={11} /> 4.2
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {REVIEWS.map((r,i) => (
                <div key={i} className="review-card flex-shrink-0 w-72">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: ["#e57373","#64b5f6","#81c784"][i % 3] }}>
                      М
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#1e2d42]">{r.name}</div>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({length:5}).map((_,j) => (
                          <Icon key={j} name="Star" size={11} style={{ color:"#f59e0b" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{r.text}</p>
                  <div className="flex items-center justify-between">
                    <button className="text-xs underline" style={{ color: NAVY }}>Подробнее</button>
                    <span className="text-gray-400 text-xs">Отзыв из {r.src}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="absolute -left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center">
              <Icon name="ChevronLeft" size={14} style={{ color: NAVY }} />
            </button>
            <button className="absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center">
              <Icon name="ChevronRight" size={14} style={{ color: NAVY }} />
            </button>
          </div>
        </div>
      </section>

      {/* ══ PROMO CARDS ══ */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {[IMG_PORTFOLIO, IMG_ANGEL, IMG_CATALOG].map((img,i) => (
          <div key={i} className="rounded-xl overflow-hidden relative flex flex-col justify-end p-5" style={{ minHeight:180 }}>
            <img src={img} alt="Акция" className="absolute inset-0 w-full h-full object-cover" style={{ filter:"brightness(0.45)" }} />
            <div className="relative z-10">
              <div className="inline-block bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full mb-2">Акция</div>
              <div className="text-white font-semibold text-sm mb-1">При заказе от 1000 ваз — в подарок!</div>
              {i===1 && <div className="text-white/70 text-xs mb-2">Скидка 18%</div>}
              <button className="btn-ghost-white text-xs py-1.5 px-3">Подробнее</button>
            </div>
          </div>
        ))}
      </section>

      {/* ══ FOOTER ══ */}
      <footer ref={footer.ref} style={{ background: NAVY_BG }} className="mt-8">
        {/* Addresses */}
        <div className="border-b border-white/10 py-8 px-4 md:px-8 max-w-7xl mx-auto">
          <div className={`grid md:grid-cols-2 gap-8 ${footer.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div>
              <h3 className="text-white font-bold mb-4 text-base">Адреса магазинов</h3>
              <div className="space-y-2">
                {ADDRESSES.map((a,i) => (
                  <div key={i} className="flex items-start gap-2 text-white/70 text-sm">
                    <Icon name="MapPin" size={14} style={{ color:"#7ec8e3", flexShrink:0, marginTop:2 }} />
                    {a}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-36 bg-white/10 flex items-center justify-center">
              <div className="text-white/40 text-sm flex items-center gap-2">
                <Icon name="Map" size={18} /> Карта загружается
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${footer.inView ? "animate-fade-up delay-200" : "opacity-0"}`}>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Контакты</h4>
              <div className="space-y-2">
                {[
                  { icon:"MapPin",  text:"г. Самара, ул. Мечникова, 15" },
                  { icon:"Phone",   text:"+7 (846) 300-12-34" },
                  { icon:"Clock",   text:"Пн–Сб: 9:00–18:00" },
                ].map(c => (
                  <div key={c.text} className="flex items-start gap-2 text-white/60 text-xs">
                    <Icon name={c.icon} size={12} style={{ color:"#7ec8e3", flexShrink:0, marginTop:1 }} />
                    {c.text}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Наша компания</h4>
              {["О нас","Портфолио","Доставка","Оплата","Личный кабинет"].map(l => (
                <div key={l} className="text-white/50 text-xs mb-1.5 hover:text-white/80 cursor-pointer transition-colors">{l}</div>
              ))}
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Профиль</h4>
              {["Личный данные","Избранное"].map(l => (
                <div key={l} className="text-white/50 text-xs mb-1.5 hover:text-white/80 cursor-pointer transition-colors">{l}</div>
              ))}
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Рассылка</h4>
              <p className="text-white/50 text-xs mb-3">Подпишитесь на новости и акции</p>
              <div className="flex gap-2">
                <input placeholder="Email" className="flex-1 rounded px-2 py-1.5 text-xs bg-white/10 border border-white/20 text-white placeholder:text-white/30 outline-none focus:border-white/50" />
                <button className="btn-white text-xs py-1.5 px-3">OK</button>
              </div>
              <div className="flex gap-2 mt-4">
                {["Youtube","Send","Instagram"].map(s => (
                  <a key={s} href="#" className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
                    <Icon name={s as "Send"} size={13} style={{ color:"#7ec8e3" }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon name="Gem" size={16} style={{ color:"#7ec8e3" }} />
              <span className="text-white font-bold text-sm tracking-wide">ХРАНИТЕЛЬ</span>
              <span className="text-white/40 text-xs">МАСТЕРСКАЯ КАМНЯ</span>
            </div>
            <div className="text-white/40 text-xs">© 2024 Мастерская камня «Хранители». Все права защищены.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
