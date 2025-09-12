import express from 'express'
import multer from 'multer'
const upload = multer()

export const inboundRouter = express.Router()

// Inbound Parse webhook endpoint (SendGrid -> your app)
inboundRouter.post('/webhooks/email-inbound', upload.any(), async (req, res) => {
  try {
    const secret = process.env.INBOUND_PARSE_SECRET
    if (secret && req.query.t !== secret) {
      return res.status(401).send('Unauthorized')
    }

    const fields = req.body as any
    const to = (fields.to || '').toLowerCase()
    const alias = to.split('@')[0].trim()
    const from = fields.from
    const subject = fields.subject || '(no subject)'
    const text = fields.text || ''
    const html = fields.html || ''

    // TODO: lookup alias in DB and forward to counterparty
    console.log('Inbound email', { alias, from, subject })

    return res.status(200).send('OK')
  } catch (e) {
    console.error(e)
    return res.status(500).send('Error')
  }
})
