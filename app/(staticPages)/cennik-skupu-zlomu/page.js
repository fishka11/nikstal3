import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import getData from "../../lib/fetchAPI";
import { getStaticPagesContent } from "../../lib/queries";
import StaticPageHeader from "../../components/staticPagesHeader";
import PriceList from "../../components/priceList";

const PRICE_LIST_SLUG = "cennik-skupu-zlomu";

// Pomocnicza funkcja do pobierania danych
async function getPageData() {
  try {
    const data = await getData(getStaticPagesContent(PRICE_LIST_SLUG));
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
      title: content?.title || "Cennik skupu złomu",
      description: content?.subtitle || "",
    };
  }

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PriceListPage() {
  const content = await getPageData();

  if (!content) {
    notFound();
  }

  // Wybór odpowiednie źródło markdown
  const markdownContent =
    content.texts?.[0]?.text?.markdown ||
    content.markdownTexts?.[0]?.markdownText ||
    "";

  return (
    <>
      <StaticPageHeader slug={PRICE_LIST_SLUG} />
      <div className="container max-w-5xl py-6 sm:py-10">
        <h1 className="py-2 text-2xl font-light text-blue-900 md:text-3xl">
          {content.title}
        </h1>
        <p className="py-4 text-xl font-light md:py-6">{content.subtitle}</p>
        <PriceList />
        {content?.texts[0]?.subtitle && (
          <h2 className="text-2xl font-light text-blue-800">
            {content.texts[0].subtitle}
          </h2>
        )}
        <ReactMarkdown className="markdown-content py-2 md:py-4">
          {markdownContent}
        </ReactMarkdown>
      </div>
    </>
  );
}
