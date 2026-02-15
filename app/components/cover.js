import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import getData from "../lib/fetchAPI";
import { getStaticPagesContent } from "../lib/queries";
import OpeningHours from "./openingHours";

const style = {
  container: "w-fit text-white flex flex-col mx-auto mt-12",
  titleContainer:
    "px-12 flex flex-col items-center bg-blue-500 rounded-t-md border-blue-500 border-s border-t border-e",
  title: "text-base font-light text-white uppercase my-3",
  hoursListContainer:
    "flex flex-col items-center rounded-b-md border-s border-e border-b py-4 border-white/50",
  row: "text-base font-light",
  rowBold: "font-light",
};

export default async function Cover({ slug }) {
  try {
    const data = await getData(getStaticPagesContent(slug));
    const content = data?.staticPages?.[0];

    if (!content) {
      notFound();
    }

    return (
      <section className="relative overflow-clip">
        <div
          className="fixed top-0 -z-50 flex min-h-screen w-full overflow-clip before:absolute before:h-full before:w-full before:bg-black before:opacity-50"
          aria-hidden="true"
        >
          <Image
            src={content.header.picture.url}
            width={content.header.picture.width}
            height={content.header.picture.height}
            style={{ objectFit: "cover" }}
            sizes="100vw"
            className="h-screen w-full"
            alt="Obrazek tła"
            priority
            quality={75}
          />
        </div>
        <div className="container max-w-7xl">
          <div className="flex flex-col justify-center pt-40 pb-20 md:pt-60 md:pb-28">
            {/* Logo */}
            <div className="bg-opacity-40 bg-linear-to-r from-transparent from-5% via-white/55 via-50% to-transparent to-95% px-16 pt-6">
              <Image
                className="m-auto"
                src="/logoNikstal.svg"
                width={350}
                height={175}
                quality={100}
                alt="logo Nikstal"
                priority
              />
              {content?.header?.slogans?.[0] && (
                <h2 className="m-auto max-w-screen-sm pt-8 pb-4 text-center text-lg text-white uppercase drop-shadow-2xl md:text-2xl">
                  {content.header.slogans[0]}
                </h2>
              )}
            </div>
            {content?.header?.slogans?.[1] && (
              <div className="mt-10 max-w-4xl self-center">
                <h2 className="my-0 text-center text-xl font-bold text-blue-100 drop-shadow-2xl md:text-2xl">
                  {content.header.slogans[1]}
                </h2>
              </div>
            )}
            {/* Przycisk CTA */}
            {content?.ctaButtons?.[0]?.url &&
              content?.ctaButtons?.[0]?.text && (
                <div className="mt-10 flex max-w-3xl flex-row justify-center self-center">
                  <Link
                    href={content?.ctaButtons[0]?.url}
                    className="transform-gpu rounded-md bg-blue-500 px-6 py-3 text-center text-blue-100 uppercase no-underline transition-all hover:bg-blue-600 hover:text-blue-200"
                  >
                    {content?.ctaButtons[0]?.text}
                  </Link>
                </div>
              )}
            <OpeningHours style={style} />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading cover:", error);
    notFound();
  }
}
