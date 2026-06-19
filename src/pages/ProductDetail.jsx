import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchProductById } from "../services/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const { data, error } = await fetchProductById(id);
        if (error || !data) {
          setError(error || "Product not found.");
        } else {
          setProduct(data);
          if (data.product_variants && data.product_variants.length > 0) {
            setSelectedVariant(data.product_variants[0]);
          }
        }
      } catch (err) {
        setError(err.message || "An error occurred loading the product.");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const handlePrevImage = () => {
    if (!product || !product.images || product.images.length === 0) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!product || !product.images || product.images.length === 0) return;
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    addToCart(product, selectedVariant, quantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans select-none">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-gh-gold border-t-transparent rounded-full animate-spin"></div>
            <p className="font-assistant text-xs uppercase tracking-[2px] text-[#121212]/60">Loading Details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans select-none">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center py-24 px-6 text-center max-w-md mx-auto">
          <p className="text-red-500 font-semibold mb-2">Error Loading Product</p>
          <p className="text-xs text-gh-dark/60 mb-6">{error || "Product not found."}</p>
          <Link
            to="/collections/all"
            className="bg-gh-dark text-white text-[11px] uppercase tracking-[2px] font-semibold px-6 py-2.5 hover:bg-gh-gold transition-colors duration-300 rounded-sm"
          >
            Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const {
    title,
    category,
    origin,
    species,
    pearl_size,
    appearance,
    taste,
    texture,
    images = [],
    product_variants = []
  } = product;

  const currentImage = images[currentImageIndex] || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800";
  const categoryLabel = category && category.toLowerCase().includes("sea") ? "CAVIAR" : (category ? category.toUpperCase() : "CAVIAR");
  const currentPrice = selectedVariant ? selectedVariant.price : 0;
  const totalPriceFormatted = `€${(currentPrice * quantity).toFixed(2).replace(".", ",")}`;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      <Navbar />

      <main className="flex-grow flex flex-col pb-24">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="relative w-full aspect-square bg-[#f9f6f0] overflow-hidden group">
              <img
                src={currentImage}
                alt={title}
                className="w-full h-full object-cover transition-all duration-[600ms] ease-out"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black w-10 h-10 flex items-center justify-center cursor-pointer shadow-md transition-colors z-10 opacity-0 group-hover:opacity-100 duration-300"
                    aria-label="Previous image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black w-10 h-10 flex items-center justify-center cursor-pointer shadow-md transition-colors z-10 opacity-0 group-hover:opacity-100 duration-300"
                    aria-label="Next image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-col items-start pt-2">
              <h6 className="font-assistant text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5a059] mb-2 leading-none">
                {categoryLabel}
              </h6>

              <h1 className="font-ivy text-[34px] sm:text-[44px] text-[#121212] leading-tight font-light mb-6 uppercase tracking-wider">
                {title}
              </h1>

              <div className="space-y-3.5 text-xs md:text-[13px] leading-relaxed text-[#121212]/80 font-assistant font-light tracking-wide mb-8">
                <p className="text-black font-normal">
                  {origin} &middot; <span className="italic">{species}</span>
                </p>
                {pearl_size && <p>Pearl size {pearl_size}</p>}
                {appearance && <p>{appearance}</p>}
                {taste && <p>{taste}</p>}
                {texture && <p>{texture}</p>}
              </div>

              <div className="flex items-center gap-8 mb-7 w-full max-w-sm">
                {product_variants.length > 0 && (
                  <div className="relative border-b border-black/10 pb-2 w-48">
                    <select
                      value={selectedVariant ? selectedVariant.id : ""}
                      onChange={(e) => {
                        const variant = product_variants.find(
                          (v) => v.id === e.target.value,
                        );
                        setSelectedVariant(variant);
                      }}
                      className="w-full bg-transparent font-assistant text-sm font-light text-[#121212] pr-6 outline-none appearance-none cursor-pointer"
                    >
                      {product_variants.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.weight}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#121212]/60">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs font-assistant font-light text-[#121212]/70">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 hover:text-black transition-colors font-semibold"
                  >
                    &minus;
                  </button>
                  <span className="w-4 text-center font-medium text-black">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 hover:text-black transition-colors font-semibold"
                  >
                    &#43;
                  </button>
                </div>
              </div>

              <span className="font-sans text-[16px] font-bold text-[#121212] mb-6">
                {totalPriceFormatted}
              </span>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full max-w-md bg-[#121212] text-white font-assistant text-[11px] font-semibold uppercase tracking-[3px] py-4 text-center hover:bg-[#c5a059] transition-colors duration-300 flex items-center justify-center gap-1.5 cursor-pointer mb-7"
              >
                PLACE IN CART &gt;
              </button>

              <div className="w-full max-w-md border-b border-black/10 pb-4">
                <button
                  type="button"
                  onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                  className="w-full flex items-center justify-between font-assistant text-[11px] font-semibold uppercase tracking-[1.5px] text-[#121212] py-2 hover:opacity-75 transition-opacity"
                >
                  <span>Delivery & Returns</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isDeliveryOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {isDeliveryOpen && (
                  <div className="mt-3 font-assistant text-[12px] text-[#121212]/70 leading-relaxed font-light space-y-2">
                    <p>
                      We take great care in delivering our caviar at peak
                      freshness. All orders are shipped via overnight delivery
                      with temperature-controlled packaging. Once shipped, we
                      are unable to accept returns due to the perishable nature
                      of our products.
                    </p>
                    <p>
                      If your order arrives damaged or incorrect, please contact
                      us within 24 hours of delivery with photos, and we will
                      work to resolve the issue promptly. Your satisfaction is
                      our priority.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
