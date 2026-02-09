import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import CardWithIcon from './components/cardWithIcon';
import CardWithPic from './components/cardWithPic';
import Cover from './components/cover';
import getData from './lib/fetchAPI';
import { getStaticPagesContent } from './lib/queries';

export const revalidate = 0;

export async function generateMetadata() {
  const data = await getData(getStaticPagesContent('/'));
  const metaData = data.staticPages[0];
  if (metaData.seo) {
    return {
      title: metaData.seo?.title,
      description: metaData.seo?.description,
      keywords: metaData.seo?.keywords,
    };
  }
}

export default async function Home() {
  const data = await getData(getStaticPagesContent('/'));
  const content = data.staticPages[0];
  return (
    <>
      <Cover slug={'/'} />
      <div className="bg-white pb-14 pt-4 md:pt-14">
        <div className="container max-w-screen-lg">
          <h1 className="mb-4 mt-4 text-left text-xl font-light text-blue-900 md:mb-8 md:mt-0 md:text-3xl">
            {content?.title}
          </h1>
          <ReactMarkdown className="text-justify">
            {content?.texts[0]?.text?.markdown}
          </ReactMarkdown>
        </div>
        <div className="container mt-14 flex max-w-screen-2xl flex-wrap justify-center">
          {content?.cardsWithIcon.map(card => {
            return (
              <CardWithIcon
                key={card?.id || uuidv4()}
                icon={card?.fontAwesomeIconName}
                title={card?.subtitle}
                texts={card?.texts}
              />
            );
          })}
        </div>
      </div>
      <div className="linear-gradient(to bottom, rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)) bg-cover bg-fixed bg-center bg-no-repeat py-20">
        <div className="container max-w-screen-lg p-12">
          <h2 className="mb-6 text-justify text-2xl font-light text-slate-200">
            {content?.texts[1]?.subtitle}
          </h2>
          <ReactMarkdown className="text-justify text-white [&_a]:text-white [&_li]:list-none">
            {content?.texts[1]?.text?.markdown}
          </ReactMarkdown>
        </div>
      </div>

      <div className="bg-white pt-20">
        <div className="container flex max-w-screen-2xl flex-wrap justify-center">
          {content?.cardsWithPic.map(card => {
            return (
              <CardWithPic
                key={card?.id || uuidv4()}
                pic={card?.picture}
                title={card?.subtitle}
                texts={card?.texts}
              />
            );
          })}
        </div>
        <div className="container max-w-screen-lg p-12">
          <ReactMarkdown className="text-justify [&_li]:list-none">
            {content?.texts[2]?.text?.markdown}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
