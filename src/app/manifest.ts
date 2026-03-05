import { APP_NAME, APP_SHORT_NAME } from '@/lib/constants'

import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${APP_SHORT_NAME} ${APP_NAME}`,
    short_name: APP_SHORT_NAME,
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
  }
}
