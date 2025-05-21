import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Leer del localStorage al iniciar
    const initialCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const [cartItems, setCartItems] = useState(initialCart);

    // Guardar en localStorage cada vez que el carrito cambia
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (producto) => {
        setCartItems((prev) => {
            const existe = prev.find((item) => item.id === producto.id);
            if (existe) {
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...prev, { ...producto, cantidad: 1 }];
            }
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const decreaseQuantity = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, cantidad: Math.max(item.cantidad - 1, 1) }
                    : item
            )
        );
    };

    const increaseQuantity = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, cantidad: Math.min(item.cantidad + 1, 99) }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeFromCart, decreaseQuantity, increaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
