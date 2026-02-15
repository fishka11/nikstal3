import { notFound } from 'next/navigation';
import getData from '../lib/fetchAPI';
import { getStaticPagesContent } from '../lib/queries';
import Image from 'next/image';

export default async function StaticPageHeader({ slug }) {
  try {
    const data = await getData(getStaticPagesContent(slug));
    const content = data?.staticPages?.[0];
      
    if (!content) {
      notFound();
    }
      
    if (!content?.header?.picture?.url) {
    // Fallback - pusty header z tłem
        <div className="relative h-24 w-full overflow-hidden lg:h-32" />
    }

    return (
      <div className="relative h-60 w-full overflow-hidden bg-slate-400 lg:h-80">
        <Image
          src={content.header.picture.url}
          fill
          alt={content.title || 'Zdjęcie nagłówka'}
          className="object-cover object-center"
          sizes="100vw"
          priority
          quality={85}
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading header:', error);
    notFound();
  }
}