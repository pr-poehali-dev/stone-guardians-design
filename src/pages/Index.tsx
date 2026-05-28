import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

/* ── Images ── */
const IMG_ANGEL   = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/59164c47-5a0a-4323-b123-2349b1a1d42d.jpg";
const IMG_GRANITE = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/636190c9-c6a2-4b70-9cf6-8eaa3c5532c1.jpg";
const IMG_CRAFT   = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/98369281-7314-4446-888d-0709c0e1af3a.jpg";
const IMG_CATALOG = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/60f175a8-2d1d-4b86-95be-01dcfcdbd100.jpg";
const IMG_SHOP    = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/8867b041-866e-4df9-ac15-8e82c9fa4067.jpg";
const IMG_PORTF   = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/a074d7f9-4b5a-4159-a62d-361ae4cff99c.jpg";

/* ── Data ── */
const TOP_NAV = [
  "Памятники","Металлические изделия","Дополнительные элементы",
  "Услуги","Оплаченные","Портрет и надписи","Изделия из камня",
];
const TABS = [
  "Гранитные памятники","Памятники животных","Мраморные памятники",
  "Детские памятники","Мемориальные доски",
];
const PRODUCTS = [
  { id:1, name:"Вертикальная стела",      type:"Гранит чёрный",     price:"25 000 ₽", img: IMG_GRANITE },
  { id:2, name:"Памятник «Классика»",     type:"Гранит карельский", price:"27 000 ₽", img: IMG_CATALOG },
  { id:3, name:"Мраморная вертикаль",     type:"Мрамор белый",      price:"27 000 ₽", img: IMG_ANGEL   },
  { id:4, name:"Горизонтальный монумент", type:"Лабрадорит",        price:"32 000 ₽", img: IMG_PORTF   },
];
const BADGES = [
  { icon:"ShieldCheck", label:"Гарантия",       desc:"на установку от 5 лет" },
  { icon:"Zap",         label:"Скорость",        desc:"выполнение за 14 дней" },
  { icon:"CreditCard",  label:"Рассрочка 0%",    desc:"без переплат и комиссий" },
  { icon:"Award",       label:"Ответственность", desc:"качество гарантировано" },
  { icon:"Star",        label:"Доверие",          desc:"более 3 000 семей" },
];
const STEPS = [
  { n:"I",  label:"Проектирование",    sub:"Эскиз и согласование дизайна с мастером" },
  { n:"II", label:"Договор",           sub:"Официальное оформление, предоплата 2 000 ₽" },
  { n:"III",label:"Изготовление",      sub:"Собственный цех, постоянный контроль качества" },
  { n:"IV", label:"Сдача и гарантия",  sub:"Установка, акт приёма, гарантийный лист" },
];
const ABOUT_LIST = [
  "Проектирование и монтаж мемориальных сооружений",
  "Гарантийное обслуживание — от 5 до 10 лет",
  "На рынке с 2003 года, опытные мастера",
  "Цена без посредников — прямые поставки сырья",
  "Полное оформление сделки, работа с организациями",
];
const REVIEWS = [
  { name:"Елена Морозова",  rating:5, src:"Яндекс", text:"Обратились в тяжёлый момент. Всё сделали с душой и профессионально. Памятник превзошёл ожидания — красивая гравировка, качественный камень." },
  { name:"Андрей Сергеев",  rating:5, src:"Google",  text:"Сложный заказ с портретом выполнили точно в срок. Гравировка чёткая и детальная. Настоящие мастера, рекомендую." },
  { name:"Наталья Козлова", rating:5, src:"Яндекс", text:"Искала производство без посредников — нашла «Хранителей». Цена честная, всё официально. Результат — выше ожиданий." },
];
const ADDRESSES = [
  "г. Самара, ул. Мечникова, 15",
  "г. Самара, ул. Победы, 118",
  "г. Тольятти, ул. Морозкина, 54",
];
const MATERIALS = [
  { id:"gb", name:"Гранит чёрный",     base:28000 },
  { id:"gg", name:"Гранит серый",      base:22000 },
  { id:"mw", name:"Мрамор белый",      base:20000 },
  { id:"gk", name:"Гранит карельский", base:36000 },
];
const SIZES = [
  { id:"s",  name:"80×40 см",  mult:1    },
  { id:"m",  name:"100×50 см", mult:1.45 },
  { id:"l",  name:"120×60 см", mult:1.9  },
  { id:"xl", name:"150×70 см", mult:2.55 },
];
const ENGRAVINGS = [
  { id:"none",  name:"Без гравировки",   price:0     },
  { id:"text",  name:"Текст и даты",     price:3500  },
  { id:"laser", name:"Портрет лазерный", price:8500  },
  { id:"hand",  name:"Портрет ручной",   price:16000 },
];

/* ── useInView ── */
function useInView(t = .1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) sv(true); }, { threshold: t });
    io.observe(el); return () => io.disconnect();
  }, [t]);
  return { ref, v };
}

/* ── Colour tokens (shared with JSX) ── */
const C = {
  navyDeep: "hsl(218,50%,6%)",
  navy0:    "hsl(218,48%,8%)",
  navy1:    "hsl(218,44%,11%)",
  navy2:    "hsl(218,40%,14%)",
  navy3:    "hsl(218,34%,20%)",
  navy4:    "hsl(218,28%,30%)",
  blueMid:  "hsl(214,60%,38%)",
  blueLt:   "hsl(210,70%,58%)",
  gold:     "hsl(43,72%,54%)",
  goldLt:   "hsl(43,80%,70%)",
  cream:    "hsl(210,28%,92%)",
  creamDim: "hsl(210,15%,58%)",
};

/* ════════════════════════════════════════ */
export default function Index() {
  const [menu,    setMenu]    = useState(false);
  const [tab,     setTab]     = useState(0);
  const [mat,     setMat]     = useState(MATERIALS[0].id);
  const [sz,      setSz]      = useState(SIZES[0].id);
  const [engr,    setEngr]    = useState(ENGRAVINGS[0].id);
  const [install, setInstall] = useState(false);

  const hero  = useInView(.05);
  const cat   = useInView(.08);
  const bdg   = useInView(.1);
  const prm   = useInView(.08);
  const stp   = useInView(.1);
  const abt   = useInView(.08);
  const calc  = useInView(.08);
  const rev   = useInView(.08);
  const prc3  = useInView(.08);
  const ftr   = useInView(.05);

  const material  = MATERIALS.find(m => m.id === mat)!;
  const size      = SIZES.find(s => s.id === sz)!;
  const engraving = ENGRAVINGS.find(e => e.id === engr)!;
  const total     = Math.round(material.base * size.mult) + engraving.price + (install ? 7000 : 0);
  const go        = (id: string) => { document.querySelector(id)?.scrollIntoView({ behavior:"smooth" }); setMenu(false); };

  return (
    <div style={{ background: C.navy0, color: C.cream }} className="min-h-screen overflow-x-hidden">

      {/* ══ TOP BAR ══ */}
      <div className="hidden md:flex items-center justify-between px-8 py-1.5 text-xs border-b"
        style={{ background: C.navyDeep, borderColor: C.navy3 }}>
        <span style={{ color: C.creamDim }}>Мастерская камня «Хранители» · Самара · с 2003 года</span>
        <div className="flex items-center gap-6">
          {[
            { icon:"Phone", text:"+7 (846) 300-12-34", href:"tel:+78463001234" },
            { icon:"User",  text:"Войти", href:"#" },
            { icon:"Heart", text:"Избранное", href:"#" },
          ].map(it => (
            <a key={it.text} href={it.href}
              className="flex items-center gap-1.5 transition-colors hover:opacity-100"
              style={{ color: C.creamDim, opacity:.8 }}>
              <Icon name={it.icon as "Phone"} size={11} style={{ color: C.gold }} />
              {it.text}
            </a>
          ))}
        </div>
      </div>

      {/* ══ NAVBAR ══ */}
      <nav className="sticky top-0 z-50 border-b"
        style={{ background:"hsl(218,48%,7%,0.96)", borderColor: C.navy3, backdropFilter:"blur(18px)" }}>

        {/* Gold top line */}
        <div style={{ height:2, background:`linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity:.35 }} />

        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center h-[60px] gap-6">

          {/* ── Logo ── */}
          <button onClick={() => go("#hero")} className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center transition-all group-hover:border-gold"
                style={{ background:`hsl(43,72%,54%,0.1)`, borderColor:`hsl(43,72%,54%,0.38)` }}>
                <Icon name="Gem" size={18} style={{ color: C.gold }} />
              </div>
            </div>
            <div className="leading-tight">
              <div className="font-display tracking-[.18em] font-semibold text-[.95rem] leading-none"
                style={{ color: C.cream }}>ХРАНИТЕЛЬ</div>
              <div className="font-body text-[.52rem] tracking-[.22em] mt-[3px] leading-none"
                style={{ color: C.creamDim }}>МАСТЕРСКАЯ КАМНЯ</div>
            </div>
          </button>

          {/* ── Links ── */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 overflow-x-auto scrollbar-hide">
            {TOP_NAV.map(l => (
              <button key={l} className="nav-item">
                {l} <Icon name="ChevronDown" size={11} style={{ opacity:.45 }} />
              </button>
            ))}
          </div>

          {/* ── Right side ── */}
          <div className="hidden md:flex items-center gap-5 ml-auto flex-shrink-0">
            <a href="tel:+78463001234"
              className="flex items-center gap-2 font-display font-semibold text-sm tracking-wide transition-opacity hover:opacity-100"
              style={{ color: C.gold, opacity:.9 }}>
              <Icon name="Phone" size={14} style={{ color: C.gold }} />
              +7 (846) 300-12-34
            </a>
            <button className="btn-gold" style={{ padding:".5rem 1.2rem", fontSize:".72rem" }}
              onClick={() => go("#calculator")}>
              Рассчитать цену
            </button>
          </div>

          <button className="md:hidden ml-auto" style={{ color: C.gold }} onClick={() => setMenu(!menu)}>
            <Icon name={menu ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {menu && (
          <div className="md:hidden border-t px-5 pb-6 flex flex-col"
            style={{ background:"hsl(218,50%,7%)", borderColor: C.navy3 }}>
            {TOP_NAV.map(l => (
              <button key={l} className="nav-item text-left py-3 border-b w-full"
                style={{ borderColor: C.navy3 }}>{l}</button>
            ))}
            <a href="tel:+78463001234" className="flex items-center gap-2 py-4 text-sm font-semibold"
              style={{ color: C.gold }}>
              <Icon name="Phone" size={14} /> +7 (846) 300-12-34
            </a>
            <button className="btn-gold w-full" onClick={() => go("#calculator")}>Рассчитать цену</button>
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" ref={hero.ref} className="relative overflow-hidden grain" style={{ minHeight:580 }}>

        {/* Background */}
        <div className="absolute inset-0">
          <img src={IMG_CRAFT} alt="" className="w-full h-full object-cover"
            style={{ opacity:.18, filter:"brightness(.5) saturate(.6)" }} />
          {/* Radial blue glow */}
          <div className="absolute inset-0"
            style={{ background:"radial-gradient(ellipse 80% 70% at 20% 60%, hsl(214,60%,28%,.45), transparent 65%)" }} />
          {/* Bottom fade */}
          <div className="absolute inset-0"
            style={{ background:`linear-gradient(to top, ${C.navy0} 0%, transparent 55%)` }} />
          {/* Right fade */}
          <div className="absolute inset-0"
            style={{ background:`linear-gradient(to right, ${C.navy0} 35%, transparent 70%)` }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 flex items-center" style={{ minHeight:580 }}>

          {/* Text */}
          <div className="flex-1 py-20">

            <div className={hero.v ? "anim-up" : "opacity-0"}>
              <div className="section-label mb-7">Самара · Собственное производство</div>
              <h1 className="font-display font-light leading-[1.04] mb-6"
                style={{ fontSize:"clamp(2.6rem,5.5vw,4.4rem)", color: C.cream }}>
                Изготовление<br />
                <span style={{ color: C.gold, fontStyle:"italic" }}>памятников</span><br />
                в Самаре
              </h1>
              <p className="font-body text-sm leading-[1.8] mb-10 max-w-[420px]" style={{ color: C.creamDim }}>
                Мастерская камня «Хранители» — мы есть то, о чём есть память.
                Собственный цех, гарантия 10 лет, работаем с 2003 года.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-navy" onClick={() => go("#catalog")}>
                  <Icon name="Grid3x3" size={14} /> Смотреть каталог
                </button>
                <button className="btn-outline-white" style={{ padding:".7rem 1.6rem" }} onClick={() => go("#calculator")}>
                  <Icon name="Calculator" size={14} /> Рассчитать цену
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className={`flex flex-wrap gap-10 mt-16 pt-8 border-t ${hero.v ? "anim-up d4" : "opacity-0"}`}
              style={{ borderColor: C.navy3 }}>
              {[["15+","лет на рынке"],["3 000+","завершённых работ"],["100%","своё производство"]].map(([n,l]) => (
                <div key={l}>
                  <div className="font-display font-semibold" style={{ fontSize:"2.1rem", color: C.gold }}>{n}</div>
                  <div className="font-body text-xs mt-0.5" style={{ color: C.creamDim }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Angel image */}
          <div className={`hidden lg:block relative flex-shrink-0 ${hero.v ? "anim-in d3" : "opacity-0"}`}
            style={{ width:310, height:460, marginLeft:40 }}>
            <div className="w-full h-full rounded-sm overflow-hidden relative"
              style={{ boxShadow:`0 0 0 1px hsl(43,72%,54%,.2), 0 32px 80px hsl(218,60%,4%,.6)` }}>
              <img src={IMG_ANGEL} alt="Памятник" className="w-full h-full object-cover object-top"
                style={{ filter:"brightness(.92) contrast(1.05)" }} />
              <div className="absolute inset-0"
                style={{ background:`linear-gradient(to left, transparent 40%, ${C.navy0} 100%)` }} />
              <div className="absolute inset-0"
                style={{ background:`linear-gradient(to top, ${C.navy0} 0%, transparent 30%)` }} />
            </div>
            {/* Gold corner accents */}
            <div className="absolute -top-2 -right-2 w-8 h-8" style={{
              borderTop:`1.5px solid ${C.gold}`, borderRight:`1.5px solid ${C.gold}`, opacity:.5,
            }} />
            <div className="absolute -bottom-2 -left-2 w-8 h-8" style={{
              borderBottom:`1.5px solid ${C.gold}`, borderLeft:`1.5px solid ${C.gold}`, opacity:.5,
            }} />
          </div>
        </div>
      </section>

      {/* ══ BADGES ══ */}
      <div ref={bdg.ref} className="border-y" style={{ background: C.navy1, borderColor: C.navy3 }}>
        <div className={`max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-2 md:grid-cols-5 gap-8 ${bdg.v ? "anim-up" : "opacity-0"}`}>
          {BADGES.map((b, i) => (
            <div key={b.label} className={`flex flex-col items-center text-center gap-2.5 ${bdg.v ? `anim-up d${i + 1}` : ""}`}>
              <div className="badge-icon">
                <Icon name={b.icon as "Star"} size={20} style={{ color: C.gold }} />
              </div>
              <div className="font-body text-sm font-semibold" style={{ color: C.cream }}>{b.label}</div>
              <div className="font-body text-xs leading-snug" style={{ color: C.creamDim }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ CATALOG ══ */}
      <section id="catalog" ref={cat.ref} className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className={cat.v ? "anim-up" : "opacity-0"}>
          <div className="section-label mb-4">Каталог</div>
          <div className="flex items-end justify-between mb-9 flex-wrap gap-4">
            <h2 className="font-display font-light" style={{ fontSize:"clamp(1.9rem,3.2vw,2.8rem)", color: C.cream }}>
              Наши памятники
            </h2>
            <button className="btn-outline-gold" style={{ padding:".5rem 1.2rem", fontSize:".72rem" }}>Весь каталог</button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
            {TABS.map((t, i) => (
              <button key={t} onClick={() => setTab(i)} className={`tab-pill ${tab === i ? "active" : ""}`}>{t}</button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 relative">
            {PRODUCTS.map((p, i) => (
              <div key={p.id}
                className={`product-card rounded-sm ${cat.v ? `anim-up d${i + 1}` : "opacity-0"}`}>
                <div className="relative overflow-hidden" style={{ height:210 }}>
                  <img src={p.img} alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ filter:"brightness(.75) saturate(.65)" }} />
                  <div className="absolute inset-0"
                    style={{ background:`linear-gradient(to top, ${C.navy1} 0%, transparent 55%)` }} />
                </div>
                <div className="p-4 relative z-10">
                  <div className="font-body text-[.72rem] mb-0.5" style={{ color: C.creamDim }}>{p.type}</div>
                  <div className="font-display text-[1rem] font-medium mb-2" style={{ color: C.cream }}>{p.name}</div>
                  <div className="font-display text-[1.15rem] font-semibold mb-3" style={{ color: C.gold }}>{p.price}</div>
                  <div className="flex gap-2">
                    <button className="btn-navy flex-1" style={{ padding:".45rem .6rem", fontSize:".7rem", textTransform:"none", letterSpacing:".03em" }}>
                      Подробнее
                    </button>
                    <button className="w-8 h-8 rounded-sm border flex items-center justify-center transition-all hover:border-gold"
                      style={{ borderColor: C.navy3, background:"transparent" }}>
                      <Icon name="Heart" size={13} style={{ color: C.creamDim }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Arrows */}
            {(["left","right"] as const).map(d => (
              <button key={d}
                className={`absolute top-[105px] ${d === "left" ? "-left-4" : "-right-4"} w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:border-gold`}
                style={{ background: C.navy2, borderColor: C.navy3 }}>
                <Icon name={d === "left" ? "ChevronLeft" : "ChevronRight"} size={16} style={{ color: C.gold }} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROMO BANNERS ══ */}
      <section ref={prm.ref} className="pb-8 px-4 md:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-5">

        {/* Custom order */}
        <div className={`relative rounded-sm overflow-hidden flex flex-col justify-end p-7 grain ${prm.v ? "anim-up d1" : "opacity-0"}`}
          style={{ minHeight:210 }}>
          <img src={IMG_SHOP} alt="" className="absolute inset-0 w-full h-full object-cover"
            style={{ filter:"brightness(.3) saturate(.5)" }} />
          <div className="absolute inset-0"
            style={{ background:"linear-gradient(135deg, hsl(214,60%,28%,.25), transparent 60%)" }} />
          <div className="absolute inset-0 rounded-sm" style={{ boxShadow:`inset 0 0 0 1px ${C.gold}33` }} />
          <div className="relative z-10">
            <div className="font-display font-semibold text-xl mb-1" style={{ color: C.cream }}>
              Не нашли то что искали?
            </div>
            <div className="font-body text-sm mb-5" style={{ color: C.creamDim }}>
              Изготовим памятник под индивидуальный заказ
            </div>
            <div className="flex gap-3">
              <button className="btn-gold" style={{ padding:".55rem 1.3rem", fontSize:".72rem" }}>
                <Icon name="Phone" size={13} /> Позвонить
              </button>
              <button className="btn-outline-white" style={{ padding:".55rem 1.3rem", fontSize:".72rem" }}>
                <Icon name="MapPin" size={13} /> На карте
              </button>
            </div>
          </div>
        </div>

        {/* Promo */}
        <div className={`relative rounded-sm overflow-hidden flex flex-col justify-between p-7 grain ${prm.v ? "anim-up d2" : "opacity-0"}`}
          style={{ minHeight:210, background: C.navy1 }}>
          <div className="absolute inset-0"
            style={{ background:"linear-gradient(135deg, hsl(214,60%,28%,.3), transparent 65%)" }} />
          <div className="absolute inset-0 rounded-sm" style={{ boxShadow:`inset 0 0 0 1px ${C.gold}33` }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body mb-4"
              style={{ background:`${C.gold}18`, color: C.gold, border:`1px solid ${C.gold}44` }}>
              <Icon name="Tag" size={11} /> Акция
            </div>
            <div className="font-display font-semibold text-xl mb-2" style={{ color: C.cream }}>
              При заказе от 1 000 ваз — в подарок!
            </div>
            <div className="font-body text-sm" style={{ color: C.creamDim }}>Ограниченное предложение</div>
          </div>
          <button className="btn-outline-gold self-start relative z-10" style={{ padding:".5rem 1.3rem", fontSize:".72rem" }}>
            Подробнее
          </button>
        </div>
      </section>

      {/* ══ STEPS ══ */}
      <section id="steps" ref={stp.ref} className="py-20 px-4 md:px-8 border-y"
        style={{ background: C.navy1, borderColor: C.navy3 }}>
        <div className={`max-w-7xl mx-auto ${stp.v ? "anim-up" : "opacity-0"}`}>
          <div className="text-center mb-14">
            <div className="section-label justify-center mb-4">Процесс</div>
            <h2 className="font-display font-light" style={{ fontSize:"clamp(1.9rem,3.2vw,2.8rem)", color: C.cream }}>
              Порядок работы
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute" style={{
              top: 23, left:"12.5%", right:"12.5%", height:1,
              background:`linear-gradient(90deg, transparent, ${C.gold}55, transparent)`,
            }} />
            {STEPS.map((s, i) => (
              <div key={s.n} className={`flex flex-col items-center text-center gap-4 relative z-10 ${stp.v ? `anim-up d${i + 1}` : "opacity-0"}`}>
                <div className="step-num">{s.n}</div>
                <div>
                  <div className="font-body text-sm font-semibold mb-1" style={{ color: C.cream }}>{s.label}</div>
                  <div className="font-body text-xs leading-relaxed" style={{ color: C.creamDim }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <div className="w-16 h-16 rounded-full border flex items-center justify-center"
              style={{ background:`${C.gold}12`, borderColor:`${C.gold}44` }}>
              <Icon name="Settings" size={26} style={{ color: C.gold }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" ref={abt.ref} className="py-20 px-4 md:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className={`relative ${abt.v ? "anim-up d1" : "opacity-0"}`}>
          <div className="rounded-sm overflow-hidden relative" style={{ height:400 }}>
            <img src={IMG_SHOP} alt="Мастерская" className="w-full h-full object-cover"
              style={{ filter:"brightness(.75) saturate(.7)" }} />
            <div className="absolute inset-0 rounded-sm" style={{ boxShadow:`inset 0 0 0 1px ${C.gold}22` }} />
          </div>
          {/* Decorative corner lines */}
          <div className="absolute -top-3 -left-3 w-10 h-10" style={{ borderTop:`1.5px solid ${C.gold}55`, borderLeft:`1.5px solid ${C.gold}55` }} />
          <div className="absolute -bottom-3 -right-3 w-10 h-10" style={{ borderBottom:`1.5px solid ${C.gold}55`, borderRight:`1.5px solid ${C.gold}55` }} />

          {/* Floating quote card */}
          <div className="absolute -right-6 bottom-12 max-w-[200px] rounded-sm p-4 border"
            style={{ background:"hsl(218,44%,13%,0.95)", borderColor: C.navy3, backdropFilter:"blur(8px)" }}>
            <div className="font-display italic text-sm mb-1" style={{ color: C.gold }}>
              «Камень хранит —<br />время забывает»
            </div>
            <div className="font-body text-xs" style={{ color: C.creamDim }}>Мастерская «Хранители»</div>
          </div>
        </div>

        <div className={abt.v ? "anim-up d2" : "opacity-0"}>
          <div className="section-label mb-5">О нас</div>
          <h2 className="font-display font-light mb-3" style={{ fontSize:"clamp(1.7rem,3vw,2.4rem)", color: C.cream }}>
            Мастерская камня
          </h2>
          <p className="font-body text-sm leading-relaxed mb-7" style={{ color: C.creamDim }}>
            Собственный цех по художественной обработке камня. Работаем с гранитом и мрамором.
            Без посредников — от карьера до установки.
          </p>

          <div className="space-y-3.5 mb-9">
            {ABOUT_LIST.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Icon name="CheckCircle" size={16} style={{ color: C.blueLt, flexShrink:0, marginTop:2 }} />
                <span className="font-body text-sm" style={{ color: C.creamDim }}>{item}</span>
              </div>
            ))}
          </div>

          <div className="gold-line mb-8" />
          <div className="flex gap-3">
            <button className="btn-navy"><Icon name="Phone" size={14} /> Связаться</button>
            <button className="btn-outline-gold">Портфолио</button>
          </div>
        </div>
      </section>

      {/* ══ CALCULATOR ══ */}
      <section id="calculator" ref={calc.ref} className="py-20 px-4 md:px-8 border-y"
        style={{ background: C.navy1, borderColor: C.navy3 }}>
        <div className={`max-w-4xl mx-auto ${calc.v ? "anim-up" : "opacity-0"}`}>
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-4">Калькулятор</div>
            <h2 className="font-display font-light" style={{ fontSize:"clamp(1.9rem,3.2vw,2.8rem)", color: C.cream }}>
              Рассчитайте стоимость
            </h2>
            <p className="font-body text-sm mt-2" style={{ color: C.creamDim }}>
              Выберите параметры — получите предварительную цену
            </p>
          </div>

          <div className="rounded-sm border p-7 md:p-10" style={{ background: C.navy2, borderColor: C.navy3 }}>

            {/* Reusable option style */}
            {[
              { label:"1. Материал", items: MATERIALS, sel: mat, onSel: setMat,
                cols:"grid-cols-2 md:grid-cols-4",
                render: (m: typeof MATERIALS[0]) => (<><div className="font-body text-xs font-semibold">{m.name}</div><div className="font-body text-xs mt-0.5 opacity-60">от {m.base.toLocaleString("ru")} ₽</div></>) },
              { label:"2. Размер", items: SIZES, sel: sz, onSel: setSz,
                cols:"grid-cols-2 md:grid-cols-4",
                render: (s: typeof SIZES[0]) => <span className="font-body text-sm">{s.name}</span> },
            ].map(({ label, items, sel, onSel, cols, render }) => (
              <div key={label} className="mb-7">
                <div className="font-body text-xs tracking-widest uppercase mb-4" style={{ color: C.gold }}>{label}</div>
                <div className={`grid ${cols} gap-2.5`}>
                  {items.map((it) => (
                    <button key={it.id} onClick={() => onSel(it.id)}
                      className="text-left p-3.5 rounded-sm border transition-all"
                      style={{
                        background:  sel === it.id ? `${C.gold}12` : C.navy1,
                        borderColor: sel === it.id ? C.gold : C.navy3,
                        color:       sel === it.id ? C.gold : C.creamDim,
                      }}>
                      {render(it as never)}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Engraving */}
            <div className="mb-7">
              <div className="font-body text-xs tracking-widest uppercase mb-4" style={{ color: C.gold }}>3. Гравировка</div>
              <div className="grid grid-cols-2 gap-2.5">
                {ENGRAVINGS.map(e => (
                  <button key={e.id} onClick={() => setEngr(e.id)}
                    className="flex items-center justify-between p-3.5 rounded-sm border transition-all text-left"
                    style={{
                      background:  engr === e.id ? `${C.gold}12` : C.navy1,
                      borderColor: engr === e.id ? C.gold : C.navy3,
                    }}>
                    <span className="font-body text-sm" style={{ color: engr === e.id ? C.gold : C.creamDim }}>{e.name}</span>
                    <span className="font-body text-xs" style={{ color: C.creamDim, opacity:.7 }}>
                      {e.price > 0 ? `+${e.price.toLocaleString("ru")} ₽` : "—"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Install */}
            <div className="mb-8">
              <div className="font-body text-xs tracking-widest uppercase mb-4" style={{ color: C.gold }}>4. Дополнительно</div>
              <button onClick={() => setInstall(!install)}
                className="flex items-center gap-3 p-3.5 rounded-sm border w-full text-left transition-all"
                style={{ background: install ? `${C.gold}12` : C.navy1, borderColor: install ? C.gold : C.navy3 }}>
                <div className="w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all flex-shrink-0"
                  style={{ borderColor: install ? C.gold : C.navy4, background: install ? C.gold : "transparent" }}>
                  {install && <Icon name="Check" size={11} style={{ color: C.navy0 }} />}
                </div>
                <span className="font-body text-sm flex-1" style={{ color: C.cream }}>Установка на месте</span>
                <span className="font-body text-xs" style={{ color: C.creamDim }}>+7 000 ₽</span>
              </button>
            </div>

            {/* Result */}
            <div className="rounded-sm border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden grain"
              style={{ background:`linear-gradient(135deg, hsl(214,55%,15%), hsl(218,50%,10%))`, borderColor:`${C.gold}44` }}>
              <div className="absolute inset-0" style={{ background:`radial-gradient(ellipse at 0% 100%, ${C.gold}15, transparent 55%)` }} />
              <div className="relative z-10">
                <div className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: C.creamDim }}>Предварительная стоимость</div>
                <div className="font-display font-semibold" style={{ fontSize:"3rem", color: C.gold, lineHeight:1 }}>
                  {total.toLocaleString("ru")} ₽
                </div>
                <div className="font-body text-xs mt-2" style={{ color: C.creamDim }}>Рассрочка 0% · Уточните у менеджера</div>
              </div>
              <div className="flex flex-col gap-3 relative z-10 w-full md:w-auto">
                <button className="btn-gold whitespace-nowrap"><Icon name="MessageSquare" size={14} /> Получить расчёт</button>
                <button className="btn-outline-white whitespace-nowrap" style={{ padding:".6rem 1.5rem", fontSize:".72rem" }}>
                  <Icon name="Phone" size={13} /> Позвонить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section id="reviews" ref={rev.ref} className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className={rev.v ? "anim-up" : "opacity-0"}>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="section-label mb-4">Отзывы покупателей</div>
              <h2 className="font-display font-light" style={{ fontSize:"clamp(1.9rem,3.2vw,2.8rem)", color: C.cream }}>
                Нам доверяют
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-sm" style={{ color: C.creamDim }}>Все отзывы 4.5</span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold" style={{ background:"hsl(0,65%,45%)", color:"#fff" }}>
                <Icon name="Star" size={10} /> 4.2
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold" style={{ background:"hsl(217,85%,55%)", color:"#fff" }}>
                <Icon name="Star" size={10} /> 4.2
              </span>
            </div>
          </div>

          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
            {REVIEWS.map((r, i) => (
              <div key={i} className={`review-card rounded-sm ${rev.v ? `anim-up d${i + 1}` : "opacity-0"}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold text-base flex-shrink-0"
                    style={{ background: [C.blueMid, "hsl(145,50%,34%)", "hsl(270,50%,40%)"][i % 3], color:"#fff" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-body text-sm font-semibold" style={{ color: C.cream }}>{r.name}</div>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Icon key={j} name="Star" size={11} style={{ color:"hsl(43,80%,58%)" }} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-body text-sm leading-relaxed mb-4" style={{ color: C.creamDim }}>«{r.text}»</p>
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: C.navy3 }}>
                  <button className="font-body text-xs underline" style={{ color: C.blueLt }}>Подробнее</button>
                  <span className="font-body text-xs" style={{ color: C.navy4 }}>Из {r.src}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROMO 3 ══ */}
      <section ref={prc3.ref} className="pb-12 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {[IMG_PORTF, IMG_ANGEL, IMG_GRANITE].map((img, i) => (
          <div key={i} className={`relative rounded-sm overflow-hidden flex flex-col justify-end p-6 grain ${prc3.v ? `anim-up d${i + 1}` : "opacity-0"}`}
            style={{ minHeight:190 }}>
            <img src={img} alt="Акция" className="absolute inset-0 w-full h-full object-cover"
              style={{ filter:"brightness(.32) saturate(.5)" }} />
            <div className="absolute inset-0" style={{ background:`linear-gradient(to top, ${C.navyDeep}ee, transparent 55%)` }} />
            <div className="absolute inset-0 rounded-sm" style={{ boxShadow:`inset 0 0 0 1px ${C.gold}25` }} />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs mb-2"
                style={{ background:`${C.gold}18`, color: C.gold, border:`1px solid ${C.gold}3a` }}>
                <Icon name="Tag" size={10} /> Акция
              </div>
              <div className="font-display font-semibold text-base mb-1" style={{ color: C.cream }}>
                {i === 1 ? "Родительские субботы · Скидка 18%" : "При заказе от 1000 ваз — в подарок!"}
              </div>
              <button className="btn-outline-white mt-3" style={{ padding:".38rem 1rem", fontSize:".7rem" }}>Подробнее</button>
            </div>
          </div>
        ))}
      </section>

      {/* ══ FOOTER ══ */}
      <footer ref={ftr.ref} className="border-t" style={{ background: C.navyDeep, borderColor: C.navy3 }}>
        {/* Gold top accent */}
        <div style={{ height:1, background:`linear-gradient(90deg, transparent, ${C.gold}55, transparent)` }} />

        {/* Addresses */}
        <div className="border-b" style={{ borderColor: C.navy3 }}>
          <div className={`max-w-7xl mx-auto px-4 md:px-8 py-12 grid md:grid-cols-2 gap-10 ${ftr.v ? "anim-up" : "opacity-0"}`}>
            <div>
              <h3 className="font-display text-lg font-semibold mb-6" style={{ color: C.cream }}>Адреса магазинов</h3>
              <div className="space-y-3">
                {ADDRESSES.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 font-body text-sm" style={{ color: C.creamDim }}>
                    <Icon name="MapPin" size={14} style={{ color: C.gold, flexShrink:0, marginTop:2 }} />{a}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-sm border flex items-center justify-center" style={{ minHeight:140, background: C.navy1, borderColor: C.navy3 }}>
              <div className="flex flex-col items-center gap-2" style={{ color: C.creamDim }}>
                <Icon name="Map" size={24} style={{ color: C.gold, opacity:.4 }} />
                <span className="font-body text-xs">Карта</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className={`max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10 ${ftr.v ? "anim-up d2" : "opacity-0"}`}>
          <div>
            <div className="font-body text-xs tracking-widest uppercase mb-5" style={{ color: C.gold }}>Контакты</div>
            <div className="space-y-3">
              {[
                { i:"MapPin", t:"г. Самара, ул. Мечникова, 15" },
                { i:"Phone",  t:"+7 (846) 300-12-34" },
                { i:"Clock",  t:"Пн–Сб: 9:00–18:00" },
                { i:"Mail",   t:"info@khraniteli.ru" },
              ].map(c => (
                <div key={c.t} className="flex items-start gap-2 font-body text-xs" style={{ color: C.creamDim }}>
                  <Icon name={c.i as "MapPin"} size={12} style={{ color: C.blueLt, flexShrink:0, marginTop:1 }} />{c.t}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-body text-xs tracking-widest uppercase mb-5" style={{ color: C.gold }}>Компания</div>
            {["О нас","Портфолио","Доставка","Оплата","Гарантия"].map(l => (
              <div key={l} className="font-body text-xs mb-2.5 cursor-pointer transition-colors hover:opacity-100"
                style={{ color: C.creamDim, opacity:.75 }}>{l}</div>
            ))}
          </div>
          <div>
            <div className="font-body text-xs tracking-widest uppercase mb-5" style={{ color: C.gold }}>Каталог</div>
            {TABS.map(l => (
              <div key={l} className="font-body text-xs mb-2.5 cursor-pointer transition-colors hover:opacity-100"
                style={{ color: C.creamDim, opacity:.75 }}>{l}</div>
            ))}
          </div>
          <div>
            <div className="font-body text-xs tracking-widest uppercase mb-5" style={{ color: C.gold }}>Рассылка</div>
            <p className="font-body text-xs mb-4" style={{ color: C.creamDim, opacity:.7 }}>Подпишитесь на новости и акции</p>
            <div className="flex gap-2 mb-5">
              <input placeholder="E-mail" className="flex-1 rounded-sm px-3 py-2 text-xs outline-none border"
                style={{ background: C.navy1, borderColor: C.navy3, color: C.cream }} />
              <button className="btn-gold" style={{ padding:".5rem .9rem", fontSize:".7rem" }}>OK</button>
            </div>
            <div className="flex gap-2">
              {["Youtube","Send","Users"].map(s => (
                <a key={s} href="#"
                  className="w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:border-gold"
                  style={{ borderColor: C.navy3, background: C.navy1 }}>
                  <Icon name={s as "Send"} size={13} style={{ color: C.blueLt }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t" style={{ borderColor: C.navy3 }}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border flex items-center justify-center"
                style={{ background:`${C.gold}12`, borderColor:`${C.gold}44` }}>
                <Icon name="Gem" size={13} style={{ color: C.gold }} />
              </div>
              <span className="font-display font-semibold tracking-[.15em] text-sm" style={{ color: C.cream }}>ХРАНИТЕЛЬ</span>
              <span className="font-body text-xs" style={{ color: C.creamDim, opacity:.5 }}>МАСТЕРСКАЯ КАМНЯ</span>
            </div>
            <div className="font-body text-xs" style={{ color: C.creamDim, opacity:.45 }}>
              © 2024 Мастерская камня «Хранители» · Самара · ИНН 6312000000
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
