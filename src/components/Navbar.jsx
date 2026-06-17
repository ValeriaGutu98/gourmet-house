import { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";

const LOGO_URL =
  "https://gourmethouse.com/cdn/shop/files/ghc-logo-gold.png?v=1763673785&width=180";

const REGIONS = [{ label: "Europe", currency: "€" }];

export default function Navbar() {
  const [regionOpen, setRegionOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-black/5 select-none">
      <header className="mx-auto grid h-[75px] max-w-full grid-cols-[1fr_auto_1fr] items-center px-6">

        <div className="flex items-center">
          <button
            type="button"
            className="group flex items-center gap-2.5 text-gh-brown transition-all hover:opacity-80 outline-none"
            aria-label="Menu"
          >
            <span className="flex flex-col gap-[4px] w-5 justify-center items-start">
              <span className="w-full h-[1.5px] bg-[#121212]"></span>
              <span className="w-[12px] h-[1.5px] bg-[#121212] group-hover:w-full transition-all duration-300"></span>
            </span>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[3px] text-gh-dark">
              Menu
            </span>
          </button>
        </div>

  
        <div className="flex justify-center">
          <a href="/" className="block outline-none focus-visible:outline-none">
            <img
              src={LOGO_URL}
              alt="Gourmet House"
              width={65}
              height={65}
              className="h-[65px] w-[65px] object-contain"
            />
          </a>
        </div>


        <div className="flex items-center justify-end gap-5 text-gh-dark">

          <a
            href="/cart"
            className="flex items-center justify-center transition-opacity hover:opacity-80"
            aria-label="Cart"
          >
            <MdOutlineShoppingBag size={18} className="text-gh-dark" />
          </a>


          <div className="relative flex items-center">
            <button
              type="button"
              className="flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-[1.5px] text-gh-dark transition-all hover:opacity-80"
              onClick={() => setRegionOpen(!regionOpen)}
              aria-expanded={regionOpen}
            >
              <span>EUR</span>
              <span className="text-[7px] text-gh-dark/60">▼</span>
            </button>

            {regionOpen && (
              <ul
                className="absolute right-0 top-full z-50 mt-2 min-w-[120px] overflow-hidden border border-black/10 bg-white py-1.5 shadow-lg text-gh-dark"
                role="listbox"
              >
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-1.5 text-left font-sans text-xs hover:bg-black/5"
                    onClick={() => setRegionOpen(false)}
                  >
                    <span>Europe (EUR)</span>
                    <span className="text-black/50">€</span>
                  </button>
                </li>
              </ul>
            )}
          </div>


          <span className="font-sans text-[11px] font-semibold text-gh-dark select-none">
            €
          </span>


          <button
            type="button"
            className="flex items-center justify-center transition-opacity hover:opacity-80"
            aria-label="Search"
          >
            <CiSearch size={20} className="text-gh-dark" />
          </button>
        </div>
      </header>
    </div>
  );
}
