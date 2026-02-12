import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/Cart/CartContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import './Checkout.css';

export default function Checkout() {
    const navigate = useNavigate();
    const { cartTotal } = useCart();
    
    const [currentStep, setCurrentStep] = useState(0);

    const [selectedAddress, setSelectedAddress] = useState<number>(1);
    const [paymentType, setPaymentType] = useState<'online' | 'delivery'>('online');
    const [paymentMethod, setPaymentMethod] = useState<string>('pix');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [troco, setTroco] = useState('');

    const addresses = [
        { id: 1, label: 'Minha Casa', detail: 'Rua das Flores, 123 - Centro' },
        { id: 2, label: 'Trabalho', detail: 'Av. Empresarial, 500 - Sala 302' },
    ];

    const onlineMethods = [
        { id: 'pix', label: 'PIX (Aprovação imediata)' },
        { id: 'credit_online', label: 'Cartão de Crédito (Pelo App)' },
    ];

    const deliveryMethods = [
        { id: 'cash', label: 'Dinheiro (Levar troco?)' },
        { id: 'card_delivery', label: 'Cartão (Levamos a maquininha)' },
    ];

    const handleApplyCoupon = () => {
        if (coupon.toUpperCase() === 'BEMVINDO10') {
            setDiscount(cartTotal * 0.10);
            alert('Cupom aplicado: 10% de desconto!');
        } else {
            alert('Cupom inválido');
            setDiscount(0);
        }
    };

    const nextStep = () => {
        if (currentStep < 2) setCurrentStep(curr => curr + 1);
        else handleFinishOrder();
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(curr => curr - 1);
        else navigate('/carrinho');
    };

    const handleFinishOrder = () => {
        alert("Pedido Enviado com Sucesso!");
        navigate('/pedidos');
    };

    const formatCurrency = (value: number) => 
        value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    const renderAddressStep = () => (
        <div className="step-content">
            <h3 className="section-title">Onde vamos entregar?</h3>
            {addresses.map(addr => (
                <div 
                    key={addr.id} 
                    className={`selection-card ${selectedAddress === addr.id ? 'selected' : ''}`}
                    onClick={() => setSelectedAddress(addr.id)}
                >
                    <div className="custom-radio"></div>
                    <div>
                        <div className="card-main-text">{addr.label}</div>
                        <div className="card-sub-text">{addr.detail}</div>
                    </div>
                </div>
            ))}
            <button className="add-new-btn">+ Adicionar novo endereço</button>
        </div>
    );

    const renderPaymentStep = () => (
        <div className="step-content">
            <h3 className="section-title">Cupom de Desconto</h3>
            <div className="coupon-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Ex: BEMVINDO10" 
                    className="coupon-input"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                />
                <button className="coupon-btn" onClick={handleApplyCoupon}>Aplicar</button>
            </div>

            <h3 className="section-title">Como quer pagar?</h3>
            <div className="payment-type-selector">
                <button 
                    className={`type-btn ${paymentType === 'online' ? 'active' : ''}`}
                    onClick={() => { setPaymentType('online'); setPaymentMethod('pix'); }}
                >
                    Pagar Online
                </button>
                <button 
                    className={`type-btn ${paymentType === 'delivery' ? 'active' : ''}`}
                    onClick={() => { setPaymentType('delivery'); setPaymentMethod('card_delivery'); }}
                >
                    Pagar na Entrega
                </button>
            </div>

            <div className="methods-list">
                {(paymentType === 'online' ? onlineMethods : deliveryMethods).map(method => (
                    <div 
                        key={method.id} 
                        className={`selection-card ${paymentMethod === method.id ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod(method.id)}
                    >
                        <div className="custom-radio"></div>
                        <div className="card-main-text" style={{fontSize: '14px'}}>{method.label}</div>
                    </div>
                ))}
            </div>

            {paymentMethod === 'cash' && (
                <div className="troco-wrapper">
                    <input 
                        type="text" 
                        placeholder="Troco para quanto?" 
                        className="coupon-input"
                        value={troco}
                        onChange={(e) => setTroco(e.target.value)}
                    />
                </div>
            )}
        </div>
    );

    const renderReviewStep = () => {
        const selectedAddrObj = addresses.find(a => a.id === selectedAddress);
        const selectedPayObj = [...onlineMethods, ...deliveryMethods].find(p => p.id === paymentMethod);

        return (
            <div className="step-content">
                <h3 className="section-title">Resumo do Pedido</h3>
                
                <div className="review-info-card">
                    <LocationOnIcon className="review-icon" />
                    <div>
                        <div className="review-label">Entregar em:</div>
                        <div className="review-value">{selectedAddrObj?.detail}</div>
                    </div>
                </div>

                <div className="review-info-card">
                    <CreditCardIcon className="review-icon" />
                    <div>
                        <div className="review-label">{paymentType === 'online' ? 'Pagar agora via:' : 'Pagar na entrega via:'}</div>
                        <div className="review-value">{selectedPayObj?.label} {troco && `(Troco p/ ${troco})`}</div>
                    </div>
                </div>

                <div className="final-summary-card">
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>{formatCurrency(cartTotal)}</span>
                    </div>
                    {discount > 0 && (
                        <div className="summary-row discount">
                            <span>Desconto</span>
                            <span>- {formatCurrency(discount)}</span>
                        </div>
                    )}
                    <div className="summary-row">
                        <span>Taxa de entrega</span>
                        <span>R$ 5,00</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span className="total-gold">{formatCurrency(cartTotal - discount + 5)}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="checkout-container">
            <div className="stepper-wrapper">
                <div className="stepper-line-bg"></div>
                <div className="stepper-line-progress" style={{ width: `${currentStep * 50}%` }}></div>

                <div className={`step-item ${currentStep >= 0 ? 'active' : ''}`}>
                    <div className="step-circle">{currentStep > 0 ? <CheckIcon fontSize="small"/> : '1'}</div>
                    <span className="step-label">Entrega</span>
                </div>

                <div className={`step-item ${currentStep >= 1 ? 'active' : ''}`}>
                    <div className="step-circle">{currentStep > 1 ? <CheckIcon fontSize="small"/> : '2'}</div>
                    <span className="step-label">Pagto</span>
                </div>

                <div className={`step-item ${currentStep >= 2 ? 'active' : ''}`}>
                    <div className="step-circle">3</div>
                    <span className="step-label">Confirmar</span>
                </div>
            </div>

            {currentStep === 0 && renderAddressStep()}
            {currentStep === 1 && renderPaymentStep()}
            {currentStep === 2 && renderReviewStep()}

            <div className="checkout-footer">
                <button className="btn-back-text" onClick={prevStep}>Voltar</button>
                <button className="btn-next-action" onClick={nextStep}>
                    {currentStep === 2 ? 'Finalizar Pedido' : 'Continuar'}
                    {currentStep < 2 && <ArrowForwardIcon fontSize="small" style={{marginLeft: 8}}/>}
                </button>
            </div>
        </div>
    );
}