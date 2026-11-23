import express from 'express'
import cors from 'cors'
import productsRouter from './routes/products.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/api/products', productsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan.' })
})

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`)
})