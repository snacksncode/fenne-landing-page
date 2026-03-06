import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = "Fenne - Stop asking What's for dinner?";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const [satoshiBlack, satoshiMedium] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/fonts/Satoshi-Black.otf')),
    readFile(join(process.cwd(), 'src/app/fonts/Satoshi-Medium.otf')),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          background: '#fef7ea',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src="https://fenneplanner.com/icon.png"
            width={150}
            height={150}
            style={{ borderRadius: '5px', marginBottom: 20 }}
            alt=""
          />
          <div
            style={{
              fontSize: '100px',
              fontWeight: 900,
              fontFamily: 'Satoshi',
              color: '#493d34',
              lineHeight: 1.1,
              textAlign: 'center',
            }}
          >
            Stop asking
          </div>

          <div
            style={{
              fontSize: '100px',
              fontWeight: 900,
              fontFamily: 'Satoshi',
              color: '#f9954d',
              lineHeight: 1.1,
              textAlign: 'center',
            }}
          >
            What’s for dinner?
          </div>
        </div>
        <div
          style={{
            fontSize: '42px',
            fontWeight: 500,
            fontFamily: 'Satoshi',
            color: '#594b40',
            marginTop: '38px',
            opacity: 0.6,
          }}
        >
          Meal planning, minus the headache
        </div>
      </div>
      <div
        style={{
          width: '100%',
          height: '36px',
          bottom: 0,
          left: 0,
          background: 'linear-gradient(to right,#f9954d, #ec8032)',
        }}
      />
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Satoshi',
          data: satoshiBlack,
          weight: 900,
          style: 'normal',
        },
        {
          name: 'Satoshi',
          data: satoshiMedium,
          weight: 500,
          style: 'normal',
        },
      ],
    }
  );
}
