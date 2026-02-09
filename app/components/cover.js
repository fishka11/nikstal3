import Image from 'next/image';
import Link from 'next/link';
import getData from '../lib/fetchAPI';
import { getStaticPagesContent } from '../lib/queries';
import OpeningHours from './openingHours';

export default async function Cover({ slug }) {
  const data = await getData(getStaticPagesContent(slug));
  const content = data.staticPages[0];
  const style = {
    container: 'w-fit text-white flex flex-col mx-auto mt-12',
    titleContainer:
      'px-12 flex flex-col items-center bg-blue-500 rounded-t-md border-blue-500 border-s border-t border-e',
    title: 'text-base font-light text-white uppercase my-3',
    hoursListContainer:
      'flex flex-col items-center rounded-b-md border-s border-e border-b py-4 border-white/50',
    row: 'text-lbase font-light',
    rowBold: 'font-light',
  };

  return (
    <div className="relative overflow-clip">
      <div className="aria-hidden fixed top-0 -z-50 flex min-h-screen w-full overflow-clip before:absolute before:h-full before:w-full before:bg-black before:opacity-50">
        <Image
          src={content?.header?.picture?.url}
          width={content?.header?.picture?.width}
          height={content?.header?.picture?.height}
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          className="aria-hidden h-screen w-full"
          alt="Obrazek tła"
        />
      </div>
      <div className="container flex justify-center">
        <div className="flex max-w-screen-xl flex-col justify-center pb-20 pt-40 md:pb-28 md:pt-60">
          <div className="to-transpatent bg-opacity-40 bg-gradient-to-r from-transparent from-5% via-white/60 via-50% to-95% px-16 pt-6">
            <Image
              className="m-auto"
              src="/logoNikstal.svg"
              width={350}
              height={175}
              quality={100}
              alt="logo Nikstal"
            />
            <h2 className="m-auto max-w-screen-sm pb-4 pt-8 text-center text-lg uppercase text-white drop-shadow-2xl md:text-2xl">
              {content?.header?.slogans[0]}
            </h2>
          </div>
          <div className="container mt-10 max-w-screen-xl">
            <h2 className="my-0 text-center text-xl font-bold text-blue-100 drop-shadow-2xl md:text-2xl">
              {content?.header?.slogans[1]}
            </h2>
          </div>
          <div className="container mt-10 flex max-w-screen-md flex-row justify-center">
            <Link
              className="transform-gpu rounded-md bg-blue-500 px-6 py-3 text-center uppercase text-blue-100 no-underline transition-all hover:bg-blue-600 hover:text-blue-200"
              href={content?.ctaButtons[0]?.url}
            >
              {content?.ctaButtons[0]?.text}
            </Link>
          </div>
          <OpeningHours style={style} />
        </div>
      </div>
    </div>
  );
}
