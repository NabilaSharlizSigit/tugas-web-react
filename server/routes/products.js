import { Router } from 'express'
import { readProducts, writeProducts } from '../store.js'
import { validateProduct } from '../validate.js'

const router = Router()

// GET /api/products : semua produk
router.get('/', (req, res) => {
  res.json(readProducts())
})

// GET /api/products/:id : satu produk
router.get('/:id', (req, res) => {
  const product = readProducts().find((p) => p.id === Number(req.params.id))
  if (!product) {
    return res.status(404).json({ message: 'Produk tidak ditemukan.' })
  }
  res.json(product)
})

// POST /api/products : tambah produk
router.post('/', (req, res) => {
  const { error, data } = validateProduct(req.body)
  if (error) return res.status(400).json({ message: error })

  const products = readProducts()
  const id = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1
  const newProduct = { id, ...data }

  writeProducts([...products, newProduct])
  res.status(201).json(newProduct)
})

export default router