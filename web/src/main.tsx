import React from 'react'
import { createRoot } from 'react-dom/client'

const App = () => (
  <div style={{padding: 24, fontFamily: 'system-ui'}}>
    <h1>Road & Race Parts</h1>
    <p>Frontend is up behind Caddy + Nginx.</p>
  </div>
)

const rootEl = document.getElementById('root')
if (rootEl) createRoot(rootEl).render(<App />)
