import { useState } from 'react'

export default function ProductModal({ product, onClose, onSave }) {
  const isEdit = Boolean(product)
  const [name, setName] = useState(product?.name ?? '')
  const [price, setPrice] = useState(product?.price ?? '')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!name.trim()) newErrors.name = 'Nama produk wajib diisi.'
    if (!price || Number(price) <= 0) newErrors.price = 'Harga harus lebih dari 0.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    onSave({ name: name.trim(), price: Number(price) })
  }

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <button type="button" className="modal-close" onClick={onClose}>✕</button>
        <h2>{isEdit ? 'Edit Produk' : 'Tambah Produk'}</h2>
        <p className="modal-desc">
          {isEdit ? 'Perbarui informasi produk yang dipilih.' : 'Masukkan informasi produk baru.'}
        </p>
        {isEdit && <p className="modal-id">ID: {product.id}</p>}

        <label>Nama Produk</label>
        <input
          type="text"
          placeholder="Contoh: Pulpen"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <small className="error">{errors.name}</small>}

        <label>Harga (Rp)</label>
        <input
          type="number"
          placeholder="Contoh: 5000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <small className={errors.price ? 'error' : 'hint'}>Harga harus lebih dari 0.</small>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Batal</button>
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
          </button>
        </div>
      </form>
    </div>
  )
}