import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/Cart/CartContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'; 
import './Cart.css';

export default function Cart() {
    const { cart, cartTotal, updateQuantity } = useCart();
    const navigate = useNavigate();

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="cart-page-container">
            <div className="cart-header">
                <button onClick={() => navigate('/')} className="back-button">
                    <ArrowBackIcon />
                </button>
                <h1>Sua Sacola</h1>
            </div>

            <div className="cart-items-list">
                {cart.length > 0 ? (
                    cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.imageUrl} alt={item.name} className="cart-thumb" />
                            <div className="cart-item-info">
                                <span className="item-name">{item.name}</span>
                                <span className="item-price">{formatCurrency(item.price)}</span>
                            </div>
                            <div className="cart-qty-control">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-cart">
                        <p>Sua sacola está vazia :(</p>
                    </div>
                )}
            </div>

            <div className="add-more-container" onClick={() => navigate('/')}>
                <span className="add-more-text">Adicionar mais itens</span>
                <AddIcon className="add-more-icon" />
            </div>

            {cart.length > 0 && (
                <div className="cart-footer-fixed">
                    <div className="cart-summary">
                        <span>Total</span>
                        <span className="total-value">{formatCurrency(cartTotal)}</span>
                    </div>
                    <button
                        className="checkout-btn"
                        onClick={() => navigate('/checkout')}
                    >
                        Finalizar Pedido
                    </button>
                </div>
            )}
        </div>
    );
}