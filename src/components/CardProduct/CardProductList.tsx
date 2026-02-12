import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import CardProduct from "./CardProduct";
import type { Product } from '../Interface/Product'; 
import { useCart } from '../../contexts/Cart/CartContext';
import CartFloatingBar from './CartFloatingBar'; 
import './CardProduct.css';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function CardProductList() {
    const { addToCart } = useCart(); 
    
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    const products: Product[] = [
        {
            id: 1,
            name: "Burguer Churras",
            description: "Pão brioche, blend 160g, queijo mussarela, farofa de bacon, vinagrete e molho especial.",
            price: 23.00,
            imageUrl: "https://images.unsplash.com/photo-1702728109878-c61a98d80491?q=80&w=1170&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Smash Duplo",
            description: "Dois blends de 80g amassadinhos na chapa com crosta crocante, cheddar inglês e cebola caramelizada.",
            price: 28.50,
            imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Pizza Tradicional",
            description: "Pizza clássica da casa desde 1905 com molho de tomate artesanal e manjericão fresco.",
            price: 40.00,
            imageUrl: "https://images.unsplash.com/photo-1700760934249-93efbb574d23?q=80&w=880&auto=format&fit=crop"
        }
    ];


    const handleOpenModal = (product: Product) => {
        setSelectedProduct(product);
        setQuantity(1); 
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
    };

    const increment = () => setQuantity(prev => prev + 1);

    const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

    const handleAddToCart = () => {
        if (selectedProduct) {
            addToCart(selectedProduct, quantity);
            handleCloseModal();
        }
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const modalFooter = (
        <div className="modal-footer-actions">
            <div className="quantity-control">
                <button onClick={decrement} className="qty-btn">
                    <RemoveIcon fontSize="small"/>
                </button>
                <span className="qty-value">{quantity}</span>
                <button onClick={increment} className="qty-btn">
                    <AddIcon fontSize="small"/>
                </button>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <div className="btn-content">
                    <span>Adicionar</span>
                    <span className="btn-price">
                        {selectedProduct && formatCurrency(selectedProduct.price * quantity)}
                    </span>
                </div>
                <ShoppingBagIcon fontSize="small" />
            </button>
        </div>
    );

    return (
        <>
            <div className="product-list-container">
                {products.map((product) => (
                    <CardProduct 
                        key={product.id} 
                        product={product} 
                        onOpenModal={handleOpenModal} 
                    />
                ))}
            </div>

            <CartFloatingBar />

            <Dialog 
                header={selectedProduct?.name} 
                visible={visible} 
                style={{ width: '90%', maxWidth: '500px' }} 
                onHide={handleCloseModal}
                footer={modalFooter}
                draggable={false}
                resizable={false}
                modal
                dismissableMask={true}
                className="product-detail-modal"
            >
                {selectedProduct && (
                    <div className="product-modal-details">
                        <img 
                            src={selectedProduct.imageUrl} 
                            alt={selectedProduct.name} 
                            className="product-modal-image"
                        />
                        <div>
                            <p className="modal-description">
                                {selectedProduct.description}
                            </p>
                            
                            <div style={{ marginTop: 10 }}>
                                <small style={{ color: '#795548' }}>Preço unitário:</small>
                                <br/>
                                <span className="modal-price-tag">
                                    {formatCurrency(selectedProduct.price)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>
        </>
    );
}