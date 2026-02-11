import CardProduct from "./CardProduct";

export default function CardProductList() {
    return (
        <div 
            className="card-product-list"
            style={{ display: 'flex', justifyContent: 'space-around', gap: '1rem', flexWrap: 'wrap', backgroundColor: 'lightgray', padding: '1rem' }}
        >
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
        </div>
    )
}