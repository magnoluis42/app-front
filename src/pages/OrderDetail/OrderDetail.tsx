import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarDefault from '../../components/Navbar/NavbarDefault';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './OrderDetail.css';

interface OrderStep {
    title: string;
    time: string;
    completed: boolean;
}

interface OrderItemProduct {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

interface OrderDetailsData {
    id: string;
    status: 'preparing' | 'shipping' | 'completed' | 'cancelled';
    items: OrderItemProduct[];
    steps: OrderStep[];
    address: string;
    subtotal: number;
    deliveryFee: number;
    total: number;
}

export default function OrderDetail() {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const orderDetails: OrderDetailsData = {
        id: id || '1023',
        status: 'shipping', 
        items: [
            {
                id: 1,
                name: "Pudim Tradicional (Fatia)",
                quantity: 1,
                price: 14.90,
                image: "https://images.unsplash.com/photo-1734671243492-ca8794297239?q=80&w=687&auto=format&fit=crop"
            },
            {
                id: 2,
                name: "Coca-Cola Zero 350ml",
                quantity: 1,
                price: 6.00,
                image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1160&auto=format&fit=crop"
            }
        ],
        steps: [
            { title: 'Pedido Confirmado', time: '14:30', completed: true },
            { title: 'Preparando seu pedido', time: '14:35', completed: true },
            { title: 'Saiu para entrega', time: '15:10', completed: true }, 
            { title: 'Entregue', time: '--:--', completed: false },
        ],
        address: "Rua das Flores, 123 - Centro, São Luís - MA",
        subtotal: 20.90,
        deliveryFee: 5.00,
        total: 25.90
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="detail-container">
            <div className="detail-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    <ArrowBackIcon />
                </button>
                <h1 className="detail-title">Pedido #{orderDetails.id}</h1>
            </div>

            <div className="detail-section">
                <div className="section-label">Acompanhamento</div>
                <div className="status-timeline">
                    {orderDetails.steps.map((step, index) => (
                        <div key={index} className="timeline-step">
                            <div className={`step-dot ${step.completed ? 'active' : ''}`}></div>
                            <div className="step-content">
                                <h4 style={{ opacity: step.completed ? 1 : 0.5 }}>{step.title}</h4>
                                <p>{step.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="detail-section">
                <div className="section-label">Itens do Pedido</div>
                {orderDetails.items.map(item => (
                    <div key={item.id} className="item-row">
                        <img src={item.image} alt={item.name} className="item-thumb" />
                        <div className="item-info">
                            <span className="item-name">{item.name}</span>
                            <span className="item-meta">{item.quantity}x unidade(s)</span>
                        </div>
                        <div className="item-price">
                            {formatCurrency(item.price * item.quantity)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="detail-section">
                <div className="section-label">Endereço de Entrega</div>
                <p style={{ margin: 0, color: 'var(--color-text-light)', lineHeight: 1.5 }}>
                    {orderDetails.address}
                </p>
            </div>

            <div className="detail-section">
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{formatCurrency(orderDetails.subtotal)}</span>
                </div>
                <div className="summary-row">
                    <span>Taxa de entrega</span>
                    <span>{formatCurrency(orderDetails.deliveryFee)}</span>
                </div>
                <div className="summary-row total">
                    <span>Total</span>
                    <span className="total-value">{formatCurrency(orderDetails.total)}</span>
                </div>

                <button className="help-button">
                    Preciso de ajuda
                </button>
            </div>

            <NavbarDefault />
        </div>
    );
}