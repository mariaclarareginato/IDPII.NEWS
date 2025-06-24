'use client';

import { usePathname } from 'next/navigation';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import '../styles/globals.css';


export default function RootLayout({ children }) {
  const pathname = usePathname();

  const showLayout = !(
    pathname.startsWith('/Login') ||
    pathname.startsWith('/Cadastro') ||
    pathname.startsWith('/Esquecisenha')
  );
  
  return (
    <html lang="pt-br">
      <body className={`bg-gray-100`}>
        {showLayout && <Header />}
        {children}
        {showLayout && <Footer />}
      </body>
    </html>
  );
}
