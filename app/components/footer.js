import Image from 'next/image';
import Link from 'next/link';
import getData from '../lib/fetchAPI';
import { getPagesContent } from '../lib/queries';

export default async function Footer() {
  try {
    const data = await getData(getPagesContent);
    if (!data?.pages) {
      return null;
    }
    const rodo = data.pages.find(page => page?.menuLink?.slug === 'rodo');
    const policy = data.pages.find(
      page => page?.menuLink?.slug === 'polityka-prywatnosci'
    );
    const currentYear = new Date().getFullYear();
    return (
      <footer className="bg-slate-300 py-12">
        <div className="container max-w-7xl">
          <div className="mb-12 flex flex-col gap-x-10 sm:flex-row">
            {/* Mapa Polski - obrazek*/}
            <div className="flex w-auto justify-center md:w-1/3 md:justify-start">
              <Image
                src="/silesia-on-polish-map.svg"
                alt="Mapa polski z zaznaczonym województwem śląskim"
                width={148}
                height={138}
              />
            </div>
            {/* Linki i copyright */}
            <div className="mt-8 w-auto md:mt-0 md:w-2/3">
              <div className="flex flex-col justify-end gap-y-1 text-sm">
                {/* Link do RODO */}
                {rodo && (
                  <Link
                    href={`/${rodo.menuLink.slug}`}
                    className="text-center text-sm text-blue-700 transition-colors hover:text-blue-900 sm:text-right md:whitespace-nowrap"
                  >
                    {rodo.menuLink.display}
                  </Link>
                )}
                {/* Link do polityki prywatności */}
                {policy && (
                  <Link
                    href={`/${policy.menuLink.slug}`}
                    className="text-center text-sm text-blue-700 transition-colors hover:text-blue-900 sm:text-right md:whitespace-nowrap"
                  >
                    {policy.menuLink.display}
                  </Link>
                )}
                {/* Copyright */}
                <p className="mt-4 text-center text-sm sm:text-right lg:whitespace-nowrap">
                  © {currentYear} NikStal - Marek Błaśkiewicz. Wszelkie prawa
                  zastrzeżone.
                </p>
                <p className="text-center text-sm sm:text-right lg:whitespace-nowrap">
                  Projekt i kodowanie: Rafał Piaśnik
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Error loading footer:', error);

    // Fallback footer bez linków z CMS
    const currentYear = new Date().getFullYear();

    return (
      <footer className="bg-slate-300 py-12">
        <div className="container max-w-7xl">
          <div className="mb-12 flex flex-col gap-x-10 sm:flex-row">
            <div className="flex w-auto justify-center md:w-1/3 md:justify-start">
              <Image
                src="/silesia-on-polish-map.svg"
                alt="mapa polski z zaznaczonym województwem śląskim"
                width={148}
                height={138}
              />
            </div>
            <div className="mt-8 w-auto md:mt-0 md:w-2/3">
              <div className="flex flex-col justify-end gap-y-1 text-sm">
                <p className="mt-4 text-center text-sm sm:text-right lg:whitespace-nowrap">
                  © {currentYear} NikStal - Marek Błaśkiewicz. Wszelkie prawa
                  zastrzeżone.
                </p>
                <p className="text-center text-sm sm:text-right lg:whitespace-nowrap">
                  Projekt i kodowanie: Rafał Piaśnik
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
