import { Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AtmosphereProvider } from '@/context/AtmosphereContext';
import GlobalCart from '@/components/GlobalCart';

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-primary'
});

export const metadata = {
  title: 'UYAD Furniture | Premium Spaces',
  description: 'Bespoke custom furniture designed for exquisite living spaces.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className={`${playfairDisplay.variable} font-[family:var(--font-primary)] bg-[#f8fafc] text-[#143755] dark:bg-[#071320] dark:text-slate-100 antialiased transition-colors duration-500`}>
        <AtmosphereProvider>
          <CartProvider>
            {children}
            <GlobalCart />
          </CartProvider>
        </AtmosphereProvider>
      </body>
    </html>
  );
}