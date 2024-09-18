import { Playfair_Display, Montserrat,Playfair } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.className} ${montserrat.className}`}>
      <body>{children}</body>
    </html>
    
  )
}

