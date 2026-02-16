import { notFound } from "next/navigation";
import getData from "../lib/fetchAPI";
import { getPagesContent, getDynamicPagesContent } from "../lib/queries";
import ReactMarkdown from "react-markdown";

// Pomocnicza funkcja do pobierania danych strony
async function getPageData(slug) {
  try {
    const data = await getData(getDynamicPagesContent(slug));
    return data?.pages?.[0] || null;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}
export async function generateStaticParams() {
  try {
    const data = await getData(getPagesContent);
    if (!data?.pages) {
      return [];
    }
    // Filtrowanie tylko stron ze slugiem
    return data.pages
      .filter((page) => page?.menuLink?.slug)
      .map((page) => ({
        slug: page.menuLink.slug,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // Next.js 15 wymaga asynchrinicznego pobierania parametrów
  const content = await getPageData(slug);
  if (!content?.seo) {
    return {
      title: content?.title || "Strona",
      description: content?.subtitle || "",
    };
  }
  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
  };
}

export default async function Page({ params }) {
  const { slug } = await params; // Next.js 15 wymaga asynchrinicznego pobierania parametrów
  const content = await getPageData(slug);
  if (!content) {
    notFound();
  }
  // Wybieranie odpowiedniego źródła markdown
  const markdownContent =
    content.texts?.[0]?.text?.markdown ||
    content.markdownTexts?.[0]?.markdownText ||
    "";

  return (
    <div className="container py-6 sm:py-10 max-w-5xl">
      <h1 className="py-2 text-2xl font-light text-blue-900 md:text-3xl">
        {content?.title}
      </h1>
      {content?.subtitle && (
        <p className="py-4 md:py-6 text-xl font-light">{content?.subtitle}</p>
      )}
      {content.texts?.[0]?.subtitle && (
        <h2 className="mb-2 text-2xl font-light text-blue-800">
          {content.texts[0].subtitle}
        </h2>
      )}
      <ReactMarkdown className="markdown-content py-2 md:py-4">
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
