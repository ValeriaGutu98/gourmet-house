import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroVideo from "../components/HeroVideo";
import fishGraphic from "../assets/Fish_Graphic.webp";

const STATEMENT_TEXT = "The only guest allowed to be late to dinner. Heritage\nsourcing in the Persian tradition. This caviar is not for\neveryone—but then, neither are you.";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("hero-statement-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedText(STATEMENT_TEXT.slice(0, index + 1));
      index++;
      if (index >= STATEMENT_TEXT.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [startTyping]);

  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const element = document.getElementById("HeroMediaBackground-template--24699078279507__hero_media_background_wLkGTa");
    if (element) {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      setSectionTop(absoluteTop);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const relativeScroll = scrollY - (sectionTop - window.innerHeight);
  const bgTranslateY = relativeScroll > 0 ? relativeScroll * 0.12 : 0;
  const contentTranslateY = relativeScroll > 0 ? relativeScroll * -0.06 : 0;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      <Navbar />
      <main className="flex-grow flex flex-col">

        <HeroVideo />

        <div
          id="hero-statement-section"
          className="relative py-28 px-6 md:px-12 flex flex-col items-center text-center bg-white overflow-hidden min-h-[500px] justify-center"
        >

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <img
              src={fishGraphic}
              alt=""
              className="w-[95%] md:w-[85%] max-w-[650px] aspect-square object-contain opacity-80"
            />
          </div>

          <div className="relative z-10 max-w-6xl w-full flex flex-col items-center gap-7">
            <h6 className="font-assistant text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-gh-gold">
              ALWAYS TASTEFUL. NEVER MODEST.
            </h6>

            <h4
              className="font-ivy text-[24px] md:text-[38px] lg:text-[46px] text-[#121212] leading-[1.35] font-light max-w-[1100px] mx-auto min-h-[110px] md:min-h-[170px] lg:min-h-[200px] gsap-hero-title-split _gsap-ready whitespace-pre-line"
              aria-label={STATEMENT_TEXT.replace(/\n/g, " ")}
            >
              {typedText}
              {typedText.length < STATEMENT_TEXT.length && (
                <span className="inline-block w-[1.5px] h-8 bg-gh-gold ml-1 align-middle animate-pulse">
                  |
                </span>
              )}
            </h4>

            <div className="mt-4">
              <Link
                to="/pages/about-us"
                className="font-assistant text-xs md:text-[13px] font-semibold uppercase tracking-[0.2em] text-gh-gold transition-all duration-300 hover:text-opacity-80 relative"
              >
                <span className="inline-flex items-center gap-1.5 pb-1.5 border-b border-gh-gold">
                  SINCE 1965
                  <span className="text-[10px]">&gt;</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div
          id="HeroMediaBackground-template--24699078279507__hero_media_background_wLkGTa"
          className="hero-media-background relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden"
        >

          <div className="hero-media-background__media hero-media-background__image absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://gourmethouse.com/cdn/shop/files/home_shop_hero.png?v=1764017510&width=1500"
              alt="Caviar Shop"
              className="w-full h-full object-cover will-change-transform"
              style={{ transform: `translateY(${bgTranslateY}px) scale(1.15)`, transition: 'transform 100ms ease-out' }}
            />
          </div>

          <div className="hero-media-background__overlay absolute inset-0 bg-black/5 z-10"></div>

          <div 
            className="hero-media-background__container relative z-20 max-w-4xl px-6 flex flex-col items-center text-center gap-6 will-change-transform"
            style={{ transform: `translateY(${contentTranslateY}px)`, transition: 'transform 100ms ease-out' }}
          >
            <div className="hero-media-background__content flex flex-col items-center gap-6">
              <h6 className="hero-media-background__eyebrow font-assistant text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5a059]">
                Caviar
              </h6>

              <h2
                className="hero-media-background__title font-ivy text-[36px] md:text-[54px] lg:text-[60px] text-white leading-[1.25] font-light max-w-3xl mx-auto gsap-hero-title-split _gsap-ready"
                aria-label="Never apologize for wanting more."
              >
                Never apologize for <br /> wanting more.
              </h2>

              <div className="hero-media-background__link mt-4">
                <Link
                  to="/collections/all"
                  className="font-assistant text-xs md:text-[13px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:text-opacity-80 relative"
                >
                  <span className="inline-flex items-center gap-1.5 pb-1.5 border-b border-white">
                    INDULGE A LITTLE
                    <span className="text-[10px]">&gt;</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}



