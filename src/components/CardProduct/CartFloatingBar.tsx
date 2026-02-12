import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/Cart/CartContext';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import './CartFloatingBar.css';

export default function CartFloatingBar() {
    // Adicionamos valores padrão (= 0) na desestruturação para evitar undefined
    const { cartCount = 0, cartTotal = 0 } = useCart();
    const navigate = useNavigate();

    // Se o carrinho estiver vazio ou indefinido, não renderiza nada
    if (!cartCount || cartCount === 0) return null;

    const formatCurrency = (value: number) => {
        // Verificação de segurança extra
        if (value === undefined || value === null) return 'R$ 0,00';
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="cart-floating-bar" onClick={() => navigate('/carrinho')}>
            <div className="cart-info">
                <div className="cart-count-badge">{cartCount}</div>
                <span className="cart-text">Ver sacola</span>
            </div>
            <div className="cart-total">
                {formatCurrency(cartTotal)}
                <ShoppingBagIcon style={{ fontSize: 18, marginLeft: 8 }} />
            </div>
        </div>
    );
}