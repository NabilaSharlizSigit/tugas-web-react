import { Router } from 'express'
import { readProducts } from '../store.js'

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

export default router