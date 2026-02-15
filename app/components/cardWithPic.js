import Image from 'next/image';

export default function CardWithPic({ pic, title, texts }) {
  // Zabezpieczenie przed brakiem danych
  if (!pic?.url) {
    return null;
  }
  return (
    <div className="group flex h-full w-full flex-col items-stretch p-3 px-14 sm:w-1/3 sm:p-4 lg:w-1/4 lg:p-6 xl:w-1/5">
      <div className="h-44 w-full overflow-hidden rounded-lg bg-black">
        <Image
          src={pic.url}
          alt={title || 'Zdjęcie karty'}
          width={pic.width}
          height={pic.height}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className="h-full w-full object-cover object-center transition-all duration-500 ease-in-out group-hover:scale-110"
        />
      </div>

      <div className="mt-4 flex w-full overflow-hidden rounded-lg bg-slate-200 px-4 py-2 text-center transition-all duration-500 ease-in-out group-hover:bg-blue-400">
        <h3 className="w-full text-lg font-light wrap-break-word text-gray-800 uppercase">
          {title}
        </h3>
      </div>

      {/* Opcjonalny opis - jeśli będzie jakiś dodatakowy tekst */}
      {texts?.[0]?.text?.markdown && (
        <div className="mt-2 text-center text-sm text-gray-600">
          <p className="line-clamp-3">{texts[0].text.markdown}</p>
        </div>
      )}
    </div>
  );
}
