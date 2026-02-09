import getData from '../lib/fetchAPI';
import { getPagesContent, getDynamicPagesContent } from '../lib/queries';
import Image from 'next/image';

export async function generateStaticParams() {
  const data = await getData(getPagesContent, 'no-store');

  return data.pages.map(page => ({
    slug: page?.menuLink?.slug || null,
  }));
}

export default async function PagesLayout({ children, params }) {
  const { slug } = params;
  const data = await getData(getDynamicPagesContent(slug));
  // const data = await getData(getPagesContent);
  // const content = filterFetchedData(data.pages, slug);
  const content = data.pages[0];

  return (
    <>
      <div className="relative h-60 w-full overflow-hidden bg-slate-400 lg:h-80">
        <Image
          src={content?.header?.picture?.url}
          //   width={content?.header?.picture?.width}
          //   height={content?.header?.picture?.height}
          fill={true}
          alt={content?.title}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
      </div>
      {children}
    </>
  );
}
