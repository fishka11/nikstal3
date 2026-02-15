import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import CardWithIcon from "./components/cardWithIcon";
import CardWithPic from "./components/cardWithPic";
import Cover from "./components/cover";
import getData from "./lib/fetchAPI";
import { getStaticPagesContent } from "./lib/queries";

// export const revalidate = 3600;

// Pomocnicza funkcja do pobierania danych
async function getPageData() {
  try {
    const data = await getData(getStaticPagesContent("/"));
    return data?.staticPages?.[0] || null;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export async function generateMetadata() {
  try {
    const content = await getPageData();
    if (!content?.seo) {
      return {}; // Next.js użyje domyślnych meta z layout.js
    }
    return {
      title: content.seo.title,
      description: content.seo.description,
      keywords: content.seo.keywords,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
}

export default async function Home() {
  try {
    const content = await getPageData();
    if (!content) {
      notFound();
    }
    // Destrukturyzacja dla czytelności
    const { title, texts, cardsWithIcon, cardsWithPic } = content;
    return (
      <>
        <Cover slug="/" />
        <section className="bg-white pt-4 pb-14 md:pt-14">
          <div className="container max-w-5xl">
            <h1 className="mt-4 mb-4 text-left text-xl font-light text-blue-900 md:mt-0 md:mb-8 md:text-justify md:text-3xl">
              {title}
            </h1>
            {texts?.[0]?.text?.markdown && (
              <ReactMarkdown className="markdown-content text-left md:text-justify">
                {texts[0].text.markdown}
              </ReactMarkdown>
            )}
          </div>
          {cardsWithIcon?.length > 0 && (
            <div className="container mt-14 flex max-w-screen-2xl flex-wrap justify-center">
              {cardsWithIcon.map((card) => (
                <CardWithIcon
                  key={card.id}
                  icon={card.fontAwesomeIconName}
                  title={card.subtitle}
                  texts={card.texts}
                />
              ))}
            </div>
          )}
        </section>
        <section className="py-20">
          <div className="container max-w-5xl">
            {texts?.[1]?.subtitle && (
              <h2 className="mb-6 text-left text-2xl font-light text-slate-200 md:text-justify">
                {texts[1].subtitle}
              </h2>
            )}
            {texts?.[1]?.text?.markdown && (
              <ReactMarkdown className="markdown-content text-left text-white md:text-justify [&_a]:text-white [&_li]:list-none">
                {texts[1].text.markdown}
              </ReactMarkdown>
            )}
          </div>
        </section>
        <section className="bg-white pt-20">
          {cardsWithPic?.length > 0 && (
            <div className="container flex max-w-screen-2xl flex-wrap justify-center">
              {cardsWithPic.map((card) => (
                <CardWithPic
                  key={card?.id}
                  pic={card?.picture}
                  title={card?.subtitle}
                  texts={card?.texts}
                />
              ))}
            </div>
          )}
        </section>
        <section className="bg-white py-10">
          {texts?.[2]?.text?.markdown && (
            <div className="container max-w-5xl">
              <ReactMarkdown className="markdown-content text-left md:text-justify [&_li]:list-none">
                {texts?.[2]?.text?.markdown}
              </ReactMarkdown>
            </div>
          )}
        </section>
      </>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    notFound();
  }
}
