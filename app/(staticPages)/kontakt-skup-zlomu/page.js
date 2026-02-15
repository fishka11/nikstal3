import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import getData from "../../lib/fetchAPI";
import { getStaticPagesContent } from "../../lib/queries";
import StaticPageHeader from "../../components/staticPagesHeader";
import FirmData from "../../components/firmData";
import CardWithIcon from "../../components/cardWithIcon";
import GoogleMap from "../../components/googleMap";
import OpeningHours from "../../components/openingHours";

const CONTACT_SLUG = "kontakt-skup-zlomu";

// Pomocnicza funkcja do pobierania danych
async function getPageData() {
  try {
    const data = await getData(getStaticPagesContent(CONTACT_SLUG));
    return data?.staticPages?.[0] || null;
  } catch (error) {
    console.error("Error fetching price list page:", error);
    return null;
  }
}

export async function generateMetadata() {
  const content = await getPageData();

  if (!content?.seo) {
    return {
      title: content?.title || "Kontakt - skupu złomu",
      description: content?.subtitle || "",
    };
  }

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
  };
}

export default async function ContactPage() {
  const content = await getPageData();

  if (!content) {
    notFound();
  }

  const style = {
    container: "mb-8",
    titleContainer:
      "container mb-4 mt-8 flex max-w-screen-xl flex-col items-center",
    title: "text-2xl font-light text-blue-800",
    hoursListContainer:
      "container mb-14 flex max-w-screen-xl flex-col items-center",
    row: "text-xl font-light",
    rowBold: "font-bold",
  };

  // Wybór odpowiednie źródło markdown
  const markdownContent =
    content.texts?.[0]?.text?.markdown ||
    content.markdownTexts?.[0]?.markdownText ||
    "";

  return (
    <>
      <StaticPageHeader slug={CONTACT_SLUG} />
      <div className="container max-w-5xl pt-6 sm:pt-10">
        <h1 className="py-2 text-2xl text-center font-light text-blue-900 md:text-3xl">
          {content?.title}
        </h1>
        <p className="py-4 text-xl text-center font-light md:py-6">
          {content?.subtitle}
        </p>
      </div>
      <div className="container flex max-w-screen-2xl flex-wrap justify-center">
        {content.cardsWithIcon.map((card) => {
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
      <FirmData />
      <OpeningHours style={style} />
      <div className="container max-w-5xl">
        {content?.texts[0]?.subtitle && (
          <h2 className="text-2xl font-light text-blue-800">
            {content.texts[0].subtitle}
          </h2>
        )}
        <ReactMarkdown className="markdown-content">
          {markdownContent}
        </ReactMarkdown>
      </div>
      <GoogleMap />
    </>
  );
}
