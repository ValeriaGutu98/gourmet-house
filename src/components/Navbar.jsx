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
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <header className="mx-auto grid h-[75px] max-w-full grid-cols-[1fr_auto_1fr] items-center px-3">

        <div className="flex items-center">
          <button
            type="button"
            className="group flex h-[38px] items-center text-gh-brown transition-opacity hover:opacity-80"
            aria-label="Menu"
          >
            <span className="relative inline-flex items-center">
              <span className="flex h-8 w-8 items-center justify-center">
                <HiOutlineMenuAlt4 size={20} />
              </span>
              <span className="absolute left-[50px] top-1/2 -translate-y-1/2 font-futura text-[13px] font-medium uppercase leading-[15.6px] tracking-[2.4px]">
                Menu
              </span>
            </span>
          </button>
        </div>


        <div className="flex justify-center">
          <a href="/" className="block outline-none focus-visible:outline-none">
            <img
              src={LOGO_URL}
              alt="Gourmet House"
              width={60}
              height={60}
              className="h-[60px] w-[60px] object-contain"
            />
          </a>
        </div>


        <div className="flex items-center justify-end gap-1 text-gh-brown">

          <a
            href="/cart"
            className="flex h-[38px] w-[38px] items-center justify-center transition-opacity hover:opacity-80"
            aria-label="Cart"
          >
            <MdOutlineShoppingBag size={20} />
          </a>

   
          <div className="relative">
            <button
              type="button"
              className="flex h-[38px] items-center gap-1 pl-3 pr-[22px] font-inter text-sm font-medium uppercase tracking-[2.4px] text-gh-dark transition-all hover:underline"
              onClick={() => setRegionOpen(!regionOpen)}
              aria-expanded={regionOpen}
              aria-haspopup="listbox"
            >
              <span>{selectedRegion.label}</span>
              <IoMdCheckmark size={14} />
            </button>


            {regionOpen && (
              <ul
                className="absolute right-0 top-full z-50 mt-1 min-w-[200px] overflow-hidden border border-black/10 bg-white py-2 shadow-lg"
                role="listbox"
              >
                {REGIONS.map((region) => (
                  <li key={region.label}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selectedRegion.label === region.label}
                      className="flex w-full items-center justify-between px-4 py-2.5 text-left font-inter text-sm transition-colors hover:bg-black/5"
                      onClick={() => {
                        setSelectedRegion(region);
                        setRegionOpen(false);
                      }}
                    >
                      <span>{region.label}</span>
                      <span className="text-black/60">{region.currency}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>


          <button
            type="button"
            className="flex h-[38px] w-[38px] items-center justify-center transition-opacity hover:opacity-80"
            aria-label="Search"
          >
            <CiSearch size={22} />
          </button>
        </div>
      </header>
    </div>
  );
}
