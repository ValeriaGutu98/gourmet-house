import { Link } from "react-router-dom";

const LOGO_URL =
  "https://gourmethouse.com/cdn/shop/files/ghc-logo-gold.png?v=1763673785&width=180";

export default function Footer() {
  const handlePreventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-gh-dark text-white select-none pt-16 pb-10 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 items-start">
  
          <div className="md:col-span-1">
            <Link to="/" className="inline-block outline-none">
              <img
                src={LOGO_URL}
                alt="Gourmet House Caviar"
                width={80}
                height={80}
                className="h-20 w-20 object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>


          <div className="flex flex-col gap-4">
            <h5 className="font-assistant text-[12px] font-semibold uppercase tracking-[3px] text-gh-gold">
              Explore
            </h5>
            <ul className="flex flex-col gap-2.5 font-assistant text-[13px] text-white/70 font-light">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pages/about-us" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/collections/all" className="hover:text-white transition-colors">
                  Our Shop
                </Link>
              </li>
              <li>
                <Link to="/pages/contact-us" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>


          <div className="flex flex-col gap-4">
            <h5 className="font-assistant text-[12px] font-semibold uppercase tracking-[3px] text-gh-gold">
              Shop
            </h5>
            <ul className="flex flex-col gap-2.5 font-assistant text-[13px] text-white/70 font-light">
              <li>
                <Link
                  to="/collections/all"
                  state={{ category: "From the sea" }}
                  className="hover:text-white transition-colors"
                >
                  From the Sea
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all"
                  state={{ category: "From the land" }}
                  className="hover:text-white transition-colors"
                >
                  From the Land
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all"
                  state={{ category: "Gifts and Others" }}
                  className="hover:text-white transition-colors"
                >
                  Gifts and Others
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all"
                  state={{ category: "Gifts and Others" }}
                  className="hover:text-white transition-colors"
                >
                  Health Products
                </Link>
              </li>
            </ul>
          </div>


          <div className="flex flex-col gap-4">
            <h5 className="font-assistant text-[12px] font-semibold uppercase tracking-[3px] text-gh-gold">
              Concierge
            </h5>
            <ul className="flex flex-col gap-2.5 font-assistant text-[13px] text-white/70 font-light">
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <a
                  href="#my-account"
                  onClick={handlePreventDefault}
                  className="hover:text-white transition-colors cursor-default"
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="#privacy-policy"
                  onClick={handlePreventDefault}
                  className="hover:text-white transition-colors cursor-default"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>


          <div className="flex flex-col gap-4">
            <h5 className="font-assistant text-[12px] font-semibold uppercase tracking-[3px] text-gh-gold">
              Socials
            </h5>
            <ul className="flex flex-col gap-2.5 font-assistant text-[13px] text-white/70 font-light">
              <li>
                <a
                  href="https://www.instagram.com/gourmethousedeli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/gourmethousecaviar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>


        <div className="border-t border-white/5 pt-8 flex items-center justify-between text-white/40 font-assistant text-xs font-light">
          <span>&copy; {new Date().getFullYear()} Gourmet House</span>
        </div>
      </div>
    </footer>
  );
}
