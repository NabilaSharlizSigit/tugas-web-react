import { useEffect, useState } from 'react' // BARU: useEffect
import './App.css'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import DeleteModal from './components/DeleteModal'
import { getProducts } from './api' // BARU

export default function App() {
  const [products, setProducts] = useState([]) // BARU: awalnya kosong, diisi dari API
  const [loading, setLoading] = useState(true) // BARU
  const [error, setError] = useState('') // BARU
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // { type: 'add' | 'edit' | 'delete', product? } | null

  // BARU: ambil data produk dari backend saat halaman dibuka
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  // Masih lokal, akan diganti ke API di commit berikutnya
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
          placeholder="🔍 Cari nama produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="count">{products.length} produk</span>
      </div>

      {/* BARU: status loading dan error */}
      {loading ? (
        <p className="empty">Memuat produk...</p>
      ) : error ? (
        <p className="empty">Gagal memuat produk: {error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="empty">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onEdit={() => setModal({ type: 'edit', product: p })}
              onDelete={() => setModal({ type: 'delete', product: p })}
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