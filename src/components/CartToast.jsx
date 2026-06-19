import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartToast() {
  const { isToastOpen, lastAddedItem, totalItemsCount, closeToast } = useCart();

  if (!isToastOpen || !lastAddedItem) return null;

  const { product, variant, quantity } = lastAddedItem;
  const imageUrl = product.images?.[0] || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800";
  const displayPrice = `€${variant.price.toFixed(2).replace(".", ",")}`;

  return (
    <div className="fixed top-[85px] right-6 md:right-12 z-50 bg-white border border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.1)] w-[90%] max-w-[380px] p-6 animate-fade-in-down select-none">
      

      <div className="flex items-center justify-between mb-4">
        <span className="font-assistant text-[10px] md:text-[11px] font-semibold uppercase tracking-[2px] text-gh-dark flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-[#121212]">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Item added to your cart
        </span>
        <button
          type="button"
          onClick={closeToast}
          className="text-[#121212]/60 hover:text-black transition-colors"
          aria-label="Close notification"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>


      <div className="flex gap-4 mb-6">
        <div className="w-[70px] h-[70px] bg-[#f9f6f0] flex-shrink-0 overflow-hidden">
          <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col pt-1">
          <h4 className="font-assistant text-xs font-semibold uppercase tracking-[1.5px] text-gh-dark mb-1">
            {product.title}
          </h4>
          <span className="font-sans text-[13px] text-[#121212] mb-1">
            {displayPrice}
          </span>
          <span className="font-assistant text-[11px] text-[#121212]/60 font-light">
            {variant.weight} &times; {quantity}
          </span>
        </div>
      </div>


      <div className="flex justify-end">
        <Link
          to="/cart"
          onClick={closeToast}
          className="font-assistant text-[11px] font-semibold uppercase tracking-[2px] text-gh-dark underline underline-offset-[6px] decoration-[0.5px] hover:text-gh-gold transition-colors duration-300"
        >
          View Cart ({totalItemsCount}) &gt;
        </Link>
      </div>

    </div>
  );
}
