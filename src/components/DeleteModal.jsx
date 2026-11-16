import { formatRupiah } from './ProductCard'

export default function DeleteModal({ product, onClose, onConfirm }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal delete-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="trash-icon">🗑️</div>
        <h2>Hapus Produk?</h2>
        <p className="modal-desc">Produk yang dihapus tidak dapat dikembalikan.</p>

        <div className="delete-info">
          <span className="card-id">ID: {product.id}</span>
          <strong>{product.name}</strong>
          <span className="card-price">{formatRupiah(product.price)}</span>
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>Batal</button>
          <button className="btn btn-danger" onClick={onConfirm}>Hapus Produk</button>
        </div>
      </div>
    </div>
  )
}