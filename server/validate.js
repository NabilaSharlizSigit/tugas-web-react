export const validateProduct = (body) => {
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const price = Number(body?.price)

  if (!name) return { error: 'Nama produk wajib diisi.' }
  if (!Number.isFinite(price) || price <= 0) {
    return { error: 'Harga harus lebih dari 0.' }
  }
  return { data: { name, price } }
}