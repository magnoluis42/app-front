import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarDefault from '../../components/Navbar/NavbarDefault';
import './Order.css';

interface OrderItem {
    id: number;
    status: 'preparing' | 'shipping' | 'completed' | 'cancelled';
    date: string;
    itemsDescription: string;
    total: number;
}

export default function Order() {
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

    const allOrders: OrderItem[] = [
        {
            id: 1023,
            status: 'preparing',
            date: 'Hoje, 14:30',
            itemsDescription: '1x Pudim Tradicional (Fatia)',
            total: 14.90
        },
        {
            id: 1022,
            status: 'shipping',
            date: 'Hoje, 13:15',
            itemsDescription: '2x Pudim de Chocolate',
            total: 32.00
        },
        {
            id: 980,
            status: 'completed',
            date: '10/12/2023',
            itemsDescription: '1x Pudim Família (1kg)',
            total: 65.00
        },
        {
            id: 850,
            status: 'cancelled',
            date: '05/11/2023',
            itemsDescription: '3x Pudim Individual',
            total: 45.00
        }
    ];

    const filteredOrders = allOrders.filter(order => {
        if (activeTab === 'active') {
            return order.status === 'preparing' || order.status === 'shipping';
        } else {
            return order.status === 'completed' || order.status === 'cancelled';
        }
    });

    const translateStatus = (status: string) => {
        switch(status) {
            case 'preparing': return 'Preparando';
            case 'shipping': return 'A caminho';
            case 'completed': return 'Entregue';
            case 'cancelled': return 'Cancelado';
            default: return status;
        }
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="orders-container">
            <h1 className="page-title">Meus Pedidos</h1>

            <div className="status-toggle">
                <button 
                    className={`toggle-option ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => setActiveTab('active')}
                >
                    Em andamento
                </button>
                <button 
                    className={`toggle-option ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    Finalizados
                </button>
            </div>

            <div className="orders-list">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <div 
                            key={order.id} 
                            className="order-card"
                            onClick={() => navigate(`/pedidos/${order.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="order-header">
                                <span>#{order.id}</span>
                                <span>{order.date}</span>
                            </div>
                            
                            <div className="order-body">
                                <div>
                                    <h3 className="order-items-title">Pedido #{order.id}</h3>
                                    <p className="order-quantity">{order.itemsDescription}</p>
                                </div>
                                <span className={`status-badge ${order.status}`}>
                                    {translateStatus(order.status)}
                                </span>
                            </div>

                            <div className="order-footer">
                                <span className="order-total">
                                    {formatCurrency(order.total)}
                                </span>
                                <small style={{color: '#795548', fontWeight: 600}}>Detalhes</small>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">🍽️</div>
                        <h3>Nenhum pedido aqui</h3>
                        <p>Você não tem pedidos nesta categoria.</p>
                    </div>
                )}
            </div>

            <NavbarDefault />
        </div>
    );
}