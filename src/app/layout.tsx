import type {Metadata} from "next";

import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tennis RSS Reader by @rafasanabria1",
  description: "A simple RSS reader for tennis news",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="grid min-h-screen grid-rows-[auto,1fr,auto] font-sans antialiased">
        <div className="fixed -z-10 h-full w-full bg-slate-950">
          <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
          <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
        </div>
        <div className="container m-auto px-4">
          <header className="border-b-2 border-purple-950 p-4">
            <nav className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Link className="flex items-center gap-4 text-2xl font-bold" href="/">
                <svg height="35" width="35" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(-351.84448,-605.54242)">
                    <g transform="matrix(0.22808152,0,0,0.22800807,271.59526,494.49358)">
                      <path
                        d="m 505.12336,568.95132 c -2.83631,42.28675 -39.45045,74.1952 -81.73721,71.42336 -42.28676,-2.83631 -74.25967,-39.45045 -71.3589,-81.80167 2.8363,-42.22229 39.45045,-74.19521 81.67274,-71.3589 42.28676,2.83631 74.25968,39.45045 71.42337,81.73721"
                        fill="#e8e000"
                      />
                      <path
                        d="M 19.8125 0.40625 C 18.034562 0.49526787 16.58438 1.5115418 15.8125 2.4375 C 14.930349 3.4957379 11.032921 12.368687 10.3125 14.25 C 9.577375 16.131311 7.8119791 19.433042 5.5625 21.34375 C 3.1218863 23.460224 0.5625 21.21875 0.5625 21.21875 C 1.0476819 23.540992 3.3351037 24.08578 5.6875 22.96875 C 8.0251942 21.837025 10.930351 16.618329 11.8125 14.53125 C 12.694649 12.444169 15.579337 5.8937384 16.84375 3.21875 C 18.093461 0.55845672 20.59375 0.4375 20.59375 0.4375 C 20.327268 0.40994152 20.066491 0.39353316 19.8125 0.40625 z M 34.875 15.5 C 34.875 15.5 32.536954 22.348371 25.40625 27.375 C 18.30495 32.416327 15.03125 34.8125 15.03125 34.8125 L 16.625 34.96875 L 26 28.4375 C 26.882149 27.790798 35.933579 21.89352 34.875 15.5 z "
                        fill="#ffffff"
                        transform="matrix(4.3843973,0,0,4.3858097,351.84446,487.03908)"
                      />
                    </g>
                  </g>
                </svg>
                RSS Tennis Feed
              </Link>
              <ul className="flex items-center justify-center gap-8 text-lg font-semibold">
                <li className="border-b border-purple-500">
                  <Link href="/">Home</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="py-8">{children}</main>
          <footer className="border-t-2 border-purple-950 p-4 text-center leading-[4rem] text-white opacity-70">
            Tennis RSS Reader 2024 by @rafasanabria1
          </footer>
        </div>
      </body>
    </html>
  );
}
