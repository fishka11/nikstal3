import Image from 'next/image';
import Link from 'next/link';
import getData from '../lib/fetchAPI';
import { getPagesContent } from '../lib/queries';

export default async function Footer() {
  const data = await getData(getPagesContent);
  const menuItemsToDisplay = data.pages.filter(
    page =>
      page?.menuLink?.visibleInMenu && page?.menuLink?.menu.includes('SEOMenu')
  );
  const rodo = data.pages.filter(page => page?.menuLink?.slug === 'rodo')[0];
  const policy = data.pages.filter(
    page => page?.menuLink?.slug === 'polityka-prywatnosci'
  )[0];
  return (
    <footer className="bg-slate-300 py-12">
      <div className="container max-w-screen-xl">
        <div className="mb-12 flex flex-col gap-x-10 sm:flex-row">
          <div className="flex w-auto justify-center md:w-1/3 md:justify-start">
            <Image
              src="/silesia-on-polish-map.svg"
              alt="mapa polski z zaznaczonym województwem śląskim"
              width="148"
              height="138"
            />
          </div>
          <div className="mt-8 w-auto md:mt-0 md:w-2/3">
            <div className="flex flex-col justify-end gap-y-1 text-sm">
              <Link
                href={rodo?.menuLink?.slug}
                className="text-center text-sm text-blue-700 sm:text-right md:whitespace-nowrap"
              >
                {rodo?.menuLink?.display}
              </Link>
              <Link
                href={policy?.menuLink?.slug}
                className="text-center text-sm text-blue-700 sm:text-right md:whitespace-nowrap"
              >
                {policy?.menuLink?.display}
              </Link>
              <p className="mt-4 text-center text-sm sm:text-right lg:whitespace-nowrap">
                © 2023 NikStal - Marek Błaśkiewicz. Wszelkie prawa zastrzeżone.
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
