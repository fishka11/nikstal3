import { notFound } from "next/navigation";
import getData from "../lib/fetchAPI";
import { getPagesContent, getDynamicPagesContent } from "../lib/queries";
import Image from "next/image";

export async function generateStaticParams() {
  try {
    const data = await getData(getPagesContent);

    if (!data?.pages) {
      return [];
    }

    // Dla layoutu dynamicznego - generowanie wszystkich możliwych slugów
    return data.pages
      .filter((page) => page?.menuLink?.slug) // Pomijanie stron bez sluga (np. homepage)
      .map((page) => ({
        slug: page.menuLink.slug,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function PagesLayout({ children, params }) {
  try {
    const { slug } = await params; // Next.js 15 wymaga asynchronicznego pobierania parametrów
    const data = await getData(getDynamicPagesContent(slug));
    const content = data?.pages?.[0];
    {
      console.log("Page layout content:", content.header);
    } // Debugowanie zawartości strony
    if (!content) {
      notFound();
    }

    if (!content?.header?.picture?.url) {
      // Fallback - pusty header z tłem
      return (
        <>
          <div className="relative h-24 w-full overflow-hidden lg:h-32" />
          {/* Tutaj renderuje się treść strony z danego sluga */}
          {children}
        </>
      );
    }

    return (
      <>
        <div className="relative h-60 w-full overflow-hidden bg-slate-400 lg:h-80">
          <Image
            src={content.header.picture.url}
            fill
            alt={content?.title || "Zdjęcie nagłówka"}
            className="object-cover object-center"
            sizes="100vw"
            priority
            quality={85}
          />
        </div>

        {/* Tutaj renderuje się treść strony z danego sluga */}
        {children}
      </>
    );
  } catch (error) {
    console.error("Error loading page layout:", error);
    notFound();
  }
}
