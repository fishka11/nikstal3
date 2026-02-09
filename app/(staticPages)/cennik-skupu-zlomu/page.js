import getData from '../../lib/fetchAPI';
import { getStaticPagesContent } from '../../lib/queries';
import ReactMarkdown from 'react-markdown';
import PriceList from '../../components/priceList';

export async function generateMetadata() {
  const data = await getData(getStaticPagesContent('cennik-skupu-zlomu'));
  const metaData = data.staticPages[0];
  if (metaData.seo) {
    return {
      title: metaData.seo?.title,
      description: metaData.seo?.description,
      keywords: metaData.seo?.keywords,
    };
  }
}

export default async function PriceListPage() {
  const data = await getData(getStaticPagesContent('cennik-skupu-zlomu'));
  const content = data.staticPages[0];
  return (
    <>
      <div className="container mb-4 mt-4 max-w-screen-lg pt-2 md:mb-8 md:mt-0 md:pt-12">
        <h1 className="mb-2 text-center text-2xl font-light text-blue-900 md:text-3xl">
          {content?.title}
        </h1>
        <p className="mb-2 text-center text-xl font-light md:mb-8">
          {content?.subtitle}
        </p>
      </div>
      <PriceList />
      <div className="container max-w-screen-lg p-2 md:pb-8 md:pt-0">
        <h2 className="mb-2 text-2xl font-light text-blue-800">
          {content?.texts[0]?.subtitle}
        </h2>
        <ReactMarkdown>
          {content?.texts[0]
            ? content?.texts[0]?.text?.markdown
            : content?.markdownTexts[0]?.markdownText}
        </ReactMarkdown>
      </div>
    </>
  );
}
