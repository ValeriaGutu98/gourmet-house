import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-start pt-16 pb-24 px-6 w-full text-center">
        <h1 className="font-ivy text-[48px] md:text-[68px] font-light text-[#121212] tracking-normal mt-16 md:mt-24 mb-6 leading-tight">
          Your cart is empty
        </h1>
        
        <Link
          to="/collections/all"
          className="font-sans text-[11px] font-semibold uppercase tracking-[2px] text-gh-dark underline underline-offset-[8px] decoration-[0.5px] hover:text-gh-gold transition-colors duration-300 mb-20 md:mb-24"
        >
          CONTINUE SHOPPING &gt;
        </Link>

        <div className="flex flex-col items-center">
          <h2 className="font-assistant text-[11px] font-semibold uppercase tracking-[3px] text-[#121212] mb-2.5">
            HAVE AN ACCOUNT?
          </h2>
          <p className="font-assistant text-[13px] text-[#121212]/60 font-light">
            <Link to="#" className="font-bold text-[#121212] hover:text-gh-gold transition-colors duration-300">Log in</Link> to check out faster.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

