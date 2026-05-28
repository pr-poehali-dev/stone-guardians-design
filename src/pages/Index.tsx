import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

/* ── Images ── */
const IMG_ANGEL    = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/59164c47-5a0a-4323-b123-2349b1a1d42d.jpg";
const IMG_GRANITE  = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/636190c9-c6a2-4b70-9cf6-8eaa3c5532c1.jpg";
const IMG_CRAFT    = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/98369281-7314-4446-888d-0709c0e1af3a.jpg";
const IMG_CATALOG  = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/60f175a8-2d1d-4b86-95be-01dcfcdbd100.jpg";
const IMG_WORKSHOP = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/8867b041-866e-4df9-ac15-8e82c9fa4067.jpg";
const IMG_PORTFOLIO= "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/a074d7f9-4b5a-4159-a62d-361ae4cff99c.jpg";

/* ── Constants ── */
const TOP_NAV = ["Памятники","Металлические изделия","Дополнительные элементы","Услуги","Оплаченные","Портрет и надписи","Изделия из камня"];
const TABS    = ["Гранитные памятники","Памятники животных","Мраморные памятники","Детские памятники","Мемориальные доски"];

const PRODUCTS = [
  { id:1, name:"Вертикальная стела",     type:"Гранит чёрный",  price:"25 000 ₽", img: IMG_GRANITE  },
  { id:2, name:"Памятник «Классика»",    type:"Гранит карельский", price:"27 000 ₽", img: IMG_CATALOG  },
  { id:3, name:"Мраморная вертикаль",    type:"Мрамор белый",   price:"27 000 ₽", img: IMG_ANGEL    },
  { id:4, name:"Горизонтальный монумент",type:"Лабрадорит",     price:"32 000 ₽", img: IMG_PORTFOLIO },
];

const BADGES = [
  { icon:"ShieldCheck", label:"Гарантия",        desc:"на установку от 5 лет" },
  { icon:"Zap",         label:"Скорость",         desc:"выполнение за 14 дней" },
  { icon:"CreditCard",  label:"Рассрочка 0%",     desc:"без переплат и комиссий" },
  { icon:"Award",       label:"Ответственность",  desc:"качество гарантировано" },
  { icon:"Star",        label:"Доверие",           desc:"более 3 000 семей" },
];

const STEPS = [
  { n:1, label:"Проектируем сооружение", sub:"Эскиз и согласование дизайна" },
  { n:2, label:"Договор и предоплата",   sub:"Официальный договор, всего 2 000 ₽" },
  { n:3, label:"Изготовление",           sub:"Собственный цех, контроль качества" },
  { n:4, label:"Сдача и гарантия",       sub:"Установка, акт приёма, гарантийный лист" },
];

const ABOUT_LIST = [
  "Проектирование и монтаж мемориальных сооружений",
  "Гарантийное обслуживание изделий",
  "На рынке с 2003 года, опытные специалисты",
  "Оптимальная цена за счёт прямых поставок сырья",
  "Полное оформление сделки, работа с организациями",
];

const REVIEWS = [
  { name:"Елена Морозова",  rating:5, text:"Обратились в тяжёлый момент. Всё сделали с душой и профессионально. Памятник превзошёл наши ожидания — красивая гравировка, качественный камень.", src:"Яндекс" },
  { name:"Андрей Сергеев",  rating:5, text:"Сложный заказ с портретом выполнили точно в срок. Гравировка чёткая, детальная. Настоящие мастера своего дела, рекомендую всем.", src:"Google" },
  { name:"Наталья Козлова", rating:5, text:"Искала производство без посредников — нашла «Хранителей». Цена честная, всё официально, договор. Результат — на высшем уровне.", src:"Яндекс" },
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

/* ── useInView hook ── */
function useInView(threshold = 0.1) {
  const ref  = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, v };
}

/* ════════════════════════════════════════════ */
export default function Index() {
  const [menu,    setMenu]    = useState(false);
  const [tab,     setTab]     = useState(0);
  const [mat,     setMat]     = useState(MATERIALS[0].id);
  const [sz,      setSz]      = useState(SIZES[0].id);
  const [engr,    setEngr]    = useState(ENGRAVINGS[0].id);
  const [install, setInstall] = useState(false);

  const hero    = useInView(.05);
  const catalog = useInView(.08);
  const bands   = useInView(.1);
  const steps   = useInView(.1);
  const about   = useInView(.1);
  const reviews = useInView(.08);
  const calcSec = useInView(.08);
  const promo   = useInView(.1);
  const ftr     = useInView(.05);

  const material  = MATERIALS.find(m => m.id === mat)!;
  const size      = SIZES.find(s => s.id === sz)!;
  const engraving = ENGRAVINGS.find(e => e.id === engr)!;
  const total     = Math.round(material.base * size.mult) + engraving.price + (install ? 7000 : 0);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  /* shared colors */
  const G  = "hsl(43,72%,54%)";   /* gold */
  const S0 = "hsl(20,8%,6%)";     /* stone-0 */
  const S1 = "hsl(20,8%,8%)";
  const S2 = "hsl(20,8%,11%)";
  const S3 = "hsl(20,8%,16%)";

  /* ── RENDER ── */
  return (
    <div style={{ background: S0, color:"hsl(40,18%,90%)" }} className="min-h-screen overflow-x-hidden">

      {/* ════ TOP BAR ════ */}
      <div className="hidden md:flex items-center justify-between px-8 py-2 text-xs border-b"
        style={{ background: S1, borderColor: S3 }}>
        <span style={{ color:"hsl(40,8%,50%)" }}>Мастерская камня · Самара · с 2003 года</span>
        <div className="flex items-center gap-6" style={{ color:"hsl(40,8%,50%)" }}>
          <a href="tel:+78463001234" className="flex items-center gap-1.5 hover:text-gold transition-colors" style={{ color:"hsl(40,8%,50%)" }}>
            <Icon name="Phone" size={11} style={{ color: G }} /> +7 (846) 300-12-34
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-gold transition-colors" style={{ color:"hsl(40,8%,50%)" }}>
            <Icon name="User" size={11} /> Войти
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-gold transition-colors" style={{ color:"hsl(40,8%,50%)" }}>
            <Icon name="Heart" size={11} /> Избранное
          </a>
        </div>
      </div>

      {/* ════ NAV ════ */}
      <nav className="sticky top-0 z-50 border-b" style={{ background:"hsl(20,8%,7%,0.97)", borderColor: S3, backdropFilter:"blur(16px)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center h-16 gap-8">

          {/* Logo */}
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center border"
                style={{ background:"hsl(43,72%,54%,0.12)", borderColor:"hsl(43,72%,54%,0.4)" }}>
                <Icon name="Gem" size={17} style={{ color: G }} />
              </div>
            </div>
            <div>
              <div className="font-display font-semibold tracking-[.15em] leading-none text-base" style={{ color:"hsl(40,18%,90%)" }}>
                ХРАНИТЕЛЬ
              </div>
              <div className="text-[.52rem] tracking-[.22em] mt-0.5 leading-none" style={{ color:"hsl(40,8%,45%)" }}>
                МАСТЕРСКАЯ КАМНЯ
              </div>
            </div>
          </button>

          {/* Links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 overflow-x-auto scrollbar-hide">
            {TOP_NAV.map(l => (
              <button key={l} className="nav-item">
                {l} <Icon name="ChevronDown" size={11} style={{ opacity:.5 }} />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4 ml-auto flex-shrink-0">
            <a href="tel:+78463001234" className="flex items-center gap-2 text-sm font-display font-medium"
              style={{ color: G }}>
              <Icon name="Phone" size={14} style={{ color: G }} />
              +7 (846) 300-12-34
            </a>
            <button className="btn-gold" style={{ padding:".55rem 1.2rem", fontSize:".72rem" }}
              onClick={() => scrollTo("#calculator")}>
              Рассчитать цену
            </button>
          </div>

          <button className="md:hidden ml-auto" style={{ color: G }} onClick={() => setMenu(!menu)}>
            <Icon name={menu ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menu && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-1 border-t" style={{ background:"hsl(20,8%,7%)", borderColor: S3 }}>
            {TOP_NAV.map(l => (
              <button key={l} className="nav-item text-left py-2.5 border-b w-full" style={{ borderColor: S3 }}>{l}</button>
            ))}
            <a href="tel:+78463001234" className="flex items-center gap-2 py-3 text-sm" style={{ color: G }}>
              <Icon name="Phone" size={14} /> +7 (846) 300-12-34
            </a>
            <button className="btn-gold w-full mt-2" onClick={() => scrollTo("#calculator")}>Рассчитать цену</button>
          </div>
        )}
      </nav>

      {/* ════ HERO ════ */}
      <section id="hero" ref={hero.ref} className="relative overflow-hidden grain" style={{ minHeight:560 }}>
        {/* Background layers */}
        <div className="absolute inset-0">
          <img src={IMG_CRAFT} alt="" className="w-full h-full object-cover opacity-20"
            style={{ filter:"grayscale(.6) brightness(.5)" }} />
          <div className="absolute inset-0"
            style={{ background:"linear-gradient(to right, hsl(20,8%,6%) 40%, hsl(20,8%,6%,.5) 70%, transparent 100%)" }} />
          <div className="absolute inset-0"
            style={{ background:"linear-gradient(to top, hsl(20,8%,6%) 0%, transparent 50%)" }} />
          <div className="absolute inset-0"
            style={{ background:"radial-gradient(ellipse at 20% 60%, hsl(43,72%,54%,.06), transparent 55%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 flex items-center" style={{ minHeight:560 }}>
          <div className="flex-1 py-20">
            <div className={`${hero.v ? "anim-fade-up d-0" : "opacity-0"}`}>
              <div className="section-label mb-6">Самара · Собственное производство</div>
              <h1 className="font-display font-light leading-[1.05] mb-5"
                style={{ fontSize:"clamp(2.4rem,5.5vw,4.2rem)", color:"hsl(40,18%,93%)" }}>
                Изготовление<br />
                <em className="not-italic" style={{ color: G }}>памятников</em><br />
                в Самаре
              </h1>
              <p className="font-body text-sm leading-relaxed mb-10 max-w-md" style={{ color:"hsl(40,8%,58%)" }}>
                Мастерская камня «Хранители» — мы есть то, о чём есть память.
                Собственное производство с 2003 года.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-gold" onClick={() => scrollTo("#catalog")}>
                  <Icon name="Grid3x3" size={14} /> Смотреть каталог
                </button>
                <button className="btn-ghost" onClick={() => scrollTo("#calculator")}>
                  <Icon name="Calculator" size={14} /> Рассчитать цену
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className={`flex flex-wrap gap-10 mt-16 pt-8 border-t ${hero.v ? "anim-fade-up d-4" : "opacity-0"}`}
              style={{ borderColor: S3 }}>
              {[["15+","лет опыта"],["3 000+","выполненных работ"],["100%","своё производство"]].map(([n,l]) => (
                <div key={l}>
                  <div className="font-display font-semibold" style={{ fontSize:"2rem", color: G }}>{n}</div>
                  <div className="font-body text-xs mt-0.5" style={{ color:"hsl(40,8%,50%)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Angel */}
          <div className={`hidden lg:block flex-shrink-0 relative ${hero.v ? "anim-fade-in d-3" : "opacity-0"}`}
            style={{ width:340, height:480 }}>
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <img src={IMG_ANGEL} alt="Памятник" className="w-full h-full object-cover object-top"
                style={{ filter:"brightness(.9) contrast(1.05)" }} />
              <div className="absolute inset-0"
                style={{ background:"linear-gradient(to left, transparent 40%, hsl(20,8%,6%) 100%)" }} />
              <div className="absolute inset-0"
                style={{ background:"linear-gradient(to top, hsl(20,8%,6%) 0%, transparent 30%)" }} />
              {/* Gold rim */}
              <div className="absolute inset-0 rounded-lg" style={{ boxShadow:`inset 0 0 0 1px hsl(43,72%,54%,.2)` }} />
            </div>
          </div>
        </div>
      </section>

      {/* ════ BADGES ════ */}
      <div ref={bands.ref} className="border-y" style={{ background: S1, borderColor: S3 }}>
        <div className={`max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-2 md:grid-cols-5 gap-8 ${bands.v ? "anim-fade-up" : "opacity-0"}`}>
          {BADGES.map((b,i) => (
            <div key={b.label} className={`badge-item ${bands.v ? `anim-fade-up d-${i+1}` : ""}`}>
              <div className="badge-icon">
                <Icon name={b.icon} size={20} style={{ color: G }} />
              </div>
              <div className="font-body text-sm font-semibold" style={{ color:"hsl(40,18%,85%)" }}>{b.label}</div>
              <div className="font-body text-xs leading-tight" style={{ color:"hsl(40,8%,50%)" }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ════ CATALOG ════ */}
      <section id="catalog" ref={catalog.ref} className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className={catalog.v ? "anim-fade-up" : "opacity-0"}>
          <div className="section-label mb-3">Каталог</div>
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <h2 className="font-display font-light" style={{ fontSize:"clamp(1.8rem,3vw,2.5rem)", color:"hsl(40,18%,92%)" }}>
              Наши памятники
            </h2>
            <button className="btn-outline-gold" style={{ padding:".5rem 1.2rem", fontSize:".72rem" }}>
              Весь каталог
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-8">
            {TABS.map((t,i) => (
              <button key={t} onClick={() => setTab(i)} className={`tab-pill ${tab===i?"active":""}`}>{t}</button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
            {PRODUCTS.map((p,i) => (
              <div key={p.id} className={`product-card rounded-sm ${catalog.v ? `anim-fade-up d-${i+1}` : "opacity-0"}`}>
                <div className="relative overflow-hidden" style={{ height:200 }}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ filter:"brightness(.75) saturate(.7)" }} />
                  <div className="absolute inset-0"
                    style={{ background:"linear-gradient(to top, hsl(20,8%,11%) 0%, transparent 55%)" }} />
                </div>
                <div className="p-4 relative z-10">
                  <div className="font-body text-xs mb-0.5" style={{ color:"hsl(40,8%,48%)" }}>{p.type}</div>
                  <div className="font-display text-base font-medium mb-2" style={{ color:"hsl(40,18%,88%)" }}>{p.name}</div>
                  <div className="font-display text-lg font-semibold mb-3" style={{ color: G }}>{p.price}</div>
                  <div className="flex gap-2">
                    <button className="btn-gold flex-1" style={{ padding:".45rem .6rem", fontSize:".7rem" }}>Подробнее</button>
                    <button className="w-8 h-8 rounded-sm flex items-center justify-center transition-all border"
                      style={{ borderColor: S3, background:"transparent" }}>
                      <Icon name="Heart" size={13} style={{ color:"hsl(40,8%,50%)" }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Arrow nav */}
            {[{dir:"left",icon:"ChevronLeft"},{dir:"right",icon:"ChevronRight"}].map(({dir,icon}) => (
              <button key={dir}
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:border-gold ${dir==="left" ? "-left-4" : "-right-4"}`}
                style={{ background: S2, borderColor: S3 }}>
                <Icon name={icon as "ChevronLeft"} size={16} style={{ color: G }} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PROMO BANNERS ════ */}
      <section ref={promo.ref} className="py-4 px-4 md:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-5">
        {/* Custom order */}
        <div className={`relative rounded-sm overflow-hidden flex flex-col justify-end p-7 grain ${promo.v ? "anim-fade-up d-1" : "opacity-0"}`}
          style={{ minHeight:200 }}>
          <img src={IMG_WORKSHOP} alt="" className="absolute inset-0 w-full h-full object-cover"
            style={{ filter:"brightness(.35) saturate(.6)" }} />
          <div className="absolute inset-0" style={{ background:"linear-gradient(135deg, hsl(43,60%,28%,.15), transparent 60%)" }} />
          <div className="absolute inset-0 rounded-sm" style={{ boxShadow:`inset 0 0 0 1px hsl(43,72%,54%,.2)` }} />
          <div className="relative z-10">
            <div className="font-display font-semibold text-xl mb-1" style={{ color:"hsl(40,18%,93%)" }}>
              Не нашли что искали?
            </div>
            <div className="font-body text-sm mb-5" style={{ color:"hsl(40,8%,60%)" }}>
              Изготовим памятник под индивидуальный заказ
            </div>
            <div className="flex gap-3">
              <button className="btn-gold" style={{ padding:".55rem 1.2rem", fontSize:".72rem" }}>
                <Icon name="Phone" size={13} /> Позвонить
              </button>
              <button className="btn-ghost" style={{ padding:".55rem 1.2rem", fontSize:".72rem" }}>
                <Icon name="MapPin" size={13} /> На карте
              </button>
            </div>
          </div>
        </div>

        {/* Promo */}
        <div className={`relative rounded-sm overflow-hidden flex flex-col justify-between p-7 grain ${promo.v ? "anim-fade-up d-2" : "opacity-0"}`}
          style={{ minHeight:200, background: S1 }}>
          <div className="absolute inset-0" style={{ background:"linear-gradient(135deg, hsl(43,55%,25%,.2), transparent 70%)" }} />
          <div className="absolute inset-0 rounded-sm" style={{ boxShadow:`inset 0 0 0 1px hsl(43,72%,54%,.2)` }} />
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-body mb-3" style={{ background:"hsl(43,72%,54%,.15)", color: G, border:`1px solid hsl(43,72%,54%,.3)` }}>
              Акция
            </div>
            <div className="font-display font-semibold text-xl mb-1" style={{ color:"hsl(40,18%,93%)" }}>
              При заказе от 1 000 ваз — в подарок!
            </div>
            <div className="font-body text-sm" style={{ color:"hsl(40,8%,55%)" }}>
              Ограниченное предложение
            </div>
          </div>
          <button className="btn-outline-gold self-start relative z-10" style={{ padding:".5rem 1.2rem", fontSize:".72rem" }}>
            Подробнее
          </button>
        </div>
      </section>

      {/* ════ STEPS ════ */}
      <section id="steps" ref={steps.ref} className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className={steps.v ? "anim-fade-up" : "opacity-0"}>
          <div className="text-center mb-14">
            <div className="section-label justify-center mb-3">Процесс</div>
            <h2 className="font-display font-light" style={{ fontSize:"clamp(1.8rem,3vw,2.5rem)", color:"hsl(40,18%,92%)" }}>
              Порядок работы
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connector */}
            <div className="hidden md:block absolute" style={{ top:22, left:"12.5%", right:"12.5%", height:1, background:`linear-gradient(90deg, transparent, ${G}, transparent)`, opacity:.3 }} />

            {STEPS.map((s,i) => (
              <div key={s.n} className={`flex flex-col items-center text-center gap-4 ${steps.v ? `anim-fade-up d-${i+1}` : "opacity-0"}`}>
                <div className="step-num">{s.n}</div>
                <div>
                  <div className="font-body text-sm font-semibold mb-1" style={{ color:"hsl(40,18%,85%)" }}>{s.label}</div>
                  <div className="font-body text-xs leading-relaxed" style={{ color:"hsl(40,8%,50%)" }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Gear */}
          <div className="flex justify-center mt-12">
            <div className="w-16 h-16 rounded-full border flex items-center justify-center"
              style={{ background:"hsl(43,72%,54%,.1)", borderColor:"hsl(43,72%,54%,.35)" }}>
              <Icon name="Settings" size={26} style={{ color: G }} />
            </div>
          </div>
        </div>
      </section>

      {/* ════ ABOUT ════ */}
      <section id="about" ref={about.ref} className="py-16 px-4 md:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className={`relative ${about.v ? "anim-fade-up d-1" : "opacity-0"}`}>
          <div className="rounded-sm overflow-hidden" style={{ height:380 }}>
            <img src={IMG_WORKSHOP} alt="Мастерская" className="w-full h-full object-cover"
              style={{ filter:"brightness(.8) saturate(.75)" }} />
          </div>
          {/* Gold corner accent */}
          <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-sm border" style={{ borderColor:"hsl(43,72%,54%,.3)", background:"hsl(43,72%,54%,.06)" }} />
          <div className="absolute -top-3 -left-3 w-12 h-12 rounded-sm border" style={{ borderColor:"hsl(43,72%,54%,.25)", background:"hsl(43,72%,54%,.05)" }} />
        </div>

        <div className={about.v ? "anim-fade-up d-2" : "opacity-0"}>
          <div className="section-label mb-4">О нас</div>
          <h2 className="font-display font-light mb-2" style={{ fontSize:"clamp(1.6rem,3vw,2.3rem)", color:"hsl(40,18%,92%)" }}>
            Мастерская камня
          </h2>
          <p className="font-body text-sm mb-2 leading-relaxed" style={{ color:"hsl(40,8%,55%)" }}>
            Собственный цех по художественной обработке камня.
          </p>
          <p className="font-body text-sm mb-7 leading-relaxed" style={{ color:"hsl(40,8%,50%)" }}>
            Работаем с гранитом и мрамором. На рынке Самары с 2003 года.
          </p>

          <div className="space-y-3 mb-8">
            {ABOUT_LIST.map((item,i) => (
              <div key={i} className="check-item">
                <div className="check-dot" />
                {item}
              </div>
            ))}
          </div>

          <div className="gold-line mb-7" />
          <div className="flex gap-3">
            <button className="btn-gold"><Icon name="Phone" size={14} /> Связаться</button>
            <button className="btn-outline-gold">Портфолио</button>
          </div>
        </div>
      </section>

      {/* ════ CALCULATOR ════ */}
      <section id="calculator" ref={calcSec.ref} className="py-20 px-4 md:px-8"
        style={{ background: S1, borderTop:`1px solid ${S3}`, borderBottom:`1px solid ${S3}` }}>
        <div className={`max-w-4xl mx-auto ${calcSec.v ? "anim-fade-up" : "opacity-0"}`}>
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-3">Калькулятор</div>
            <h2 className="font-display font-light" style={{ fontSize:"clamp(1.8rem,3vw,2.5rem)", color:"hsl(40,18%,92%)" }}>
              Рассчитайте стоимость
            </h2>
            <p className="font-body text-sm mt-2" style={{ color:"hsl(40,8%,52%)" }}>
              Выберите параметры — получите предварительную цену
            </p>
          </div>

          <div className="rounded-sm border p-7 md:p-10" style={{ background: S2, borderColor: S3 }}>
            {/* Material */}
            <div className="mb-8">
              <div className="font-body text-xs tracking-widest uppercase mb-4" style={{ color: G }}>1. Материал</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {MATERIALS.map(m => (
                  <button key={m.id} onClick={() => setMat(m.id)}
                    className="text-left p-3.5 rounded-sm border transition-all"
                    style={{
                      background:   mat===m.id ? "hsl(43,72%,54%,.1)" : S1,
                      borderColor:  mat===m.id ? G : S3,
                    }}>
                    <div className="font-body text-xs font-semibold" style={{ color: mat===m.id ? G : "hsl(40,18%,80%)" }}>{m.name}</div>
                    <div className="font-body text-xs mt-0.5" style={{ color:"hsl(40,8%,45%)" }}>от {m.base.toLocaleString("ru")} ₽</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <div className="font-body text-xs tracking-widest uppercase mb-4" style={{ color: G }}>2. Размер</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {SIZES.map(s => (
                  <button key={s.id} onClick={() => setSz(s.id)}
                    className="text-center p-3.5 rounded-sm border transition-all font-body text-sm"
                    style={{
                      background:  sz===s.id ? "hsl(43,72%,54%,.1)" : S1,
                      borderColor: sz===s.id ? G : S3,
                      color:       sz===s.id ? G : "hsl(40,18%,72%)",
                      fontWeight:  sz===s.id ? 600 : 400,
                    }}>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Engraving */}
            <div className="mb-8">
              <div className="font-body text-xs tracking-widest uppercase mb-4" style={{ color: G }}>3. Гравировка</div>
              <div className="grid grid-cols-2 gap-2.5">
                {ENGRAVINGS.map(e => (
                  <button key={e.id} onClick={() => setEngr(e.id)}
                    className="flex items-center justify-between p-3.5 rounded-sm border transition-all text-left"
                    style={{
                      background:  engr===e.id ? "hsl(43,72%,54%,.1)" : S1,
                      borderColor: engr===e.id ? G : S3,
                    }}>
                    <span className="font-body text-sm" style={{ color: engr===e.id ? G : "hsl(40,18%,72%)" }}>{e.name}</span>
                    <span className="font-body text-xs" style={{ color:"hsl(40,8%,45%)" }}>
                      {e.price > 0 ? `+${e.price.toLocaleString("ru")} ₽` : "—"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra */}
            <div className="mb-8">
              <div className="font-body text-xs tracking-widest uppercase mb-4" style={{ color: G }}>4. Дополнительно</div>
              <button onClick={() => setInstall(!install)}
                className="flex items-center gap-3 p-3.5 rounded-sm border w-full text-left transition-all"
                style={{ background: install ? "hsl(43,72%,54%,.1)" : S1, borderColor: install ? G : S3 }}>
                <div className="w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all"
                  style={{ borderColor: install ? G : "hsl(40,8%,40%)", background: install ? G : "transparent" }}>
                  {install && <Icon name="Check" size={11} style={{ color: S0 }} />}
                </div>
                <span className="font-body text-sm flex-1" style={{ color:"hsl(40,18%,78%)" }}>Установка на месте</span>
                <span className="font-body text-xs" style={{ color:"hsl(40,8%,45%)" }}>+7 000 ₽</span>
              </button>
            </div>

            {/* Result */}
            <div className="rounded-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 grain relative overflow-hidden"
              style={{ background:"linear-gradient(135deg, hsl(20,8%,9%), hsl(20,8%,12%))", border:`1px solid hsl(43,72%,54%,.3)` }}>
              <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 0% 100%, hsl(43,72%,54%,.1), transparent 60%)" }} />
              <div className="relative z-10">
                <div className="font-body text-xs tracking-widest uppercase mb-1" style={{ color:"hsl(40,8%,50%)" }}>Предварительная стоимость</div>
                <div className="font-display font-semibold" style={{ fontSize:"2.8rem", color: G, lineHeight:1 }}>
                  {total.toLocaleString("ru")} ₽
                </div>
                <div className="font-body text-xs mt-2" style={{ color:"hsl(40,8%,45%)" }}>Рассрочка 0% · Уточните у менеджера</div>
              </div>
              <div className="flex flex-col gap-2.5 relative z-10 w-full md:w-auto">
                <button className="btn-gold whitespace-nowrap"><Icon name="MessageSquare" size={14} /> Получить расчёт</button>
                <button className="btn-ghost whitespace-nowrap" style={{ padding:".6rem 1.5rem", fontSize:".72rem" }}>
                  <Icon name="Phone" size={13} /> Позвонить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ REVIEWS ════ */}
      <section id="reviews" ref={reviews.ref} className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className={reviews.v ? "anim-fade-up" : "opacity-0"}>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="section-label mb-3">Отзывы</div>
              <h2 className="font-display font-light" style={{ fontSize:"clamp(1.8rem,3vw,2.5rem)", color:"hsl(40,18%,92%)" }}>
                Нам доверяют
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-sm" style={{ color:"hsl(40,8%,50%)" }}>Рейтинг 4.5</span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold" style={{ background:"hsl(0,72%,50%,.9)", color:"#fff" }}>
                <Icon name="Star" size={10} /> 4.2
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold" style={{ background:"hsl(217,90%,60%,.9)", color:"#fff" }}>
                <Icon name="Star" size={10} /> 4.2
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
              {REVIEWS.map((r,i) => (
                <div key={i} className={`review-card rounded-sm ${reviews.v ? `anim-fade-up d-${i+1}` : "opacity-0"}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold text-base flex-shrink-0"
                      style={{ background:["hsl(0,60%,55%)","hsl(217,70%,55%)","hsl(145,55%,45%)"][i%3], color:"#fff" }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-body text-sm font-semibold" style={{ color:"hsl(40,18%,85%)" }}>{r.name}</div>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({length:r.rating}).map((_,j) => (
                          <Icon key={j} name="Star" size={11} style={{ color:"hsl(43,80%,58%)" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="font-body text-sm leading-relaxed mb-4" style={{ color:"hsl(40,8%,55%)" }}>
                    «{r.text}»
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: S3 }}>
                    <button className="font-body text-xs underline" style={{ color: G }}>Подробнее</button>
                    <span className="font-body text-xs" style={{ color:"hsl(40,8%,42%)" }}>Отзыв из {r.src}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ PROMO 3-CARDS ════ */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {[IMG_PORTFOLIO, IMG_ANGEL, IMG_GRANITE].map((img,i) => (
          <div key={i} className="relative rounded-sm overflow-hidden flex flex-col justify-end p-6 grain"
            style={{ minHeight:180 }}>
            <img src={img} alt="Акция" className="absolute inset-0 w-full h-full object-cover"
              style={{ filter:"brightness(.35) saturate(.5)" }} />
            <div className="absolute inset-0" style={{ background:"linear-gradient(to top, hsl(20,8%,6%,.9) 0%, transparent 55%)" }} />
            <div className="absolute inset-0 rounded-sm" style={{ boxShadow:`inset 0 0 0 1px hsl(43,72%,54%,.15)` }} />
            <div className="relative z-10">
              <div className="inline-block px-2.5 py-0.5 rounded-full text-xs mb-2" style={{ background:"hsl(43,72%,54%,.18)", color: G, border:`1px solid hsl(43,72%,54%,.3)` }}>
                Акция
              </div>
              <div className="font-display font-semibold text-base mb-1" style={{ color:"hsl(40,18%,90%)" }}>
                {i===1 ? "Родительские субботы · Скидка 18%" : "При заказе от 1000 ваз — в подарок!"}
              </div>
              <button className="btn-ghost mt-3" style={{ padding:".4rem 1rem", fontSize:".7rem" }}>Подробнее</button>
            </div>
          </div>
        ))}
      </section>

      {/* ════ FOOTER ════ */}
      <footer ref={ftr.ref} className="mt-8 border-t" style={{ background: S1, borderColor: S3 }}>
        {/* Addresses */}
        <div className="border-b" style={{ borderColor: S3 }}>
          <div className={`max-w-7xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-2 gap-8 ${ftr.v ? "anim-fade-up" : "opacity-0"}`}>
            <div>
              <h3 className="font-display text-lg font-semibold mb-5" style={{ color:"hsl(40,18%,88%)" }}>Адреса магазинов</h3>
              <div className="space-y-3">
                {ADDRESSES.map((a,i) => (
                  <div key={i} className="flex items-start gap-3 font-body text-sm" style={{ color:"hsl(40,8%,55%)" }}>
                    <Icon name="MapPin" size={14} style={{ color: G, flexShrink:0, marginTop:2 }} />{a}
                  </div>
                ))}
              </div>
            </div>
            {/* Map placeholder */}
            <div className="rounded-sm flex items-center justify-center border" style={{ minHeight:130, background: S2, borderColor: S3 }}>
              <div className="flex flex-col items-center gap-2" style={{ color:"hsl(40,8%,38%)" }}>
                <Icon name="Map" size={22} style={{ color: G, opacity:.4 }} />
                <span className="font-body text-xs">Карта</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer columns */}
        <div className={`max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-10 ${ftr.v ? "anim-fade-up d-2" : "opacity-0"}`}>
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-5" style={{ color: G }}>Контакты</h4>
            <div className="space-y-2.5">
              {[
                {i:"MapPin", t:"г. Самара, ул. Мечникова, 15"},
                {i:"Phone",  t:"+7 (846) 300-12-34"},
                {i:"Clock",  t:"Пн–Сб: 9:00–18:00"},
                {i:"Mail",   t:"info@khraniteli-samara.ru"},
              ].map(c => (
                <div key={c.t} className="flex items-start gap-2 font-body text-xs" style={{ color:"hsl(40,8%,50%)" }}>
                  <Icon name={c.i as "MapPin"} size={12} style={{ color: G, flexShrink:0, marginTop:1 }} />{c.t}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-5" style={{ color: G }}>Компания</h4>
            {["О нас","Портфолио","Доставка","Оплата","Гарантия"].map(l => (
              <div key={l} className="font-body text-xs mb-2 cursor-pointer transition-colors hover:text-gold" style={{ color:"hsl(40,8%,50%)" }}>{l}</div>
            ))}
          </div>
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-5" style={{ color: G }}>Каталог</h4>
            {TABS.map(l => (
              <div key={l} className="font-body text-xs mb-2 cursor-pointer transition-colors hover:text-gold" style={{ color:"hsl(40,8%,50%)" }}>{l}</div>
            ))}
          </div>
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase mb-5" style={{ color: G }}>Рассылка</h4>
            <p className="font-body text-xs mb-4" style={{ color:"hsl(40,8%,46%)" }}>Подпишитесь на новости и акции</p>
            <div className="flex gap-2 mb-5">
              <input placeholder="E-mail" className="flex-1 rounded-sm px-3 py-2 text-xs outline-none border"
                style={{ background: S0, borderColor: S3, color:"hsl(40,18%,80%)" }} />
              <button className="btn-gold" style={{ padding:".5rem .9rem", fontSize:".7rem" }}>OK</button>
            </div>
            <div className="flex gap-2">
              {["Youtube","Send","Users"].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:border-gold"
                  style={{ borderColor: S3, background: S0 }}>
                  <Icon name={s as "Send"} size={13} style={{ color: G }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t" style={{ borderColor: S3 }}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border flex items-center justify-center" style={{ borderColor:"hsl(43,72%,54%,.4)", background:"hsl(43,72%,54%,.1)" }}>
                <Icon name="Gem" size={13} style={{ color: G }} />
              </div>
              <span className="font-display font-semibold tracking-[.15em] text-sm" style={{ color:"hsl(40,18%,85%)" }}>ХРАНИТЕЛЬ</span>
              <span className="font-body text-xs" style={{ color:"hsl(40,8%,38%)" }}>МАСТЕРСКАЯ КАМНЯ</span>
            </div>
            <div className="font-body text-xs" style={{ color:"hsl(40,8%,35%)" }}>
              © 2024 Мастерская камня «Хранители» · Самара · ИНН 6312000000
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
