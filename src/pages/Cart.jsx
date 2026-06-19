import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const subtotalFormatted = `€${cartTotal.toFixed(2).replace(".", ",")}`;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-12 py-12 md:py-20 flex flex-col">
        {cartItems.length === 0 ? (

          <div className="flex-grow flex flex-col items-center justify-start text-center py-20">
            <h1 className="font-ivy text-[48px] sm:text-[68px] font-light text-[#121212] tracking-normal mt-16 md:mt-24 mb-6 leading-tight">
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
          </div>
        ) : (

          <div className="flex flex-col w-full">
            {/* Header row */}
            <div className="flex items-end justify-between border-b border-black/5 pb-8 mb-12">
              <h1 className="font-ivy text-[34px] sm:text-[44px] md:text-[50px] font-light text-[#121212] tracking-wide leading-none uppercase">
                Your cart
              </h1>
              <Link
                to="/collections/all"
                className="font-assistant text-xs font-semibold uppercase tracking-[2px] text-[#121212] underline underline-offset-[6px] decoration-[0.5px] hover:text-gh-gold transition-colors duration-300"
              >
                Continue Shopping &gt;
              </Link>
            </div>


            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] border-b border-black/5 pb-3 mb-6 font-assistant text-[11px] font-semibold uppercase tracking-[2px] text-[#121212]/60">
              <div>Product</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>


            <div className="divide-y divide-black/5 border-b border-black/5 mb-12">
              {cartItems.map((item) => {
                const { product, variant, quantity } = item;
                const imageUrl = product.images?.[0] || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800";
                const variantPriceFormatted = `€${variant.price.toFixed(2).replace(".", ",")}`;
                const itemTotalFormatted = `€${(variant.price * quantity).toFixed(2).replace(".", ",")}`;

                return (
                  <div key={`${product.id}-${variant.id}`} className="py-8 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] items-center gap-6">
                    

                    <div className="flex gap-6 items-center">
                      <div className="w-[100px] h-[100px] bg-[#f9f6f0] overflow-hidden flex-shrink-0">
                        <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col items-start">
                        <h3 className="font-assistant text-sm font-semibold uppercase tracking-[1.5px] text-[#121212] mb-1">
                          {product.title}
                        </h3>
                        <span className="font-sans text-[13px] text-[#121212]/80 mb-2">
                          {variantPriceFormatted}
                        </span>
                        <span className="font-assistant text-xs text-[#121212]/50 font-light">
                          Size: {variant.weight}
                        </span>
                      </div>
                    </div>


                    <div className="flex items-center justify-start md:justify-center gap-4">
                      <div className="flex items-center gap-4 text-xs font-assistant font-light text-[#121212]/70 border border-black/10 px-3 py-1.5 bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, variant.id, quantity - 1)}
                          className="p-0.5 hover:text-black transition-colors font-semibold"
                        >
                          &minus;
                        </button>
                        <span className="w-4 text-center font-medium text-black">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, variant.id, quantity + 1)}
                          className="p-0.5 hover:text-black transition-colors font-semibold"
                        >
                          &#43;
                        </button>
                      </div>


                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id, variant.id)}
                        className="text-[#121212]/50 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>


                    <div className="text-left md:text-right font-sans text-sm font-semibold text-[#121212]">
                      <span className="md:hidden text-[11px] font-assistant uppercase tracking-[1px] text-[#121212]/50 mr-2 font-normal">Total:</span>
                      {itemTotalFormatted}
                    </div>

                  </div>
                );
              })}
            </div>


            <div className="flex flex-col items-end gap-5 ml-auto w-full max-w-md">
              <div className="flex justify-between items-baseline w-full">
                <span className="font-assistant text-xs font-semibold uppercase tracking-[1.5px] text-[#121212]/80">Estimated total</span>
                <span className="font-sans text-[18px] font-bold text-[#121212]">{subtotalFormatted} EUR</span>
              </div>

              <p className="font-assistant text-[11px] md:text-xs text-[#121212]/60 font-light text-right leading-relaxed max-w-[340px]">
                Taxes included. Discounts and <span className="underline cursor-pointer">shipping</span> calculated at checkout.
              </p>

              <button
                type="button"
                className="w-full bg-[#121212] text-white font-assistant text-[11px] font-semibold uppercase tracking-[3px] py-4 text-center hover:bg-[#c5a059] transition-colors duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                CHECK OUT &gt;
              </button>
            </div>

          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
