import Image from "next/image";

export default function CardWithPic({ pic, title, texts }) {
  return (
    <div className="group flex h-full w-full flex-col items-stretch p-3 px-14 sm:w-1/3 sm:p-4 lg:w-1/4 lg:p-6 xl:w-1/5">
      <div className="h-44 w-full overflow-hidden rounded-lg">
        <div className="h-44 w-full overflow-hidden bg-black">
          <Image
            src={pic?.url}
            alt={title}
            width={pic?.width}
            height={pic?.height}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className="h-full w-full object-cover object-center transition-all duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
      </div>
      <div className="mt-4 flex w-full overflow-hidden rounded-lg bg-slate-200 px-4 py-2 text-center transition-all duration-500 ease-in-out group-hover:bg-blue-400">
        <h3 className="w-full whitespace-break-spaces text-center text-lg font-light uppercase">
          {title}
        </h3>
      </div>
    </div>
  );
}
