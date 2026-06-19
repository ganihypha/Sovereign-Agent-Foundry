import { defineConfig } from 'vite'
import pages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'

export default defineConfig({
  plugins: [
    pages(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
})
