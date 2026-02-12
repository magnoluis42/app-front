import CardProduct from "./CardProduct";

export default function CardProductList() {
    return (
        <div
            className="card-product-list"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', maxWidth: '45rem', marginInline: 'auto' }}
        >
            <CardProduct />

        </div>
    )
}