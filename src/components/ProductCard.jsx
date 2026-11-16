export const formatRupiah = (n) => 'Rp' + n.toLocaleString('id-ID')
export default function ProductCard({ product, onEdit, onDelete }){
    return(
        <div className="card">
            <span className="card-id">ID: {product.id}</span>
            <h3 className="card-name">{product.name}</h3>
            <p className="card-price">{formatRupiah(product.price)}</p>
            <div className="card-actions">
                <button className="btn btn-outline" onClick={onEdit}>Edit</button>
                <button className="btn btn-outline-danger" onClick={onDelete}>Hapus</button>
            </div>
        </div>
    )
}