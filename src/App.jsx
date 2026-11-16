import { useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'

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

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button className="btn btn-primary">+ Tambah Produk</button>
      </header>

      <div className="toolbar">
        <input
          className="search"
          type="text"
          placeholder="Cari nama produk..."
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
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <p className="footer-info">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>
    </div>
  )
}