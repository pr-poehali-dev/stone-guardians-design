import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_MONUMENT = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/a1be615c-6718-402b-8208-a1b1f6be8696.jpg";
const IMG_WORKSHOP = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/b517e521-c6cd-4475-b3e1-ff43529717fa.jpg";
const IMG_PORTFOLIO = "https://cdn.poehali.dev/projects/79a6b314-55a0-47eb-b152-2f77b7cb3c32/files/a074d7f9-4b5a-4159-a62d-361ae4cff99c.jpg";

const NAV_LINKS = [
  { label: "Каталог", href: "#catalog" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
];

const CATALOG_ITEMS = [
  { id: 1, name: "Стела «Классика»", material: "Гранит чёрный", price: "от 28 000 ₽", img: IMG_MONUMENT },
  { id: 2, name: "Памятник «Арка»", material: "Гранит тёмно-серый", price: "от 42 000 ₽", img: IMG_PORTFOLIO },
  { id: 3, name: "Крест «Лотос»", material: "Мрамор белый", price: "от 35 000 ₽", img: IMG_WORKSHOP },
  { id: 4, name: "Стела «Элегия»", material: "Гранит карельский", price: "от 56 000 ₽", img: IMG_MONUMENT },
  { id: 5, name: "Горизонталь «Вечность»", material: "Лезниковский гранит", price: "от 38 000 ₽", img: IMG_PORTFOLIO },
  { id: 6, name: "Памятник «Монолит»", material: "Гранит чёрный габбро", price: "от 64 000 ₽", img: IMG_WORKSHOP },
];

const PORTFOLIO_ITEMS = [
  { id: 1, img: IMG_MONUMENT, title: "Семейное захоронение", location: "Самара, 2024" },
  { id: 2, img: IMG_PORTFOLIO, title: "Мемориальный комплекс", location: "Тольятти, 2024" },
  { id: 3, img: IMG_WORKSHOP, title: "Индивидуальный заказ", location: "Самара, 2023" },
];

const REVIEWS = [
  {
    name: "Елена Морозова",
    date: "Март 2024",
    text: "Обратились в мастерскую «Хранители» в тяжёлый момент. Сотрудники проявили такт и помогли выбрать достойный памятник. Качество исполнения превзошло ожидания.",
    rating: 5,
  },
  {
    name: "Андрей Сергеев",
    date: "Февраль 2024",
    text: "Заказывали сложный мемориальный комплекс. Всё выполнено точно в срок, гравировка портрета чёткая и детальная. Настоящие профессионалы своего дела.",
    rating: 5,
  },
  {
    name: "Наталья Козлова",
    date: "Январь 2024",
    text: "Искали мастеров с собственным производством — нашли «Хранителей». Без посредников, цена честная, результат — достойный памяти.",
    rating: 5,
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Как выбрать материал для памятника: гранит или мрамор",
    excerpt: "Разбираем свойства популярных материалов, их долговечность и внешний вид спустя годы...",
    date: "15 мая 2024",
    readTime: "5 мин",
  },
  {
    id: 2,
    title: "Гравировка на памятнике: виды и особенности",
    excerpt: "Лазерная, ручная, пескоструйная — чем они отличаются и что выбрать для вашего случая...",
    date: "2 мая 2024",
    readTime: "4 мин",
  },
  {
    id: 3,
    title: "Уход за гранитным памятником: советы мастера",
    excerpt: "Простые правила, которые сохранят красоту памятника на десятилетия вперёд...",
    date: "18 апреля 2024",
    readTime: "3 мин",
  },
];

const MATERIALS = [
  { id: "granite_black", name: "Гранит чёрный", basePrice: 28000 },
  { id: "granite_grey", name: "Гранит тёмно-серый", basePrice: 24000 },
  { id: "marble_white", name: "Мрамор белый", basePrice: 22000 },
  { id: "granite_karelian", name: "Гранит карельский", basePrice: 38000 },
  { id: "granite_gabro", name: "Гранит чёрный габбро", basePrice: 45000 },
];

const SIZES = [
  { id: "small", name: "80×40 см", label: "Стандартный", mult: 1 },
  { id: "medium", name: "100×50 см", label: "Увеличенный", mult: 1.4 },
  { id: "large", name: "120×60 см", label: "Большой", mult: 1.9 },
  { id: "xlarge", name: "150×70 см", label: "Монументальный", mult: 2.5 },
];

const ENGRAVINGS = [
  { id: "none", name: "Без гравировки", price: 0 },
  { id: "text", name: "Текст и даты", price: 3500 },
  { id: "portrait_laser", name: "Портрет лазерный", price: 8500 },
  { id: "portrait_hand", name: "Портрет ручной", price: 16000 },
  { id: "ornament", name: "Орнамент / Икона", price: 6000 },
];

const EXTRAS = [
  { id: "installation", name: "Установка на место", price: 7000 },
  { id: "flower_vase", name: "Ваза для цветов", price: 3500 },
  { id: "bench", name: "Скамья гранитная", price: 12000 },
  { id: "table", name: "Стол гранитный", price: 14000 },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0].id);
  const [selectedSize, setSelectedSize] = useState(SIZES[0].id);
  const [selectedEngraving, setSelectedEngraving] = useState(ENGRAVINGS[0].id);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const heroSection = useInView(0.1);
  const aboutSection = useInView(0.15);
  const catalogSection = useInView(0.1);
  const calcSection = useInView(0.1);
  const portfolioSection = useInView(0.1);
  const reviewsSection = useInView(0.1);
  const blogSection = useInView(0.1);

  const material = MATERIALS.find(m => m.id === selectedMaterial)!;
  const size = SIZES.find(s => s.id === selectedSize)!;
  const engraving = ENGRAVINGS.find(e => e.id === selectedEngraving)!;
  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const extra = EXTRAS.find(e => e.id === id);
    return sum + (extra?.price ?? 0);
  }, 0);
  const totalPrice = Math.round(material.basePrice * size.mult) + engraving.price + extrasTotal;

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-cream overflow-x-hidden" style={{ backgroundColor: "hsl(20,8%,6%)", color: "hsl(40,20%,92%)" }}>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ background: "linear-gradient(to bottom, hsl(20,8%,5%,0.97) 0%, hsl(20,8%,5%,0) 100%)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, hsl(43,60%,40%), hsl(43,74%,58%))" }}>
            <span className="font-cormorant text-sm font-bold" style={{ color: "hsl(20,8%,6%)" }}>Х</span>
          </div>
          <div>
            <div className="font-cormorant text-lg font-semibold tracking-widest" style={{ color: "hsl(43,74%,58%)" }}>ХРАНИТЕЛИ</div>
            <div style={{ color: "hsl(40,10%,50%)", fontSize: "0.55rem", lineHeight: 1, letterSpacing: "0.2em", fontFamily: "'Golos Text', sans-serif" }}>МАСТЕРСКАЯ КАМНЯ</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <button key={link.href} onClick={() => scrollTo(link.href)} className="nav-link">
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+78463001234" className="flex items-center gap-2 text-sm" style={{ color: "hsl(43,74%,58%)" }}>
            <Icon name="Phone" size={14} />
            <span style={{ fontFamily: "'Golos Text', sans-serif" }}>+7 (846) 300-12-34</span>
          </a>
          <button className="btn-gold px-5 py-2.5 rounded-sm" onClick={() => scrollTo("#calculator")}>
            Рассчитать цену
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "hsl(43,74%,58%)" }}>
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-20 px-6 flex flex-col gap-6" style={{ background: "hsl(20,8%,5%)" }}>
          {NAV_LINKS.map(link => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              className="text-left py-3 border-b"
              style={{ borderColor: "hsl(20,8%,18%)", color: "hsl(40,20%,80%)", fontFamily: "'Golos Text', sans-serif", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {link.label}
            </button>
          ))}
          <a href="tel:+78463001234" className="flex items-center gap-2 mt-4" style={{ color: "hsl(43,74%,58%)" }}>
            <Icon name="Phone" size={16} />
            <span>+7 (846) 300-12-34</span>
          </a>
          <button className="btn-gold px-6 py-3 rounded-sm w-full mt-2" onClick={() => scrollTo("#calculator")}>
            Рассчитать цену
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_MONUMENT} alt="Памятник из гранита" className="w-full h-full object-cover"
            style={{ opacity: 0.3, filter: "saturate(0.4) brightness(0.6)" }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, hsl(20,8%,6%) 30%, hsl(20,8%,6%,0.7) 60%, hsl(20,8%,6%,0.3) 100%)"
          }} />
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at 30% 70%, hsl(43,74%,58%,0.06) 0%, transparent 60%)"
          }} />
        </div>

        <div ref={heroSection.ref} className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl w-full">
          <div className={heroSection.inView ? "animate-fade-up" : "opacity-0"}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12" style={{ background: "hsl(43,74%,58%)" }} />
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)" }}>
                Самара · Собственное производство
              </span>
            </div>
            <h1 className="font-cormorant font-light leading-none mb-6" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "hsl(40,20%,92%)" }}>
              Памятники,<br />
              <em style={{ color: "hsl(43,74%,58%)", fontStyle: "italic" }}>достойные</em><br />
              памяти
            </h1>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "1rem", color: "hsl(40,10%,60%)", maxWidth: "520px", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Мастерская камня «Хранители» — более 15 лет создаём памятники из гранита и мрамора. Каждое изделие — произведение искусства, сохраняющее память о близких.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-gold px-8 py-4 rounded-sm" onClick={() => scrollTo("#catalog")}>
                Смотреть каталог
              </button>
              <button className="btn-outline-gold px-8 py-4 rounded-sm" onClick={() => scrollTo("#calculator")}>
                Рассчитать стоимость
              </button>
            </div>
          </div>

          <div className={`flex gap-12 mt-16 pt-8 ${heroSection.inView ? "animate-fade-up delay-400" : "opacity-0"}`}
            style={{ borderTop: "1px solid hsl(20,8%,18%)" }}>
            {[
              { num: "15+", label: "лет опыта" },
              { num: "3 000+", label: "выполненных работ" },
              { num: "100%", label: "собственное производство" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-cormorant font-semibold" style={{ fontSize: "2.2rem", color: "hsl(43,74%,58%)" }}>
                  {stat.num}
                </div>
                <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.72rem", color: "hsl(40,10%,50%)", marginTop: "2px", letterSpacing: "0.05em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 px-6 md:px-12">
        <div ref={aboutSection.ref} className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          <div className={aboutSection.inView ? "animate-fade-up" : "opacity-0"}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "hsl(43,74%,58%)" }} />
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)" }}>О мастерской</span>
            </div>
            <h2 className="font-cormorant font-light mb-6" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "hsl(40,20%,92%)" }}>
              Мы сохраняем<br /><em style={{ color: "hsl(43,74%,58%)" }}>светлую память</em>
            </h2>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.95rem", color: "hsl(40,10%,60%)", lineHeight: 1.75, marginBottom: "1rem" }}>
              «Хранители» — мастерская с полным циклом производства. Мы не перепродаём — каждый памятник рождается в наших руках: от распила камня до финальной полировки и гравировки.
            </p>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.95rem", color: "hsl(40,10%,60%)", lineHeight: 1.75, marginBottom: "2rem" }}>
              Работаем с семьями Самары, Тольятти и области. Готовы выехать на замер, помочь с выбором и установкой.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Shield", text: "Гарантия 10 лет" },
                { icon: "Truck", text: "Доставка и установка" },
                { icon: "Palette", text: "Индивидуальный дизайн" },
                { icon: "Clock", text: "Срок от 14 дней" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsl(43,74%,58%,0.1)", border: "1px solid hsl(43,74%,58%,0.2)" }}>
                    <Icon name={item.icon} size={14} style={{ color: "hsl(43,74%,58%)" }} />
                  </div>
                  <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "hsl(40,20%,75%)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={aboutSection.inView ? "animate-fade-up delay-300" : "opacity-0"}>
            <div className="relative">
              <img src={IMG_WORKSHOP} alt="Мастерская камня" className="w-full rounded-sm object-cover"
                style={{ height: "480px", filter: "brightness(0.85)" }} />
              <div className="absolute inset-0 rounded-sm" style={{
                background: "linear-gradient(135deg, hsl(43,74%,58%,0.1) 0%, transparent 60%)",
                border: "1px solid hsl(43,74%,58%,0.2)"
              }} />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-sm"
                style={{ background: "hsl(20,8%,6%,0.92)", border: "1px solid hsl(43,74%,58%,0.3)", backdropFilter: "blur(8px)" }}>
                <div className="font-cormorant text-xl italic mb-1" style={{ color: "hsl(43,74%,58%)" }}>
                  «Камень хранит — время забывает»
                </div>
                <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.72rem", color: "hsl(40,10%,50%)" }}>
                  Девиз мастерской «Хранители»
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 px-6 md:px-12" style={{ backgroundColor: "hsl(20,8%,8%)" }}>
        <div ref={catalogSection.ref} className="container mx-auto max-w-6xl">
          <div className={`text-center mb-14 ${catalogSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: "hsl(43,74%,58%)" }} />
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)" }}>Каталог</span>
              <div className="h-px w-12" style={{ background: "hsl(43,74%,58%)" }} />
            </div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "hsl(40,20%,92%)" }}>
              Наши памятники
            </h2>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "hsl(40,10%,55%)", marginTop: "0.75rem" }}>
              Изделия собственного производства · Самовывоз или доставка по Самарской области
            </p>
          </div>

          <div className="flex gap-3 mb-10 flex-wrap justify-center">
            {[
              { id: "all", label: "Все" },
              { id: "granite", label: "Гранит" },
              { id: "marble", label: "Мрамор" },
              { id: "complex", label: "Комплексы" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`rounded-sm transition-all ${activeTab === tab.id ? "btn-gold" : "btn-outline-gold"}`}
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.72rem" }}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATALOG_ITEMS.map((item, i) => (
              <div key={item.id}
                className={`card-hover rounded-sm overflow-hidden cursor-pointer ${catalogSection.inView ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s`, backgroundColor: "hsl(20,8%,10%)", border: "1px solid hsl(20,8%,16%)" }}>
                <div className="relative overflow-hidden" style={{ height: "220px" }}>
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ filter: "brightness(0.8) saturate(0.7)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(20,8%,10%) 0%, transparent 60%)" }} />
                </div>
                <div className="p-5">
                  <div className="font-cormorant text-xl font-medium mb-1" style={{ color: "hsl(40,20%,88%)" }}>{item.name}</div>
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.78rem", color: "hsl(40,10%,50%)", marginBottom: "0.75rem" }}>{item.material}</div>
                  <div className="flex items-center justify-between">
                    <div className="font-cormorant text-xl" style={{ color: "hsl(43,74%,58%)" }}>{item.price}</div>
                    <button className="btn-outline-gold rounded-sm" style={{ padding: "0.4rem 1rem", fontSize: "0.7rem" }}>Подробнее</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="btn-outline-gold rounded-sm" style={{ padding: "1rem 2.5rem" }}>
              Смотреть весь каталог
            </button>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 px-6 md:px-12">
        <div ref={calcSection.ref} className="container mx-auto max-w-4xl">
          <div className={`text-center mb-14 ${calcSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: "hsl(43,74%,58%)" }} />
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)" }}>Калькулятор</span>
              <div className="h-px w-12" style={{ background: "hsl(43,74%,58%)" }} />
            </div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "hsl(40,20%,92%)" }}>
              Рассчитайте стоимость
            </h2>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "hsl(40,10%,55%)", marginTop: "0.75rem" }}>
              Выберите параметры — получите предварительную стоимость
            </p>
          </div>

          <div className={`rounded-sm p-8 md:p-10 ${calcSection.inView ? "animate-fade-up delay-200" : "opacity-0"}`}
            style={{ backgroundColor: "hsl(20,8%,9%)", border: "1px solid hsl(20,8%,16%)" }}>

            {/* Material */}
            <div className="mb-8">
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)", marginBottom: "1rem" }}>
                1. Материал
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {MATERIALS.map(mat => (
                  <button key={mat.id} onClick={() => setSelectedMaterial(mat.id)}
                    className="text-left px-4 py-3 rounded-sm transition-all border"
                    style={{
                      backgroundColor: selectedMaterial === mat.id ? "hsl(43,74%,58%,0.12)" : "hsl(20,8%,12%)",
                      borderColor: selectedMaterial === mat.id ? "hsl(43,74%,58%)" : "hsl(20,8%,20%)",
                      color: selectedMaterial === mat.id ? "hsl(43,74%,58%)" : "hsl(40,10%,60%)",
                      fontFamily: "'Golos Text', sans-serif",
                      fontSize: "0.85rem"
                    }}>
                    <div style={{ fontWeight: 500 }}>{mat.name}</div>
                    <div style={{ fontSize: "0.72rem", opacity: 0.7, marginTop: "2px" }}>от {mat.basePrice.toLocaleString("ru")} ₽</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)", marginBottom: "1rem" }}>
                2. Размер стелы
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {SIZES.map(sz => (
                  <button key={sz.id} onClick={() => setSelectedSize(sz.id)}
                    className="text-center px-4 py-3 rounded-sm transition-all border"
                    style={{
                      backgroundColor: selectedSize === sz.id ? "hsl(43,74%,58%,0.12)" : "hsl(20,8%,12%)",
                      borderColor: selectedSize === sz.id ? "hsl(43,74%,58%)" : "hsl(20,8%,20%)",
                      color: selectedSize === sz.id ? "hsl(43,74%,58%)" : "hsl(40,10%,60%)",
                      fontFamily: "'Golos Text', sans-serif",
                      fontSize: "0.85rem"
                    }}>
                    <div style={{ fontWeight: 600 }}>{sz.name}</div>
                    <div style={{ fontSize: "0.72rem", opacity: 0.7, marginTop: "2px" }}>{sz.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Engraving */}
            <div className="mb-8">
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)", marginBottom: "1rem" }}>
                3. Гравировка
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ENGRAVINGS.map(eng => (
                  <button key={eng.id} onClick={() => setSelectedEngraving(eng.id)}
                    className="text-left px-4 py-3 rounded-sm transition-all border flex justify-between items-center"
                    style={{
                      backgroundColor: selectedEngraving === eng.id ? "hsl(43,74%,58%,0.12)" : "hsl(20,8%,12%)",
                      borderColor: selectedEngraving === eng.id ? "hsl(43,74%,58%)" : "hsl(20,8%,20%)",
                      color: selectedEngraving === eng.id ? "hsl(43,74%,58%)" : "hsl(40,10%,60%)",
                      fontFamily: "'Golos Text', sans-serif",
                      fontSize: "0.85rem"
                    }}>
                    <span>{eng.name}</span>
                    <span style={{ fontSize: "0.72rem", opacity: 0.7 }}>
                      {eng.price > 0 ? `+ ${eng.price.toLocaleString("ru")} ₽` : "включено"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="mb-8">
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)", marginBottom: "1rem" }}>
                4. Дополнительно (необязательно)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRAS.map(extra => (
                  <button key={extra.id} onClick={() => toggleExtra(extra.id)}
                    className="text-left px-4 py-3 rounded-sm transition-all border flex justify-between items-center"
                    style={{
                      backgroundColor: selectedExtras.includes(extra.id) ? "hsl(43,74%,58%,0.12)" : "hsl(20,8%,12%)",
                      borderColor: selectedExtras.includes(extra.id) ? "hsl(43,74%,58%)" : "hsl(20,8%,20%)",
                      color: selectedExtras.includes(extra.id) ? "hsl(43,74%,58%)" : "hsl(40,10%,60%)",
                      fontFamily: "'Golos Text', sans-serif",
                      fontSize: "0.85rem"
                    }}>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: selectedExtras.includes(extra.id) ? "hsl(43,74%,58%)" : "hsl(20,8%,35%)",
                          backgroundColor: selectedExtras.includes(extra.id) ? "hsl(43,74%,58%)" : "transparent"
                        }}>
                        {selectedExtras.includes(extra.id) && <Icon name="Check" size={10} style={{ color: "hsl(20,8%,6%)" }} />}
                      </div>
                      <span>{extra.name}</span>
                    </div>
                    <span style={{ fontSize: "0.72rem", opacity: 0.7 }}>+ {extra.price.toLocaleString("ru")} ₽</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="rounded-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              style={{
                background: "linear-gradient(135deg, hsl(43,60%,40%,0.15), hsl(43,74%,58%,0.08))",
                border: "1px solid hsl(43,74%,58%,0.3)"
              }}>
              <div>
                <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)", marginBottom: "0.25rem" }}>
                  Предварительная стоимость
                </div>
                <div className="font-cormorant font-semibold" style={{ fontSize: "3.5rem", color: "hsl(43,80%,70%)", lineHeight: 1 }}>
                  {totalPrice.toLocaleString("ru")} ₽
                </div>
                <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.72rem", color: "hsl(40,10%,50%)", marginTop: "0.5rem" }}>
                  Точная цена после консультации · Рассрочка 0%
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button className="btn-gold rounded-sm whitespace-nowrap" style={{ padding: "1rem 2rem" }}>
                  Получить точный расчёт
                </button>
                <button className="btn-outline-gold rounded-sm whitespace-nowrap" style={{ padding: "0.75rem 2rem" }}>
                  Позвонить мастеру
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6 md:px-12" style={{ backgroundColor: "hsl(20,8%,8%)" }}>
        <div ref={portfolioSection.ref} className="container mx-auto max-w-6xl">
          <div className={`text-center mb-14 ${portfolioSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: "hsl(43,74%,58%)" }} />
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)" }}>Портфолио</span>
              <div className="h-px w-12" style={{ background: "hsl(43,74%,58%)" }} />
            </div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "hsl(40,20%,92%)" }}>
              Наши работы
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div key={item.id}
                className={`card-hover rounded-sm overflow-hidden group cursor-pointer ${portfolioSection.inView ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="relative overflow-hidden" style={{ height: "288px" }}>
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.75) saturate(0.6)" }} />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: "linear-gradient(to top, hsl(20,8%,6%,0.9) 0%, transparent 50%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="font-cormorant text-xl" style={{ color: "hsl(40,20%,92%)" }}>{item.title}</div>
                    <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.75rem", color: "hsl(43,74%,58%)", marginTop: "2px" }}>{item.location}</div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between"
                  style={{ backgroundColor: "hsl(20,8%,10%)", borderTop: "1px solid hsl(20,8%,16%)" }}>
                  <div>
                    <div className="font-cormorant text-base" style={{ color: "hsl(40,20%,80%)" }}>{item.title}</div>
                    <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.75rem", color: "hsl(40,10%,50%)" }}>{item.location}</div>
                  </div>
                  <Icon name="ArrowRight" size={16} style={{ color: "hsl(43,74%,58%)" }} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="btn-outline-gold rounded-sm" style={{ padding: "1rem 2.5rem" }}>
              Все работы
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 md:px-12">
        <div ref={reviewsSection.ref} className="container mx-auto max-w-6xl">
          <div className={`text-center mb-14 ${reviewsSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: "hsl(43,74%,58%)" }} />
              <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)" }}>Отзывы</span>
              <div className="h-px w-12" style={{ background: "hsl(43,74%,58%)" }} />
            </div>
            <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "hsl(40,20%,92%)" }}>
              Нам доверяют
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i}
                className={`rounded-sm p-6 card-hover ${reviewsSection.inView ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s`, backgroundColor: "hsl(20,8%,9%)", border: "1px solid hsl(20,8%,16%)" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} style={{ color: "hsl(43,74%,58%)" }} />
                  ))}
                </div>
                <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.88rem", color: "hsl(40,10%,65%)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  «{review.text}»
                </p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid hsl(20,8%,18%)" }}>
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.9rem", fontWeight: 500, color: "hsl(40,20%,80%)" }}>{review.name}</div>
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.75rem", color: "hsl(40,10%,45%)" }}>{review.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 px-6 md:px-12" style={{ backgroundColor: "hsl(20,8%,8%)" }}>
        <div ref={blogSection.ref} className="container mx-auto max-w-6xl">
          <div className={`flex items-end justify-between mb-14 flex-wrap gap-6 ${blogSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12" style={{ background: "hsl(43,74%,58%)" }} />
                <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)" }}>Блог</span>
              </div>
              <h2 className="font-cormorant font-light" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "hsl(40,20%,92%)" }}>
                Полезные статьи
              </h2>
            </div>
            <button className="btn-outline-gold rounded-sm" style={{ padding: "0.75rem 1.5rem" }}>
              Все статьи
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <div key={post.id}
                className={`card-hover rounded-sm p-6 cursor-pointer ${blogSection.inView ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s`, backgroundColor: "hsl(20,8%,10%)", border: "1px solid hsl(20,8%,16%)" }}>
                <div className="flex items-center gap-3 mb-4" style={{ color: "hsl(40,10%,45%)", fontFamily: "'Golos Text', sans-serif", fontSize: "0.75rem" }}>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} чтения</span>
                </div>
                <h3 className="font-cormorant font-medium mb-3" style={{ fontSize: "1.25rem", color: "hsl(40,20%,85%)", lineHeight: 1.35 }}>
                  {post.title}
                </h3>
                <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "hsl(40,10%,55%)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2" style={{ color: "hsl(43,74%,58%)" }}>
                  <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Читать</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, hsl(43,60%,30%,0.15) 0%, hsl(20,8%,6%) 50%, hsl(43,60%,25%,0.1) 100%)"
        }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,74%,58%,0.4), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,74%,58%,0.4), transparent)" }} />
        <div className="relative container mx-auto max-w-4xl text-center">
          <h2 className="font-cormorant font-light mb-4" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "hsl(40,20%,92%)" }}>
            Готовы сделать заказ?
          </h2>
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.9rem", color: "hsl(40,10%,60%)", maxWidth: "480px", margin: "0 auto 2.5rem", lineHeight: 1.75 }}>
            Оставьте заявку — мы перезвоним в течение 30 минут и ответим на все вопросы. Консультация бесплатна.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-gold rounded-sm" style={{ padding: "1rem 2.5rem" }}>
              Оставить заявку
            </button>
            <a href="tel:+78463001234" className="btn-outline-gold rounded-sm flex items-center justify-center gap-2" style={{ padding: "1rem 2.5rem" }}>
              <Icon name="Phone" size={14} />
              +7 (846) 300-12-34
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12" style={{ backgroundColor: "hsl(20,8%,5%)", borderTop: "1px solid hsl(20,8%,14%)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, hsl(43,60%,40%), hsl(43,74%,58%))" }}>
                  <span className="font-cormorant text-sm font-bold" style={{ color: "hsl(20,8%,6%)" }}>Х</span>
                </div>
                <div>
                  <div className="font-cormorant text-lg font-semibold tracking-widest" style={{ color: "hsl(43,74%,58%)" }}>ХРАНИТЕЛИ</div>
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", color: "hsl(40,10%,40%)" }}>МАСТЕРСКАЯ КАМНЯ</div>
                </div>
              </div>
              <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "hsl(40,10%,45%)", lineHeight: 1.7, marginBottom: "1rem" }}>
                Собственное производство памятников из гранита и мрамора в Самаре. Работаем с 2008 года.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: "Users", label: "ВКонтакте" },
                  { icon: "Send", label: "Telegram" },
                ].map(s => (
                  <a key={s.label} href="#"
                    className="w-8 h-8 rounded-sm flex items-center justify-center transition-all hover:opacity-100"
                    style={{ border: "1px solid hsl(20,8%,20%)", opacity: 0.6 }}
                    title={s.label}>
                    <Icon name={s.icon} size={14} style={{ color: "hsl(43,74%,58%)" }} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)", marginBottom: "1rem" }}>Навигация</div>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map(link => (
                  <button key={link.href} onClick={() => scrollTo(link.href)}
                    className="text-left transition-opacity hover:opacity-100"
                    style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "hsl(40,10%,50%)", opacity: 0.8 }}>
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(43,74%,58%)", marginBottom: "1rem" }}>Контакты</div>
              <div className="flex flex-col gap-3">
                <a href="tel:+78463001234" className="flex items-center gap-2"
                  style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "hsl(40,10%,55%)" }}>
                  <Icon name="Phone" size={13} style={{ color: "hsl(43,74%,58%)" }} />
                  +7 (846) 300-12-34
                </a>
                <a href="mailto:info@khraniteli-samara.ru" className="flex items-center gap-2"
                  style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "hsl(40,10%,55%)" }}>
                  <Icon name="Mail" size={13} style={{ color: "hsl(43,74%,58%)" }} />
                  info@khraniteli-samara.ru
                </a>
                <div className="flex items-start gap-2"
                  style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "hsl(40,10%,55%)" }}>
                  <Icon name="MapPin" size={13} style={{ color: "hsl(43,74%,58%)", marginTop: "2px", flexShrink: 0 }} />
                  <span>г. Самара, ул. Мечникова, 15</span>
                </div>
                <div className="flex items-center gap-2"
                  style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "hsl(40,10%,55%)" }}>
                  <Icon name="Clock" size={13} style={{ color: "hsl(43,74%,58%)" }} />
                  Пн–Сб: 9:00 – 18:00
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid hsl(20,8%,14%)" }}>
            <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.75rem", color: "hsl(40,10%,35%)" }}>
              © 2024 Мастерская камня «Хранители». Все права защищены.
            </div>
            <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.75rem", color: "hsl(40,10%,30%)" }}>
              Самара · ИНН 6312000000
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}