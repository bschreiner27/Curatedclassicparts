import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { inboundRouter } from './routes/inboundParse.js'
import { sgEvents } from './routes/sendgridEvents.js'

const app = express()
app.use(express.json({ limit: '1mb' }))
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') || '*' }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.get('/health', (_req, res) => res.send('ok'))

app.use(inboundRouter)
app.use(sgEvents)

const port = process.env.PORT ? Number(process.env.PORT) : 3000
app.listen(port, () => console.log(`[api] listening on ${port}`))
