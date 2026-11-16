import { useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import DeleteModal from './components/DeleteModal' // BARU

const initialProducts = [
  { id: 1, name: 'Pulpen', price: 5000 },
  { id: 2, name: 'Buku Tulis', price: 12000 },
  { id: 3, name: 'Spidol', price: 8000 },
  { id: 4, name: 'Penggaris', price: 6000 },
  { id: 5, name: 'Penghapus', price: 3000 },
]

export default function App() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // { type: 'add' | 'edit' | 'delete', product? } | null

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = (data) => {
    if (modal.type === 'edit') {
      setProducts(
        products.map((p) => (p.id === modal.product.id ? { ...p, ...data } : p))
      )
    } else {
      const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1
      setProducts([...products, { id: newId, ...data }])
    }
    setModal(null)
  }

  // BARU: hapus produk yang dipilih
  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== modal.product.id))
    setModal(null)
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal({ type: 'add' })}>
          + Tambah Produk
        </button>
      </header>

      <div className="toolbar">
        <input
          className="search"
          type="text"
          placeholder="Cari nama produk disini"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="count">{products.length} produk</span>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="empty">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onEdit={() => setModal({ type: 'edit', product: p })}
              onDelete={() => setModal({ type: 'delete', product: p })} // BARU
            />
          ))}
        </div>
      )}

      <p className="footer-info">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>

      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <ProductModal
          product={modal.product}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* BARU: modal konfirmasi hapus */}
      {modal?.type === 'delete' && (
        <DeleteModal
          product={modal.product}
          onClose={() => setModal(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  )
}