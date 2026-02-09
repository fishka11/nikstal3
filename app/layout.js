import Cookies from './components/cookies';
import getData from './lib/fetchAPI';
import { getLayoutsSEO } from './lib/queries';
import Header from './components/header';
import Footer from './components/footer';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  preload: true,
  display: 'block',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
});

config.autoAddCss = false;
library.add(fas);

export async function generateMetadata() {
  const data = await getData(getLayoutsSEO);
  const metaData = data.layoutsSEO.filter(
    layout => layout.name === 'rootLayoutSEO'
  );

  return {
    title: {
      default:
        metaData?.seo?.title ||
        'Skup złomu Sosnowiec, skup złomu Jaworzno, Katowice, Śląsk, skup metali kolorowych',
    },
    description:
      metaData?.seo?.description ||
      'Skup złomu Sosnowiec - Nikstal - skupujemy metale kolorowe i surowce wtórne z rejonu Śląska i Zagłębia. Obsługujemy: Mysłowice, Sosnowiec, Jaworzno, Mikołów, Tychy, Zawiercie, Dąbrowa Górnicza, Katowice,  Skupujemy złom po najwyższych cenach w regionie! Prowadzimy skup hurtowy i detaliczny.',
    keywords:
      metaData?.seo?.keywords ||
      'Skup złomu, Mysłowice, Sosnowiec, Jaworzno, Katowice, Tychy, Śląsk, Mikołów, Zawiercie, ceny skupu stali, miedzi, mosiądzu, aluminium, cynku, ołowiu, makulatury, akumulatorów, hurtowy, detaliczny',
    authors: [{ name: 'Rafał Piaśnik', url: '' }],
    formatDetection: {
      email: true,
      address: false,
      telephone: true,
    },
    verification: {
      google: 'i5ZygHCqAwgik27FxY6hJ1MOfBvANHBBprYJB4JI8oo',
    },
  };
}

export default function RootLayout({ children, params }) {
  return (
    <html lang="pl">
      <body className={`${inter.className}`}>
        <Header />
        <main className="relative">{children}</main>
        <Footer />
        <Cookies />
      </body>
    </html>
  );
}
