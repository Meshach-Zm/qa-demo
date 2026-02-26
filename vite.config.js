import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    {
      name: 'mock-api',
      configureServer(server) {
        server.middlewares.use('/api/servers', (req, res) => {
          const fixture = path.resolve('./cypress/fixtures/servers.json')
          const data = fs.readFileSync(fixture, 'utf-8')
          res.setHeader('Content-Type', 'application/json')
          res.end(data)
        })
      }
    }
  ]
})