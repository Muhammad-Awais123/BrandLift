// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // {id, title, price, qty, icon}

  const addToCart = (product) => {
    setItems((prev) => {
      const found = prev.find((p) => p.title === product.title);
      if (found) {
        return prev.map((p) =>
          p.title === product.title ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (title) => {
    setItems((prev) => prev.filter((p) => p.title !== title));
  };

  const updateQty = (title, qty) => {
    if (qty <= 0) {
      removeFromCart(title);
      return;
    }
    setItems((prev) => prev.map((p) => (p.title === title ? { ...p, qty } : p)));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((acc, cur) => acc + Number(cur.price) * cur.qty, 0);

  const count = items.reduce((acc, cur) => acc + cur.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
};
