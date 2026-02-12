import { Card } from 'primereact/card';
import type { Product } from '../Interface/Product';
import './CardProduct.css'; 

interface CardProductProps {
    product: Product;
    onOpenModal: (product: Product) => void;
}

export default function CardProduct({ product, onOpenModal }: CardProductProps) {
    
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="product-card-wrapper">
            <Card 
                className="product-card"
                onClick={() => onOpenModal(product)}
            >
                <div className="card-content">
                    
                    <div className="card-text-section">
                        <div>
                            <div className="product-title">
                                {product.name}
                            </div>
                            
                            <p className="product-description">
                                {product.description}
                            </p>
                        </div>

                        <div className="product-price">
                            {formatCurrency(product.price)}
                        </div>
                    </div>

                    <div className="card-image-section">
                        <img 
                            alt={product.name} 
                            src={product.imageUrl} 
                            className="product-thumb" 
                        />
                    </div>

                </div>
            </Card>
        </div>
    );
}