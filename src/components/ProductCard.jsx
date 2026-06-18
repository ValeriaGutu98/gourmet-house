import { useState } from "react";

export default function ProductCard({ product }) {
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
    product_variants = [],
  } = product;

  // Set the default selected variant to the first variant or a fallback
  const [selectedVariant, setSelectedVariant] = useState(
    product_variants[0] || { id: "default", weight: "50g", price: 0 }
  );

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const primaryImage = images[0] || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800";
  const secondaryImage = images[1] || null;

  const handleAddToBag = () => {
    setAddingToCart(true);
    setTimeout(() => {
      setAddingToCart(false);
      alert(`Added ${title} (${selectedVariant.weight}) to bag!`);
    }, 800);
  };

  return (
    <div className="group flex flex-col bg-white overflow-hidden rounded-sm select-none transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] p-4 border border-black/5">
      <div className="relative aspect-square w-full overflow-hidden bg-gh-sand/50 rounded-sm mb-5 cursor-pointer">
        <img
          src={primaryImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
        />
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${title} alternative`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105"
          />
        )}
        {category && (
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[1.5px] text-gh-gold border border-black/5 rounded-sm">
            {category}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="font-ivy text-[20px] md:text-[22px] font-light text-gh-dark tracking-wide uppercase">
            {title}
          </h3>
          <span className="font-sans text-[16px] font-semibold text-gh-brown shrink-0">
            €{selectedVariant.price ? selectedVariant.price.toFixed(2) : "0.00"}
          </span>
        </div>

        <p className="font-assistant text-xs italic text-gh-dark/50 mb-4 font-light">
          {species}
        </p>

        {product_variants.length > 0 && (
          <div className="mb-4">
            <span className="block font-assistant text-[10px] uppercase tracking-[1.5px] text-gh-dark/40 mb-2">
              Select Weight:
            </span>
            <div className="flex flex-wrap gap-2">
              {product_variants.map((variant) => {
                const isSelected = selectedVariant.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[1px] border transition-all duration-300 rounded-sm ${
                      isSelected
                        ? "bg-gh-dark text-white border-gh-dark"
                        : "bg-transparent text-gh-dark/80 border-black/10 hover:border-gh-dark hover:text-gh-dark"
                    }`}
                  >
                    {variant.weight}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="border-t border-black/5 pt-3 mt-auto">
          <button
            type="button"
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="flex items-center justify-between w-full font-assistant text-[10px] font-semibold uppercase tracking-[2px] text-gh-gold transition-opacity hover:opacity-80"
          >
            <span>{detailsOpen ? "Hide Specifications" : "Specifications"}</span>
            <span className="text-[8px] transform transition-transform duration-300">
              {detailsOpen ? "▲" : "▼"}
            </span>
          </button>

          {detailsOpen && (
            <div className="mt-3 text-[11px] text-gh-dark/75 space-y-1.5 leading-relaxed transition-all duration-300">
              {origin && (
                <div className="flex justify-between border-b border-black/5 pb-1">
                  <span className="text-gh-dark/50">Origin</span>
                  <span className="font-semibold text-gh-dark">{origin}</span>
                </div>
              )}
              {pearl_size && (
                <div className="flex justify-between border-b border-black/5 pb-1">
                  <span className="text-gh-dark/50">Pearl Size</span>
                  <span className="font-semibold text-gh-dark">{pearl_size}</span>
                </div>
              )}
              {appearance && (
                <div className="flex flex-col gap-0.5 border-b border-black/5 pb-1">
                  <span className="text-gh-dark/50">Appearance</span>
                  <span className="font-light text-gh-dark text-[10.5px]">{appearance}</span>
                </div>
              )}
              {taste && (
                <div className="flex flex-col gap-0.5 border-b border-black/5 pb-1">
                  <span className="text-gh-dark/50">Taste Notes</span>
                  <span className="font-light text-gh-dark text-[10.5px]">{taste}</span>
                </div>
              )}
              {texture && (
                <div className="flex flex-col gap-0.5 pb-0.5">
                  <span className="text-gh-dark/50">Texture</span>
                  <span className="font-light text-gh-dark text-[10.5px]">{texture}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToBag}
        className="w-full mt-4 bg-gh-dark hover:bg-gh-gold text-white text-[11px] font-semibold uppercase tracking-[3px] py-3 transition-colors duration-300 rounded-sm"
      >
        {addingToCart ? "Adding..." : "Add to Bag"}
      </button>
    </div>
  );
}
