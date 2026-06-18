import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/products";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const { data, error } = await fetchProducts();
        if (error) {
          setError(error);
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto px-6 py-8">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="flex flex-col bg-white p-4 border border-black/5 animate-pulse rounded-sm"
        >
          <div className="aspect-square bg-black/[0.04] w-full rounded-sm mb-5"></div>
          <div className="flex justify-between items-start gap-4 mb-2">
            <div className="h-6 bg-black/[0.04] w-3/4 rounded-sm"></div>
            <div className="h-6 bg-black/[0.04] w-1/5 rounded-sm"></div>
          </div>
          <div className="h-4 bg-black/[0.04] w-1/2 rounded-sm mb-5"></div>
          <div className="h-8 bg-black/[0.04] w-2/3 rounded-sm mb-5"></div>
          <div className="h-6 bg-black/[0.04] w-1/3 rounded-sm mb-4 mt-auto"></div>
          <div className="h-11 bg-black/[0.04] w-full rounded-sm mt-3"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gh-sand flex flex-col font-sans select-none">
      <Navbar />

      <main className="flex-grow flex flex-col pt-12 pb-24">
        <div className="max-w-4xl mx-auto text-center px-6 mb-12 md:mb-16 flex flex-col items-center gap-4">
          <h6 className="font-assistant text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-gh-gold">
            Heritage Sourcing
          </h6>
          <h1 className="font-ivy text-[38px] sm:text-[48px] md:text-[56px] text-gh-dark leading-tight uppercase font-light tracking-wide">
            The Caviar Collection
          </h1>
          <div className="w-12 h-[1px] bg-gh-gold my-2"></div>
          <p className="font-assistant text-xs md:text-sm text-gh-dark/60 leading-relaxed max-w-2xl font-light">
            Sourced in accordance with the highest Persian standards. Every tin of Gourmet House caviar represents decades of selection, rich texture, and intense mineral flavor profiles.
          </p>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center max-w-md mx-auto">
            <p className="text-red-500 font-semibold mb-2">Error Loading Products</p>
            <p className="text-xs text-gh-dark/60 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gh-dark text-white text-[11px] uppercase tracking-[2px] font-semibold px-6 py-2.5 hover:bg-gh-gold transition-colors duration-300 rounded-sm"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center max-w-md mx-auto">
            <p className="font-ivy text-lg text-gh-dark mb-4">No Caviar Available</p>
            <p className="text-xs text-gh-dark/60">
              We are currently selecting our next harvest. Please check back shortly.
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto w-full px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
