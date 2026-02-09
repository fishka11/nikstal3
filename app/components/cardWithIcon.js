import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMarkdown from "react-markdown";

export default function CardWithIcon({ icon, title, texts }) {
  return (
    <div className="w-full p-4 sm:w-1/2 lg:w-1/3">
      <div className="group h-full w-full rounded-md border border-blue-400 bg-white px-8 pb-6 pt-8 transition-colors  hover:bg-blue-400">
        <div className="mb-8 text-center">
          <FontAwesomeIcon
            className="text-7xl text-blue-500 transition-colors group-hover:text-white"
            icon={icon}
          />
        </div>
        <h2 className="mb-4 text-center text-3xl font-light">{title}</h2>
        <ReactMarkdown className="text-center">
          {texts[0]?.text?.markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
