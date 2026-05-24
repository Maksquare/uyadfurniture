'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate Total Items in Cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate Total Price dynamically
  const totalPrice = cart.reduce((acc, item) => {
    // Strips away "Birr", commas, and whitespace to extract raw numbers for math calculations
    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + (numericPrice * item.quantity);
  }, 0);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  // Generate customized WhatsApp payload message string block
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = `*Hello UYAD Furniture, I would like to place an order!*\n\n`;
    message += `─── *ORDER BREAKDOWN* ───\n`;
    
    cart.forEach((item, idx) => {
      message += `${idx + 1}. *${item.name}* [${item.id}]\n`;
      message += `   Qty: ${item.quantity} x ${item.price}\n`;
      message += `   Lead Time: ${item.specs.leadTime}\n\n`;
    });

    message += `───────────────────\n`;
    message += `*Total Unique Items:* ${cart.length}\n`;
    message += `*Estimated Grand Total:* Birr ${totalPrice.toLocaleString()}\n\n`;
    message += `Please confirm availability and showroom processing steps. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/251912345678?text=${encodedMessage}`, '_blank');
  };

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      handleWhatsAppCheckout
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be wrapped within a CartProvider');
  return context;
}