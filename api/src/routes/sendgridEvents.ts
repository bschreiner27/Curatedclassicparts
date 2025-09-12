import express from 'express'
export const sgEvents = express.Router()

sgEvents.post('/webhooks/sendgrid-events', express.json({ type: '*/*' }), async (req, res) => {
  const events = req.body as any[]
  for (const ev of events) {
    // Handle bounces / spamreports etc.
    if (ev.event === 'bounce' || ev.event === 'spamreport') {
      console.log('Sendgrid suppression candidate:', ev.email, ev.event)
    }
  }
  res.send('OK')
})
