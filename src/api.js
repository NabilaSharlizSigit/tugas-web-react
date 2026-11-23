const BASE_URL = 'http://localhost:3000/api/products'

const handle = async (res) => {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || 'Terjadi kesalahan pada server.')
  }
  return res.status === 204 ? null : res.json()
}

export const getProducts = () => fetch(BASE_URL).then(handle)

export const getProduct = (id) => fetch(`${BASE_URL}/${id}`).then(handle)

export const createProduct = (data) =>
  fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle)

export const updateProduct = (id, data) =>
  fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle)

export const deleteProduct = (id) =>
  fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }).then(handle)