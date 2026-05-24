import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AtmosphereProvider } from '@/context/AtmosphereContext'; // <-- Import here
import GlobalCart from '@/components/GlobalCart';

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif' 
});

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost' 
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
      <body className={`${playfairDisplay.variable} ${plusJakartaSans.variable} font-[family:var(--font-jost)] bg-[#f8fafc] text-[#143755] dark:bg-[#071320] dark:text-slate-100 antialiased transition-colors duration-500`}>
        {/* Wrap both providers here */}
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