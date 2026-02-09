import getData from '../lib/fetchAPI';
import { getStaticPagesContent } from '../lib/queries';
import Image from "next/image";

export default async function PagesLayout({ children }) {
  const data = await getData(getStaticPagesContent(children.props.childProp.segment));
  const content = data.staticPages[0];

  return (
    <>
      <div className="relative h-60 w-full overflow-hidden bg-slate-400 lg:h-80">
        <Image
          src={content?.header?.picture?.url}
          //   width={content?.header?.picture?.width}
          //   height={content?.header?.picture?.height}
          fill={true}
          alt={content?.title}
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
      </div>
      {children}
    </>
  );
}
