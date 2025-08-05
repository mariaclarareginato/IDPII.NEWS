'use client';

import { usePathname } from 'next/navigation';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './globals.css';

import { Roboto, Merriweather, Playfair_Display } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair-display',
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const showLayout = !(
    pathname.startsWith('/login') ||
    pathname.startsWith('/cadastro') ||
    pathname.startsWith('/esquecisenha')
  );
  
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} ${merriweather.className} ${playfairDisplay.className} bg-gray-100`}>
        {showLayout && <Header />}
        {children}
        {showLayout && <Footer />}
      </body>
    </html>
  );
}
