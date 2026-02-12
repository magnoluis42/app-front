import { Card } from 'primereact/card';
import type { Product } from '../Interface/Product';

interface CardProductProps{
    product: Product;
    onOpenModal: (product: Product) => void;
}
export default function CardProduct({ product, onOpenModal }: CardProductProps) {
    return (
        <div className="flex justify-content-center p-2">
            <Card className="w-full md:w-30rem shadow-2 border-round-xl overflow-hidden cursor-pointer hover:shadow-4 transition-duration-200">
                
                <div className="flex flex-row align-items-center justify-content-between gap-3 h-full">
                    
                    {/* --- LADO ESQUERDO: TEXTO (flex-1 para ocupar o espaço sobrando) --- */}
                    <div className="flex flex-column justify-content-between flex-1 h-full py-1">
                        <div>
                            <div className="text-lg font-bold text-900 mb-1">
                                Burguer Churras
                            </div>
                            
                            <p className="m-0 text-600 text-sm line-height-3 pr-3" style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2, // Limita a 2 linhas para não empurrar demais
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                Pão brioche, blend 160g, queijo mussarela, farofa de bacon, vinagrete e molho.
                            </p>
                        </div>

                        <div className="text-lg font-bold text-green-600 mt-2">
                            R$ 23,00
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <img 
                            alt="Burguer" 
                            src="https://images.unsplash.com/photo-1702728109878-c61a98d80491?q=80&w=1170&auto=format&fit=crop" 
                            className="border-round-md" 
                            style={{ 
                                width: '100px', 
                                height: '100px', 
                                objectFit: 'cover',
                                display: 'block' 
                            }} 
                        />
                    </div>

                </div>
            </Card>
        </div>
    )
}