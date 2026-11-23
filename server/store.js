import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FILE = path.join(__dirname, 'data', 'products.json')

export const readProducts = () => JSON.parse(fs.readFileSync(FILE, 'utf-8'))

export const writeProducts = (products) =>
  fs.writeFileSync(FILE, JSON.stringify(products, null, 2))