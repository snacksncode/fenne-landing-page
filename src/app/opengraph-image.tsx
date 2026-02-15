import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = "Fenne - Stop asking What's for dinner?"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const satoshiBlack = await readFile(
    join(process.cwd(), 'src/app/fonts/Satoshi-Black.otf')
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Main content area with cream gradient background */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #fffbf4, #fef7ea)',
          }}
        >
          {/* Text container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* "Stop asking" text */}
            <div
              style={{
                fontSize: '76px',
                fontWeight: 900,
                fontFamily: 'Satoshi',
                color: '#493d34',
                lineHeight: 1.1,
                textAlign: 'center',
              }}
            >
              Stop asking
            </div>

            {/* "What's for dinner?" text */}
            <div
              style={{
                fontSize: '76px',
                fontWeight: 900,
                fontFamily: 'Satoshi',
                color: '#f9954d',
                lineHeight: 1.1,
                textAlign: 'center',
              }}
            >
              What's for dinner?
            </div>
          </div>
        </div>

        {/* Orange gradient bar at bottom */}
        <div
          style={{
            height: '44px',
            width: '100%',
            background: 'linear-gradient(to right, #f9954d, #ec8032)',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Satoshi',
          data: satoshiBlack,
          weight: 900,
          style: 'normal',
        },
      ],
    }
  )
}
