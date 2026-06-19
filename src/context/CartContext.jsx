import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("gourmet_house_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("gourmet_house_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, variant, quantity) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.variant.id === variant.id
      );

      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      }

      return [...prevItems, { product, variant, quantity }];
    });

    setLastAddedItem({ product, variant, quantity });
    setIsToastOpen(true);
  };

  const removeFromCart = (productId, variantId) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && item.variant.id === variantId)
      )
    );
  };

  const updateQuantity = (productId, variantId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.variant.id === variantId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const closeToast = () => setIsToastOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isToastOpen,
        lastAddedItem,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItemsCount,
        cartTotal,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
