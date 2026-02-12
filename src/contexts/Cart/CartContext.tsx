import React, { createContext, useState, useContext, type ReactNode } from 'react';
import type { Product } from '../../Interface/Product';

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextData {
    cart: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product, quantity: number) => {
        setCart(currentCart => {
            const productExists = currentCart.find(item => item.id === product.id);

            if (productExists) {
                return currentCart.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...currentCart, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(current => current.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart(current => current.map(item => 
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);